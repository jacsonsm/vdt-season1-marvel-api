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

    cy.postCharacter(character).then(function (response) {
      expect(response.status).to.eql(201)
      cy.log(response.body.character_id)
      expect(response.body.character_id.length).to.eql(24)
    })
    //Substituido pelo codigo acima cy.postCharacter//
    // cy.api({
    //   method: 'POST',
    //   url: '/characters',
    //   body: character,
    //   headers: {
    //     Authorization: Cypress.env('token')
    //   },

    //   failOnStatusCode: false

    // }).then(function (response) {
    //   expect(response.status).to.eql(201)
    //   cy.log(response.body.character_id)
    //   expect(response.body.character_id.length).to.eql(24)
    // })
  })

  context('Quando o personagem já estiver cadastrado', function () {
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

      cy.postCharacter(character).then(function (response) {
        expect(response.status).to.eql(201)

      })

      //Codigo abaixo substituido pelo codigo acima
      // cy.api({
      //   method: 'POST',
      //   url: '/characters',
      //   body: character,
      //   headers: {
      //     Authorization: Cypress.env('token')
      //   },

      //   failOnStatusCode: false

      // }).then(function (response) {
      //   expect(response.status).to.eql(201)

      // })
    })

    it('Não deve cadastrar duplicado', function () {
      //inicio
      cy.postCharacter(character).then(function (response) {
        expect(response.status).to.eql(400)
        expect(response.body.error).to.eql('Duplicate character')

      })
      //fim

      //Codigo abaixo substituido pelo codigo acima
      // cy.api({
      //   method: 'POST',
      //   url: '/characters',
      //   body: character,
      //   headers: {
      //     Authorization: Cypress.env('token')
      //   },

      //   failOnStatusCode: false

      // }).then(function (response) {
      //   expect(response.status).to.eql(400)
      //   expect(response.body.error).to.eql('Duplicate character')

      // })
    })

  })

})



