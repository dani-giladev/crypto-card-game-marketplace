import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Mnemonic from "bitcore-mnemonic";
import * as CryptoJS from "crypto-js";

import { GlobalService } from "src/app/services/global.service";
import { WalletService } from "src/app/services/wallet.service";
import { NodeService } from "src/app/services/node.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
    seeds='';
    password='';

    constructor(
        private globalService: GlobalService,
        private walletService: WalletService,
        private nodeService: NodeService,
        private router: Router
    ) {
        if (!this.walletService.encrypted) {
            this.seeds = new Mnemonic().phrase;
        }
    }

    ngOnInit() {}

    sendLogin() {
        
        var rememberSaveSeeds = false;
        
        if (!this.walletService.encrypted) {
            if (!this.seeds) return this.globalService.showDialog("Introduce tus semillas", null);
            try {
                if (!Mnemonic.isValid(this.seeds)) {
                    return this.globalService.showDialog("Las semillas no son válidas", null);
                }  
            } catch (error) {
                return this.globalService.showDialog("Las semillas no son válidas", null);
            }            
            if (!this.password) return this.globalService.showDialog("Introduce tu password", null);
            rememberSaveSeeds = true;
            this.walletService.encrypted = CryptoJS.AES.encrypt(
                this.seeds,
                this.password
            ).toString();
            window.localStorage.setItem("seeds", this.walletService.encrypted);
        }
        else {
            if (!this.password) return this.globalService.showDialog("Introduce tu password", null);
            try {
                var decrypt = CryptoJS.AES.decrypt(this.walletService.encrypted, this.password);
                this.seeds = decrypt.toString(CryptoJS.enc.Utf8);
                if (!Mnemonic.isValid(this.seeds)) {
                    return this.globalService.showDialog("El password es incorrecto", null);
                }  
            } catch (error) {
                return this.globalService.showDialog("El password es incorrecto", null);
            }                
        }

        if (!this.nodeService.contract) return this.globalService.showDialog("No se ha podido instanciar el contrato", null);

        this.walletService.initWallet(this.seeds).then (async res => {

            this.globalService.userIsLogged = true;
            
            console.log("User address", this.walletService.getAddress());
            console.log("Show home");
            this.router.navigate([
                '/home'
            ],{ 
                queryParams: { 
                    address: this.walletService.getAddress()   
                } 
            });

            if (rememberSaveSeeds) await this.globalService.showDialog("Guarda tus semillas en un lugar seguro. No se volveran a mostar de ahora en adelante.</br></br>Semillas:</br><b>" + this.seeds + "</b>", "Importante!");

            this.seeds = '';
            this.password = '';
        })
    }

    restore() {
        window.localStorage.setItem("seeds", "");
        this.walletService.encrypted = null;
        this.seeds = new Mnemonic().phrase;
    }

}
