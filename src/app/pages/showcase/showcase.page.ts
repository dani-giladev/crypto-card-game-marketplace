import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalService } from "src/app/services/global.service";
import { WalletService } from "src/app/services/wallet.service";
import { CardService } from "src/app/services/card.service";

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.page.html',
  styleUrls: ['./showcase.page.scss'],
})
export class ShowcasePage implements OnInit {
    
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
            this.getCardsOnSale();
        });

        if (!globalService.isDevel && !this.globalService.userIsLogged)
            this.router.navigate(['/login'],{});

    }

    ngOnInit() {}

    getCardsOnSale() {
        this.items = [];
        if (this.globalService.isDevel || this.walletService.initialized) {
            this.globalService.loading = true;
            this.cardService.getCardsOnSale().then((cards) => {
                console.log("getCardsOnSale", cards);
                for ( var i = 0; i < Object.keys(cards).length; i++) {
                    if (this.walletService.isAdmin || cards[i].available)
                        this.items.push(cards[i]);
                }
                this.globalService.loading = false;
            });
        }
            
    }

    async onBought(tokenId) {
        console.log("onBought tokenId", tokenId);
        await this.globalService.showDialog("Acabas de comprar una carta", "Genial!");
        //this.getCardsOnSale();
        this.router.navigate(['/my-cards'],{});
    }

}
