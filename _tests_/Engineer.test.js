const Engineer = require('../lib/Engineer');

describe('Engineer', () => {
    const name = 'Daniel';
    const id = '72';
    const email = 'Daniel@gmail.com';
    const github = 'ImDaniel';
    const engineer = new Engineer(name, id, email, github);

    it('Should return the github username', () => {
        const returnedGithub = engineer.getGithub();
        expect(returnedGithub).toEqual(github);
    });

    it('Should return Engineer', () => {
        const returnedRole = engineer.getRole();
        expect(returnedRole).toEqual('Engineer');
    });
});
