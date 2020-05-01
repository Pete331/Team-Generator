const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const managerQuestions = require("./lib/managerQuestions");
const employeeQuestions = require("./lib/employeeQuestions");
const inquirer = require("inquirer");
const fs = require("fs");

// start with an empty team
var teamList = [];

// asks managerQuestions and sets the teamManager variable according to manager constructor
function init() {
  inquirer.prompt(managerQuestions).then((managerInfo) => {
    let teamManager = new Manager(
      managerInfo.name,
      1,
      managerInfo.email,
      managerInfo.officeNum
    );
    teamList.push(teamManager);
    // adds a space between manager and first employee in terminal
    console.log(" ");
    if (managerInfo.hasTeam === "Yes") {
      buildTeamList();
    } else {
      buildHtmlPage();
    }
  });
}

// asks for emplyee information
function buildTeamList() {
  inquirer.prompt(employeeQuestions).then((employeeInfo) => {
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
  fs.writeFileSync(
    `./output/${teamList[0].name}TeamPage.html`,
    fs.readFileSync("./templates/main.html"),
    function (err) {
      if (err) throw err;
    }
  );

  // loops over teamList objects and calls them member
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
  // updates team size in html
  fs.readFile(`./output/${teamList[0].name}TeamPage.html`, "utf8", function (
    err,
    data
  ) {
    if (err) throw err;
    const teamSize = data.replace("{teamSize}", teamList.length);
    fs.writeFileSync(
      `./output/${teamList[0].name}TeamPage.html`,
      teamSize,
      "utf8",
      function (err) {
        if (err) throw err;
      }
    );
  });

  // adds html tags once all cards have been added
  fs.appendFileSync(
    `./output/${teamList[0].name}TeamPage.html`,
    "</div></div></body></html>",
    function (err) {
      if (err) throw err;
    }
  );
  console.log("Your Team page has been completed - find it in the output folder");
}

// replaces html tags within appropriate employee template and then appends to teampage
function buildHtmlCard(memberType, name, id, email, additionalOutput) {
  let data = fs.readFileSync(`./templates/${memberType}.html`, "utf8");
  data = data.replace("{{ name }}", name);
  data = data.replace("{{ role }}", memberType);
  data = data.replace("{{ id }}", id);
  data = data.replace("{{ email }}", email);
  data = data.replace("{{ email }}", email);
  data = data.replace("{{ additionalOutput }}", additionalOutput);
  data = data.replace("{{ additionalOutput }}", additionalOutput);
  fs.appendFileSync(
    `./output/${teamList[0].name}TeamPage.html`,
    data,
    (err) => {
      if (err) throw err;
    }
  );
  console.log(`${memberType} Card appended`);
}

init();
