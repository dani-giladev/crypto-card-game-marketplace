(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-my-cards-my-cards-module"],{

/***/ "PHkY":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/my-cards/my-cards.page.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n    <ion-toolbar color=\"primary\">\n        <ion-title>Mis cartas</ion-title>\n        <ion-title size=\"small\">CCG Marketplace</ion-title>\n\n        <ion-buttons slot=\"start\">\n          <ion-menu-button></ion-menu-button>\n        </ion-buttons>\n      \n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n    <div style=\"padding: 10px;\">\n        \n        <app-card *ngFor =\"let item of items\"\n                  \n            [tokenId]=\"item.tokenId\"\n            [name]=\"item.name\"\n            [description]=\"item.description\"\n            [color]=\"item.color\"\n            [type]=\"item.type\"\n            [mana]=\"item.mana\"\n            [attack]=\"item.attack\"\n            [guard]=\"item.guard\"\n            [price]=\"item.price\"\n            [imgHash]=\"item.imgHash\"\n            [available]=\"item.available\"\n            [onSale]=\"item.onSale\"\n            \n            [isMyCardsPage]=\"true\"\n            (onTransferCardEvent)=\"onTransferCard($event)\"\n            (onPutOnSaleCardEvent)=\"onPutOnSaleCard($event)\"\n            \n        ></app-card>\n\n    </div>\n    \n</ion-content>\n");

/***/ }),

/***/ "WNwW":
/*!***************************************************!*\
  !*** ./src/app/pages/my-cards/my-cards.page.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJteS1jYXJkcy5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "XzwR":
/*!***************************************************!*\
  !*** ./src/app/pages/my-cards/my-cards.module.ts ***!
  \***************************************************/
/*! exports provided: MyCardsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyCardsPageModule", function() { return MyCardsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _my_cards_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./my-cards-routing.module */ "iGWX");
/* harmony import */ var src_app_components_card_card_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/components/card/card.component */ "lXt9");
/* harmony import */ var _my_cards_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./my-cards.page */ "flM/");








let MyCardsPageModule = class MyCardsPageModule {
};
MyCardsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _my_cards_routing_module__WEBPACK_IMPORTED_MODULE_5__["MyCardsPageRoutingModule"]
        ],
        declarations: [_my_cards_page__WEBPACK_IMPORTED_MODULE_7__["MyCardsPage"], src_app_components_card_card_component__WEBPACK_IMPORTED_MODULE_6__["CardComponent"]]
    })
], MyCardsPageModule);



/***/ }),

/***/ "flM/":
/*!*************************************************!*\
  !*** ./src/app/pages/my-cards/my-cards.page.ts ***!
  \*************************************************/
/*! exports provided: MyCardsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyCardsPage", function() { return MyCardsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_my_cards_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./my-cards.page.html */ "PHkY");
/* harmony import */ var _my_cards_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./my-cards.page.scss */ "WNwW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/global.service */ "4WDQ");
/* harmony import */ var src_app_services_wallet_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/wallet.service */ "Fvwb");
/* harmony import */ var src_app_services_card_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/card.service */ "uvxi");








let MyCardsPage = class MyCardsPage {
    constructor(route, router, globalService, walletService, cardService) {
        this.route = route;
        this.router = router;
        this.globalService = globalService;
        this.walletService = walletService;
        this.cardService = cardService;
        this.items = [];
        this.route.queryParams.subscribe((params) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //console.log("params", params);
            //if (!params || !params.address) return;
            this.getMyCards();
        }));
        if (!globalService.isDevel && !this.globalService.userIsLogged)
            this.router.navigate(['/login'], {});
    }
    ngOnInit() { }
    getMyCards() {
        this.items = [];
        if (this.globalService.isDevel || this.walletService.initialized) {
            this.globalService.loading = true;
            this.cardService.getMyCards().then((cards) => {
                console.log("getMyCards", cards);
                for (var i = 0; i < Object.keys(cards).length; i++) {
                    this.items.push(cards[i]);
                }
                this.globalService.loading = false;
            });
        }
    }
    onTransferCard(success) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (success) {
                yield this.globalService.showDialog("Acabas de transferir la carta a otro usuario", "Bien!");
                this.getMyCards();
                //this.router.navigate(['/my-cards'],{});    
            }
        });
    }
    onPutOnSaleCard(result) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (result.success) {
                if (result.role == 'sell')
                    yield this.globalService.showDialog("Acabas de poner la carta a la venta", "Genial!");
                this.getMyCards();
                //this.router.navigate(['/my-cards'],{});    
            }
        });
    }
};
MyCardsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: src_app_services_global_service__WEBPACK_IMPORTED_MODULE_5__["GlobalService"] },
    { type: src_app_services_wallet_service__WEBPACK_IMPORTED_MODULE_6__["WalletService"] },
    { type: src_app_services_card_service__WEBPACK_IMPORTED_MODULE_7__["CardService"] }
];
MyCardsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-my-cards',
        template: _raw_loader_my_cards_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_my_cards_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], MyCardsPage);



/***/ }),

/***/ "iGWX":
/*!***********************************************************!*\
  !*** ./src/app/pages/my-cards/my-cards-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: MyCardsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyCardsPageRoutingModule", function() { return MyCardsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _my_cards_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./my-cards.page */ "flM/");




const routes = [
    {
        path: '',
        component: _my_cards_page__WEBPACK_IMPORTED_MODULE_3__["MyCardsPage"]
    }
];
let MyCardsPageRoutingModule = class MyCardsPageRoutingModule {
};
MyCardsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], MyCardsPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=pages-my-cards-my-cards-module-es2015.js.map