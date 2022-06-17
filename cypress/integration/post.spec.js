describe('POST /characters', function () {

  before(function () {

    cy.back2ThePast();
    cy.setToken();

  })

  it('Cadastrar um personagem', function () {
    const character = {

      name: 'Wanda Maximoff',
      alias: 'Feiticeira Escarlate',
      team: ['Vingadores'],
      active: true
    }

    cy.api({
      method: 'POST',
      url: '/characters',
      body: character,
      headers: {
        Authorization: Cypress.env('token')
      },

      failOnStatusCode: false

    }).then(function (response) {
      expect(response.status).to.eql(201)
      cy.log(response.body.character_id)
      expect(response.body.character_id.length).to.eql(24)
    })
  })

  context.only('Quando o personagem já estiver cadastrado', function () {
    const character = {
      name: 'Pietro Mximoff',
      alias: 'Mercurio',
      team: [
        'Vingadores',
        'Irmandade de Mutantes'
      ],
      active: true
    }

    before(function () {
      cy.api({
        method: 'POST',
        url: '/characters',
        body: character,
        headers: {
          Authorization: Cypress.env('token')
        },

        failOnStatusCode: false

      }).then(function (response) {
        expect(response.status).to.eql(201)

      })
    })

    it('Não deve cadastrar duplicado', function () {
      cy.api({
        method: 'POST',
        url: '/characters',
        body: character,
        headers: {
          Authorization: Cypress.env('token')
        },

        failOnStatusCode: false

      }).then(function (response) {
        expect(response.status).to.eql(400)
        expect(response.body.error).to.eql('Duplicate character')

      })
    })

  })

})

