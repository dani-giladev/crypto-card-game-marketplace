import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

import { GlobalService } from "src/app/services/global.service";
import { CardService } from "src/app/services/card.service";
import { WalletService } from "src/app/services/wallet.service";
import { TransferCardFormComponent } from 'src/app/components/transfer-card-form/transfer-card-form.component';
import { PutOnsaleFormComponent } from 'src/app/components/put-onsale-form/put-onsale-form.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    
    @Input() tokenId: string;
    @Input() name: string;
    @Input() description: string;
    @Input() color: string;
    @Input() type: string;
    @Input() mana: any;
    @Input() attack: any;
    @Input() guard: any;
    @Input() price: any;
    @Input() imgHash: string;
    @Input() available: boolean;
    @Input() onSale: boolean;
    @Input() isMyCardsPage: boolean = false;

    @Output() onBoughtEvent: EventEmitter<any> = new EventEmitter();
    @Output() onTransferCardEvent: EventEmitter<any> = new EventEmitter();
    @Output() onPutOnSaleCardEvent: EventEmitter<any> = new EventEmitter();

    colorMapping = {
        "color_0": {code: "0", name: "Blanco", color: "#FFFFFF", textColor: "#000000"},
        "color_1": {code: "1", name: "Azul", color: "blue", textColor: "#FFFFFF"},
        "color_2": {code: "2", name: "Amarillo", color: "yellow", textColor: "#000000"},
        "color_3": {code: "3", name: "Verde", color: "green", textColor: "#FFFFFF"},
        "color_4": {code: "4", name: "Rojo", color: "red", textColor: "#FFFFFF"},
        "color_5": {code: "5", name: "Negro", color: "#000000", textColor: "#FFFFFF"},
    };
    defaultColorCode = "1";

    constructor(
        private globalService: GlobalService,
        private cardService: CardService,
        private walletService: WalletService,
        private actionSheetController: ActionSheetController
    ) { }

    ngOnInit() {}

    getColorName() {
        var code = "color_" + this.color;
        return this.colorMapping[code]?this.colorMapping[code].name:this.colorMapping[this.defaultColorCode].name;
    }

    getColor() {
        var code = "color_" + this.color;
        return this.colorMapping[code]?this.colorMapping[code].color:this.colorMapping[this.defaultColorCode].color;
    }

    getTextColor() {
        var code = "color_" + this.color;
        return this.colorMapping[code]?this.colorMapping[code].textColor:this.colorMapping[this.defaultColorCode].textColor;
    }

    getImageSrc() {
        return "https://ipfs.io/ipfs/" + this.imgHash;
    }    
    
    getTypeName() {
        switch (this.type) {
            case "1":
                return "Hechizo";
            case "2":
                return "Reliquia";
            default:
                return "Criatura";
        }
    }
    
    getEnableDisableText() {
        return this.available? "DESACTIVAR" : "ACTIVAR";
    }
    
    getEnableDisableColor() {
        return this.available? "danger" : "success";
    }
    
    setAvailable() {
        console.log("tokenId", this.tokenId);

        this.globalService.loading = true;
        var value = !this.available;
        this.cardService
            .setAvailable(this.tokenId, !this.available)
            .then(() => {
                this.globalService.loading = false;
                this.available = value;
            })
            .catch(err => {
                this.globalService.loading = false;
                this.globalService.showDialog(err, null);
            });
        
    }
    
    buy() {
        console.log("tokenId", this.tokenId);
        
        this.globalService.loading = true;
        this.cardService
            .buy(this.tokenId, this.price)
            .then(() => {
                this.globalService.loading = false;
                this.onBoughtEvent.emit(this.tokenId);
            })
            .catch(err => {
                this.globalService.loading = false;
                this.globalService.showDialog(err, null);
            });
    }

    async showActions() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Menú de acciones',
            cssClass: 'my-action-sheet',
            buttons: [{
                text: 'Transferir la carta a otro usuario',
                role: 'transfer',
                icon: 'paper-plane',
                handler: async () => {
                    var result = await this.globalService.showModal(TransferCardFormComponent, {
                        'tokenId': this.tokenId
                    });
                    this.onTransferCardEvent.emit(result);
                }
            }, {
                text: this.onSale? 'Ya no la quiero vender' : 'Poner a la venta la carta',
                role: this.onSale? 'not-sell' : 'sell',
                icon: 'flash',
                handler: async () => {
                    
                    if (!this.onSale) {
                        var success = await this.globalService.showModal(PutOnsaleFormComponent, {
                            'tokenId': this.tokenId
                        });
                        this.onPutOnSaleCardEvent.emit({
                            success: success,
                            role: 'sell'
                        });                    
                    }
                    else {
                        this.globalService.loading = true;
                        this.cardService
                            .putOnSale(this.tokenId, 1, false)
                            .then(() => {
                                this.globalService.loading = false;
                                this.onPutOnSaleCardEvent.emit({
                                    success: true,
                                    role: 'not-sell'
                                });  
                            })
                            .catch(err => {
                                this.globalService.loading = false;
                                this.globalService.showDialog(err, null);
                            });
                    }
                }
            }]
        });
        await actionSheet.present();

        const { role } = await actionSheet.onDidDismiss();
        //console.log('onDidDismiss resolved with role', role);        
    }

}
