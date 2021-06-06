import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalService } from "src/app/services/global.service";
import { WalletService } from "src/app/services/wallet.service";
import { CardService } from "src/app/services/card.service";

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.page.html',
  styleUrls: ['./my-cards.page.scss'],
})
export class MyCardsPage implements OnInit {
    
    items = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private globalService: GlobalService,
        private walletService: WalletService,
        private cardService: CardService
        ) { 
        
        this.route.queryParams.subscribe(async params => {
            //console.log("params", params);
            //if (!params || !params.address) return;
            this.getMyCards();
        });
        
        if (!globalService.isDevel && !this.globalService.userIsLogged)
            this.router.navigate(['/login'],{});
            
    }

    ngOnInit() {}

    getMyCards() {
        this.items = [];
        if (this.globalService.isDevel || this.walletService.initialized) {
            this.globalService.loading = true;
            this.cardService.getMyCards().then((cards) => {
                console.log("getMyCards", cards);
                for ( var i = 0; i < Object.keys(cards).length; i++) {
                    this.items.push(cards[i]);
                }
                this.globalService.loading = false;
            });
        }
    }

    async onTransferCard(success) {
        if (success) {
            await this.globalService.showDialog("Acabas de transferir la carta a otro usuario", "Bien!");
            this.getMyCards();
            //this.router.navigate(['/my-cards'],{});    
        }
    }

    async onPutOnSaleCard(result) {
        if (result.success) {
            if (result.role == 'sell')await this.globalService.showDialog("Acabas de poner la carta a la venta", "Genial!");
            this.getMyCards();
            //this.router.navigate(['/my-cards'],{});    
        }
    }




}
