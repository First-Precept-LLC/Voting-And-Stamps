
var Contract = require('web3-eth-contract');
var Eth = require('web3-eth');




import { gql, useMutation, useLazyQuery, NetworkStatus } from '@apollo/client';
import { passThroughSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

import { useEffect, useState } from "react";


const CONTRACT_ADDRESS = "0x21D5d3EE116E856fE315fFf67Edf3C318A352644";

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
 
 const GET_WALLETS = gql`
   query wallets($limit: Int) {
	 wallets(input: {limit: $limit}) {
		 results {auroraWallet, vulcanId}
	 }
   }
 `
 
 
   const [refetch, {loading: queryLoading, data: queryData, error: queryError, networkStatus}] = useLazyQuery(
	 GET_USERS,
	 {
	   variables: {limit: 9999999},
	   notifyOnNetworkStatusChange: true,
	   fetchPolicy: 'network-only'
	 }
   )
 
   const [stampsRefetch, {loading: stampsLoading, data: stampsData, error: stampsError, networkStatus: stampsStatus}] = useLazyQuery(
	 GET_STAMPS,
	 {
	   variables: {user: "61b7d95a8e7c07eb90d8a8ce", collection: SAMPLE_VALUES[0]},
	   notifyOnNetworkStatusChange: true,
	   fetchPolicy: 'network-only'
	 }
   );
 
   const [walletRefetch, {loading: walletLoading, data: walletData, error: walletError, networkStatus: walletStatus}] = useLazyQuery(
	 GET_WALLETS,
	 {
	   variables: {limit: 9999999},
	   notifyOnNetworkStatusChange: true,
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
		"name": "isWhitelisted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
	}
];

   const [userIds, setUserIds] = useState( [] as any);
   const [stampCounts, setStampCounts] = useState([] as any);
   const [complete, setComplete] = useState(false);
   const [totalUsers, setTotalUsers] = useState(0);
   const [avgStamps, setAvgStamps] = useState(0);
   const [stampsCounted, setStampsCounted] = useState(0);

   /*useEffect(() => {
	let body = async () => {
		if (walletData && walletData["wallet"] && walletData["wallet"]["result"]) {
		if(walletData["wallet"]["result"]["auroraWallet"] != "none") {
			console.log(walletData);
			userIds.push(walletData["wallet"]["result"]["auroraWallet"]);
			console.log("ids!");
			console.log(userIds);
			avgStamps = 0;
			for(let j = 0; j < SAMPLE_VALUES.length; j++) {
				console.log("iter!");
				await stampsRefetch({variables: {user: walletData["wallet"]["result"]["vulcanId"], collection: SAMPLE_VALUES[j]}});
			}
			console.log("stamps!");
			console.log(avgStamps);
			stampCounts.push(avgStamps);
			if( stampsData.length == totalUsers) {
				complete = true;
			}
		   }
		}
    };
	body();
   }, [JSON.stringify(walletData)]);*/

   useEffect(() => {
	if(stampsData) {
		setAvgStamps(avgStamps + stampsData["getUserStamps"]/SAMPLE_VALUES.length);
		console.log(stampsCounted);
		setStampsCounted(stampsCounted + 1);
		console.log("counting!");
		console.log(stampsCounted);
		
	 }
   }, [JSON.stringify(stampsData)]);
   useEffect(() => {
	if(stampsCounted == SAMPLE_VALUES.length) {
		console.log("full set of values counted!");
		setStampCounts([...stampCounts, avgStamps]);
		setStampsCounted(0);
		
	}

   }, [stampsCounted]);

   useEffect(() => {
	if(stampCounts.length == totalUsers && totalUsers != 0) {
		console.log("All counts complete!");
		setComplete(true);
	}
   }, [stampCounts.length]);
   

   useEffect(() => {
	let body = async () => {

		if(walletData) {
			Contract.setProvider('wss://testnet.aurora.dev');
            let eth = new Eth(Eth.givenProvider || 'wss://testnet.aurora.dev');
            console.log("set!");
            let address = CONTRACT_ADDRESS;
            let contract = new Contract(jsonInterface, address);
            setUserIds([] as any);
            setStampCounts([] as any);
			setTotalUsers(0);
			
			for(let i = 0; i < walletData["wallets"]["results"].length; i++) {
				let wallet = walletData["wallets"]["results"][i];
				if(wallet["auroraWallet"] != "none") {
					setTotalUsers(totalUsers + 1);
					setUserIds([...userIds, wallet["auroraWallet"]]);
				}
			}

			for(let i = 0; i < walletData["wallets"]["results"].length; i++) {
				console.log("wallet!");
				let wallet = walletData["wallets"]["results"][i];
				for(let j = 0; j < SAMPLE_VALUES.length; j++) {
					console.log("iter!");
					if(wallet["auroraWallet"] != "none") {
					   await stampsRefetch({variables: {user: wallet["vulcanId"], collection: SAMPLE_VALUES[j]}});
					}
				}
			}
	        /*window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
		    let encodedABI = contract.methods.fullOverride(userIds, stampCounts).encodeABI();
		    eth.sendTransaction({from: accounts[0], to: CONTRACT_ADDRESS, data: encodedABI});
		//contract.methods.fullOverride(userIds, stampCounts).send({from: accounts[0]});
    });*/
		}

	};
	body();

    }
   , [JSON.stringify(walletStatus)]);


   useEffect(() => {
	if(complete) { 
		Contract.setProvider('wss://testnet.aurora.dev');
        let eth = new Eth(Eth.givenProvider || 'wss://testnet.aurora.dev');
        console.log("set!");
        let address = CONTRACT_ADDRESS;
        let contract = new Contract(jsonInterface, address);
	    window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
		let encodedABI = contract.methods.fullOverride(userIds, stampCounts).encodeABI();
		eth.sendTransaction({from: accounts[0], to: CONTRACT_ADDRESS, data: encodedABI});
		setComplete(false);


      });
   }

}, [complete]);

   







 return <div>
	<button onClick={async () =>
	{
   Contract.setProvider('wss://testnet.aurora.dev');
   let eth = new Eth(Eth.givenProvider || 'wss://testnet.aurora.dev');
    let address = CONTRACT_ADDRESS;

    let contract = new Contract(jsonInterface, address);







    setUserIds([] as any);
	setStampCounts([] as any);
	walletRefetch();

 }
}>Call the contract!</button>
<button onClick={() => {
	Contract.setProvider('wss://testnet.aurora.dev');
	let address = CONTRACT_ADDRESS;
	let contract = new Contract(jsonInterface, address);
	console.log(contract.methods.getTotalStamps().call());

}}>Get some data!</button>
<button onClick={() => {
	Contract.setProvider('wss://testnet.aurora.dev');
	let address = CONTRACT_ADDRESS;
	let contract = new Contract(jsonInterface, address);
	console.log(contract.methods.isWhitelisted().call());
}}>Get some data!</button>
<button onClick={() => {
	Contract.setProvider('wss://testnet.aurora.dev');
	let eth = new Eth(Eth.givenProvider || 'wss://testnet.aurora.dev');
	let address = CONTRACT_ADDRESS;
	let contract = new Contract(jsonInterface, address);

	window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
		console.log(accounts);
		let encodedABI = contract.methods.buyTokens(100).encodeABI();
		eth.sendTransaction({from: accounts[0], to: CONTRACT_ADDRESS, data: encodedABI});
		//contract.methods.fullOverride(userIds, stampCounts).send({from: accounts[0]});
		console.log("mint?");
    });

}}>Mint some coins!</button>

<button onClick={() => {
	Contract.setProvider('wss://testnet.aurora.dev');
	let eth = new Eth(Eth.givenProvider || 'wss://testnet.aurora.dev');
	let address = CONTRACT_ADDRESS;
	let recipient = "0xfb23bA9b689D139Dd8D5f029F89698f3D1141297";
	let contract = new Contract(jsonInterface, address);

	window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
		console.log(accounts);
		let encodedABI = contract.methods.transferFrom(accounts[0], recipient, 100).encodeABI();
		eth.sendTransaction({from: accounts[0], to: CONTRACT_ADDRESS, data: encodedABI});
		//contract.methods.fullOverride(userIds, stampCounts).send({from: accounts[0]});
		console.log("transfer?");
    });

}}>Transfer some coins!</button>

</div>
;
}

export default NearUpdate;