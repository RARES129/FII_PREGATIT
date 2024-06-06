let express = require("express"),
  router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Exercise = require("../models/exercise.model");
const Sources = require("../models/source.model");
const { spawn, exec } = require("child_process");

const queue = [];
let activeProcesses = 0;
const MAX_PROCESSES = 10;

router.post("/:id", async (req, res, next) => {
  if (req.session && req.session.userId) {
    console.log("Received submission for exercise", req.params.id);

    const exercise = await Exercise.findOne({ id: req.params.id });
    if (!exercise) {
      res.status(404).json("Exercise not found");
      return;
    }

    const testCases = exercise.testCases;
    const type = exercise.type;
    const language = exercise.language;

    queue.push({ req, res, testCases, type, language });
    processQueue();
  } else {
    res.status(401).json("Unauthorized !!!");
  }
});

async function processQueue() {
  if (activeProcesses >= MAX_PROCESSES || queue.length === 0) {
    return;
  }

  activeProcesses++;
  const { req, res, testCases, type, language } = queue.shift();
  const code = req.body.code;
  console.log("Processing code:", code);
  const tempDir = path.join(__dirname, "..", "temp");
  await fs.promises.mkdir(tempDir, { recursive: true });
  const uniqueId = uuidv4();
  const taskDir = path.join(tempDir, `task_${uniqueId}`);
  await fs.promises.mkdir(taskDir, { recursive: true });
  const filename = path.join(
    taskDir,
    language === "Python" ? `temp.py` : `temp.cpp`
  );
  const executable =
    language === "Python"
      ? `python3 /usr/src/app/temp.py`
      : `/usr/src/app/a.out`;

  try {
    await fs.promises.writeFile(filename, code);
    console.log("File written successfully");

    let compileCommand, runCommand;
    if (language === "Python") {
      runCommand = `python3 /usr/src/app/temp.py`;
      await executeAndTest(
        res,
        req,
        testCases,
        taskDir,
        runCommand,
        uniqueId,
        language,
        type
      );
    } else if (language === "C++") {
      compileCommand = `g++ /usr/src/app/temp.cpp -o /usr/src/app/a.out`;
      const compileProcess = spawn("docker", [
        "run",
        "--rm",
        "-v",
        `${taskDir}:/usr/src/app`,
        "cpp-python-sandbox",
        "sh",
        "-c",
        compileCommand,
      ]);

      compileProcess.stderr.on("data", (data) => {
        console.error(`Compilation error: ${data.toString()}`);
      });

      compileProcess.on("close", async (code) => {
        if (code !== 0) {
          console.error(`Compilation error with exit code ${code}`);
          res.status(400).send("Compilation error");
          await cleanup(taskDir);
          activeProcesses--;
          processQueue();
          return;
        }

        console.log("Compilation successful");
        runCommand = `/usr/src/app/a.out`;
        await executeAndTest(
          res,
          req,
          testCases,
          taskDir,
          runCommand,
          uniqueId,
          language,
          type
        );
      });
    }
  } catch (writeError) {
    console.error("Error writing file:", writeError);
    res.json({ results: [], score: 0 });
    await cleanup(taskDir);
    activeProcesses--;
    processQueue();
  }
}

async function executeAndTest(
  res,
  req,
  testCases,
  taskDir,
  runCommand,
  uniqueId,
  language,
  type
) {
  const testPromises = testCases.map((testCase, index) => {
    return new Promise(async (resolve) => {
      console.log(
        `Starting test case ${index + 1}: input = ${testCase.input.trim()}`
      );

      const inputFilename = path.join(taskDir, `input_${index}.txt`);
      await fs.promises.writeFile(inputFilename, testCase.input);

      const containerName = `${language}_sandbox_${uniqueId}_${index}`;
      const dockerProcess = spawn("docker", [
        "run",
        "--name",
        containerName,
        "--rm",
        "-v",
        `${taskDir}:/usr/src/app`,
        "cpp-python-sandbox",
        "sh",
        "-c",
        `${runCommand} < /usr/src/app/input_${index}.txt`,
      ]);

      let stdout = "";
      let stderr = "";
      let timedOut = false;

      dockerProcess.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      dockerProcess.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      const timeoutId = setTimeout(() => {
        timedOut = true;
        exec(`docker rm -f ${containerName}`, (err) => {
          if (err) {
            console.error(`Error removing container ${containerName}:`, err);
          } else {
            console.log(`Container ${containerName} removed successfully.`);
          }
          resolve({
            input: testCase.input,
            expected: testCase.output,
            output: "Time limit exceeded",
            success: false,
          });
        });
      }, 10000);

      dockerProcess.on("close", (code) => {
        clearTimeout(timeoutId);
        if (timedOut) {
          return;
        }
        if (code !== 0) {
          console.error(`Test case ${index + 1} execution error:`, stderr);
          resolve({
            input: testCase.input,
            expected: testCase.output,
            output: stderr,
            success: false,
          });
        } else {
          const trimmedOutput = stdout.trim();
          const success = trimmedOutput === testCase.output.trim();
          console.log(
            `Test case ${index + 1} completed: ${
              success ? "success" : "failure"
            }`
          );
          resolve({
            input: testCase.input,
            expected: testCase.output,
            output: trimmedOutput,
            success,
          });
        }
      });
    });
  });

  const results = await Promise.all(testPromises);
  const successCount = results.filter((result) => result.success).length;
  const score = (successCount / testCases.length) * 100;
  res.json({ results, score });

  try {
    const newSource = await Sources.findOneAndUpdate(
      {
        exerciseId: req.params.id,
        userId: req.session.userId,
      },
      {
        code: req.body.code,
        score: score,
        type: type,
        language: language,
      },
      {
        new: true,
        upsert: true,
      }
    );

    console.log("Source document saved successfully:", newSource);
    await updateSuccessRate(req.params.id);
  } catch (err) {
    console.error("Error saving source document:", err);
  }

  await cleanup(taskDir);
  activeProcesses--;
  processQueue();
}

async function cleanup(taskDir) {
  if (fs.existsSync(taskDir)) {
    try {
      const files = await fs.promises.readdir(taskDir);
      for (const file of files) {
        await fs.promises.unlink(path.join(taskDir, file));
      }
      await fs.promises.rmdir(taskDir);
      console.log("Task directory deleted successfully");
    } catch (unlinkError) {
      console.error("Error deleting task directory:", unlinkError);
    }
  }
}

async function updateSuccessRate(exerciseId) {
  try {
    const sources = await Sources.find({ exerciseId });
    if (sources.length > 0) {
      const totalSubmissions = sources.length;
      const successfulSubmissions = sources.filter(
        (source) => source.score === 100
      ).length;
      const successRate = (successfulSubmissions / totalSubmissions) * 100;

      await Exercise.findOneAndUpdate(
        { id: exerciseId },
        { successRate },
        { new: true }
      );

      console.log(
        `Updated success rate for exercise ${exerciseId} to ${successRate}%`
      );
    }
  } catch (err) {
    console.error("Error updating success rate:", err);
  }
}

module.exports = router;
