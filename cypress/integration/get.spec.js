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

    it.only('Deve buscar personagem por nome', function () {
        cy.searchCharacters('Logan').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Wolverine')
            expect(response.body[0].team).to.eql(['X-Men'])
            expect(response.body[0].active).to.eql(true)
        });
    })
})