import { Component, OnInit, Input } from '@angular/core';

import { GlobalService } from "src/app/services/global.service";
import { NodeService } from "src/app/services/node.service";
import { CardService } from "src/app/services/card.service";

@Component({
  selector: 'app-put-onsale-form',
  templateUrl: './put-onsale-form.component.html',
  styleUrls: ['./put-onsale-form.component.scss'],
})
export class PutOnsaleFormComponent implements OnInit {

    @Input() tokenId: string = '';

    constructor(
        private globalService: GlobalService,
        private nodeService: NodeService,
        private cardService: CardService
    ) { }

    ngOnInit() {}

    dismissModal(result) {
        this.globalService.dismissModal(result);
    }

    putOnSaleCard() {
        let price = (document.getElementById('put-onsale-card-price') as HTMLInputElement).value;
        
        console.log("this.tokenId", this.tokenId);
        console.log("price", price);
        
        if (!price) return this.globalService.showDialog("Introduce el precio de la carta", null);
        
        this.globalService.loading = true;
        this.cardService
            .putOnSale(this.tokenId, price, true)
            .then(() => {
                this.globalService.loading = false;
                this.dismissModal(true);
            })
            .catch(err => {
                this.globalService.loading = false;
                this.globalService.showDialog(err, null);
            });
    }

}
