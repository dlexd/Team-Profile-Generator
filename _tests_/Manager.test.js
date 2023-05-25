const Manager = require('../lib/Manager');

describe('Manager', () => {
    const name = 'Charles';
    const id = '171';
    const email = 'charles@gmail.com';
    const officeNumber = '13C';
    const manager = new Manager(name, id, email, officeNumber);

    it('Should return "Manager"', () => {
        const returnedRole = manager.getRole();
        expect(returnedRole).toEqual('Manager');
    });
});
