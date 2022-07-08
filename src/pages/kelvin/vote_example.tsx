import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'

import { StampsModule } from '../api/graphql';

const VoteExample = (props) => {

  const stamps = new StampsModule();

   //TODO: what fields do we want out of these queries?

  const GET_VOTE = gql`
  query uservote($user: String!, $contentId: String!, $value: String!) {
    uservote(input: {filter: {user: {_eq: $user}}, {target: {_eq: $contentId}}, {graph: {_eq: $value}}}) {
      result {_id} 
    }
  }`;

 

  const GET_VOTES_BY_CONTENT = gql`
  query uservotes($contentId: String!, $value: String!) {
    uservotes(input: {filter: {target: {_eq: $contentId}}, {graph: {_eq: $value}}}) {
      result {_votecount}
    }
  }`;



  let example_vars_singular = {user: "alice_id", contentId: "61e61d41b2fe0cc79b78ed0c", value: "Test"};
  let example_vars_plural = {contentId: "61e61d41b2fe0cc79b78ed0c", value: "Test"}
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
          {singularError ? singularError.graphQLErrors[0].message : pluralError?.graphQLErrors[0].message}
      </div>
  } else {
      return <div>
            <button onClick={() => {
                stamps.update_vote("stamp", "61b7d95a8e7c07eb90d8a8ce", "danielblank@berkeley.edu", "bob_id", "61e61d41b2fe0cc79b78ed0c", "TestType", "test", false, false);
              }}>Upvote a piece of test content!</button>
            <button onClick={() => {
                stamps.update_vote("stamp", "61b7d95a8e7c07eb90d8a8ce", "danielblank@berkeley.edu", "bob_id", "61e61d41b2fe0cc79b78ed0c", "TestType", "test", true, false);
              }}>Downvote a piece of test content!</button>
            <button onClick={
              
              () => {
                console.log("Here's the data!");
                pluralRefetch();
                console.log(pluralData);
              }
            }> Get the test content's vote count!</button>
            Votecount: {
              getVoteTotal(pluralData["uservotes"]["results"])
            }
        </div>
  }



}

export default VoteExample;