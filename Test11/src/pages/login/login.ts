import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';


//ok
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth:AngularFireAuth,
              public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

   async login(user: User) {
     try{
       const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,
        user.password);
       
        if (result){
          let loader = this.loadingCtrl.create({
            content: "veuillez patienter...",
            duration: 500
          });
          loader.present();
            this.navCtrl.setRoot('HomePage'); 
        }
 
     }
     catch (e) {
      let alert = this.alertCtrl.create({
        title: 'Incorrecte',
        subTitle: 'Veuillez recommencer',
        buttons: ['Fermer']
      });
      alert.present();
     }
   }
   register(){
     this.navCtrl.push('RegisterPage');
   }
   
  }