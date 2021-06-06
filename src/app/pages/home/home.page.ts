import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalService } from "../../services/global.service";
import { WalletService } from "../../services/wallet.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    address;
    balance;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private globalService: GlobalService,
        public walletService: WalletService
    ) {
        
        this.route.queryParams.subscribe(async params => {
            //console.log("params", params);
            //if (Object.keys(params).length === 0) return;
            if (this.globalService.isDevel || this.walletService.initialized) {
                this.address = walletService.address;
                this.balance = await this.walletService.getBalance();            
            }

        });
        
        if (!globalService.isDevel && !this.globalService.userIsLogged) {
            this.router.navigate(['/login'],{});
            return;
        }       

    }

    ngOnInit() { }

}
