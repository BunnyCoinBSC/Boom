import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3'  
import axios from 'axios';
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

const ABI = [
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
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
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
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
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
				"name": "_mintAmount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_state",
				"type": "bool"
			}
		],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseExtension",
				"type": "string"
			}
		],
		"name": "setBaseExtension",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseURI",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newmaxMintAmount",
				"type": "uint256"
			}
		],
		"name": "setmaxMintAmount",
		"outputs": [],
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
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
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
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
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
		"name": "baseExtension",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cost",
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
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxMintAmount",
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
		"name": "maxSupply",
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
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
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
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
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
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "walletOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
var account = null;
var contract = null;

const data =  [
	{
	id: "1",
	img: "https://ipfs.io/ipfs/QmP3kZxFyheEd6pWD7JHK3g8JaUEM2749DhdPPr5PVzAfp/1.png",
	title: "CHIMPSTRONAUT NFT",
	buttontext: "Buy Now"
	},
	{
		id: "2",
		img: "https://ipfs.io/ipfs/QmP3kZxFyheEd6pWD7JHK3g8JaUEM2749DhdPPr5PVzAfp/2.png",
		title: "CHIMPSTRONAUT NFT",
		buttontext: "Buy Now"
		},
		{
			id: "3",
			img: "https://ipfs.io/ipfs/QmP3kZxFyheEd6pWD7JHK3g8JaUEM2749DhdPPr5PVzAfp/3.png",
			title: "CHIMPSTRONAUT NFT",
			buttontext: "Buy Now"
			},
			{
				id: "4",
				img: "https://ipfs.io/ipfs/QmP3kZxFyheEd6pWD7JHK3g8JaUEM2749DhdPPr5PVzAfp/4.png",
				title: "CHIMPSTRONAUT NFT",
				buttontext: "Buy Now"
				},
]

const apikey = "TIZF8JJH1T1UACKPI5F6M4ZZXBATBSQJVX";  
const ADDRESS = "0x9CeB9CcC29Ef53870F34084411F7c7A7d88F99d8";
const endpoint = "https://api-ropsten.etherscan.io/api"

async function connectwallet() {
    if (window.ethereum) {
      var web3 = new Web3(window.ethereum);
      await window.ethereum.send('eth_requestAccounts');
      var accounts = await web3.eth.getAccounts();
      account = accounts[0];
      document.getElementById('wallet-address').textContent = account;
	  contract = new web3.eth.Contract(ABI, ADDRESS);
	}
}

async function mint(){  
	if (window.ethereum) {
        var _mintAmount = Number(document.querySelector("[name=amount]").value);
        var mintRate = Number(await contract.methods.cost().call())
        var totalAmount = mintRate * _mintAmount;
      contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount)})
      }
    }
  
   

class App extends Component {
	constructor() {	
		super();
		this.state = {
			balance: [],
			data: [],
		};
	}	
	
	async componentDidMount() {
		const etherscan = await axios.get(endpoint + `?module=stats&action=tokensupply&contractaddress=${ADDRESS}&apikey=${apikey}`);
		let { result } = etherscan.data;
		this.setState ({
			balance: result ,
			data: data
		});
	}
	render() {
		const {balance} = this.state;
	

  return (
	  
	 
	
    <div className="App">
      <div className='container'>
        <div className='row'>
          <form class="col-lg-5 mt-5" style={{borderRadius:"25px", boxShadow:"1px 1px 10px #000000 " }}>
            <h4> Mint portal </h4> 
            <h5> Please Connect your wallet</h5>
            <Button onClick={connectwallet} style= {{marginBottom:"5px"}}> Connect your wallet</Button>
            <div class="card" id='wallet-address' style={{MarginTop:"3px"}}>
				</div>
				<div class="card"  style={{MarginTop:"3px"}} >
              <label for="floating input">Wallet Address </label>
              <input type="number" name="amount" defaultValue="1" min="1" max="5"/>
              <label> please select the amount of NFTs to mint</label>
              <Button onClick={mint}> Mint/Buy </Button>
			  
	 			</div>
            
            
            <label> Price 0.05BNB each to mint</label>
			<h5> Tokens minted so far= {balance}/500</h5>
          </form>
		  <div className="row items mt-3">
			  {this.state.data.map((item, idx) => {
				  return (
					  <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
						  <div className="card">
							  <div className="image-over"> 
							  <img className="card-img-top" src={item.img} alt="" />
							  </div>
							  <div className="card-caption col-12 p-0">
								  <div className="card-body">
									  <h5 className="mb-0">{item.title}</h5>
									  <div className=" card-bottom d-flex justify-content-between">
										  <Button className="btn btn-bordered-white btn-smaller mt-3">
											  <i className="mr-2" />{item.buttontext}
										  </Button>
										  </div>
		  
		  </div>
		</div>
  
	  </div>
	  </div>
				  );
			  })}
			  
		  </div>
		  
        </div>
      </div>

    </div>
	
  );
};
}
<section id="main" style="display: block;" class="text-light ">

