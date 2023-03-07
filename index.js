const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { default: ListPrompt } = require("inquirer/lib/prompts/list");

//TODO: Finally, although it’s not a requirement, consider adding validation to ensure that user input is in the proper format.

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMember = [];
const idList = [];

const inputData = () => {

    //Function to write employee file
    function writeToFile() {
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        };
        fs.writeFileSync(outputPath, render(teamMember), 'utf-8');
    };
   
    // Function that runs when 'Engineer' selected from the createTeam() list
    // Allows for input of engineer data
    function addEngineer(){
        inquirer.prompt([  //input for new engineer
            {//name
                type: "input",
                name: "engineerName",
                message: "Engineer's name: ",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    } else {
                        return "Please enter at least one character."
                    }
                }
            },
            {//employee ID
                type: "input",
                name: "engineerID",
                message: "Engineer's employee id: "
            },
            {//email
                type: "input",
                name: "engineerEmail",
                message: "Engineer's email address: "
            },
            {//office number
                type: "input",
                name: "engineerGithub",
                message: "Engineer's Github name: "
            }
        ]).then(answers =>{
            const engineer = new Engineer(
                answers.engineerName, 
                answers.engineerID, 
                answers.engineerEmail, 
                answers.engineerGithub
            );
            teamMember.push(engineer);
            idList.push(answers.engineerID);
            console.log(engineer);
            createTeam();
        });
    };

    // Function that runs when 'Intern' selected from the createTeam() list
    // Allows for input of intern data
    function addIntern(){
        inquirer.prompt([  //input for new intenr
            {//name
                type: "input",
                name: "internName",
                message: "Full name: ",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    } else {
                        return "Please enter at least one character."
                    }
                }
            },
            {//employee ID
                type: "input",
                name: "internID",
                message: "Employee id: "
            },
            {//email
                type: "input",
                name: "internEmail",
                message: "Email address: "
            },
            {//office number
                type: "input",
                name: "university",
                message: "University/college name: "
            }
        ]).then(answers =>{
            const intern = new Intern(
                answers.internName, 
                answers.internID, 
                answers.internEmail, 
                answers.university
            );

            teamMember.push(intern);
            idList.push(answers.internID);
            console.log(intern)
            createTeam();
        });
    }

    // Function that allows user to select the type of profile they want to complete. 
    // Runs after every completed profile (intern, engineer). Stops when user selects 
    // 'team completed' from the list
    function createTeam(){
        inquirer.prompt ([
            {
                type: "list",
                name: "memberType",
                message: "Which type of team member would you like to add? ",
                choices: [
                    "Engineer",
                    "Intern",
                    "Team completed"
                ]
            }
        ]). then(userChoice => {
            if(userChoice.memberType === "Engineer") {
                addEngineer();
            } else if(userChoice.memberType === "Intern") {
                addIntern();
            } else {
                console.log(teamMember[0]);
                writeToFile();
            }
        })
    }

    // Function that runs on initialization (node index.js)
    // Allows for input of manager data, and calls createTeam() function to
    // enable user to begin building team profiles.
    function addManager(){

        console.log("Please complete your own profile, and then build your team.");
        
        inquirer.prompt([  //input for new manager
            {//name
                type: "input",
                name: "managerName",
                message: "Full name: ",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    } else {
                        return "Please enter at least one character."
                    }
                }
            },
            {//employee ID
                type: "input",
                name: "managerID",
                message: "Employee id: "
            },
            {//email
                type: "input",
                name: "managerEmail",
                message: "Email address: "
            },
            {//office number
                type: "input",
                name: "managerOfficeNumber",
                message: "Office number: "
            }
        ]).then(answers =>{
            const manager = new Manager(
                answers.managerName, 
                answers.managerID, 
                answers.managerEmail, 
                answers.managerOfficeNumber
            );

            teamMember.push(manager);
            idList.push(answers.managerID);
            console.log(manager);
            createTeam();
        });
    };
    addManager()

};

inputData();



