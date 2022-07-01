import * as nearAPI from "near-api-js";

const {connect, keyStores} = nearAPI;

const keyStore = new keyStores.BrowserLocalStorageKeyStore(); //TODO: get a different key storage?


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
