/// <reference types="cypress" />

context('Network Requests', () => {
    it('cy.request() - verify response using BDD syntax', () => {
        cy.visit("/");
        cy.findByText(/login/i).click();
        // 2. can login
        cy.findByLabelText(/email/i).type("danielblank@berkeley.edu");
        // if you have changed ADMIN_INITIAL_PASSWORD in .env.development, please add the new
        // value in your local .env.development.local (it's safe, it's not tracked by git)
        // this is necessary for this test to pass
        cy.findByLabelText(/password/i).type("vulcan_is_cool");
        cy.findByRole("button").click();
        cy.request("POST", 'http://localhost:3000/api/graphql', {query: `mutation {
            createChat(input: {
              data: {
                subject: "61e61d41sb2fe0cc79b78ed0c"
                isBase: true
                description: "All your base are belong to us."
                creator: "CATS"
                chatId: "test1"
              }
            }){data {description}}
          }`})
        .then((response) => {
        // https://on.cypress.io/assertions
        expect(response).property('status').to.equal(200)
        expect(response).property('body').to.have.length(500)
        expect(response).to.include.keys('headers', 'duration')
        })
    })
})