// https://docs.cypress.io/api/introduction/api.html

describe('Check steps', () => {

    it('Open: http://localhost:8080/', () => {
        cy.visit('http://localhost:8080/')
    })

    it('Click to Continue button in Welcome step', () => {
        cy
            .get('.v-stepper__content')
            .eq(0)
            .contains( 'Continue')
            .click()
    })


    it('Click to Continue button in Authentication step', () => {
        cy
            .get('.v-stepper__content')
            .eq(1)
            .contains( 'Continue')
            .click()
    })

    it('Click to Continue button in Dynamic configuration step', () => {
        cy
            .get('.v-stepper__content')
            .eq(2)
            .contains( 'Continue')
            .click()
    })

    it('Make sure Docker is the selected backend', () => {
        cy
            .get('.v-stepper__content')
            .eq(3)
            .contains( 'Docker')
            .click()
    })

    it('Click to Continue button in Backend step', () => {
        cy
            .get('.v-stepper__content')
            .eq(3)
            .contains( 'Continue')
            .click()
    })

    it('Make sure the generated configuration is correct (Docker)', () => {
        cy
            .get('.v-stepper__content')
            .eq(4)
            .contains( 'config.yaml')
            .click()
            .focused()
            .should('contain.value', 'ssh:')
            .should('contain.value', 'log:')
            .should('contain.value', 'auth:')
            .should('contain.value', 'backend:')
            .should('contain.value', 'docker:')
    })

});