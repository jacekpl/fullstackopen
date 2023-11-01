describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
    })

    it('front page can be opened', () => {
        cy.contains('log in to application')
    })

    it('login for can be opened', function () {
        cy.contains('login').click()
    })

    it('user can login', function () {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.contains('Matti Luukkainen logged in')
    })

    it('login fails with wrong password', function () {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.notification').should('contain', 'Wrong credentials')
        cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({username: 'mluukkai', password: 'salainen'})
        })

        it('a new blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#input-title').type('a blog created by cypress')
            cy.get('#input-author').type('cypress')
            cy.get('#input-url').type('http://cypress.io')
            cy.get('#create-button').click()
        })
    })
})
