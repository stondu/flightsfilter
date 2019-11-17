
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { tap ,map} from 'rxjs/operators'

import { FlightsService } from './flights.service';
import { FlightOption } from './flights.interface';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  availableAirlineOptions : string[];
  availableFlightOptions: Array<FlightOption>; 
  flightsInfo: any[]; 
  tripActionsForm: FormGroup

  constructor(private _flightInfoService: FlightsService, private _formBuilder: FormBuilder) {}

  ngOnInit() {
      this.tripActionsForm = this._formBuilder.group({
        'checkboxes': this._formBuilder.group({}),
    });
    this.getFlightInformation();
    this.onUserSelection();
  }

  getFlightInformation(): void{
    this.flightsInfo = this._flightInfoService.getFlightsInfo();  
    this.availableAirlineOptions = this.flightsInfo[0];
    this.availableFlightOptions = this.flightsInfo[1];  
    this.setAvailableAirlinesValues();
  }

/* @using this method to neatly set values of each airlines to a boolean value.
   Added a console to valuechanges subscrption to see the json object. */
  setAvailableAirlinesValues(): void{

    this.availableAirlineOptions.forEach((option: any) => {
      const checkboxes = <FormGroup>this.tripActionsForm.get('checkboxes');
      checkboxes.addControl(option, new FormControl(false));
  });
  }

  onUserSelection(): void{
    this.tripActionsForm.valueChanges.pipe(
      map((valuechanges)=> this.transformUserSelectionToArray(valuechanges)),
      tap((val)=> console.log(val)) // for testing
    ).subscribe((userSelection)=>{
      this.filterAirlineOptions(userSelection)
    })
  }

  /* transforms user selection object to an array. 
  example: {checkboxes:{'American Airlines':true , 'United':false, 'Sprint':true }} ==> [American Airlines,Sprint]*/
  transformUserSelectionToArray(formValues): Array<string> {
    let userSelection : string[]= [];
    for(let airline in formValues['checkboxes']){
      if(formValues['checkboxes'][airline]){
        userSelection.push(airline)
      }
    }
    return userSelection;
  }

  /*  filters flight options to be shown to airlines*/
  filterAirlineOptions(userSelection): void {

    if(userSelection.length == 0){    //  if no user selection, show it all.
        this.availableFlightOptions.forEach((flightOption)=>{
            flightOption.showOption= true;
        })
    }else{  // if there is a user selection, hide rest of the options. 
      this.availableFlightOptions.forEach((flightOption)=>{
        if(userSelection.includes(flightOption.airlineName)){
          flightOption.showOption= true;
        }else{
          flightOption.showOption= false;
        }
      })
    }
  }
}
