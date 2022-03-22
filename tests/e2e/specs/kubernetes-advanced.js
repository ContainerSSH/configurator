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

    it('Make sure Kubernetes is the selected backend', () => {
        cy
            .get('.v-stepper__content')
            .eq(3)
            .contains( 'Kubernetes')
            .click()
    })

    it('Configure backend (Kubernetes)', () => {
        cy
            .contains('Server name')
            .scrollIntoView()
            .click()
            .focused()
            .clear()
            .type('my.kubernetes.default.svc')
        cy
            .contains('Host')
            .scrollIntoView()
            .click()
            .focused()
            .clear()
            .type('[::1]')
        cy
            .contains('API Endpoint')
            .scrollIntoView()
            .click()
            .focused()
            .clear()
            .type('/custom-endpoint')
        cy
            .contains('Certificate')
            .click()
        cy
            .contains('Container guest image')
            .scrollIntoView()
            .click()
            .focused()
            .clear()
            .type('containerssh/containerssh-custom-kubernetes-guest-image')
    })

    it('Click to Continue button in Backend step', () => {
        cy
            .get('.v-stepper__content')
            .eq(3)
            .contains( 'Continue')
            .click()
    })

    it('Make sure the generated configuration is correct (Kubernetes)', () => {
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
            .should('contain.value', 'kubernetes:')
    })

    it('Check customizations', () => {
        cy
            .get('.v-stepper__content')
            .eq(4)
            .contains( 'config.yaml')
            .click()
            .focused()
            .should('contain.value', 'my.kubernetes.default.svc')
            .should('contain.value', '[::1]')
            .should('contain.value', 'cacertFile:')
            .should('contain.value', 'certFile:')
            .should('contain.value', 'keyFile:')
            .should('contain.value', '/custom-endpoint')  // certificate
            .should('contain.value', 'containerssh/containerssh-custom-kubernetes-guest-image')  // certificate
    })

});