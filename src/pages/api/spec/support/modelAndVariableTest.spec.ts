import {testServer , mergedSchema } from "~/pages/api/graphql"

describe ("getterQueryTest", function() {
    it('uses two simple variables', async  function () {
       const SAVE_VARIABLE = `query saveVariable($user: String, $proposalId: String, $name: String, $value: String) {
        saveVariable(input:{}) {
        result {
            field
            resolvedField(variable: $variable)
        }
        } 
    }`;

    const CALCULATE_RESULT = `query calculateResult($user: String, $proposalId: String, $expression: String, $collection: String) {
        calculateResult(input:{}) {
        result {
            field
            resolvedField(variable: $variable)
        }
        } 
    }`

    const GET_MODEL = `query getModel($user: String, $proposalId: String, $collection: String) {
        getModel(input:{}) {
        result {
            field
            resolvedField(variable: $variable)
        }
        } 
    }`

    await testServer.executeOperation({
        query: SAVE_VARIABLE,
        variables: { user: "test", proposalId: "test_proposal", name: "one", value: "1" }
    });

    await testServer.executeOperation({
        query: SAVE_VARIABLE,
        variables: { user: "test", proposalId: "test_proposal", name: "two", value: "2" }
    });

    await testServer.executeOperation({
        query: CALCULATE_RESULT,
        variables: { user: "test", proposalId: "test_proposal", expression: "=one + two", collection: "time" }
    });

    const result = await testServer.executeOperation({
        query: GET_MODEL,
        variables: {user: "test", proposalId: "test_proposal", collection: "time"}

    });
    expect(result.errors).toBeUndefined();
    expect(result.data?.user.email).toBe('danielblank@berkeley.edu');
    expect(result.data?.user.isVerified).toBe(true);
   });
});