import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularFire2/database-deprecated';//new
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Environment} from './app.firebase.config';



//import { Camera } from '@ionic-native/camera';

//ok

@NgModule({
  declarations: [
    MyApp,
   

  ],
  imports: [
   
    BrowserModule,
    IonicModule.forRoot(MyApp),// IonicModule.forRoot(MyApp,{mode:'ios'}), mode change
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(Environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,//new
  

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   
   
    
  ],
  providers: [
  
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  
   
  ]
})
export class AppModule {}
