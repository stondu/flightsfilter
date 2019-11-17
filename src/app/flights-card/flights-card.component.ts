import { Component, OnInit, Input } from '@angular/core';

import {FlightOption} from '../flights.interface';

@Component({
  selector: 'app-flights-card',
  templateUrl: './flights-card.component.html'
})
export class FlightsCardComponent implements OnInit {

  @Input() flightOption:FlightOption;

  constructor() { }

  ngOnInit() {
  }

}
