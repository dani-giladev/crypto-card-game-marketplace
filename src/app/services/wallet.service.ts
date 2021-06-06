import { Injectable } from '@angular/core';

import * as Mnemonic from "bitcore-mnemonic";
import { hdkey } from "ethereumjs-wallet";
import * as bip39 from "bip39";
import * as util from "ethereumjs-util";

import { NodeService } from "src/app/services/node.service";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
    initialized = false;

    address;

    privateKey;

    publicKey;

    mnemonic;

    encrypted;

    wallet;

    balance;

    isAdmin;


  constructor(
        private nodeService: NodeService
    ) {
    this.encrypted = window.localStorage.getItem("seeds");
  }

    async initWallet(seeds) {
        var mnemonic = new Mnemonic(seeds);

        var seed = await bip39.mnemonicToSeed(mnemonic.toString());

        var path = "m/44'/60'/0'/0/0";

        var wallet = hdkey
          .fromMasterSeed(seed)
          .derivePath(path)
          .getWallet();

        this.privateKey = wallet.getPrivateKey();
        this.publicKey = util.privateToPublic(this.privateKey);
        this.address = "0x" + util.pubToAddress(this.publicKey).toString("hex");

        this.wallet = {
          address: this.address,
          publicKey: this.publicKey,
          privateKey: this.privateKey,
          mnemonic: this.mnemonic
        };

        var privateKeyAddress = this.privateKey.toString('hex');
        console.log("privateKeyAddress", privateKeyAddress);
       
        this.isAdmin = await this.nodeService.contract.methods
          .isAdmin(this.address)
          .call({ from: this.address });
          
        this.initialized = true;
        
        return this.wallet;
    }

    getWallet() {
        return this.wallet;
    }

    getAddress() {
        return this.address;
    }

    async getBalance() {
        if (!this.address) return 0;
        this.balance = await this.nodeService.web3.eth.getBalance(this.address).then(this.nodeService.web3.utils.fromWei);
        return this.balance;
    }
}
