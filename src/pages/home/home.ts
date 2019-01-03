import { AddPlacePage } from './../add-place/add-place';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  addPlacePage = AddPlacePage;

  constructor(public navCtrl: NavController) {

  }

}
