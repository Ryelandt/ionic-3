import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularFire2/database-deprecated';
import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';

//new


@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
   
})
export class ProfilePage {

    profile = {} as Profile;//new for profile model + import
    //myphoto:any;
    constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
      public navCtrl: NavController, public navParams: NavParams,/* private camera: Camera*/) {
    }
    createProfile() {
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
          .then(() => this.navCtrl.setRoot('HomePage'));
      })
      
    }
    reset(){
      this.navCtrl.push('ResetPage');
    }
    
    
}
