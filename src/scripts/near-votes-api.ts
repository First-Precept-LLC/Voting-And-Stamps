
const Contract = require('web3-eth-contract');

// set provider for all later instances to use
Contract.setProvider('ws://localhost:8546');

const {StampsModule } = require("~/pages/api/graphql");

const { gql, useMutation, useQuery, NetworkStatus } = require('@apollo/client');

const fs = require('fs');


let rawJson = fs.readFileSync("KelvinToken.json");


const jsonInterface = JSON.parse(rawJson); //TODO: read in massive JSON interface
let address = 0x32eD5c890e0Cb37694fA9f06784b6371D7B8314d;

let contract = new Contract(jsonInterface, address);


let SAMPLE_VALUE = "Life" //TODO: change this



let stamps = new StampsModule();

let getUserStamps = async (user, graph) => {
    await stamps.init();
    let resultData = await stamps.get_user_stamps(user, graph);
    return resultData;
}

const GET_USERS = gql`
  query vulcanUsers() {
    vulcanUsers(input: {}) {
      results {_id}
    }
  }`;

  const {loading: queryLoading, data: queryData, error: queryError, refetch} = useQuery(
    GET_USERS,
    {
      notifyOnNetworkStatusChange: true
    }
  )

  let userIds = [] as any;
  let stampCounts = [] as any;

  for(let user in queryData["users"]["results"]) {
      userIds.push(user);
      stampCounts.push(getUserStamps(user, SAMPLE_VALUE));

  }

  contract.methods.fullOverride(userIds, stampCounts);

