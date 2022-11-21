
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'

let VALUE_UPDATE = gql`
mutation updateOrg($id: String!, $valuesList: [String]) {
    updateOrg(input: {id: $id, data: {valuesList: $valuesList}}) {
       data {values {title}}
     }
 }
`;

const GET_ORG = gql`
query org($id: String!) {
  org(input: {id: $id}) {
    result {valuesList}
  }
}`;

const CREATE_VALUE = gql`
mutation createValue($title: String!, $description: String!, $icon: String) {
    createValue(input: {data: {title: $title, description: $description, icon: $icon}}) {
        data { _id}
    }
}
`





export function createAndAddValue(org_id, value_title, value_desc, value_icon) {



    let valuesList = [] as any;

    let [addValue, {loading, data, error}] = useMutation(
        VALUE_UPDATE,{
          onCompleted: (data) => console.log("Data from mutation", data),
          onError: (error) => console.error("Error creating a post", error),
        }
      );


    let [createValue, {data: createData}] = useMutation(
        CREATE_VALUE,{
          onCompleted: (data) => addValue({variables: {id: org_id, valuesList: [data["createValue"]["data"]["_id"], ...valuesList]}}),
      onError: (error) => console.error("Error creating a post", error),
        }
      );

    const {loading: queryLoading, data: queryData, error: queryError, refetch} = useQuery(
        GET_ORG,
        {
          notifyOnNetworkStatusChange: true,
          variables: {id: org_id},
          onCompleted: (data => {
            valuesList = data["org"]["result"]["valuesList"];
            createValue({variables: {title: value_title, description: value_desc, icon: value_icon}});
          })
        }
    );
 

     

    
    
      
    



}