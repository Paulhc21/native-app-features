import { Location } from './../../models/location';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { SetLocationPage } from '../set-location/set-location';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl = '';

  constructor(private modalCtrl: ModalController, 
              private geoLocate: Geolocation, 
              private loadingCtrl: LoadingController, 
              private toastCtrl: ToastController,
              private takePhoto: Camera) { }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    )
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geoLocate.getCurrentPosition()
      .then(
        (resp) => {
          loader.dismiss();
          this.location.lat = resp.coords.latitude;
          this.location.lng = resp.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: `${error} Location Not Available, Please Select Manually`,
            duration: 2500
          });
          toast.present();
        }
      );
  }

  onTakePhoto() {
    const options: CameraOptions = {
      encodingType: this.takePhoto.EncodingType.JPEG,
      correctOrientation: true
    }

    this.takePhoto.getPicture(options)
      .then(
        imageData => {
          this.imageUrl = imageData;
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
  }

}
