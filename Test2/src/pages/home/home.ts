
import { AngularFireDatabase } from 'angularFire2/database-deprecated';
import { FirebaseObjectObservable } from 'angularFire2/database-deprecated';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';






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
              public navParams: NavParams) {
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
}



