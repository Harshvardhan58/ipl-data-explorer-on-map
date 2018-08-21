import { Component, AfterViewInit,ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  FileLabel = 'Choose File';
  fileData:any;
  FileToUpload;
  constructor(private _http:Http,private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr); 
  }
  ngAfterViewInit(){

  }
  onFileChange(event) {
    let reader = new FileReader();
    reader.onloadend = ()=>{
      this.fileData =  reader.result;
     console.log("data");
    }
    if(event.target.files && event.target.files.length > 0) {
      this.FileToUpload = event.target.files[0];
      this.FileLabel=event.target.files[0].name;
      reader.readAsText(event.target.files[0])
      reader.onloadend
    }
    else{
      this.FileLabel = 'Choose File';
    }
  }
  uploadData():boolean{
    if(this.fileData!= undefined){
      let formdata = new FormData();
      formdata.append('filetoupload',this.FileToUpload,this.FileToUpload.name);
      this._http.post('/upload',formdata).subscribe((data)=>{
        this.toastr.success('file Uploaded successfully.','success');
      });
      
    }
    return false;  
  }
}

