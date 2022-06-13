import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'


const ProcessExample = (props) => {

  const CREATE_PROCESS = gql`
  mutation createProcess($name: String!, $parentProcessTemplate: String!, $progress: Float!, $status: String!, $dueDate: Date!) {
    createProcess(input: {data: {name: $name, parentProcessTemplate: $parentProcessTemplate, progress: $progress, status: $status, dueDate: $dueDate}}) {
      data {_id, name }
    }
  }`;

  const PROCESS_TEMPLATE_QUERY = gql`
    query processTemplate($nameFilter: String!) {
        processTemplate(input: {filter: {name: {_in: [$nameFilter]}}}) {
          result {_id}
        }
    }`;

  const GET_PROCESS = gql`
    query process($id: String!) {
      process(input: {id: $id}) {
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
    "name": "An Example Process",
    "parentProcessTemplate": queryData ? queryData["processTemplate"]["result"]["_id"] : "",
    "progress": 0,
    "status": "Complete",
    "dueDate": Date.now()
  };

  let [createExample, {loading, data, error}] = useMutation(
    CREATE_PROCESS,
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
    GET_PROCESS,
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
            }}>Create an example process!</button>
            <button onClick={
              
              () => {
                refetch({id: data["createProcess"]["data"]["_id"]});
              }
            }> Get the new process's name!</button>
            Process name: {processData ? processData["process"]["result"]["name"] : ""}
        </div>
  }



}

export default ProcessExample;