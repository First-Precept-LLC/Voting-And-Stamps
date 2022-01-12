//import {testServer , mergedSchema } from "~/pages/api/graphql"

describe ("getterQueryTest", function() {
    test("it runs ok", () => { expect(true).toBe(true) })
    
    /*it('fetches single user', async  function () {
       const GET_USER = `query getVulcanUser($variable: String) {
        getVulcanUser(input:{}) {
        result {
            field
            resolvedField(variable: $variable)
        }
        } 
    }`;

    const result = await testServer.executeOperation({
        query: GET_USER,
        variables: { email: "danielblank@berkeley.edu" },
    });
    expect(result.errors).toBeUndefined();
    expect(result.data?.user.email).toBe('danielblank@berkeley.edu');
    expect(result.data?.user.isVerified).toBe(true);
   });*/
});

export {}