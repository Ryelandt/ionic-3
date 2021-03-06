

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  member = {name:'RYELANDT',
            surname:'yohann',
            age:'37',
            email:'ryelandt.yohann@gmail.com',
            level:'orange Belt',
            pics:'assets/imgs/moi.jpg'}
 

  constructor(private afAuth: AngularFireAuth, 
    private toast: ToastController,
    
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
      this.toast.create({
        message: `Bienvenue sur NOTE-YOU ,${data.email}`,
        duration: 3000
      }).present();
      
    }
    else{
      this.toast.create({
        message: `authentification incorrecte`,
        duration: 3000
      }).present();
    }
  })
  }
}



