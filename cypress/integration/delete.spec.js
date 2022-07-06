describe('DELETE /characters/id', function () {

    // before(function () {
    //     //cy.back2ThePast();
    //     cy.setToken();
    // })

    const tochaHumana = {
        name: 'Jhonny Storm',
        alias: 'Tocha Humana',
        team: [
            'Quarteto Fantastico'
        ],
        active: true
    }

    context('Quando tenho um personagem cadastrado', function () {

        before(function () {

            cy.postCharacter(tochaHumana).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('Deve remover o personagem pelo id', function () {

            const id = Cypress.env('characterId')

            cy.deleteCharacterById(id).then(function (response) {
                expect(response.status).to.eql(204)
                // expect(response.body.alias).to.eql('Tocha Humana')
                // expect(response.body.team).to.eql(['Quarteto Fantastico'])
                // expect(response.body.active).to.eql(true)
            })
        })

        after(function () {

            const id = Cypress.env('characterId')

            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })

        })

        it('Deve retornar 404 ao remover por id não cadastrado', function () {

            const id = '62c36e15085febc6d6087684' //Cypress.env('characterId')

            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })
})