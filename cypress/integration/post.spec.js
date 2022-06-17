describe('POST /characters', function () {

  before(function () {

    cy.back2ThePast();
    cy.setToken();
    cy.postCharacter();

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

    })

    it('Não deve cadastrar duplicado', function () {

      cy.postCharacter(character).then(function (response) {
        expect(response.status).to.eql(400)
        expect(response.body.error).to.eql('Duplicate character')

      })

    })

    context('Validação campos obrigatórios', function () {

      it('Campo name é obrigatório', function () {
        const character = {

          //name: 'Charles Francis Xavier',
          alias: 'Professor Xavier',
          team: ['x-men', 'Iluminates'],
          active: true

        };

        cy.postCharacter(character)
          .then(function (response) {
            expect(response.status).to.eql(400);
            expect(response.body.error).to.eql('Bad Request')
            expect(response.body.validation.body.message).to.eql('"name" is required');
          })
      })

      it('Campo alias é obrigatório', function () {
        const character = {

          name: 'Charles Francis Xavier',
          //alias: 'Professor Xavier',
          team: ['x-men', 'Iluminates'],
          active: true
        };

        cy.postCharacter(character)
          .then(function (response) {
            expect(response.status).to.eql(400);
            expect(response.body.error).to.eql('Bad Request')
            expect(response.body.validation.body.message).to.eql('"alias" is required');
          })
      })

      it('Campo team é obrigatório', function () {
        const character = {
          name: 'Charles Francis Xavier',
          alias: 'Professor Xavier',
          //team: ['x-men', 'Iluminates'],
          active: true
        };

        cy.postCharacter(character)
          .then(function (response) {
            expect(response.status).to.eql(400);
            expect(response.body.error).to.eql('Bad Request')
            expect(response.body.validation.body.message).to.eql('"team" is required');
          })
      })

      it('Campo active é obrigatório', function () {
        const character = {
          name: 'Charles Francis Xavier',
          alias: 'Professor Xavier',
          team: ['x-men', 'Iluminates'],
          //active: true  
        };

        cy.postCharacter(character)
          .then(function (response) {
            expect(response.status).to.eql(400);
            expect(response.body.error).to.eql('Bad Request')
            expect(response.body.validation.body.message).to.eql('"active" is required');
          })
      })

    })

  })

})



