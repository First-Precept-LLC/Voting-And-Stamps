
var Contract = require('web3-eth-contract');
var Eth = require('web3-eth');




import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client';

import { useEffect } from "react";


const NearUpdate = (props) => {
	let SAMPLE_VALUES = ["Truth", "Life", "Agency"]; //TODO: change this


	const GET_STAMPS = gql`
	query getUserStamps($user: String, $collection: String) {
	  getUserStamps(user: $user, collection: $collection)
	}`
 
 const GET_USERS = gql`
   query vulcanUsers($limit : Int) {
	 vulcanUsers(input: {limit: $limit}) {
	   results {_id}
	 }
   }`;
 
 const GET_WALLET = gql`
   query wallet($id: String!) {
	 wallet(input: {filter: {vulcanId: {_in: [$id]}}}) {
		 result {auroraWallet}
	 }
   }
 `
 
 
   const {loading: queryLoading, data: queryData, error: queryError, refetch} = useQuery(
	 GET_USERS,
	 {
	   variables: {limit: 9999999},
	   notifyOnNetworkStatusChange: true
	 }
   )
 
   const {loading: stampsLoading, data: stampsData, error: stampsError, refetch: stampsRefetch} = useQuery(
	 GET_STAMPS,
	 {
	   variables: {user: "61b7d95a8e7c07eb90d8a8ce", collection: SAMPLE_VALUES[0]},
	   notifyOnNetworkStatusChange: true
	 }
   );
 
   const {loading: walletLoading, data: walletData, error: walletError, refetch: walletRefetch} = useQuery(
	 GET_WALLET,
	 {
	   variables: {id: "61b7d95a8e7c07eb90d8a8ce"},
	   notifyOnNetworkStatusChange: true
	 }
   );

   const jsonInterface = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "logString",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "LogBondingCurve",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountMinted",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalCost",
				"type": "uint256"
			}
		],
		"name": "LogMint",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountWithdrawn",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"name": "LogWithdraw",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bondingCurveDecimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokensToMint",
				"type": "uint256"
			}
		],
		"name": "buyTokens",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseApproval",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "estimateTokenAmountForPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "users",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "stampCounts",
				"type": "uint256[]"
			}
		],
		"name": "fullOverride",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "getBuyPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "getSellReward",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseApproval",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "multiple",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "poolBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountToWithdraw",
				"type": "uint256"
			}
		],
		"name": "sellTokens",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalStamps",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFromWithFee",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}];







 return <div>
	<button onClick={() =>
	{
   Contract.setProvider('wss://testnet.aurora.dev');
   let eth = new Eth(Eth.givenProvider || 'wss://testnet.aurora.dev');
   console.log("set!");
    let address = "0xeBB484E55c8F7263cdD831E587487F2ED3791e68";

    let contract = new Contract(jsonInterface, address);







    let userIds = [] as any;
    let stampCounts = [] as any;
	refetch().then(() => {
	if(queryData) {
		console.log("got data!");
		console.log(queryData);
		for(let i = 0; i < queryData["vulcanUsers"]["results"].length; i++) {
			let user = queryData["vulcanUsers"]["results"][i];
			walletRefetch({id: user._id}).then(() => {
				if (walletData && walletData["wallet"] && walletData["wallet"]["result"]) {
				if(walletData["wallet"]["result"]["auroraWallet"] != "none") {
					userIds.push(walletData["wallet"]["result"]["auroraWallet"]);
					let avgStamps = 0;
					for(let j = 0; j < SAMPLE_VALUES.length; j++) {
						stampsRefetch({user: user._id, collection: SAMPLE_VALUES[j]}).then(() => {
							if(stampsData) {
							   avgStamps += stampsData["getUserStamps"]/SAMPLE_VALUES.length;
							}
						});
				    }
					stampCounts.push(avgStamps);
				}
				}
			})

			
			
			

		}

	console.log("Calling contract!");
	window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
		console.log(accounts);
		let encodedABI = contract.methods.fullOverride(userIds, stampCounts).encodeABI();
		eth.sendTransaction({from: accounts[0], to: "0x5fe76a1CA26e1812dBdBb487454d30d4bA560110", data: encodedABI});
		//contract.methods.fullOverride(userIds, stampCounts).send({from: accounts[0]});
    });
  }
  });


 }
}>Call the contract!</button>
<button onClick={() => {
	Contract.setProvider('wss://testnet.aurora.dev');
	let address = "0xeBB484E55c8F7263cdD831E587487F2ED3791e68";
	let contract = new Contract(jsonInterface, address);
	console.log(contract.methods.getTotalStamps().call());

}}>Get some data!</button>
<button onClick={() => {
	Contract.setProvider('wss://testnet.aurora.dev');
	let eth = new Eth(Eth.givenProvider || 'wss://testnet.aurora.dev');
	let address = "0xeBB484E55c8F7263cdD831E587487F2ED3791e68";
	let contract = new Contract(jsonInterface, address);

	window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
		console.log(accounts);
		let encodedABI = contract.methods.buyTokens(1).encodeABI();
		eth.sendTransaction({from: accounts[0], to: "0x5fe76a1CA26e1812dBdBb487454d30d4bA560110", data: encodedABI});
		//contract.methods.fullOverride(userIds, stampCounts).send({from: accounts[0]});
		console.log("mint?");
    });

}}>Mint some coins!</button>

</div>
;
}

export default NearUpdate;