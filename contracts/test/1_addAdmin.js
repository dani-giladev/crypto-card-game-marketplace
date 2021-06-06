var CCGMarketplace = artifacts.require("./CCGMarketplace.sol");
var app;

 // Existing contract
var contractABI = require ('../build/contracts/CCGMarketplace.json');
var contractAddress = contractABI.networks[5777].address;
//var contractAddress = '0x98324f7065F88272F99a3e4077A1707E02D2C187';
console.log('contract address', contractAddress);

function getExistentContract() {
  return CCGMarketplace.at(contractAddress);
}

contract("CCGMarketplace", accounts => {
	before(async() => {
            //await CCGMarketplace.deployed()
              //.then(function(instance){ app = instance; });

            await getExistentContract().then((instance) => {
                //console.log("instance", instance);
                app = instance;
            });
	});

	it('Add admin',async() => {

            console.log("Add admin to", accounts[0]);

            await app.addAdmin(accounts[0], { from: accounts[0] })
                    .then(function(receipt){
                            // console.log(receipt);
                    });
            var isAdmin = await app.isAdmin(accounts[0]);
            console.log("isAdmin", isAdmin);
            var isNotAdmin = await app.isAdmin(accounts[1]);
            console.log("isAdmin2", isNotAdmin);
            assert(isAdmin && !isNotAdmin);
	});

});
