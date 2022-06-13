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

    cy.request({
      method: 'POST',
      url: '/characters',
      body: character,
      headers: {
        Authorization: Cypress.env('token')
      }
    }).then(function (response) {
      expect(response.status).to.eql(201)
    })
  })
})

