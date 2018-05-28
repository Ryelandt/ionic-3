import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { LoadingController } from 'ionic-angular';
//ok
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

user = {} as User;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController  ) {
  }

  
async register(user: User) {
    try{   
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,
        user.password); 
          console.log(result);    
          if(result) {
            let loader = this.loadingCtrl.create({
            content: "veuillez patienter...",
            duration: 500
          });
          loader.present();
           this.navCtrl.setRoot("ProfilePage");
           
          } 
         
    }
    catch(e) {
      console.error(e);
      let alert = this.alertCtrl.create({
        title: 'Incorrecte',
        subTitle: 'Veuillez recommencer',
        buttons: ['Fermer']
      });
      alert.present();
      
    }
  }
   
}
