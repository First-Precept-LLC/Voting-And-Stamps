/// <reference types="cypress" />

context('Network Requests', () => {
    it('cy.request() - verify response using BDD syntax', () => {
        cy.request('localhost:3000/api/graphql')
        .then((response) => {
        // https://on.cypress.io/assertions
        expect(response).property('status').to.equal(200)
        expect(response).property('body').to.have.length(500)
        expect(response).to.include.keys('headers', 'duration')
        })
    })
})