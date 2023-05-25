const Employee = require('../lib/Employee');

describe('Employee', () => {
    const name = 'Derek';
    const id = '1';
    const email = "Derrekle@gmail.com"
    const employee = new Employee(name, id, email);

    it('Should return the name of the employee', () => {
        const returnedName = employee.getName();
        expect(returnedName).toEqual(name);
    });

    it('Should return the id of the employee', () => {
        const returnedId = employee.getId();
        expect(returnedId).toEqual(id);
    });

    it('Should return the email of the employee', () => {
        const returnedEmail = employee.getEmail();
        expect(returnedEmail).toEqual(email);
    });

    it('Should return Employee', () => {
        const returnedRole = employee.getRole();
        expect(returnedRole).toEqual('Employee');
    });

})