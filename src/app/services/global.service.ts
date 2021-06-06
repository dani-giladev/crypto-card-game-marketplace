import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
    
    isDevel = false;
    userIsLogged = false;
    loading = false;
    currentModal = null;

    constructor(
        private alertController: AlertController,
        private modalController: ModalController
    ) { }

    async showDialog(msg, title) {
        var _title = title?title:"Oups!";
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: _title,
            subHeader: null,
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
        const { role } = await alert.onDidDismiss();
    }

    async showModal(component, componentProps) {
        const modal = await this.modalController.create({
            component: component,
            cssClass: 'my-modal',
            componentProps: componentProps
        });
        
        await modal.present(); 

        this.currentModal = modal;
        
        const { data } = await modal.onDidDismiss();
        return data;
    }    

    dismissModal(result) {
        if (this.currentModal) {
            this.currentModal.dismiss(result).then(() => { this.currentModal = null; });
        }
    }

}
