import { Injectable } from '@angular/core';

import { GlobalService } from "src/app/services/global.service";
import { NodeService } from "src/app/services/node.service";
import { WalletService } from "src/app/services/wallet.service";

@Injectable({
  providedIn: 'root'
})
export class CardService {

    constructor(
        private globalService: GlobalService,
        private nodeService: NodeService,
        private walletService: WalletService
    ) {

    }

    mint(name, description, color, type, mana, attack, guard, price, imgHash) {
        let data = this.nodeService.contract.methods.mint(name, description, color, type, mana, attack, guard, this.nodeService.toWei(price), imgHash).encodeABI();
        return this.nodeService.sendTransaction(
            this.walletService.address,
            this.nodeService.contractAddress,
            0,
            data,
            this.walletService.privateKey
        ); 
    }
    
    async getCardsOnSale() {
        var tokens = await this.nodeService.contract.methods
            .getTokensIdOnSale()
            .call({ from: this.walletService.address });
        return this.getCards(tokens);
    }
    
    async getMyCards() {
        var tokens = await this.nodeService.contract.methods
            .getMyTokensId()
            .call({ from: this.walletService.address });
        return this.getCards(tokens);
    }

    getCards(tokens) {
        return new Promise(async (resolve, reject) => {
            if (tokens.length === 0)
                resolve([]);
            else {
                var batch = new this.nodeService.web3.BatchRequest();
                var batchResponses = [];
                var cards = [];

                for ( var i = 0; i < tokens.length; i++) {
                    ((i) => {
                        var tokenId = tokens[i];
                        //console.log("tokenId", tokenId);
                        batch.add(
                            this.nodeService.contract.methods
                                .getToken(tokenId)
                                .call.request({ from: this.walletService.address }, (error, response) => {
                                    if (error) console.log("error", error);
                                    //console.log("response", response);
                                    batchResponses.push(response);
                                    if (!error) {
                                        cards.push({
                                            tokenId: tokens[i],
                                            name: response[0],
                                            description: response[1],
                                            color: response[2],
                                            type: response[3],
                                            mana: response[4],
                                            attack: response[5],
                                            guard: response[6],
                                            price: this.nodeService.fromWei(response[7]),
                                            imgHash: response[8],
                                            available: response[9],
                                            onSale: response[10]
                                        });
                                    }
                                    if (tokens.length === batchResponses.length) {
                                        resolve(cards);
                                    }
                                })
                        );
                    })(i);
                }

                batch.execute();                 
            }           
        });
    }

    setAvailable(tokenId, value) {
        let data = this.nodeService.contract.methods.setAvailable(tokenId, value).encodeABI();
        return this.nodeService.sendTransaction(
            this.walletService.address,
            this.nodeService.contractAddress,
            0,
            data,
            this.walletService.privateKey
        ); 
    }

    buy(tokenId, price) {
        let data = this.nodeService.contract.methods.buyToken(tokenId).encodeABI();
        return this.nodeService.sendTransaction(
            this.walletService.address,
            this.nodeService.contractAddress,
            this.nodeService.toWei(price),
            data,
            this.walletService.privateKey
        ); 
    }

    transfer(tokenId, address) {
        let data = this.nodeService.contract.methods.transfer(address, tokenId).encodeABI();
        return this.nodeService.sendTransaction(
            this.walletService.address,
            this.nodeService.contractAddress,
            0,
            data,
            this.walletService.privateKey
        ); 
    }

    putOnSale(tokenId, price, onSale) {
        let data = this.nodeService.contract.methods.setTokenOnSale(tokenId, this.nodeService.toWei(price), onSale).encodeABI();
        return this.nodeService.sendTransaction(
            this.walletService.address,
            this.nodeService.contractAddress,
            0,
            data,
            this.walletService.privateKey
        ); 
    }

}
