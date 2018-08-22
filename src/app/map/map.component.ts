import { Component, AfterViewInit,ViewContainerRef } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import { Http } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map :Map;
  seasons:any;
  dates:any;
  mymarkers;
  curActive:any;
  MyIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.3/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.3/images/marker-shadow.png',
});
  constructor(private _http:Http,private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr); 
      this._http.get('./get_all_seasons').subscribe(data=>{
        try{
          let d = data.json();
          d.sort();
          this.seasons = d;
          console.log(this.seasons);
        }
        catch(e){
          this.toastr.error('There is some error in fetching result. Please reload the Page.','Error');
        }
        
      });
   }

  
  ngAfterViewInit() {
    this.map = L.map('leaflet-map-component').setView([12.9715987, 77.59456269999998], 5);


    let streets   = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiaGFyc2g1OCIsImEiOiJjamwwdzVlOWgxNW9iM3ZyMGxpZ2x4aHFpIn0.fgbq-H2fSC9Bg4G73B6MeA',{ attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
    this.map.addLayer(streets);
    // var littleton = L.marker([12.9715987, 77.59456269999998],{icon:MyIcon}).bindPopup('bangalore').addTo(this.map),
    // denver    = L.marker([28.7040592, 77.10249019999992],{icon:MyIcon}).bindPopup('delhi').addTo(this.map),
    // aurora    = L.marker([19.0759837, 72.87765590000004],{icon:MyIcon}).bindPopup('mumbai').addTo(this.map),
    // golden    = L.marker([32.219042, 76.32340369999997],{icon:MyIcon}).bindPopup('dharamshal').addTo(this.map);
    
  }
  get_all_dates_season(event){
    this._http.get('/get_all_dates_season?season='+event.target.value).toPromise().then(data=>{
      let d = data.json();
      d.sort((date1, date2)=> {
        let tmp = date1.split("-");
        date1 = [tmp[1],tmp[0],tmp[2]].join("-");
        tmp = date2.split("-");
        date2 = [tmp[1],tmp[0],tmp[2]].join("-");
        if (new Date(date1) < new Date(date2)) return -1;
        if (new Date(date1) > new Date(date2)) return 1;
        return 0;
       } );
      this.dates=d;
    });
    
  }
   get_map_data(id){
     if(this.mymarkers!=undefined){
       this.mymarkers.forEach(element => {
         this.map.removeLayer(element);
       });
     }
     this.curActive = id;
     this.mymarkers=[];
    this._http.get('/get_map_data?date='+id).toPromise().then(async (data)=>{
      let rs = data.json();
      for(let r of rs){
        let loc = await this.getlatlng(r.city);
        let popup = `<div class="card">
                      <div class="card-header">
                       ${r.city} - (${r.date})
                      </div>
                      <div class="card-body">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Team 1 : ${r.team1}</li>
                        <li class="list-group-item">Team 1 : ${r.team2}</li>
                        <li class="list-group-item">Winner : ${r.winner}</li>
                        <li class="list-group-item">Player of Match : ${r.player_of_match}</li>
                        <li class="list-group-item">Venue : ${r.venue}</li>
                      </ul>
                      </div>
                    </div>`;
        let tmp =L.marker([loc['lat'], loc['lng']],{icon:this.MyIcon}).bindPopup(popup).addTo(this.map);
        this.mymarkers.push(tmp);
        this.map.setView([loc['lat'],loc['lng']],5);
      }
      
    });  
  }
  async getlatlng(address){
    return await this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).toPromise().then(data=>{
      let d = data.json();
      let result={};
      result['lat'] = d.results[0].geometry.location.lat;
      result['lng'] = d.results[0].geometry.location.lng;
      return result;
    });
  }

}
