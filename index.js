const inquirer = require('inquirer');

const db = require("./db/index");

require("console.table");











function intro() {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: ["View All Employees", "Add Employee", "Update Employee Role", "Add Role", "View All Roles", "View All Departments", "Add Department", "Quit"]
    }
  ])
    .then(res => {
      let choice = res.choice
      switch (choice) {
        case "View All Employees":
          viewemployees();
          break;
        case "Add Employee":
          addemployee();
          break;
        case "Update Employee Role":
          updaterole();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Roles":
          viewallroles();
          break;
        case "View All Departments":
          viewdepartments();
          break;
        case "Add Department":
          adddepartments();
          break;
        default:
          quit()
      }
    })

}

function viewemployees() {

  console.log("Is, this thing on?")

  db.findallemployees()
    .then(([rows]) => {
      let employees = rows
      console.table(employees)
    })
    .then(() => intro())



}






function addemployee() {

  db.findallroles()
    .then(([rows]) => {
      let role = rows;
      const rolechoices = role.map(({ id, name }) => ({
        name: name,
        value: id
      }))
      db.findallemployees()
        .then(([rows]) => {
          let employee = rows;
          const managerchoices = employee.map(({ id, name }) => ({
            name: name,
            value: id
          }))
          inquirer.prompt([
            {
              type: "Input",
              message: "What is the employee's first name?",
              name: "NewemployeeF",
            }, {
              type: "Input",
              message: "What is the employees last name?",
              name: "NewemployeeL",
            }, {
              type: "list",
              message: "What is the employee's role?",
              name: "erole",
              choices: [rolechoices],

            }, {
              type: "list",
              message: "Who is the employee's manager?",
              name: "emanager",
              choices: [managerchoices],
            }
          ])
            .then(employee => {
              db.createemployee(employee)
                .then(() => console.log(`Added ${employee.title} to the database`))
                .then(() => intro())
            })
        })

    })


}

function updaterole() {



    db.findAllroles()
    .then(([rows]) => {
      let role = rows;
      const rolechoices = role.map(({ id, name }) => ({
        name: name,
        value: id
      }))
      db.findallemployees()
      .then(([rows]) => {
        let role = rows;
        const employeechoices = role.map(({ id, name }) => ({
          name: name,
          value: id
        }))
        inquirer.prompt([
            {
            type: "list",
            message: "which employee's role would you like to update?",
            name: "rolechange",
            choices: [employeechoices]
            },{
                type: "list",
            message: "what is the employee's new role?",
            name: "newrole",
            choices: [rolechoices]
            }
        ])
        .then(employeeId, roleId => {
            db.updaterole(employeeId, roleId)
              .then(() => intro())
          })
      })
})
}

function addRole() {

    db.findAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));

        inquirer.prompt([
          {
            name: "title",
            message: "What is the name of the role?"
          },
          {
            name: "salary",
            message: "What is the salary of the role?"
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentChoices
          }
        ])
          .then(role => {
            db.createRole(role)
              .then(() => console.log(`Added ${role.title} to the database`))
              .then(() => intro())
          })
      })
  }




function viewallroles() {

    db.findallroles()
    .then(([rows]) => {
        let roles = rows
        console.table(roles)
    })
    .then(() => intro() )


}
function viewdepartments() {

    db.findalldepartments()
    .then(([rows]) => {
        let departments = rows
        console.table(departments)
    })
    .then(() => intro() )

}
function adddepartments() {


    
    inquirer.prompt=( [
        {
            type: "Input",
            list: "What is the name of the department?",
            name: "department",
            
        },
      ])
        .then(department => {
            db.createdepartment(department)
              .then(() => console.log(`Added ${department.title} to the database`))
              .then(() => intro())
          })

            




}
function quit() {
  process.exit(0)
}



intro()