import { Component, EventEmitter, Output,OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import{HttpEvent, HttpEventType}from '@angular/common/http';
import{AuthService}from '../../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  @Output() featureSelected = new EventEmitter<string>();
  constructor(private datastorageservice:DataStorageService,private authservice:AuthService){

  }
  ngOnInit(){
    
  }
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  onFetchData(){
    this.datastorageservice.getRecipes();
  }
  onLogout(){
    this.authservice.logout();
  }
  onSaveData(){
   this.datastorageservice.storeRecipe().subscribe(
      (response)=>{
       console.log(response);
     }
    //  (response:HttpEvent<Object>)=>{
    //    console.log(response.type === HttpEventType.Sent);
    //  }
   )
  }
}
