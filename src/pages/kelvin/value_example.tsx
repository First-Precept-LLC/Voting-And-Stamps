import { createAndAddValue } from "../api/value-utils";
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'



const GET_ORG = gql`
query org($id: String!) {
  org(input: {id: $id}) {
    result {valuesList}
  }
}`;

const ValueExample = (props) => {

    createAndAddValue("62a218eb6d65e9e217a1777e", "A Value Of Some Kind", "Some description", "");

    const {loading: queryLoading, data: queryData, error: queryError, refetch} = useQuery(
        GET_ORG,
        {
          notifyOnNetworkStatusChange: true,
          variables: {id: "62a218eb6d65e9e217a1777e"},
          onCompleted: (data) => console.log(data)
        }
    );

    if (queryData) {
      return <div> {queryData["org"]["result"]["valuesList"]}</div>
    } else {
        return <div> Loading!</div>
    }



}

export default ValueExample;