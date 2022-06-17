import validarCharacter from '../utils/constantes/constantes.js'
describe('Validar campos obrigatórios dos Personagens', function () {
    before(function () {
        cy.back2ThePast()
        cy.setToken()
    })

    validarCharacter.forEach(function (validarCharacter) {
        it('Campos obrigatórios', function () {
            cy.postCharacter(validarCharacter.payload)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Bad Request')
                    expect(response.body.validation.body.message).to.eql(validarCharacter.expected_message)
                })
        })
    })
})