<div class="container mt-5 sugardeath">
	<nav class="navbar navbar-expand-lg navbar-dark">
		<div class="container-fluid">
			<a class="navbar-brand sugardeath" href="https://insanitywolf.com/" style="color: #be1e2d;">
				<h2>Insanity Wolf</h2>
			</a>
			<button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="navbar-collapse collapse" id="navbarColor02" style="">
				<ul class="navbar-nav me-auto">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="https://insanitywolf.com/">Home</a>
					</li>




				</ul>

				<a href="https://t.me/insanitywolfbsc" target="_blank"><i class="fa-brands fa-telegram socialIcons me-2"></i></a>
				<a href="https://twitter.com/insanitywolfbsc" target="_blank"><i class="fa-brands fa-twitter socialIcons me-2"></i></a>

				<div class="before_connect">
					<button class="btn btn-danger my-2 my-sm-0 connect_wallet_button" type="submit">Connect
						Wallet</button>
				</div>
				<div class="after_connect" style="display: none;">
					<button class="btn btn-danger my-2 my-sm-0 disconnect_wallet_button" type="submit">Disconnect
						Wallet</button>
				</div>

			</div>
		</div>
	</nav>
</div>







<div class="container mt-5" id="mint">

	<div class="row align-items-center">
		<div class="col-lg-6">
			<center>
				<img src="" loading="lazy" class="img-fluid" style="border-radius: 10px;">
			</center>



		</div>

		<div class="col-lg-6">
			<div class="row">
				<div class="col text-center">
					<h1 class="sugardeath">Mint Your Wolf</h1>
					<h4 class="sugardeath primaryCol">AND EARN INSANE REWARDS</h4>
					<p> Hold a Wolf NFT to earn 2% on each transaction, only 500 to ever exist.</p>

					<p>Maximum number of NFT's per wallet allowed is 5, the value of the NFT's will become
						highly sought after due to the passive income they provide.</p>

					<p>The more NFT's you hold the higher your return will be.</p>

					<p>Only holders of the Wolf NFT will receive rewards!</p>
				</div>
			</div>

			<center>




				<div class="before_connect">
					<button class="btn btn-danger my-2 my-sm-0  connect_wallet_button mt-4" type="submit">Connect
						Wallet</button>
				</div>
			</center>
			<div class="after_connect" style="display: none;">
				<p class="float-end"><span class="total_supply"><small class="text-muted"><i>Connect
								Wallet</i></small></span>/<span class="max_supply"><small class="text-muted"><i>Connect Wallet</i></small></span></p>
				<label for="basic-url" class="form-label"><span id="max_mint" style="text-align: left;">(Connect
						Wallet)</span></label>
				<center>
					<div class="input-group mb-3">
						<span class="input-group-text">Quantity</span>
						<input type="number" class="form-control" id="mint_qty" min="1" value="1" aria-describedby="basic-addon3">
					</div>
					<div class="row">
						<div class="col-6 text-center">
							<h5>Current Price</h5>
						</div>
						<div class="col-6 text-center">
							<h5>Current Stage</h5>
						</div>
					</div>
					<div class="row">
						<div class="col-6 text-center">
							<p id="currentPrice"><span class="text-muted">Loading...</span></p>
						</div>
						<div class="col-6 text-center">
							<p id="currStage"><span class="text-muted">Loading...</span></p>
						</div>
					</div>
					
					<h4 class="card-title">
						Total : <span id="total"><small class="text-muted"><i>Connect Wallet</i></small></span>
					</h4>
					<p style="background-color: rgba(0, 0, 0, 0.7);"><small class="text-white"><i><span id="mint_text"></span></i></small></p>
					<p style="background-color: rgba(0, 0, 0, 0.7);"><small class="text-white"><i><span id="tx_text"></span></i></small></p>
					<button class="btn btn-danger my-2 my-sm-0 mint_button" id="mint_button" type="submit">Mint</button>
				</center>
			</div>

		</div>

	</div>

</div>









<div class="container mt-5 mb-5">

	<div class="row">
		<div class="col text-center">
			<a href="https://t.me/insanitywolfbsc" target="_blank"><i class="fa-brands fa-telegram socialIcons me-2"></i></a>
			<a href="https://twitter.com/insanitywolfbsc" target="_blank"><i class="fa-brands fa-twitter socialIcons me-2"></i></a>

		</div>
	</div>
</div>
</input>
</section>

export default App;



