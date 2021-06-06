import { Component, OnInit, Input } from '@angular/core';

import { GlobalService } from "src/app/services/global.service";
import { NodeService } from "src/app/services/node.service";
import { CardService } from "src/app/services/card.service";

@Component({
  selector: 'app-transfer-card-form',
  templateUrl: './transfer-card-form.component.html',
  styleUrls: ['./transfer-card-form.component.scss'],
})
export class TransferCardFormComponent implements OnInit {

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

    transferCard() {
        let address = (document.getElementById('transfer-card-address') as HTMLInputElement).value;
        
        console.log("this.tokenId", this.tokenId);
        console.log("address", address);

        if (!address) return this.globalService.showDialog("Introduce una dirección válida", null);
        if (!this.nodeService.web3.utils.isAddress(address)) return this.globalService.showDialog("La dirección no es una dirección válida", null);

        this.globalService.loading = true;
        this.cardService
            .transfer(this.tokenId, address)
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
