let express = require("express"),
  router = express.Router();
exerciseSchema = require("../models/exercise.model");
const { exec, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { v4: uuidv4 } = require("uuid");

const testCases = [
  { input: "1\n", output: "1 " },
  { input: "2\n", output: "1 2 " },
  { input: "3\n", output: "1 2 3 " },
  { input: "4\n", output: "1 2 3 4 " },
  { input: "5\n", output: "1 2 3 4 5 " },
  { input: "6\n", output: "1 2 3 4 5 6 " },
  { input: "7\n", output: "1 2 3 4 5 6 7 " },
  { input: "8\n", output: "1 2 3 4 5 6 7 8 " },
  { input: "9\n", output: "1 2 3 4 5 6 7 8 9 " },
  { input: "10\n", output: "1 2 3 4 5 6 7 8 9 10 " },
];

const queue = [];
let activeProcesses = 0;
const MAX_PROCESSES = 10;

router.post("/:id", async (req, res, next) => {
  console.log("Received submission for exercise", req.params.id);
  queue.push({ req, res });
  processQueue();
});

function processQueue() {
  if (activeProcesses >= MAX_PROCESSES || queue.length === 0) {
    return;
  }

  activeProcesses++;
  const { req, res } = queue.shift();
  const code = req.body.code;
  console.log("Processing code:", code);
  const tempDir = path.join(__dirname, "..", "temp");
  fs.promises.mkdir(tempDir, { recursive: true }).catch(console.error);
  const uniqueId = uuidv4();
  const filename = path.join(tempDir, `temp_${uniqueId}.cpp`);
  const outputFilename = path.join(tempDir, `temp_${uniqueId}.out`);
  const executable =
    os.platform() === "win32" ? `${outputFilename}` : `./${outputFilename}`;

  fs.promises
    .writeFile(filename, code)
    .then(() => {
      console.log("File written successfully");

      const compile = spawn(`g++`, [
        `${filename}`,
        `-o`,
        `${outputFilename}`,
        `-mconsole`,
      ]);

      // Set a timeout for the compilation process
      let compileTimeoutId = setTimeout(() => {
        compile.kill(); // This will terminate the process
        console.log(`Compilation process timed out and was terminated`);
      }, 5000); // Timeout is set to 5 seconds

      compile.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      compile.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      compile.on("close", (code) => {
        clearTimeout(compileTimeoutId); // Clear the timeout if the process ends before the timeout

        if (code !== 0) {
          console.error("Compilation error:", code);
          res.json({ score: 0 });
          cleanup(filename, outputFilename);
          return;
        }

        console.log("Compilation success");

        const testPromises = testCases.map((testCase, index) => {
          return new Promise((resolve, reject) => {
            console.log(
              `Starting test case ${
                index + 1
              }: input = ${testCase.input.trim()}`
            );

            const child = spawn(executable);

            // Set a timeout for the child process
            let timeoutId = setTimeout(() => {
              child.kill(); // This will terminate the process
              console.log(
                `Test case ${index + 1} timed out and was terminated`
              );
            }, 5000); // Timeout is set to 5 seconds

            let outputData = "";
            let errorData = "";

            child.stdin.write(testCase.input);
            child.stdin.end();

            child.stdout.on("data", (data) => {
              outputData += data.toString();
            });

            child.stderr.on("data", (data) => {
              errorData += data.toString();
            });

            child.on("close", (code) => {
              clearTimeout(timeoutId); // Clear the timeout if the process ends before the timeout
              if (code !== 0) {
                console.error(
                  `Test case ${index + 1} execution error:`,
                  errorData
                );
                console.log(`Test case ${index + 1} completed: failure`);
                resolve({
                  input: testCase.input,
                  expected: testCase.output,
                  output: errorData,
                  success: false,
                });
              } else {
                const trimmedOutput = outputData.trim();
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

        Promise.all(testPromises)
          .then((results) => {
            const successCount = results.filter(
              (result) => result.success
            ).length;
            const score = (successCount / testCases.length) * 100;
            res.json({ results, score });
          })
          .finally(() => {
            cleanup(filename, outputFilename);
            console.log("Cleanup called");
          });
      });
    })
    .catch((writeError) => {
      console.error("Error writing file:", writeError);
      res.status(500).json({ output: "Error writing file" });
    })
    .finally(() => {
      activeProcesses--;
      processQueue();
    });
}

function cleanup(filename, outputFilename) {
  if (fs.existsSync(filename)) {
    fs.promises
      .unlink(filename)
      .then(() => {
        console.log(".cpp file deleted successfully");
        if (fs.existsSync(outputFilename)) {
          return fs.promises.unlink(outputFilename);
        }
      })
      .then(() => {
        if (fs.existsSync(outputFilename)) {
          console.log("Executable deleted successfully");
        }
      })
      .catch((unlinkError) => {
        console.error("Error deleting file:", unlinkError);
      });
  }
}

module.exports = router;
