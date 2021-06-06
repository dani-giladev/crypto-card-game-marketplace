import { Injectable } from '@angular/core';

import Web3 from "web3";
import { Transaction } from "ethereumjs-tx";
const contractABI = require ('contracts/build/contracts/CCGMarketplace.json');

@Injectable({
  providedIn: 'root'
})
export class NodeService {
    
    web3;
    //chain = 'ganache';
    chain = 'ropsten';
    transactionOnCourse = false;
    contractAddress;
    contract = null;

    constructor() {
        this.web3 = new Web3(
            new Web3.providers.HttpProvider(
                this.chain == 'ropsten'?
                    "https://ropsten.infura.io/v3/d09825f256ae4705a74fdee006040903":
                    'http://localhost:7545'
            )
        );

        //console.log("contractABI", contractABI);
        if (this.chain == 'ganache')
            this.contractAddress = contractABI.networks[5777].address;
        else
            this.contractAddress = "0xd0BB916f0c495b96Ff25e049cFfbd5aD72196327";
        console.log('contract address', this.contractAddress);

        try {
            this.contract = new this.web3.eth.Contract(
              contractABI.abi,
              this.contractAddress
            );
            console.log('contract address confirmed', this.contract.options.address);
        } catch (error) {
            console.log('contract error', error);
        }    
    }

    async sendTransaction(from, to, value, data, privateKey) {
        console.log("sendTransaction", from, to, data, privateKey);
        return new Promise<void>(async (resolve, reject) => {
            if (this.transactionOnCourse)
                reject("Por favor, espera a que la última transacción haya finalizado")
            else {
                var rawData = {
                    from: from,
                    to: to,
                    value: this.web3.utils.toHex(value),
                    gasPrice: this.web3.utils.toHex(10000000000),
                    gasLimit: this.web3.utils.toHex(2000000),
                    nonce: await this.web3.eth.getTransactionCount(from),
                    data: data
                };
                
                console.log("sendTransaction rawData", rawData);

                var transaction = new Transaction(rawData, this.chain == 'ropsten'?{ chain: "ropsten" }:{});

                this.transactionOnCourse = true;
                transaction.sign(privateKey);

                var serialized = "0x" + transaction.serialize().toString("hex");
                this.web3.eth.sendSignedTransaction(serialized)
                    .on('transactionHash', function(hash){
                        console.log("hash: " + hash);
                    })
                    .then(receipt => {
                        console.log(receipt);
                        this.transactionOnCourse = false;
                        resolve();
                    }, error => {
                        console.log("error", error);
                        this.transactionOnCourse = false;
                        reject(error);
                    });      
            }
        });
    }

    getTransaction(hash) {
        var getTransaction = new Promise((resolve, reject) =>
            setTimeout(() => {
              this.web3.eth.getTransaction(hash, (error, result) => {
                if (!error) return resolve(result);
                return reject(error);
              });
            }, 1000)
        );

        return getTransaction.then(async (receipt: any) => {
            if (receipt.blockNumber == null) {
              await this.getTransaction(hash);
            } else {
              console.log("confirmed");
          }
        });
    }

    toWei(ethers) {
        return this.web3.utils.toWei(ethers+"", 'ether')+"";
    }

    fromWei(weis) {
        return this.web3.utils.fromWei(weis+"", 'ether')+"";
    }
}
