const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquire = require("inquirer");
const fs = require("fs");

var teamList = [];
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

function buildTeamList() {
  inquire.prompt(employeeQuestions).then((employeeInfo) => {
    if (employeeInfo.role === "engineer") {
      var newMember = new Engineer(
        employeeInfo.name,
        teamList.length + 1,
        employeeInfo.email,
        employeeInfo.github
      );
    } else {
      var newMember = new Intern(
        employeeInfo.name,
        teamList.length + 1,
        employeeInfo.email,
        employeeInfo.school
      );
    }
    teamList.push(newMember);
    if (employeeInfo.addAnother === "Yes") {
      console.log(" ");
      buildTeamList();
    } else {
      buildHtmlPage();
    }
  });
}

function buildHtmlPage() {
  fs.mkdir("./output", function (err) {
    if (err) {
      console.log(
        "You already have an output directory, you have just overwritten the directory"
      );
    }
  });
  fs.writeFileSync(
    "./output/teamPage.html",
    fs.readFileSync("./templates/main.html"),
    function (err) {
      if (err) throw err;
    }
  );

  console.log("Page generated!");

  for (member of teamList) {
    if (member.getRole() === "Manager") {
      buildHtmlCard(
        "manager",
        member.getName(),
        member.getId(),
        member.getEmail(),
        member.getOfficeNumber()
      );
    } else if (member.getRole() === "Engineer") {
      buildHtmlCard(
        "engineer",
        member.getName(),
        member.getId(),
        member.getEmail(),
        member.getGithub()
      );
    } else if (member.getRole() === "Intern") {
      buildHtmlCard(
        "intern",
        member.getName(),
        member.getId(),
        member.getEmail(),
        member.getSchool()
      );
    }
  }
  // // adds html tags once all cards have been added
  // fs.appendFileSync(
  //   "./output/teamPage.html",
  //   "</div></main></body></html>",
  //   function (err) {
  //     if (err) throw err;
  //   }
  // );
  console.log(teamList);
}

function buildHtmlCard(memberType, name, id, email, additionalOutput) {
  let data = fs.readFileSync(`./templates/${memberType}.html`, "utf8");
  data = data.replace("{{ name }}", name);
  data = data.replace("{{ role }}", memberType);
  data = data.replace("{{ id }}", id);
  data = data.replace("{{ email }}", email);
  data = data.replace("{{ email }}", email);
  data = data.replace("{{ additionalOutput }}", additionalOutput);
  data = data.replace("{{ additionalOutput }}", additionalOutput);
  fs.appendFileSync("./output/teamPage.html", data, (err) => {
    if (err) throw err;
  });
  console.log(`${memberType} Card appended`);
}

function init() {
  inquire.prompt(managerQuestions).then((managerInfo) => {
    let teamManager = new Manager(
      managerInfo.name,
      1,
      managerInfo.email,
      managerInfo.officeNum
    );
    teamList.push(teamManager);
    console.log(" ");
    if (managerInfo.hasTeam === "Yes") {
      buildTeamList();
    } else {
      buildHtmlPage();
    }
  });
}

init();
