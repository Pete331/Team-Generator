const employeeQuestions = [
    {
      type: "input",
      name: "name",
      message: "Enter employee name:",
      default: "Joe employee",
      validate: (answer) => {
        if (answer == "") {
          return "Please enter at least one character.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "email",
      message: "Enter their email:",
      default: "Joe@employee.com",
      validate: (answer) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(answer)) {
          return true;
        }
        return "Please enter a valid email address.";
      },
    },
    {
      type: "list",
      name: "role",
      message: "What is their role?",
      choices: ["engineer", "intern"],
    },
    {
      when: (input) => {
        return input.role === "engineer";
      },
      type: "input",
      name: "github",
      message: "Engineer, enter your github username:",
      default: "Pete331",
      validate: (answer) => {
        if (answer === "") {
          return "Please enter at least one character";
        }
        return true;
      },
    },
    {
      when: (input) => {
        return input.role === "intern";
      },
      type: "input",
      name: "school",
      message: "Intern, enter your school name:",
      default: "UWA",
      validate: (answer) => {
        if (answer === "") {
          return "Please enter at least one character.";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "addAnother",
      message: "Add another team member?",
      choices: ["Yes", "No"],
    },
  ];

  module.exports = employeeQuestions;