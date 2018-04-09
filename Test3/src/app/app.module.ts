import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularFire2/database-deprecated';//new
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { MyApp } from './app.component';
import { Environment} from './app.firebase.config';
import { GroupProvider } from '../providers/group/group';

//import { Camera } from '@ionic-native/camera';

//ok

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
   
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    GroupProvider,
   
  ]
})
export class AppModule {}
