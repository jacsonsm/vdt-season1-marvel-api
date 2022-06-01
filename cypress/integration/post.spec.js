describe('POST/characters', function () {

  before(function () {
    cy.request({
      method: 'POST',
      url: '/sessions',
      body: {
        email: 'jacsonmedeiros@gmail.com',
        password: 'qa-cademy'
      }
    }).then(function (response) {
      expect(response.status).to.eql(200)
      cy.log(response.body.token);
      Cypress.env('token', response.body.token)
    })
  })

  it('Cadastrar um personagem', function () {
    const character = {

      name: 'Charles Xavier',
      alias: 'Professor Xavier',
      team: ['X-Men, Illuminates'],
      active: true
    }
    cy.request({
      method: 'POST',
      url: '/characters',
      body: character,
      Headers: {
        Autorization: Cypress.env('token')
      }
    }).then(function (response) {
      expect(response.status).to.eql(201)
    });
  });
})

