describe('GET /characters', function () {

    const characters = [
        {
            name: 'Charles Xavier',
            alias: 'Professor Xavier',
            team: ['X-Men'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['X-Men'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Spider Man',
            team: ['Vingadores'],
            active: true
        }
    ]

    before(function () {

        cy.back2ThePast();
        cy.setToken();
        //cy.postCharacter();
        cy.populateCharacters(characters)

    })

    it('Deve retornar uma lista de Personagens', function () {

        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        });
    })
})