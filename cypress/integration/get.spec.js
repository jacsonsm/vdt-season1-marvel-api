
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
        //cy.back2ThePast();
        //cy.setToken();
        // cy.postCharacter();
        cy.populateCharacters(characters)
    })

    it('Deve retornar uma lista de Personagens', function () {

        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        });
    })

    it('Deve buscar personagem por nome', function () {
        cy.searchCharacters('Logan').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Wolverine')
            expect(response.body[0].team).to.eql(['X-Men'])
            expect(response.body[0].active).to.eql(true)
        });
    })
})

describe('GET /characters/id', function () {

    // before(function () {
    //     //cy.back2ThePast();
    //     cy.setToken();
    // })

    const tonyStark = {
        name: 'Tony Stark',
        alias: 'Homem de Ferro',
        team: [
            'Vingadores'
        ],
        active: true
    }

    context('Quando tenho um personagem cadastrado', function () {

        before(function () {

            cy.postCharacter(tonyStark).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('Deve buscar o personagem pelo id', function () {

            const id = Cypress.env('characterId')

            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Homem de Ferro')
                expect(response.body.team).to.eql(['Vingadores'])
                expect(response.body.active).to.eql(true)
            })
        })

        it('Deve retornar 404 ao buscar por id não cadastrado', function () {

            const id = '62c36e15085febc6d6087684' //Cypress.env('characterId')

            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })
})