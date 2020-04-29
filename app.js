const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// ​
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// ​
const render = require("./lib/htmlRenderer");

async function init() {
  try {
    //storing answers from Inquirer as object variable
    const initiial = await initialPrompt();
    const user = await addUser();
  } catch (err) {
    console.log(err);
  }
}

init();

function initialPrompt() {
  return inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "prompt",
      choices: ["Add user", "Create html page"],
    },
  ]);
}

function addUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "username",
      default: "Pete",
    },
    {
      type: "number",
      message: "What is your ID?",
      name: "ID",
      default: "123",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
      default: "pete@email.com",
    },
    {
      type: "list",
      message: "What is your Role?",
      name: "role",
      choices: ["Manager", "Engineer", "Intern"],
    },
    {
      type: "number",
      message: `What is your office number?`,
      name: "officeNumber",
      when: function (answers) {
        return answers.role.includes("Manager");
      },
    },
    {
      type: "input",
      message: `What is your GitHub username?`,
      name: "githubUsername",
      when: function (answers) {
        return answers.role.includes("Engineer");
      },
    },
    {
      type: "input",
      message: `What is your school?`,
      name: "school",
      when: function (answers) {
        return answers.role.includes("Intern");
      },
    },
  ]);
}

// function questionsForReadme(repoArray) {
//     return inquirer.prompt([
//       {
//         type: "list",
//         message: "Which repo would you like to create a README.md for?",
//         name: "repo",
//         choices: repoArray,
//       },
//       {
//         type: "input",
//         message:
//           "What Would you like the Title to be? (leave blank to use repo name)",
//         name: "Title",
//         default: function (answers) {
//           return answers.repo;
//         },
//       },
//       {
//         type: "input",
//         message: "Add a decription:",
//         name: "Description",
//       },
//       {
//         type: "checkbox",
//         message:
//           "Which of the following would you like included in your README.md file?",
//         name: "checkboxoptions",
//         choices: [
//           "Table of Contents",
//           "Installation",
//           "Usage",
//           "License",
//           "Contributing",
//           "Tests",
//           "Questions",
//         ],
//       },
//       {
//         type: "input",
//         message: `What would you like in your Installation?`,
//         name: "Installation",
//         when: function (answers) {
//           return answers.checkboxoptions.includes("Installation");
//         },
//       },
//       {
//         type: "input",
//         message: `What would you like in your Usage?`,
//         name: "Usage",
//         when: function (answers) {
//           return answers.checkboxoptions.includes("Usage");
//         },
//       },
//       {
//         type: "list",
//         message: `What would you like in your License?`,
//         name: "License",
//         choices: [
//           "MIT License",
//           "Apache License 2.0",
//           "GNU General Public License",
//           "None",
//           "Other",
//         ],
//         when: function (answers) {
//           return answers.checkboxoptions.includes("License");
//         },
//       },
//       {
//         type: "input",
//         message: `What would you like in your Contributing?`,
//         name: "Contributing",
//         when: function (answers) {
//           return answers.checkboxoptions.includes("Contributing");
//         },
//       },
//       {
//         type: "input",
//         message: `What would you like in your Tests?`,
//         name: "Tests",
//         when: function (answers) {
//           return answers.checkboxoptions.includes("Tests");
//         },
//       },
//       {
//         type: "input",
//         message: `What would you like in your Questions?`,
//         name: "Questions",
//         when: function (answers) {
//           return answers.checkboxoptions.includes("Questions");
//         },
//       },
//     ]);
//   }
