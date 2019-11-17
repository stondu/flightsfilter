
export interface FlightOption {
    
   airlineLogUrl: string;
   airlineName: string;
   departureTime: string
   departureAirportCode: string;
   arrivalTime:string;
   arrivalAirportCode:string;
   stopCount: number;
   totalDuration:string;
   price:string;
   showOption:boolean;
}

export interface UtcDateTime{
    time: string;
    date:string;
}