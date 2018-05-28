
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularFire2/database-deprecated';
import { Component } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularFire2/database-deprecated';
import { Groups } from '../../models/group';
import { IonicPage, NavController, NavParams, AlertController, LoadingController  } from 'ionic-angular';
import { Profile } from '../../models/profile';
import  firebase from 'firebase'; 




@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})

export class GroupPage {
 
  allUsers: any;
  groupData: FirebaseObjectObservable<Groups[]>; 
  groups: Groups[] = [];
  group = {} as Groups;
  groupsData:FirebaseListObservable<Groups[]>;
  profileData: FirebaseObjectObservable<Profile>;
  getGroupkey:any;
  getGroupKey_2:any;
  getMemberKey:any;
  getMemberkey1:any;
  getMemberG:any;
  getDataN:any;
  getMember:any;
  name:any;
  name2:any;
  hideView: boolean = false;
  seeView: boolean = true;
  items: Array<any> = [];
  seeViewListGroup: boolean= false;
  
  userList: Array<any>;
  loadedUserList:Array<any>;
  userRef:firebase.database.Reference;
 
  groupList: Array<any>;
  groupNam: Array<any> = [];
  groupMemb: Array<any> = [];
  loadedGroupList:Array<any>;
  
  name_1={"members":''};
  name_2={"members":''};


  constructor(private afAuth: AngularFireAuth, 
              private afDatabase: AngularFireDatabase,
              public alertCtrl: AlertController,
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              ) {  
        this.userRef = firebase.database().ref('/profile'); 
       

         }

   showPrompt() {                        //the modal to set the name of the group
    let prompt = this.alertCtrl.create({
      title: 'groupe',
      message: 'Entrez un nom',
      inputs: [{ name: 'name', 
              placeholder: 'Groupe'}],
      buttons:
      [{text: 'Annuler',
          handler: data => {
            console.log('Annulée');
          }
        },
        {
        text: 'Sauver',
          handler: data => {
            if(data.name!=="") {
                                          //push the group name to the Groups Data
              this.afAuth.authState.take(1).subscribe(auth =>{
               let getGoup=this.afDatabase.list(`groups/${auth.uid}/group/`).push({"name":data.name,"members":""}).key;
               this.getGroupkey = getGoup;
              
              });
                                          //push the group name to the Profile Data
              this.afAuth.authState.take(1).subscribe(auth =>{
               let getGroup_2=this.afDatabase.list(`profile/${auth.uid}/group/`).push({"name":data.name,"members":""}).key;
               this.getGroupKey_2 = getGroup_2;
              
              }); 
              this.getDataN=data.name; //keep namegroup in memory(check html)
              this.seeView = !this.seeView; //logo desapears
              this.hideView =!this.hideView;
            } 
            if(data.name=='') {//input is empty => message error
              let alert = this.alertCtrl.create({
              title: "champs vide...",
              buttons: ['fermer']
            });
            alert.present();
            }
          }
        }
      ]
    });
    prompt.present();   
  }

              
  ionViewDidLoad() {//data binding  firsNameProfile
    this.afAuth.authState.take(1).subscribe(data => {      
      this.profileData = this.afDatabase.object(`profile/${data.uid}/`);
 
    });
                    // to see all users
    this.userRef.on('value', userList => {
      let users = [];
      userList.forEach(user => {
        users.push(user.val());
        return false; 
      }); 
      this.userList = users; 
      this.loadedUserList = users;
    
    });  
    

     //get profil values from DATABASE
 this.afAuth.authState.take(1).subscribe(data =>{
  firebase.database().ref(`profile/${data.uid}/`).ref.once('value',(profile) =>{  
    var laNameCur=profile.val().lastName;
     this.name = laNameCur;
     console.log(this.name);
    });  
  });
 




  }


  initializeItems():void {
    this.userList = this.loadedUserList;
  }


