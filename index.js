// Imports required dependencies
const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Function to generate the Project Manager's part of the HTML.
function generateManagerHtml(manager) {
    return `
    <div class="team-member">
        <h3 class="team-member-role">Project Manager</h3>
        <div class="team-member-content">
            <div class="employee-content-line name"><b>Name:</b> ${manager.getName()}</div>
            <div class="employee-content-line"><b>Employee ID:</b> ${manager.getId()}</div>
            <div class="employee-content-line"><b>Email:</b> <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></div>
            <div class="employee-content-line"><b>Office:</b> ${manager.getOfficeNumber()}</div>
        </div>
    </div>`;
}

// Function to generate the Engineer's part of the HTML.
function generateEngineerHtml(engineer) {
    return `
    <div class="team-member">
        <h3 class="team-member-role">Engineer</h3>
        <div class="team-member-content">
            <div class="employee-content-line name"><b>Name:</b> ${engineer.getName()}</div>
            <div class="employee-content-line"><b>Employee ID:</b> ${engineer.getId()}</div>
            <div class="employee-content-line"><b>Email:</b> <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></div>
            <div class="employee-content-line"><b>Github:</b> <a href="https://www.github.com/${engineer.getGithub()}" target="_blank">${engineer.getGithub()}</a></div>
        </div>
    </div>`;
}

// Function to generate the Intern's part of the HTML.
function generateInternHtml(intern) {
    return `
    <div class="team-member">
        <h3 class="team-member-role">Intern</h3>
        <div class="team-member-content">
            <div class="employee-content-line name"><b>Name:</b> ${intern.getName()}</div>
            <div class="employee-content-line"><b>Employee ID:</b> ${intern.getId()}</div>
            <div class="employee-content-line"><b>Email:</b> <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></div>
            <div class="employee-content-line"><b>School:</b> ${intern.getSchool()}</div>
        </div>
    </div>`;
}

// Function to generate the entire HTML.
function generateHtml(managerHtml, engineerHtml, internHtml) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
        <link href="style.css" rel="stylesheet">
    </head>
    <body>
        <header>
            <h1 class="text-center text-4xl my-6 team-profile-heading">Team Profile</h1>
        </header>
        <main>
            <div class="employee-container">
                ${managerHtml}
                <div class="team">
                    <div class="engineers mb-6">
                        <div class="team-member-role text-center">
                            <h3 class="engineer-role-title text-2xl text-white">Engineering Team</h3>
                        </div>
                        <div class="engineers-content">
                            ${engineerHtml}
                        </div>
                    </div>
                    <div class="interns mb-6">
                        <div class="team-member-role text-center">
                            <h3 class="intern-role-title text-2xl text-white">Intern Team</h3>
                        </div>
                        <div class="interns-content">
                            ${internHtml}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </body>
    </html>`;
}

// Inquirer to ask for Manager info
function promptManager() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Who is the Team Manager?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the Manager's ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the Manager's email address?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's office number?",
        },
    ]);
}

// Inquirer to ask for Engineer's info
function promptTeamMember() {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What role are you adding to the team?",
            choices: ["Engineer", "Intern"],
        },
        {
            type: "input",
            name: "name",
            message: "What is this team member's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is this team member's ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is this team member's email address?",
        },
        {
            type: "input",
            name: "github",
            message: "What is this engineer's GitHub username?",
            when: (answers) => answers.role === "Engineer",
        },
        {
            type: "input",
            name: "school",
            message: "What school did this intern attend?",
            when: (answers) => answers.role === "Intern",
        },
    ]);
}

// Function to add more members
function promptAddMore() {
    return inquirer.prompt({
        type: "confirm",
        name: "addMore",
        message: "Would you like to add another team member?",
    });
}

// Function that generates the team profile
async function generateTeamProfile() {
    try {
        const teamMembers = [];

        const managerData = await promptManager();
        const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
        teamMembers.push(manager);

        let addMore = true;
        while (addMore) {
            const teamMemberData = await promptTeamMember();
            let teamMember;
            if (teamMemberData.role === "Engineer") {
                teamMember = new Engineer(teamMemberData.name, teamMemberData.id, teamMemberData.email, teamMemberData.github);
            } else if (teamMemberData.role === "Intern") {
                teamMember = new Intern(teamMemberData.name, teamMemberData.id, teamMemberData.email, teamMemberData.school);
            }
            teamMembers.push(teamMember);

            const addMoreData = await promptAddMore();
            addMore = addMoreData.addMore;
        }

        const managerHtml = generateManagerHtml(manager);
        const engineerHtml = teamMembers.filter((member) => member instanceof Engineer).map(generateEngineerHtml).join("");
        const internHtml = teamMembers.filter((member) => member instanceof Intern).map(generateInternHtml).join("");

        const htmlContent = generateHtml(managerHtml, engineerHtml, internHtml);
        // Writes the HTML file into the dist folder
        fs.writeFile("./dist/index.html", htmlContent, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("HTML file generated successfully!");
            }
        });
    } catch (error) {
        console.error(error);
    }
}

generateTeamProfile();