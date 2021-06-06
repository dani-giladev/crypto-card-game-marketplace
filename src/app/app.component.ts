import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { GlobalService } from "src/app/services/global.service";
import { WalletService } from "src/app/services/wallet.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private route: ActivatedRoute,
        private router: Router,
        private menu: MenuController,
        private globalService: GlobalService,
        private walletService: WalletService
    ) {
      this.initializeApp();
    }

    initializeApp() {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
  
    logout() {
        this.globalService.userIsLogged = false;
        this.router.navigate(['/login'],{});
        this.menu.close();
    }
    
    goToMyWallet() {
        this.router.navigate(['/home'],{});
        this.menu.close();
    }
    
    goToMintCard() {
        this.router.navigate(['/mint-card'],{});
        this.menu.close();
    }
    
    goToShowcase() {
        this.router.navigate(['/showcase'],{});
        this.menu.close();
    }
    
    goToMyCards() {
        this.router.navigate(['/my-cards'],{});
        this.menu.close();
    }
}
