import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { Participant } from '../Models/participant.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private hostName = "https://localhost:44385"//"https://thegamebackend.azurewebsites.net"

  constructor(private http: HttpClient) { }

  joinTheRoom(details: Participant): Observable<any> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.post(this.hostName + "/api/RoomManagement", details, { headers });
  }

  fetchCurrentState(roomCode: any): Observable<any> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.get(this.hostName + "/api/RoomManagement/All?roomCode=" + roomCode, { headers });
  }

  quitRoom(roomCode: any, name: any): Observable<any> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.get(this.hostName + "/api/RoomManagement/Quit?roomCode=" + roomCode + "&name=" + name, { headers });
  }

  private takeCareOfThisError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