  getItems(searchbar){// Reset items back to all of the items 
    this.initializeItems();// set q to the value of the searchbar 
    var q = (searchbar.srcElement||searchbar.target).value;
                  // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    this.userList = this.userList.filter((v) =>{
      if( v.lastName && q) {
        if (v.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q, this.userList.length);
  }
  
  UserSelected(user) {                                           // button select member
  
  this.name2 = user.lastName;
  let userAccess=this.groupMemb.indexOf(this.name2);//check if the member is already in
  console.log(userAccess);
    if(this.name2!=this.name&&userAccess < 0){ //the loop given no acces to current user
      
        //push values to DATABASE(profil members and group members)
      this.afAuth.authState.take(1).subscribe(data =>{
        let getMem1 =firebase.database().ref(`profile/${data.uid}/group/${this.getGroupKey_2}/members`).push(user).key;
        this.getMemberkey1 = getMem1; 
        let getMem = firebase.database().ref(`groups/${data.uid}/group/${this.getGroupkey}/members`).push(user).key;
        this.getMemberKey = getMem;    
        
        });
                             // get list of groups current user profile + newKey      a voir
      this.afAuth.authState.take(1).subscribe(data => {
        let listOfDatUser1 = firebase.database().ref(`profile/${data.uid}/group/${this.getGroupKey_2}/members/${this.getMemberkey1}`)
        let listOfDatUser = firebase.database().ref(`groups/${data.uid}/group/${this.getGroupkey}/members/${this.getMemberKey}`)
        listOfDatUser.ref.once("value", function(snapshot) {
        
         Object.keys(snapshot.val()).map(function(memberInfos){
        let members = snapshot.val()[memberInfos];
        let member =[];
        member.push(snapshot.val());
             
        console.log(memberInfos,members,snapshot.key);

            return members;
            });    
            
          });  
      this.afAuth.authState.take(1).subscribe(data =>{ //get current group of name members
        firebase.database().ref(`groups/${data.uid}/group/${this.getGroupkey}/members`).on('value', (snap) =>{  
           console.log("__",snap.val());
            this.items = [];
            snap.forEach( itemSnap => {
            this.items.push(itemSnap.val()); 
            return false;  
            }); 
             console.log(this.items);
             });
        });

         //add each member in a Array memory 
         this.groupMemb.push(this.name2);
         console.log(this.groupMemb);
         
        }); 
        let loader = this.loadingCtrl.create({
          content: this.name2+" ok ",
          duration: 500
        });
        loader.present();
      
        } else{   //error message 
            console.log("non enregstrée");
            let loader = this.loadingCtrl.create({
              content: " Deja inscrit "+ this.name,
              duration: 500
            });
            loader.present();
            console.log("currentUser ="+ this.name);
            console.log("selectUser ="+ this.name2);
          };
         

  }
 
  get()  {

  this.seeViewListGroup = !this.seeViewListGroup; //open the list of the group'smembers
  

  
   

}
 
  dele() { // remove the actual group
    let alert = this.alertCtrl.create({
      title: "groupe supprimé...",
      buttons: ['fermer']
    });
    alert.present();
    
    console.log("moi ="+ this.name);
    console.log("user selectionné ="+ this.name2);
    console.log("groupe actuel ="+this.groupNam+"key"+this.getGroupkey+this.getGroupkey.members );
    console.log("liste membres selectionnés du groupe"+this.groupMemb.values());
    this.afAuth.authState.take(1).subscribe(auth =>{
        this.afDatabase.list(`profile/${auth.uid}/group`).remove(`/${this.getGroupKey_2}/`); 
        this.afDatabase.list(`groups/${auth.uid}/group`).remove(`/${this.getGroupkey}/`);
    });//delete all group
    this.navCtrl.push('HomePage');
    }
  all() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez-vous tout effacer ?',
      buttons: [
        {
          text: 'Refuser',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Accepter',
          handler: () => {
            console.log('oui');
            this.afAuth.authState.take(1).subscribe(auth =>{
              this.afDatabase.list(`profile/${auth.uid}/`).remove(`/group`); 
              this.afDatabase.list(`groups/${auth.uid}/`).remove(`/group`);
          });//delete all group
          this.navCtrl.setRoot('HomePage');
          }
        }
      ]
    }); 
    confirm.present(); 
  }
   
   
 




}