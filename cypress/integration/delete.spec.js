describe('DELETE /characters/id', function () {

    before(function () {
        cy.back2ThePast();
        cy.setToken();
    })

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