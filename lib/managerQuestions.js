const managerQuestions = [
    {
      type: "input",
      name: "name",
      default: "Pete",
      message: "Enter manager name:",
      validate: (answer) => {
        if (answer === "") {
          return "Please enter at least one character.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "email",
      message: "Enter manager's email:",
      default: "Pete@work.com",
      validate: (answer) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(answer)) {
          return true;
        }
        return "Please enter a valid email address.";
      },
    },
    {
      type: "input",
      name: "officeNum",
      message: "Enter office number:",
      default: "123",
      validate: (answer) => {
        if (isNaN(answer)) {
          return "Please enter a number";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "hasTeam",
      message: "Do you have any team members?",
      choices: ["Yes", "No"],
    },
  ];

  module.exports = managerQuestions;