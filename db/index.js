const connection = require("./connection")

class DB {
    constructor(connection) {
        this.connection = connection
    }

    findallemployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, concat(manager.first_name, ' ', manager.last_name) as manager FROM employee left join role on employee.role_id = role.id left join department on role.department_id =  department.id left join employee manager on manager.id = employee.manager_id;"
        )
    }

    createemployee(employee) {
        return this.connection.promise().query(
            "INSERT into employee (first_name, last_name, role_id, manager_id) values ( ?, ?, ?, ?) ", [employee.NewemployeeF, employee.NewemployeeL, employee.erole, employee.emanager]
        )
    }

    updaterole(employeeId, roleId) {
        return this.connection.promise().query(
            "Update employee set role_id = ? where id = ?", [roleId, employeeId]
        ) 
    }

    createRole(role) {
        return this.connection.promise().query(
            "INSERT into role set ?", role
        )
    }

    findallroles() {
        return this.connection.promise().query(
            "Select role.id, role.title, department.name as department, role.salary from role left join department on role.department_id = department.id;"
        )
    }

    findallDepartments() {
        return this.connection.promise().query(
            "Select department.id, department.name from department;"
        )
    }

    createdepartment(department) {
        return this.connection.promise().query(
            'INSERT INTO department (name) values (?)', department.department
        )
    }


      


}

module.exports = new DB(connection)
