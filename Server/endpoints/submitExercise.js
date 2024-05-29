let express = require("express"),
  router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Exercise = require("../models/exercise.model");
const { exec } = require("child_process");

const queue = [];
let activeProcesses = 0;
const MAX_PROCESSES = 10;

router.post("/:id", async (req, res, next) => {
  console.log("Received submission for exercise", req.params.id);

  const exercise = await Exercise.findOne({ id: req.params.id });
  if (!exercise) {
    res.status(404).json({ error: "Exercise not found" });
    return;
  }

  const testCases = exercise.testCases;

  queue.push({ req, res, testCases });
  processQueue();
});

async function processQueue() {
  if (activeProcesses >= MAX_PROCESSES || queue.length === 0) {
    return;
  }

  activeProcesses++;
  const { req, res, testCases } = queue.shift();
  const code = req.body.code;
  console.log("Processing code:", code);
  const tempDir = path.join(__dirname, "..", "temp");
  await fs.promises.mkdir(tempDir, { recursive: true });
  const uniqueId = uuidv4();
  const taskDir = path.join(tempDir, `task_${uniqueId}`);
  await fs.promises.mkdir(taskDir, { recursive: true });
  const filename = path.join(taskDir, `temp.cpp`);
  const executable = path.join(taskDir, `a.out`);

  try {
    await fs.promises.writeFile(filename, code);
    console.log("File written successfully");

    // Compile the C++ code
    const compileCommand = `docker run --rm -v "${taskDir}:/usr/src/app" cpp-sandbox g++ /usr/src/app/temp.cpp -o /usr/src/app/a.out`;
    exec(compileCommand, async (compileError, stdout, stderr) => {
      if (compileError) {
        console.error(`Compilation error: ${stderr}`);
        res.json({ results: [], score: 0 });
        cleanup(taskDir);
        activeProcesses--;
        processQueue();
        return;
      }

      console.log("Compilation successful");

      const testPromises = testCases.map((testCase, index) => {
        return new Promise(async (resolve, reject) => {
          console.log(
            `Starting test case ${index + 1}: input = ${testCase.input.trim()}`
          );

          const inputFilename = path.join(taskDir, `input_${index}.txt`);
          await fs.promises.writeFile(inputFilename, testCase.input);

          const runCommand = `docker run --rm -v "${taskDir}:/usr/src/app" cpp-sandbox sh -c "/usr/src/app/a.out < /usr/src/app/input_${index}.txt"`;
          exec(runCommand, (runError, stdout, stderr) => {
            if (runError) {
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

      cleanup(taskDir); // Ensure cleanup is called after all operations are complete
      activeProcesses--;
      processQueue();
    });
  } catch (writeError) {
    console.error("Error writing file:", writeError);
    res.json({ results: [], score: 0 });
    cleanup(taskDir); // Ensure cleanup is called in case of an error
    activeProcesses--;
    processQueue();
  }
}

async function cleanup(taskDir) {
  if (fs.existsSync(taskDir)) {
    try {
      await fs.promises.rm(taskDir, { recursive: true, force: true });
      console.log("Task directory deleted successfully");
    } catch (unlinkError) {
      console.error("Error deleting task directory:", unlinkError);
    }
  }
}

module.exports = router;