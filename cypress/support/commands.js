Cypress.Commands.add('setToken', function () {
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            email: 'jacsonmedeiros@gmail.com',
            password: 'qa-cademy'
        },

        failOnStatusCode: false

    }).then(function (response) {
        expect(response.status).to.eql(200);
        //cy.log(response.body.token);
        Cypress.env('token', response.body.token);

    })
})

Cypress.Commands.add('back2ThePast', function () {
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/629813936791aa00161c9b5c',

        failOnStatusCode: false

    }).then(function (response) {
        expect(response.status).to.eql(200);
        //cy.log(response.body.message)
    })
})

//POST / requisiçao que realiza o teste no cadastro de personagens
Cypress.Commands.add('postCharacter', function (payLoad) {
    cy.api({
        method: 'POST',
        url: '/characters',
        body: payLoad,
        headers: {
            Authorization: Cypress.env('token')
        },

        failOnStatusCode: false

    }).then(function (response) {
        return response
    })
})


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
