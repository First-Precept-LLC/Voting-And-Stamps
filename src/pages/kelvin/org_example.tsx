import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'


const OrgExample = (props) => {

  const CREATE_ORG = gql`
  mutation createOrg($name: String!, $vision: String!) {
    createOrg(input: {data: {name: $name, vision: $vision}}) {
      data {_id}
    }
  }`;

  const GET_ORG = gql`
  query org($id: String!) {
    org(input: {id: $id}) {
      result {vision}
    }
  }`;

  let example_vars = {
      "name": "An Example",
      "vision": "To serve as an example"
  };

  


  let [createExample, {loading, data, error}] = useMutation(
    CREATE_ORG,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  let example_id = {id: ""}
  const {loading: queryLoading, data: queryData, error: queryError, refetch} = useQuery(
    GET_ORG,
    {
      notifyOnNetworkStatusChange: true,
      variables: example_id
    }
  )

  if(loading) {
    return <div>
      Loading...
    </div>
  }
  if (error) {
      return <div>
          {error.graphQLErrors[0].message}
      </div>
  } else {
      example_id = data ? {id: data._id} : {id: ""};
      return <div>
            <button onClick={() => {
              createExample({variables: example_vars});
              }}>Create an example org!</button>
            <button onClick={
              
              () => {
                console.log("Here's the data!");
                console.log(data);
                refetch({id: data["createOrg"]["data"]["_id"]});
                console.log(queryData);
              }
            }> Get the new org's vision!</button>
            Vision: {queryData ? queryData["org"]["result"]["vision"] : ""}
        </div>
  }



}

export default OrgExample;