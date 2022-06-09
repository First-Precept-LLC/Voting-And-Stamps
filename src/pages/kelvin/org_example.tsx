import { gql, useMutation, NetworkStatus } from '@apollo/client'


const OrgExample = (props) => {

  const CREATE_ORG = gql`
  mutation createOrg($name: String!, $vision: String!) {
    createOrg(inputt: {data: {name: $name, vision: $vision}}) {
      data {vision}
    }
  }`;

  let example_vars = {
      "name": "An Example",
      "vision": "To serve as an example"
  };


  const [createExample, {data, error}] = useMutation(
    CREATE_ORG,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );


  

  let fetched_vision = data;
  console.log(error);
  console.log(fetched_vision);

  if (error) {
      return <div>
          {error.graphQLErrors[0].message}
      </div>
  } else {
      return <div>
            <button onClick={() => createExample({variables: example_vars})}>Create an example org!</button>
            Vision: {fetched_vision ? fetched_vision["createOrg"]["data"]["vision"] : ""}
        </div>
  }



}

export default OrgExample;