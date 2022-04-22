import { handShake, getProjectData } from "./utils.js";

let input;
try {
  input = new RegExp(`${process.argv[2]}$`);
} catch (e) {
  console.log("Invalid Input", e);
  process.exitCode = 0;
}

(function getGitData() {
  handShake();
  process.stdout.write(`Sending request... searching for ${input}\n`);
  getProjectData(input);

})();

process.exitCode = 0;
