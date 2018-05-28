
import { AngularFireDatabase } from 'angularFire2/database-deprecated';
import { FirebaseObjectObservable } from 'angularFire2/database-deprecated';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { LoadingController } from 'ionic-angular';








@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  profileData: FirebaseObjectObservable<Profile>
 

  constructor(private afAuth: AngularFireAuth, 
              private afDataBase: AngularFireDatabase,
              private toast: ToastController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid) {
      this.toast.create({
        message: `Bienvenue sur NOTE-YOU , ${data.email}`,
        duration: 3000
      }).present();

      this.profileData = this.afDataBase.object(`profile/${data.uid}`)
      
    }
    else{
      this.toast.create({
        message: `authentification incorrecte`,
        duration: 3000
      }).present();
    }

   })
  

  }
 
  
  Group(){
    this.navCtrl.push('GroupPage');
    
  }
  Profil(){
    this.navCtrl.push('ProfilePage');
  }
  return(){
    let loader = this.loadingCtrl.create({
      content: "Déconnexion...",
      duration: 500
    });
    loader.present();
    this.navCtrl.setRoot('LoginPage');
     this.afAuth.auth.signOut();
  }
 
  
}



