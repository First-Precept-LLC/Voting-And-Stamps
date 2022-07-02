import * as nearAPI from "near-api-js";

import { StampsModule } from "~/pages/api/graphql";

import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'


const {connect, keyStores} = nearAPI;

const keyStore = new keyStores.BrowserLocalStorageKeyStore(); //TODO: get a different key storage?


let SAMPLE_VALUE = "Life" //TODO: change this

const config = {
    networkId: "testnet",
    keyStore,
    headers: {}, 
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
};

const near = await connect(config);

let account : nearAPI.Account = new nearAPI.Account(near.connection, "dblank.near"); //TODO: What account should we use here?

const contract = new nearAPI.Contract(
    account, // the account object that is connecting
    "dblank.testnet",
    {
      // name of contract you're connecting to
      viewMethods: ["getStamps"], // view methods do not change state but usually return a value
      changeMethods: ["fullOverride"], // change methods modify state
    }
  );


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


