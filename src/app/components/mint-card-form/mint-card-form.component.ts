import { Component, OnInit } from '@angular/core';
import * as IPFS from "ipfs-http-client";

import { GlobalService } from "src/app/services/global.service";
import { CardService } from "src/app/services/card.service";

@Component({
  selector: 'app-mint-card-form',
  templateUrl: './mint-card-form.component.html',
  styleUrls: ['./mint-card-form.component.scss'],
})
export class MintCardFormComponent implements OnInit {
    ipfs;
    buffer = null;
  
    name='';
    description='';
    color='';
    type='';
    mana='';
    attack='';
    guard='';
    price='';
    imgHash='';

    constructor(
        private globalService: GlobalService,
        private cardService: CardService
    ) { 
        this.ipfs = new IPFS({ host: 'ipfs.infura.io', port: '5001', protocol: 'https',apiPath: '/api/v0' })
    }

    ngOnInit() {}

    handleFileInput(files: FileList) {
        let reader = new FileReader();

        reader.readAsArrayBuffer(files.item(0));
        reader.onloadend = () => this.convertToBuffer(reader);
    }

    async convertToBuffer(reader){
        this.buffer = await Buffer.from(reader.result);
    }

    mintCard($event) {
        $event.preventDefault();
        console.log("this.buffer", this.buffer);
        
        if (!this.name) return this.globalService.showDialog("Introduce el nombre de la carta", null);
        if (!this.description) return this.globalService.showDialog("Introduce la descripción de la carta", null);
        if (!this.color) return this.globalService.showDialog("Selecciona el color de la carta", null);
        if (!this.type) return this.globalService.showDialog("Selecciona el tipo de la carta", null);
        if (!this.mana) return this.globalService.showDialog("Selecciona el maná de la carta", null);
        if (!this.attack) return this.globalService.showDialog("Selecciona el ataque de la carta", null);
        if (!this.guard) return this.globalService.showDialog("Selecciona la defensa de la carta", null);
        if (!this.price) return this.globalService.showDialog("Introduce el precio de la carta", null);
        if (!this.buffer) return this.globalService.showDialog("Selecciona la imagen de la carta", null);

        this.globalService.loading = true;
        this.ipfs.add(this.buffer).then((res, err)=>{
            if(err) {
                this.globalService.loading = false;
                return this.globalService.showDialog(err, null);
            }
            this.imgHash = res.path;
            console.log("IPFHash:"+this.imgHash);
            this.cardService
                .mint(this.name, this.description, this.color, this.type, this.mana, this.attack, this.guard, this.price, this.imgHash)
                .then(() => {
                    this.globalService.loading = false;
                    this.globalService.showDialog("La carta se ha creado satisfactoriamente", "Yuhuu!");
                    this.resetForm();
                })
                .catch(err => {
                    this.globalService.loading = false;
                    this.globalService.showDialog(err, null);
                });
        });
    }
    
    resetForm() {
        this.name = '';
        this.description = '';  
        this.color = '';  
        this.type = '';  
        this.mana = '';  
        this.attack = '';  
        this.guard = '';    
        this.price = '';     
        this.imgHash = '';        
        this.buffer = null;     
    }
        

}
