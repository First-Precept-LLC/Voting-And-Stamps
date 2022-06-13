import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'


const ProcessTemplateExample = (props) => {

  const CREATE_PROCESS_TEMPLATE = gql`
  mutation createProcessTemplate($name: String!, $parentProject: String!, $estimatedDuration: Float!, $description: String!) {
    createProcessTemplate(input: {data: {name: $name, parentProject: $parentProject, estimatedDuration: $estimatedDuration, description: $description}}) {
      data {_id, name }
    }
  }`;

  const PROJ_QUERY = gql`
    query proj($nameFilter: String!) {
        proj(input: {filter: {name: {_in: [$nameFilter]}}}) {
          result {_id}
        }
    }`;

  const GET_PROCESS_TEMPLATE = gql`
    query processTemplate($id: String!) {
      processTemplate(input: {id: $id}) {
        result {name}
      }
  }`;
  

  let example_filter = {nameFilter: "An Example Project"}
  const {loading: queryLoading, data: queryData, error: queryError} = useQuery(
    PROJ_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      variables: example_filter
    }
  )


  let example_vars = {
    "name": "An Example Process Template",
    "parentProject": queryData ? queryData["proj"]["result"]["_id"] : "",
    "estimatedDuration": 0,
    "description": "Do Nothing"
  };

  let [createExample, {loading, data, error}] = useMutation(
    CREATE_PROCESS_TEMPLATE,
    {
      variables: example_vars,
       
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  let example_id = {id: ""}
  const {loading: processLoading, data: processData, error: processError, refetch} = useQuery(
    GET_PROCESS_TEMPLATE,
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
          {error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.message}
      </div>
  } else {
    example_id = data ? {id: data._id} : {id: ""};
      return <div>
            <button onClick={() => {
              createExample({variables: example_vars});
            }}>Create an example process template!</button>
            <button onClick={
              
              () => {
                refetch({id: data["createProcessTemplate"]["data"]["_id"]});
              }
            }> Get the new project's name!</button>
            Process template name: {processData ? processData["processTemplate"]["result"]["name"] : ""}
        </div>
  }



}

export default ProcessTemplateExample;