import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'


const VoteExample = (props) => {


   //TODO: what fields do we want out of these queries?

  const GET_VOTE = gql`
  query userVote($user: String!, $contentId: String!, $value: String!) {
    userVote(input: {filter:  {user: {_eq: $user}, target: {_eq: $contentId}, graph: {_eq: $value} } }) {
      result {_id} 
    }
  }`;

 

  const GET_VOTES_BY_CONTENT = gql`
  query userVotes($contentId: String!, $value: String!) {
    userVotes(input: {filter: { target: {_eq: $contentId}, graph: {_eq: $value} } }) {
      results {votecount}
    }
  }`;


  const UPDATE_VOTE = gql`query updateVote($stampType: String!, $fromId: String!, $fromName: String!, $toId: String!, $toTarget: String!, $targetType: String!, $collection: String!, $negative: Boolean! ) {
    updateVote(stampType: $stampType, fromId: $fromId, fromName: $fromName, toId: $toId, target: $toTarget, collection: $collection, negative: $negative, targetType: $targetType)
  }
`


  let example_vars_singular = {user: "alice_id", contentId: "61e61d41b2fe0cc79b78ed0c", value: "Test"};
  let example_vars_plural = {contentId: "61e61d41b2fe0cc79b78ed0c", value: "Test"}
  let example_vars_update = {stampType: "stamp", fromId: "alice_id", fromName: "alice", toId: "bob_id", to_target: "61e61d41b2fe0cc79b78ed0c", targetType: "test", collection: "time", negative: false}
  const {loading: singularLoading, data: singularData, error: singularError, refetch: singularRefetch} = useQuery(
    GET_VOTE,
    {
      notifyOnNetworkStatusChange: true,
      variables: example_vars_singular
    }
  );

  const {loading: pluralLoading, data: pluralData, error: pluralError, refetch: pluralRefetch} = useQuery(
    GET_VOTES_BY_CONTENT,
    {
      notifyOnNetworkStatusChange: true,
      variables: example_vars_plural
    }
  );

  const {loading: updateLoading, data: updateData, error: updateError, refetch: updateRefetch} = useQuery(
    UPDATE_VOTE,
    {
      notifyOnNetworkStatusChange: true,
      variables: example_vars_update
    }
  );

  let downvote_vars = example_vars_update;
  downvote_vars.negative = true;
  const {loading: downvoteLoading, data: downvoteData, error: downvoteError, refetch: downvoteRefetch} = useQuery(
    UPDATE_VOTE,
    {
      notifyOnNetworkStatusChange: true,
      variables: downvote_vars
    }
  );

  let getVoteTotal = function(votes) {
    let total = 0;
    for(let i = 0; i < votes.length; i++) {
        total += votes[i].votecount;
    }
    return total;
  }


  if(singularLoading || pluralLoading) {
    return <div>
      Loading...
    </div>
  }
  if (singularError || pluralError) {
      return <div>
          {singularError ? singularError.networkError?.message : pluralError?.graphQLErrors[0].message}
      </div>
  } else {
      return <div>
            <button onClick={() => {
                updateRefetch();
              }}>Upvote a piece of test content!</button>
            <button onClick={() => {
                
              }}>Downvote a piece of test content!</button>
            <button onClick={
              
              () => {
                console.log("Here's the data!");
                pluralRefetch();
                console.log(pluralData);
              }
            }> Get the test content's vote count!</button>
            Votecount: {
              getVoteTotal(pluralData ? pluralData["userVotes"]["results"] : "")
            }
        </div>
  }



}

export default VoteExample;