import { Injectable } from '@angular/core';
import { FLIGHTS_JSON, MONTHS } from './flightsData';
import { FlightOption, UtcDateTime } from './flights.interface';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  flightsData =  FLIGHTS_JSON;
  monthNames = MONTHS
  constructor() { }

  // return type is any because we are returning both airlines and all flight options
  getFlightsInfo(): Array<any>{
    let availableFlightOptions = [];
    let availableAirlineOptions = [];
    this.flightsData.forEach((option)=> {
      // this is to only get the information that we show in template so that we dont have to have long references to parse in template
      let eachFlight = {}
      eachFlight['airlineLogUrl'] =  option.flight.flightSegments[0].highResAirlineLogoUrl;
      eachFlight['airlineName'] = option.flight.flightSegments[0].airlineName;
      eachFlight['departureTime'] = this.utcToTime(option.flight.flightSegments[0].departureDateAndTime);
      eachFlight['departureAirportCode'] = option.flight.flightSegments[0].departureAirportCode;
      eachFlight['arrivalTime'] = this.utcToTime(option.flight.flightSegments[option.flight.flightSegments.length-1].arrivalDateAndTime);
      eachFlight['arrivalAirportCode'] = option.flight.flightSegments[option.flight.flightSegments.length-1].arrivalAirportCode;
      eachFlight['stopCount'] = option.flight.flightSegments.length-1;
      eachFlight['totalDuration'] = this.minsToDuration(option.flight.durationMinutes);
      eachFlight['price'] = option.priceInfo.totalPrice;
      eachFlight['showOption'] = true; // this is a custom value which determines if we should show or hide the option
      availableFlightOptions.push(eachFlight);

     // this is to get all different airlines options available in the left panel. Later I am removing duplicates by using Javascript Set
      availableAirlineOptions.push(option.flight.flightSegments[0].airlineName);
    } )

    //removing airline duplicates by using using Set
    let availableAirlines = Array.from( new Set(availableAirlineOptions));

    // returning both available airlines and options for filtering in component.
    return [availableAirlines,availableFlightOptions]; 
  }

  /* @help method to convert minutes to hours-mins */
  minsToDuration(mins: number): string {
    let givenmins = mins;
    let hours = (givenmins / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return  rhours + "h " + rminutes + "m";
  }

  utcToTime(utcDate: string): UtcDateTime{
    var event = new Date(utcDate);
    
    if(event.getHours()>12){
      return {time:event.getHours()-12 + ':' + event.getMinutes() + ' pm', date:this.monthNames[event.getMonth()] + ' ' + (event.getDate())};
    } else{
      return {time: event.getHours() + ':' + event.getMinutes() + ' am', date:this.monthNames[event.getMonth()] + ' ' + event.getDate()} ;
    }
    
}

}
