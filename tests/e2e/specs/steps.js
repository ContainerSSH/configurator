// https://docs.cypress.io/api/introduction/api.html

import YAML from 'yaml';

describe('Check steps', () => {
    it('Check available steps', () => {
        cy.visit('/')
        cy.contains('.v-stepper__step__step', '1')
        cy.contains('.v-stepper__step__step', '2')
        cy.contains('.v-stepper__step__step', '3')
        cy.contains('.v-stepper__step__step', '4')
        cy.contains('.v-stepper__step__step', '5')
    })

    it('Step 1: Welcome', () => {
        cy.visit('/')
        cy
            .get('.v-stepper__content')
            .eq(0)
            .contains( 'Continue')
            .click()
    })

    it('Step 2: Authentication', () => {
        cy
            .get('.v-stepper__content')
            .eq(1)
            .contains( 'Continue')
            .click()
    });

    it('Step 3: Dynamic configuration', () => {
        cy
            .get('.v-stepper__content')
            .eq(2)
            .contains( 'Continue')
            .click()
    });

    it('Step 4: Backend', () => {
        cy
            .get('.v-stepper__content')
            .eq(3)
            .contains( 'Continue')
            .click()
    });

    it('Step 5: Download', () => {
        cy
            .get('.v-stepper__content')
            .eq(4)
            .contains( 'config.yaml')
    });

    it('Checking generated config value', () => {
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
    })

    it('Verifying YAML Structure', () => {
        let content = cy.get('.v-stepper__content')
            .eq(4)
            .contains( 'config.yaml')
            .click()
            .focused()
            .invoke('val')
            .should((value) => {
                try {
                    let yaml = YAML.parse(value);
                } catch (err) {
                    throw new Error("Failed to validate YAML generated configuration: " + err.message)
                }
            });
    })

    // it('Verify config', () => {
    //     cy
    //         .readFile('test/e2e/downloads/config.yaml')
    //         .should('contain.text', 'backend:')
    // })
});