// creates the team
const generateTeam = team => {

    // creates the manager html
    const generateManager = manager => {
        return `
        <div class="card col-lg-3 col-md-6  employee-card manager-card">
            <div class="card-header">
                <h2 class="card-title">${manager.getName()}</h2>
                <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"><span class="bold">ID:</span> ${manager.getId()}</li>
                    <li class="list-group-item"><span class="bold">Email:</span> <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                    <li class="list-group-item"><span class="bold">Office number:</span> ${manager.getOfficeNumber()}</li>
                </ul>
            </div>
        </div>
        `;

    };
    
    // creates the html for engineers
    const generateEngineer = engineer => {
        return `
        <div class="card col-lg-3 col-md-6  employee-card engineer-card">
            <div class="card-header">
                <h2 class="card-title">${engineer.getName()}</h2>
                <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${engineer.getRole()}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"><span class="bold">ID: </span>${engineer.getId()}</li>
                    <li class="list-group-item"><span class="bold">Email: </span><a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                    <li class="list-group-item"><span class="bold">GitHub: </span><a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a></li>
                </ul>
            </div>
        </div>
        `;
    };

    // creates the html for interns
    const generateIntern = intern => {
        return `
        <div class="card col-lg-3 col-md-6  employee-card intern-card">
            <div class="card-header">
                <h2 class="card-title">${intern.getName()}</h2>
                <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${intern.getRole()}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"><span class="bold">ID: </span>${intern.getId()}</li>
                    <li class="list-group-item"><span class="bold">Email: </span><a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                    <li class="list-group-item"><span class="bold">School: </span>${intern.getSchool()}</li>
                </ul>
            </div>
        </div>
        `;
    };

    const html = [];

    html.push(team
        .filter(employee => employee.getRole() === "Team Lead")
        .map(manager => generateManager(manager))
    );

    html.push(team
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => generateEngineer(engineer))
        .join("")
         
    );

    html.push(team
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => generateIntern(intern))
        .join("")
    );
    
    return html.join("");
}


// exports function to generate entire page
module.exports = team => {

    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>My Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="../assets/css/style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>

    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading">
                    <h1 class="text-center">My Team</h1>
                    <p>Hi ${generateIntern(intern)}</p>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex">
                ${generateTeam(team)}
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};