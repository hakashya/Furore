import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Participant } from '../Models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  connection: signalR.HubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44385/roomhub").configureLogging(signalR.LogLevel.Information).build();

  constructor() {

  }


  joinGame(room: string, self: Participant): Promise<any> {
    return this.connection.invoke("joinGameRoom", room, self);
  }

  participantUpdate(): void {
    //let _all: Participant[] = [];
    this.connection.on("participantUpdate", (allParticipants: Participant[]) => {
      //console.log("abc", allParticipants);
      //_all = allParticipants;
      sessionStorage.setItem("allParticipants", JSON.stringify(allParticipants));
    });
    //return _all;
  }

  indicateReadiness(room: string, name: string): Promise<any> {
    return this.connection.invoke("readinessUpdate", room, name);
  }


  backendConnect(): void {
    this.connection.start().then(
      (item) => {
        console.log("Connection started" + item);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  }

}
