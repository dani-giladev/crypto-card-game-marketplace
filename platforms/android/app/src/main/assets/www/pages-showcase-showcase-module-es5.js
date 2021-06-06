(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-showcase-showcase-module"], {
    /***/
    "l4i3":
    /*!*************************************************!*\
      !*** ./src/app/pages/showcase/showcase.page.ts ***!
      \*************************************************/

    /*! exports provided: ShowcasePage */

    /***/
    function l4i3(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ShowcasePage", function () {
        return ShowcasePage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_showcase_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./showcase.page.html */
      "ntEZ");
      /* harmony import */


      var _showcase_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./showcase.page.scss */
      "pgLd");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var src_app_services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/services/global.service */
      "4WDQ");
      /* harmony import */


      var src_app_services_wallet_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/services/wallet.service */
      "Fvwb");
      /* harmony import */


      var src_app_services_card_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! src/app/services/card.service */
      "uvxi");

      var ShowcasePage = /*#__PURE__*/function () {
        function ShowcasePage(route, router, globalService, walletService, cardService) {
          var _this = this;

          _classCallCheck(this, ShowcasePage);

          this.route = route;
          this.router = router;
          this.globalService = globalService;
          this.walletService = walletService;
          this.cardService = cardService;
          this.items = [];
          this.route.queryParams.subscribe(function (params) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      //console.log("params", params);
                      //if (!params || !params.address) return;
                      this.getCardsOnSale();

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          });
          if (!globalService.isDevel && !this.globalService.userIsLogged) this.router.navigate(['/login'], {});
        }

        _createClass(ShowcasePage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "getCardsOnSale",
          value: function getCardsOnSale() {
            var _this2 = this;

            this.items = [];

            if (this.globalService.isDevel || this.walletService.initialized) {
              this.globalService.loading = true;
              this.cardService.getCardsOnSale().then(function (cards) {
                console.log("getCardsOnSale", cards);

                for (var i = 0; i < Object.keys(cards).length; i++) {
                  if (_this2.walletService.isAdmin || cards[i].available) _this2.items.push(cards[i]);
                }

                _this2.globalService.loading = false;
              });
            }
          }
        }, {
          key: "onBought",
          value: function onBought(tokenId) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      console.log("onBought tokenId", tokenId);
                      _context2.next = 3;
                      return this.globalService.showDialog("Acabas de comprar una carta", "Genial!");

                    case 3:
                      //this.getCardsOnSale();
                      this.router.navigate(['/my-cards'], {});

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }]);

        return ShowcasePage;
      }();

      ShowcasePage.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
        }, {
          type: src_app_services_global_service__WEBPACK_IMPORTED_MODULE_5__["GlobalService"]
        }, {
          type: src_app_services_wallet_service__WEBPACK_IMPORTED_MODULE_6__["WalletService"]
        }, {
          type: src_app_services_card_service__WEBPACK_IMPORTED_MODULE_7__["CardService"]
        }];
      };

      ShowcasePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-showcase',
        template: _raw_loader_showcase_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_showcase_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], ShowcasePage);
      /***/
    },

    /***/
    "lvv7":
    /*!***********************************************************!*\
      !*** ./src/app/pages/showcase/showcase-routing.module.ts ***!
      \***********************************************************/

    /*! exports provided: ShowcasePageRoutingModule */

    /***/
    function lvv7(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ShowcasePageRoutingModule", function () {
        return ShowcasePageRoutingModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _showcase_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./showcase.page */
      "l4i3");

      var routes = [{
        path: '',
        component: _showcase_page__WEBPACK_IMPORTED_MODULE_3__["ShowcasePage"]
      }];

      var ShowcasePageRoutingModule = function ShowcasePageRoutingModule() {
        _classCallCheck(this, ShowcasePageRoutingModule);
      };

      ShowcasePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], ShowcasePageRoutingModule);
      /***/
    },

    /***/
    "ntEZ":
    /*!*****************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/showcase/showcase.page.html ***!
      \*****************************************************************************************/

    /*! exports provided: default */

    /***/
    function ntEZ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n    <ion-toolbar color=\"primary\">\n        <ion-title>Escaparate</ion-title>\n        <ion-title size=\"small\">CCG Marketplace</ion-title>\n\n        <ion-buttons slot=\"start\">\n          <ion-menu-button></ion-menu-button>\n        </ion-buttons>\n      \n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n    <div style=\"padding: 10px;\">\n        \n        <app-card *ngFor =\"let item of items\"\n                  \n            [tokenId]=\"item.tokenId\"\n            [name]=\"item.name\"\n            [description]=\"item.description\"\n            [color]=\"item.color\"\n            [type]=\"item.type\"\n            [mana]=\"item.mana\"\n            [attack]=\"item.attack\"\n            [guard]=\"item.guard\"\n            [price]=\"item.price\"\n            [imgHash]=\"item.imgHash\"\n            [available]=\"item.available\"\n            [onSale]=\"item.onSale\"\n            \n            (onBoughtEvent)=\"onBought($event)\"\n        ></app-card>\n\n    </div>\n    \n</ion-content>\n";
      /***/
    },

    /***/
    "pgLd":
    /*!***************************************************!*\
      !*** ./src/app/pages/showcase/showcase.page.scss ***!
      \***************************************************/

    /*! exports provided: default */

    /***/
    function pgLd(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaG93Y2FzZS5wYWdlLnNjc3MifQ== */";
      /***/
    },

    /***/
    "zxwE":
    /*!***************************************************!*\
      !*** ./src/app/pages/showcase/showcase.module.ts ***!
      \***************************************************/

    /*! exports provided: ShowcasePageModule */

    /***/
    function zxwE(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ShowcasePageModule", function () {
        return ShowcasePageModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _showcase_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./showcase-routing.module */
      "lvv7");
      /* harmony import */


      var src_app_components_card_card_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/components/card/card.component */
      "lXt9");
      /* harmony import */


      var _showcase_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./showcase.page */
      "l4i3");

      var ShowcasePageModule = function ShowcasePageModule() {
        _classCallCheck(this, ShowcasePageModule);
      };

      ShowcasePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _showcase_routing_module__WEBPACK_IMPORTED_MODULE_5__["ShowcasePageRoutingModule"]],
        declarations: [_showcase_page__WEBPACK_IMPORTED_MODULE_7__["ShowcasePage"], src_app_components_card_card_component__WEBPACK_IMPORTED_MODULE_6__["CardComponent"]]
      })], ShowcasePageModule);
      /***/
    }
  }]);
})();
//# sourceMappingURL=pages-showcase-showcase-module-es5.js.map