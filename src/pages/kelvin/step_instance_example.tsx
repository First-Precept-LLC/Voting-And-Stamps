import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'


const StepInstanceExample = (props) => {

  const CREATE_STEP_INSTANCE = gql`
  mutation createStepInstance($name: String!, $parentProcess: String!, $parentStep: String!, $description: String!, $status: String!, $dueDate: Date!) {
    createStepInstance(input: {data: {name: $name, parentProcess: $parentProcess, parentStep: $parentStep, description: $description, status: $status, dueDate: $dueDate}}) {
      data {_id, name }
    }
  }`;

  const PROCESS_QUERY = gql`
    query process($nameFilter: String!) {
        process(input: {filter: {name: {_in: [$nameFilter]}}}) {
          result {_id}
        }
    }`;

  const STEP_QUERY = gql`
  query step($nameFilter: String!) {
      step(input: {filter: {name: {_in: [$nameFilter]}}}) {
        result {_id}
      }
  }`;

  const GET_STEP_INSTANCE = gql`
    query stepInstance($id: String!) {
      stepInstance(input: {id: $id}) {
        result {name}
      }
  }`;
  

  let example_filter = {nameFilter: "An Example Process"};
  let example_step_filter = {nameFilter: "An Example Step"};
  const {loading: queryLoading, data: queryData, error: queryError} = useQuery(
    PROCESS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      variables: example_filter
    }
  );

  const {loading: stepLoading, data: stepData, error: stepError} = useQuery(
    STEP_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      variables: example_step_filter
    }
  );


  let example_vars = {
    "name": "An Example Step Instance",
    "parentProcess": queryData ? queryData["process"]["result"]["_id"] : "",
    "parentStep": stepData ? stepData["step"]["result"]["_id"] : "",
    "description": "This is an example step instance",
    "status": "Complete",
    "dueDate": Date.now()
  };

  let [createExample, {loading, data, error}] = useMutation(
    CREATE_STEP_INSTANCE,
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
    GET_STEP_INSTANCE,
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
    console.log(processData);
      return <div>
            <button onClick={() => {
              createExample({variables: example_vars});
            }}>Create an example step instance!</button>
            <button onClick={
              
              () => {
                refetch({id: data["createStepInstance"]["data"]["_id"]});
              }
            }> Get the new step instance's name!</button>
            Step Instance name: {processData ? processData["stepInstance"]["result"]["name"] : ""}
        </div>
  }



}

export default StepInstanceExample;