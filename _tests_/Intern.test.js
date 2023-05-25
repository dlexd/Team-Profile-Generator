const Intern = require('../lib/Intern');

describe('Intern', () => {
    const name = 'Jim';
    const id = '21';
    const email = 'jim@gmail.com';
    const school = 'UCI';
    const intern = new Intern(name, id, email, school);

    it('Should return the school of the intern', () => {
        const returnedSchool = intern.getSchool();
        expect(returnedSchool).toEqual(school);
    });

    it('Should return Intern', () => {
        const returnedRole = intern.getRole();
        expect(returnedRole).toEqual('Intern');
    });
});
