let express = require("express"),
  router = express.Router();
const bodyParser = require('body-parser');
const { exec } = require('child_process');


router.post('/', (req, res) => {
  const { code, language } = req.body;

  // Create a Docker command based on the selected language
  let dockerCommand;
  switch (language) {
    case 'cpp':
      // Compile and run C++ code
      dockerCommand = `echo '${code}' > main.cpp && g++ main.cpp -o main && ./main`;
      break;
    case 'java':
      // Compile and run Java code
      dockerCommand = `echo '${code}' > Main.java && javac Main.java && java Main`;
      break;
    case 'python':
      // Run Python code
      dockerCommand = `echo '${code}' > main.py && python3 main.py`;
      break;
    default:
      res.status(400).send('Invalid language');
      return;
  }

  // Run the Docker command
  exec(dockerCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('There was an error!');
      return;
    }

    // Send the output of the code execution
    res.send({ output: stdout || stderr });
  });
});

module.exports = router;
