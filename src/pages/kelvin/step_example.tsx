import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'


const StepExample = (props) => {

  const CREATE_STEP = gql`
  mutation createStep($name: String!, $parentProcessTemplate: String!, $estimatedDuration: Float!, $description: String!) {
    createStep(input: {data: {name: $name, parentProcessTemplate: $parentProcessTemplate, estimatedDuration: $estimatedDuration, description: $description}}) {
      data {_id, name }
    }
  }`;

  const PROCESS_TEMPLATE_QUERY = gql`
    query processTemplate($nameFilter: String!) {
        processTemplate(input: {filter: {name: {_in: [$nameFilter]}}}) {
          result {_id}
        }
    }`;

  const GET_STEP = gql`
    query step($id: String!) {
      step(input: {id: $id}) {
        result {name}
      }
  }`;
  

  let example_filter = {nameFilter: "An Example Process Template"}
  const {loading: queryLoading, data: queryData, error: queryError} = useQuery(
    PROCESS_TEMPLATE_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      variables: example_filter
    }
  )


  let example_vars = {
    "name": "An Example Step",
    "parentProcessTemplate": queryData ? queryData["processTemplate"]["result"]["_id"] : "",
    "estimatedDuration": 0,
    "description": "A step to use as an example.",
  };

  let [createExample, {loading, data, error}] = useMutation(
    CREATE_STEP,
    {
      variables: example_vars,
       
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  let example_id = {id: ""}
  const {loading: stepLoading, data: stepData, error: stepError, refetch} = useQuery(
    GET_STEP,
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
            }}>Create an example step!</button>
            <button onClick={
              
              () => {
                refetch({id: data["createStep"]["data"]["_id"]});
              }
            }> Get the new step's name!</button>
            Step name: {stepData ? stepData["step"]["result"]["name"] : ""}
        </div>
  }



}

export default StepExample;