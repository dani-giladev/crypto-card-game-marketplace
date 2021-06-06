(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-my-cards-my-cards-module~pages-showcase-showcase-module"], {
    /***/
    "47my":
    /*!***************************************************************************!*\
      !*** ./src/app/components/put-onsale-form/put-onsale-form.component.scss ***!
      \***************************************************************************/

    /*! exports provided: default */

    /***/
    function my(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwdXQtb25zYWxlLWZvcm0uY29tcG9uZW50LnNjc3MifQ== */";
      /***/
    },

    /***/
    "Bn6T":
    /*!*********************************************************************************!*\
      !*** ./src/app/components/transfer-card-form/transfer-card-form.component.scss ***!
      \*********************************************************************************/

    /*! exports provided: default */

    /***/
    function Bn6T(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0cmFuc2Zlci1jYXJkLWZvcm0uY29tcG9uZW50LnNjc3MifQ== */";
      /***/
    },

    /***/
    "HZiB":
    /*!*************************************************************************!*\
      !*** ./src/app/components/put-onsale-form/put-onsale-form.component.ts ***!
      \*************************************************************************/

    /*! exports provided: PutOnsaleFormComponent */

    /***/
    function HZiB(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "PutOnsaleFormComponent", function () {
        return PutOnsaleFormComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_put_onsale_form_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./put-onsale-form.component.html */
      "iEP6");
      /* harmony import */


      var _put_onsale_form_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./put-onsale-form.component.scss */
      "47my");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var src_app_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/services/global.service */
      "4WDQ");
      /* harmony import */


      var src_app_services_node_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/services/node.service */
      "PHZ7");
      /* harmony import */


      var src_app_services_card_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/services/card.service */
      "uvxi");

      var PutOnsaleFormComponent = /*#__PURE__*/function () {
        function PutOnsaleFormComponent(globalService, nodeService, cardService) {
          _classCallCheck(this, PutOnsaleFormComponent);

          this.globalService = globalService;
          this.nodeService = nodeService;
          this.cardService = cardService;
          this.tokenId = '';
        }

        _createClass(PutOnsaleFormComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "dismissModal",
          value: function dismissModal(result) {
            this.globalService.dismissModal(result);
          }
        }, {
          key: "putOnSaleCard",
          value: function putOnSaleCard() {
            var _this = this;

            var price = document.getElementById('put-onsale-card-price').value;
            console.log("this.tokenId", this.tokenId);
            console.log("price", price);
            if (!price) return this.globalService.showDialog("Introduce el precio de la carta", null);
            this.globalService.loading = true;
            this.cardService.putOnSale(this.tokenId, price, true).then(function () {
              _this.globalService.loading = false;

              _this.dismissModal(true);
            })["catch"](function (err) {
              _this.globalService.loading = false;

              _this.globalService.showDialog(err, null);
            });
          }
        }]);

        return PutOnsaleFormComponent;
      }();

      PutOnsaleFormComponent.ctorParameters = function () {
        return [{
          type: src_app_services_global_service__WEBPACK_IMPORTED_MODULE_4__["GlobalService"]
        }, {
          type: src_app_services_node_service__WEBPACK_IMPORTED_MODULE_5__["NodeService"]
        }, {
          type: src_app_services_card_service__WEBPACK_IMPORTED_MODULE_6__["CardService"]
        }];
      };

      PutOnsaleFormComponent.propDecorators = {
        tokenId: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }]
      };
      PutOnsaleFormComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-put-onsale-form',
        template: _raw_loader_put_onsale_form_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_put_onsale_form_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], PutOnsaleFormComponent);
      /***/
    },

    /***/
    "M858":
    /*!***********************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/transfer-card-form/transfer-card-form.component.html ***!
      \***********************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function M858(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-title>Transferir carta</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"dismissModal(false)\">Close</ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header> \n<ion-content fullscreen>\n\n    <ion-list lines=\"full\" class=\"ion-margin\">\n        <ion-list-header lines=\"full\">\n          <ion-label>\n              <b>Introduce una dirección válida</b>\n          </ion-label>\n        </ion-list-header>     \n\n        <ion-item>\n          <ion-input id=\"transfer-card-address\"\n                  position=\"floating\"\n                  placeholder=\"Dirección del destinatario (Address)\" \n              ></ion-input>\n        </ion-item>\n\n    </ion-list>\n\n    <ion-button (click)=\"transferCard()\" color=\"success\" class=\"ion-margin\" style=\"text-transform:none\">Transferir</ion-button>\n</ion-content>\n    \n";
      /***/
    },

    /***/
    "ddB9":
    /*!*******************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/card/card.component.html ***!
      \*******************************************************************************************/

    /*! exports provided: default */

    /***/
    function ddB9(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<div class=\"wrapper-out\">\n    <div class=\"wrapper-in\" style=\"background-color: {{getColor()}}; color: {{getTextColor()}};\">\n        <div class=\"name\"><b>{{name}}</b></div>\n        <img class=\"card-img\" src={{getImageSrc()}}/>\n        <div *ngIf=\"!available && !isMyCardsPage\" class=\"available-info-label\">\n            DESACTIVADA\n        </div> \n        <div class=\"description\">{{description}}</div>      \n        <div *ngIf=\"onSale\" class=\"price\">\n            {{price}} eth\n        </div> \n        <ion-button *ngIf=\"walletService.isAdmin && !isMyCardsPage\" class=\"enable-disable-button\" color=\"{{getEnableDisableColor()}}\" size=\"small\" (click) =\"setAvailable()\">\n            {{getEnableDisableText()}}\n        </ion-button>\n        <div *ngIf=\"onSale && isMyCardsPage\" class=\"onsale-info-label\">\n            EN VENTA\n        </div>         \n        <div class=\"properties\">\n            Color: <b>{{getColorName()}}</b><br>\n            Tipo: <b>{{getTypeName()}}</b><br>\n            Maná: <b>{{mana}}</b><br>\n            Ataque: <b>{{attack}}</b><br>\n            Defensa: <b>{{guard}}</b>\n        </div>      \n    </div>\n    <div style=\"text-align:center; margin-top: 5px;\">\n        <ion-button *ngIf=\"available && !isMyCardsPage\" color=\"secondary\" size=\"small\" (click) =\"buy()\">Comprar</ion-button>\n        <ion-button *ngIf=\"isMyCardsPage\" color=\"secondary\" size=\"small\" (click) =\"showActions()\" style=\"text-transform:none\">Menú de acciones</ion-button>        \n    </div> \n</div>";
      /***/
    },

    /***/
    "f1PT":
    /*!*******************************************************************************!*\
      !*** ./src/app/components/transfer-card-form/transfer-card-form.component.ts ***!
      \*******************************************************************************/

    /*! exports provided: TransferCardFormComponent */

    /***/
    function f1PT(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TransferCardFormComponent", function () {
        return TransferCardFormComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_transfer_card_form_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./transfer-card-form.component.html */
      "M858");
      /* harmony import */


      var _transfer_card_form_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./transfer-card-form.component.scss */
      "Bn6T");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var src_app_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/services/global.service */
      "4WDQ");
      /* harmony import */


      var src_app_services_node_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/services/node.service */
      "PHZ7");
      /* harmony import */


      var src_app_services_card_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/services/card.service */
      "uvxi");

      var TransferCardFormComponent = /*#__PURE__*/function () {
        function TransferCardFormComponent(globalService, nodeService, cardService) {
          _classCallCheck(this, TransferCardFormComponent);

          this.globalService = globalService;
          this.nodeService = nodeService;
          this.cardService = cardService;
          this.tokenId = '';
        }

        _createClass(TransferCardFormComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "dismissModal",
          value: function dismissModal(result) {
            this.globalService.dismissModal(result);
          }
        }, {
          key: "transferCard",
          value: function transferCard() {
            var _this2 = this;

            var address = document.getElementById('transfer-card-address').value;
            console.log("this.tokenId", this.tokenId);
            console.log("address", address);
            if (!address) return this.globalService.showDialog("Introduce una dirección válida", null);
            if (!this.nodeService.web3.utils.isAddress(address)) return this.globalService.showDialog("La dirección no es una dirección válida", null);
            this.globalService.loading = true;
            this.cardService.transfer(this.tokenId, address).then(function () {
              _this2.globalService.loading = false;

              _this2.dismissModal(true);
            })["catch"](function (err) {
              _this2.globalService.loading = false;

              _this2.globalService.showDialog(err, null);
            });
          }
        }]);

        return TransferCardFormComponent;
      }();

      TransferCardFormComponent.ctorParameters = function () {
        return [{
          type: src_app_services_global_service__WEBPACK_IMPORTED_MODULE_4__["GlobalService"]
        }, {
          type: src_app_services_node_service__WEBPACK_IMPORTED_MODULE_5__["NodeService"]
        }, {
          type: src_app_services_card_service__WEBPACK_IMPORTED_MODULE_6__["CardService"]
        }];
      };

      TransferCardFormComponent.propDecorators = {
        tokenId: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }]
      };
      TransferCardFormComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-transfer-card-form',
        template: _raw_loader_transfer_card_form_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_transfer_card_form_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], TransferCardFormComponent);
      /***/
    },

    /***/
    "iEP6":
    /*!*****************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/put-onsale-form/put-onsale-form.component.html ***!
      \*****************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function iEP6(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-title>Poner carta a la venta</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"dismissModal(false)\">Close</ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header> \n<ion-content fullscreen>\n\n    <ion-list lines=\"full\" class=\"ion-margin\">\n        <ion-list-header lines=\"full\">\n          <ion-label>\n              <b>Introduce una precio en ethers</b>\n          </ion-label>\n        </ion-list-header>     \n\n        <ion-item>\n          <ion-input id=\"put-onsale-card-price\"\n                  position=\"floating\"\n                  type=\"number\" \n                  placeholder=\"Nuevo precio de la carta\" \n              ></ion-input>\n        </ion-item>\n\n    </ion-list>\n\n    <ion-button (click)=\"putOnSaleCard()\" color=\"success\" class=\"ion-margin\" style=\"text-transform:none\">Poner a la venta</ion-button>\n</ion-content>\n    \n";
      /***/
    },

    /***/
    "lXt9":
    /*!***************************************************!*\
      !*** ./src/app/components/card/card.component.ts ***!
      \***************************************************/

    /*! exports provided: CardComponent */

    /***/
    function lXt9(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CardComponent", function () {
        return CardComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_card_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./card.component.html */
      "ddB9");
      /* harmony import */


      var _card_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./card.component.scss */
      "pZ/g");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var src_app_services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/services/global.service */
      "4WDQ");
      /* harmony import */


      var src_app_services_card_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/services/card.service */
      "uvxi");
      /* harmony import */


      var src_app_services_wallet_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! src/app/services/wallet.service */
      "Fvwb");
      /* harmony import */


      var src_app_components_transfer_card_form_transfer_card_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! src/app/components/transfer-card-form/transfer-card-form.component */
      "f1PT");
      /* harmony import */


      var src_app_components_put_onsale_form_put_onsale_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! src/app/components/put-onsale-form/put-onsale-form.component */
      "HZiB");

      var CardComponent = /*#__PURE__*/function () {
        function CardComponent(globalService, cardService, walletService, actionSheetController) {
          _classCallCheck(this, CardComponent);

          this.globalService = globalService;
          this.cardService = cardService;
          this.walletService = walletService;
          this.actionSheetController = actionSheetController;
          this.isMyCardsPage = false;
          this.onBoughtEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
          this.onTransferCardEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
          this.onPutOnSaleCardEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
          this.colorMapping = {
            "color_0": {
              code: "0",
              name: "Blanco",
              color: "#FFFFFF",
              textColor: "#000000"
            },
            "color_1": {
              code: "1",
              name: "Azul",
              color: "blue",
              textColor: "#FFFFFF"
            },
            "color_2": {
              code: "2",
              name: "Amarillo",
              color: "yellow",
              textColor: "#000000"
            },
            "color_3": {
              code: "3",
              name: "Verde",
              color: "green",
              textColor: "#FFFFFF"
            },
            "color_4": {
              code: "4",
              name: "Rojo",
              color: "red",
              textColor: "#FFFFFF"
            },
            "color_5": {
              code: "5",
              name: "Negro",
              color: "#000000",
              textColor: "#FFFFFF"
            }
          };
          this.defaultColorCode = "1";
        }

        _createClass(CardComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "getColorName",
          value: function getColorName() {
            var code = "color_" + this.color;
            return this.colorMapping[code] ? this.colorMapping[code].name : this.colorMapping[this.defaultColorCode].name;
          }
        }, {
          key: "getColor",
          value: function getColor() {
            var code = "color_" + this.color;
            return this.colorMapping[code] ? this.colorMapping[code].color : this.colorMapping[this.defaultColorCode].color;
          }
        }, {
          key: "getTextColor",
          value: function getTextColor() {
            var code = "color_" + this.color;
            return this.colorMapping[code] ? this.colorMapping[code].textColor : this.colorMapping[this.defaultColorCode].textColor;
          }
        }, {
          key: "getImageSrc",
          value: function getImageSrc() {
            return "https://ipfs.io/ipfs/" + this.imgHash;
          }
        }, {
          key: "getTypeName",
          value: function getTypeName() {
            switch (this.type) {
              case "1":
                return "Hechizo";

              case "2":
                return "Reliquia";

              default:
                return "Criatura";
            }
          }
        }, {
          key: "getEnableDisableText",
          value: function getEnableDisableText() {
            return this.available ? "DESACTIVAR" : "ACTIVAR";
          }
        }, {
          key: "getEnableDisableColor",
          value: function getEnableDisableColor() {
            return this.available ? "danger" : "success";
          }
        }, {
          key: "setAvailable",
          value: function setAvailable() {
            var _this3 = this;

            console.log("tokenId", this.tokenId);
            this.globalService.loading = true;
            var value = !this.available;
            this.cardService.setAvailable(this.tokenId, !this.available).then(function () {
              _this3.globalService.loading = false;
              _this3.available = value;
            })["catch"](function (err) {
              _this3.globalService.loading = false;

              _this3.globalService.showDialog(err, null);
            });
          }
        }, {
          key: "buy",
          value: function buy() {
            var _this4 = this;

            console.log("tokenId", this.tokenId);
            this.globalService.loading = true;
            this.cardService.buy(this.tokenId, this.price).then(function () {
              _this4.globalService.loading = false;

              _this4.onBoughtEvent.emit(_this4.tokenId);
            })["catch"](function (err) {
              _this4.globalService.loading = false;

              _this4.globalService.showDialog(err, null);
            });
          }
        }, {
          key: "showActions",
          value: function showActions() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var _this5 = this;

              var actionSheet, _yield$actionSheet$on, role;

              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return this.actionSheetController.create({
                        header: 'Menú de acciones',
                        cssClass: 'my-action-sheet',
                        buttons: [{
                          text: 'Transferir la carta a otro usuario',
                          role: 'transfer',
                          icon: 'paper-plane',
                          handler: function handler() {
                            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this5, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                              var result;
                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      _context.next = 2;
                                      return this.globalService.showModal(src_app_components_transfer_card_form_transfer_card_form_component__WEBPACK_IMPORTED_MODULE_8__["TransferCardFormComponent"], {
                                        'tokenId': this.tokenId
                                      });

                                    case 2:
                                      result = _context.sent;
                                      this.onTransferCardEvent.emit(result);

                                    case 4:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee, this);
                            }));
                          }
                        }, {
                          text: this.onSale ? 'Ya no la quiero vender' : 'Poner a la venta la carta',
                          role: this.onSale ? 'not-sell' : 'sell',
                          icon: 'flash',
                          handler: function handler() {
                            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this5, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                              var _this6 = this;

                              var success;
                              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                  switch (_context2.prev = _context2.next) {
                                    case 0:
                                      if (this.onSale) {
                                        _context2.next = 7;
                                        break;
                                      }

                                      _context2.next = 3;
                                      return this.globalService.showModal(src_app_components_put_onsale_form_put_onsale_form_component__WEBPACK_IMPORTED_MODULE_9__["PutOnsaleFormComponent"], {
                                        'tokenId': this.tokenId
                                      });

                                    case 3:
                                      success = _context2.sent;
                                      this.onPutOnSaleCardEvent.emit({
                                        success: success,
                                        role: 'sell'
                                      });
                                      _context2.next = 9;
                                      break;

                                    case 7:
                                      this.globalService.loading = true;
                                      this.cardService.putOnSale(this.tokenId, 1, false).then(function () {
                                        _this6.globalService.loading = false;

                                        _this6.onPutOnSaleCardEvent.emit({
                                          success: true,
                                          role: 'not-sell'
                                        });
                                      })["catch"](function (err) {
                                        _this6.globalService.loading = false;

                                        _this6.globalService.showDialog(err, null);
                                      });

                                    case 9:
                                    case "end":
                                      return _context2.stop();
                                  }
                                }
                              }, _callee2, this);
                            }));
                          }
                        }]
                      });

                    case 2:
                      actionSheet = _context3.sent;
                      _context3.next = 5;
                      return actionSheet.present();

                    case 5:
                      _context3.next = 7;
                      return actionSheet.onDidDismiss();

                    case 7:
                      _yield$actionSheet$on = _context3.sent;
                      role = _yield$actionSheet$on.role;

                    case 9:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }]);

        return CardComponent;
      }();

      CardComponent.ctorParameters = function () {
        return [{
          type: src_app_services_global_service__WEBPACK_IMPORTED_MODULE_5__["GlobalService"]
        }, {
          type: src_app_services_card_service__WEBPACK_IMPORTED_MODULE_6__["CardService"]
        }, {
          type: src_app_services_wallet_service__WEBPACK_IMPORTED_MODULE_7__["WalletService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ActionSheetController"]
        }];
      };

      CardComponent.propDecorators = {
        tokenId: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        name: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        description: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        color: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        type: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        mana: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        attack: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        guard: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        price: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        imgHash: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        available: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        onSale: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        isMyCardsPage: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        onBoughtEvent: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }],
        onTransferCardEvent: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }],
        onPutOnSaleCardEvent: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }]
      };
      CardComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-card',
        template: _raw_loader_card_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_card_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], CardComponent);
      /***/
    },

    /***/
    "pZ/g":
    /*!*****************************************************!*\
      !*** ./src/app/components/card/card.component.scss ***!
      \*****************************************************/

    /*! exports provided: default */

    /***/
    function pZG(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".wrapper-out {\n  position: relative;\n  margin: 10px;\n  width: 200px;\n  height: 370px;\n  /*border: 1px solid red;*/\n  float: left;\n  font-size: 10px;\n}\n\n.wrapper-in {\n  position: relative;\n  border: 1px solid gray;\n  border-radius: 5px;\n  padding: 5px 10px 10px 10px;\n  width: 200px;\n  height: 330px;\n}\n\n.name {\n  width: 100%;\n  padding: 4px;\n  text-align: center;\n}\n\n.card-img {\n  width: 180px;\n  height: 180px;\n  /*border: 1px solid gray;*/\n}\n\n.description {\n  width: 178px;\n  padding: 4px;\n  height: 35px;\n  border-bottom: 1px solid gray;\n  margin-top: -3px;\n}\n\n.properties {\n  width: 178px;\n  padding: 4px;\n  height: 85px;\n  margin-top: 2px;\n  line-height: 15px;\n}\n\n.price {\n  position: absolute;\n  bottom: 10px;\n  right: 10px;\n  width: 100px;\n  height: 20px;\n  font-size: 20px;\n  text-align: right;\n}\n\n.enable-disable-button {\n  position: absolute;\n  bottom: 50px;\n  right: 10px;\n  font-size: 8px;\n}\n\n.available-info-label {\n  position: absolute;\n  top: 100px;\n  left: 10px;\n  border: 1px solid white;\n  background-color: red;\n  font-size: 20px;\n  width: 175px;\n  height: 30px;\n  border-radius: 2px;\n  font-weight: bold;\n  text-align: center;\n  padding-top: 2px;\n}\n\n.onsale-info-label {\n  position: absolute;\n  bottom: 50px;\n  right: 10px;\n  font-size: 10px;\n  border: 1px solid white;\n  background-color: red;\n  color: \"white\";\n  border-radius: 2px;\n  padding: 4px;\n}\n\n/* Works - pass \"my-custom-class\" in cssClass to increase specificity */\n\n.my-action-sheet .action-sheet-group {\n  background: #e5e5e5;\n}\n\n/* Works - pass \"my-custom-class\" in cssClass to increase specificity */\n\n.my-modal .modal-wrapper {\n  background: #222;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NhcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0EsMEJBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLDZCQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBLHVFQUFBOztBQUNBO0VBQ0UsbUJBQUE7QUFDRjs7QUFFQSx1RUFBQTs7QUFDQTtFQUNFLGdCQUFBO0FBQ0YiLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi53cmFwcGVyLW91dCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbjogMTBweDtcbiAgICB3aWR0aDogMjAwcHg7XG4gICAgaGVpZ2h0OiAzNzBweDtcbiAgICAvKmJvcmRlcjogMXB4IHNvbGlkIHJlZDsqL1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbn1cblxuLndyYXBwZXItaW4ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBwYWRkaW5nOiA1cHggMTBweCAxMHB4IDEwcHg7XG4gICAgd2lkdGg6IDIwMHB4O1xuICAgIGhlaWdodDogMzMwcHg7XG59XG5cbi5uYW1lIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwYWRkaW5nOiA0cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY2FyZC1pbWcge1xuICAgIHdpZHRoOiAxODBweDtcbiAgICBoZWlnaHQ6IDE4MHB4O1xuICAgIC8qYm9yZGVyOiAxcHggc29saWQgZ3JheTsqL1xufVxuXG4uZGVzY3JpcHRpb24ge1xuICAgIHdpZHRoOiAxNzhweDtcbiAgICBwYWRkaW5nOiA0cHg7XG4gICAgaGVpZ2h0OiAzNXB4O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBncmF5O1xuICAgIG1hcmdpbi10b3A6IC0zcHg7XG59XG5cbi5wcm9wZXJ0aWVzIHtcbiAgICB3aWR0aDogMTc4cHg7XG4gICAgcGFkZGluZzogNHB4O1xuICAgIGhlaWdodDogODVweDtcbiAgICBtYXJnaW4tdG9wOiAycHg7XG4gICAgbGluZS1oZWlnaHQ6IDE1cHg7XG59XG5cbi5wcmljZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMTBweDtcbiAgICByaWdodDogMTBweDtcbiAgICB3aWR0aDogMTAwcHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbn1cblxuLmVuYWJsZS1kaXNhYmxlLWJ1dHRvbiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogNTBweDtcbiAgICByaWdodDogMTBweDtcbiAgICBmb250LXNpemU6IDhweDtcbn1cblxuLmF2YWlsYWJsZS1pbmZvLWxhYmVsIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxMDBweDtcbiAgICBsZWZ0OiAxMHB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgd2lkdGg6IDE3NXB4O1xuICAgIGhlaWdodDogMzBweDtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmctdG9wOiAycHg7XG59XG5cbi5vbnNhbGUtaW5mby1sYWJlbCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogNTBweDtcbiAgICByaWdodDogMTBweDtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICAgIGNvbG9yOiBcIndoaXRlXCI7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIHBhZGRpbmc6IDRweDtcbn1cblxuLyogV29ya3MgLSBwYXNzIFwibXktY3VzdG9tLWNsYXNzXCIgaW4gY3NzQ2xhc3MgdG8gaW5jcmVhc2Ugc3BlY2lmaWNpdHkgKi9cbi5teS1hY3Rpb24tc2hlZXQgLmFjdGlvbi1zaGVldC1ncm91cCB7XG4gIGJhY2tncm91bmQ6ICNlNWU1ZTU7XG59XG5cbi8qIFdvcmtzIC0gcGFzcyBcIm15LWN1c3RvbS1jbGFzc1wiIGluIGNzc0NsYXNzIHRvIGluY3JlYXNlIHNwZWNpZmljaXR5ICovXG4ubXktbW9kYWwgLm1vZGFsLXdyYXBwZXIge1xuICBiYWNrZ3JvdW5kOiAjMjIyO1xufSJdfQ== */";
      /***/
    },

    /***/
    "uvxi":
    /*!******************************************!*\
      !*** ./src/app/services/card.service.ts ***!
      \******************************************/

    /*! exports provided: CardService */

    /***/
    function uvxi(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CardService", function () {
        return CardService;
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


      var src_app_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/services/global.service */
      "4WDQ");
      /* harmony import */


      var src_app_services_node_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/services/node.service */
      "PHZ7");
      /* harmony import */


      var src_app_services_wallet_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/services/wallet.service */
      "Fvwb");

      var CardService = /*#__PURE__*/function () {
        function CardService(globalService, nodeService, walletService) {
          _classCallCheck(this, CardService);

          this.globalService = globalService;
          this.nodeService = nodeService;
          this.walletService = walletService;
        }

        _createClass(CardService, [{
          key: "mint",
          value: function mint(name, description, color, type, mana, attack, guard, price, imgHash) {
            var data = this.nodeService.contract.methods.mint(name, description, color, type, mana, attack, guard, this.nodeService.toWei(price), imgHash).encodeABI();
            return this.nodeService.sendTransaction(this.walletService.address, this.nodeService.contractAddress, 0, data, this.walletService.privateKey);
          }
        }, {
          key: "getCardsOnSale",
          value: function getCardsOnSale() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var tokens;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return this.nodeService.contract.methods.getTokensIdOnSale().call({
                        from: this.walletService.address
                      });

                    case 2:
                      tokens = _context4.sent;
                      return _context4.abrupt("return", this.getCards(tokens));

                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "getMyCards",
          value: function getMyCards() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              var tokens;
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return this.nodeService.contract.methods.getMyTokensId().call({
                        from: this.walletService.address
                      });

                    case 2:
                      tokens = _context5.sent;
                      return _context5.abrupt("return", this.getCards(tokens));

                    case 4:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            }));
          }
        }, {
          key: "getCards",
          value: function getCards(tokens) {
            var _this7 = this;

            return new Promise(function (resolve, reject) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this7, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var _this8 = this;

                var batch, batchResponses, cards, i;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (tokens.length === 0) resolve([]);else {
                          batch = new this.nodeService.web3.BatchRequest();
                          batchResponses = [];
                          cards = [];

                          for (i = 0; i < tokens.length; i++) {
                            (function (i) {
                              var tokenId = tokens[i]; //console.log("tokenId", tokenId);

                              batch.add(_this8.nodeService.contract.methods.getToken(tokenId).call.request({
                                from: _this8.walletService.address
                              }, function (error, response) {
                                if (error) console.log("error", error); //console.log("response", response);

                                batchResponses.push(response);

                                if (!error) {
                                  cards.push({
                                    tokenId: tokens[i],
                                    name: response[0],
                                    description: response[1],
                                    color: response[2],
                                    type: response[3],
                                    mana: response[4],
                                    attack: response[5],
                                    guard: response[6],
                                    price: _this8.nodeService.fromWei(response[7]),
                                    imgHash: response[8],
                                    available: response[9],
                                    onSale: response[10]
                                  });
                                }

                                if (tokens.length === batchResponses.length) {
                                  resolve(cards);
                                }
                              }));
                            })(i);
                          }

                          batch.execute();
                        }

                      case 1:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, this);
              }));
            });
          }
        }, {
          key: "setAvailable",
          value: function setAvailable(tokenId, value) {
            var data = this.nodeService.contract.methods.setAvailable(tokenId, value).encodeABI();
            return this.nodeService.sendTransaction(this.walletService.address, this.nodeService.contractAddress, 0, data, this.walletService.privateKey);
          }
        }, {
          key: "buy",
          value: function buy(tokenId, price) {
            var data = this.nodeService.contract.methods.buyToken(tokenId).encodeABI();
            return this.nodeService.sendTransaction(this.walletService.address, this.nodeService.contractAddress, this.nodeService.toWei(price), data, this.walletService.privateKey);
          }
        }, {
          key: "transfer",
          value: function transfer(tokenId, address) {
            var data = this.nodeService.contract.methods.transfer(address, tokenId).encodeABI();
            return this.nodeService.sendTransaction(this.walletService.address, this.nodeService.contractAddress, 0, data, this.walletService.privateKey);
          }
        }, {
          key: "putOnSale",
          value: function putOnSale(tokenId, price, onSale) {
            var data = this.nodeService.contract.methods.setTokenOnSale(tokenId, this.nodeService.toWei(price), onSale).encodeABI();
            return this.nodeService.sendTransaction(this.walletService.address, this.nodeService.contractAddress, 0, data, this.walletService.privateKey);
          }
        }]);

        return CardService;
      }();

      CardService.ctorParameters = function () {
        return [{
          type: src_app_services_global_service__WEBPACK_IMPORTED_MODULE_2__["GlobalService"]
        }, {
          type: src_app_services_node_service__WEBPACK_IMPORTED_MODULE_3__["NodeService"]
        }, {
          type: src_app_services_wallet_service__WEBPACK_IMPORTED_MODULE_4__["WalletService"]
        }];
      };

      CardService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], CardService);
      /***/
    }
  }]);
})();
//# sourceMappingURL=default~pages-my-cards-my-cards-module~pages-showcase-showcase-module-es5.js.map