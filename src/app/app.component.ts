import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
isMap:Boolean;
isData:Boolean;
    

//myGeojSonLayerGroup:any;

  constructor(){
    this.isMap = true;
    this.isData = false;
  }
  dataClicked(){
  this.isData=true;
  this.isMap =false;
  }
  mapClicked(){
    this.isMap =true;
    this.isData = false;
  }

  
}
