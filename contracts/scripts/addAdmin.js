/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Web3 = require('web3');
const contractABI = require ('../build/contracts/CCGMarketplace.json');

var chain = "ganache";

var web3js = new Web3(
    new Web3.providers.HttpProvider(
        chain == 'ropsten'?
            "https://ropsten.infura.io/v3/d09825f256ae4705a74fdee006040903":
            'http://localhost:7545'
    )
);

//console.log("contractABI", contractABI);

var contractAddress = contractABI.networks[5777].address;
console.log('contract address', contractAddress);

var contract = null;

try {
    contract = new web3js.eth.Contract(
      contractABI.abi,
      contractAddress
    );
    
    //console.log('contract', contract);
    //console.log('contract address confirmed', contract.options.address);

} catch (error) {
    console.log('contract error', error);
}

var address = "0x1f5f3da7a3d826b000d07637712019f9fe196c94";

(async () => {
    var isAdmin = await contract.methods
      .isAdmin(address)
      .call({ from: address });

    console.log("this.isAdmin", isAdmin);
})();

