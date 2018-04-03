import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, Marker, CameraPosition, LatLng, GoogleMapsEvent, MarkerOptions } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  @ViewChild('map') mapElement: ElementRef;
  map:GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _googleMaps: GoogleMaps, private _geoLoc: Geolocation) {
  }

  ngAfterViewInit(){
    let loc: LatLng;
    this.initMap();
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.getLocation().then( res => {
        console.log(res.coords.latitude)
        console.log(res.coords.longitude)
        loc = new LatLng(res.coords.latitude, res.coords.longitude);
        this.moveCamera(loc);

        this.createMarker(loc, "Me").then((marker: Marker) =>{
          marker.showInfoWindow();
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
    });
    
  }

  initMap(){
    let element =this.mapElement.nativeElement;
    this.map = this._googleMaps.create(element)
  }

  getLocation(){
    return this._geoLoc.getCurrentPosition();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  moveCamera(loc:LatLng){
    let options: CameraPosition<any> = {
      target: loc,
      zoom: 15,
      tilt: 10
    }
    this.map.moveCamera(options)
  }


  createMarker(loc: LatLng, title: string){
    let markerOptions: MarkerOptions ={
      position: loc,
      title: title
    };
    return this.map.addMarker(markerOptions);
  }
  
  

}

