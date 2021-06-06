import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalService } from "../../services/global.service";

@Component({
  selector: 'app-mint-card',
  templateUrl: './mint-card.page.html',
  styleUrls: ['./mint-card.page.scss'],
})
export class MintCardPage implements OnInit {

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private globalService: GlobalService
        ) { 
        
        if (!globalService.isDevel && !this.globalService.userIsLogged)
            this.router.navigate(['/login'],{});
        
  }

  ngOnInit() {
  }

}
