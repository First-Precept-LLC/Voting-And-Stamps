import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'


const ProjExample = (props) => {

  const CREATE_PROJ = gql`
  mutation createProj($name: String!, $parent: String!) {
    createProj(input: {data: {name: $name, parent: $parent}}) {
      data {_id, name }
    }
  }`;

  const ORG_QUERY = gql`
    query org($nameFilter: String!) {
        org(input: {filter: {name: {_in: [$nameFilter]}}}) {
          result {_id}
        }
    }`;

  

  let example_filter = {nameFilter: "An Example"}
  const {loading: queryLoading, data: queryData, error: queryError, refetch} = useQuery(
    ORG_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      variables: example_filter
    }
  )

  console.log(queryData);

  let example_vars = {
    "name": "An Example Project",
    "parent": queryData ? queryData["org"]["result"]["_id"] : ""
};

  let [createExample, {loading, data, error}] = useMutation(
    CREATE_PROJ,
    {
       
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );



  if(loading) {
    return <div>
      Loading...
    </div>
  }
  if (error) {
      return <div>
          {error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.message}
      </div>
  } else {
      return <div>
            <button onClick={() => {
              createExample({variables: example_vars});
              console.log("Here's the data!");
              console.log(data);
            }}>Create an example project!</button>
            Project name: {data ? data["createProj"]["data"]["name"] : ""}
        </div>
  }



}

export default ProjExample;