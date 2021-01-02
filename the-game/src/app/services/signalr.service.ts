import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Answer } from '../Models/answer.model';
import { Participant } from '../Models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  connection: signalR.HubConnection = new signalR.HubConnectionBuilder().withUrl("https://thegamebackend.azurewebsites.net/roomhub").configureLogging(signalR.LogLevel.Information).build();

  constructor() {

  }


  joinGame(room: string, self: Participant): Promise<any> {
    return this.connection.invoke("joinGameRoom", room, self);
  }

  participantUpdate(): void {
    this.connection.on("participantUpdate", (allParticipants: Participant[]) => {
      sessionStorage.setItem("allParticipants", JSON.stringify(allParticipants));
    });
  }

  indicateReadiness(room: string, name: string): Promise<any> {
    return this.connection.invoke("readinessUpdate", room, name);
  }


  receiveQuestion(): void {
    this.connection.on("receiveQuestion", (qeustion: string) => {
      sessionStorage.setItem("question", qeustion);
      console.log(qeustion);
    });
  }

  reciveVotingOptions(): void {
    this.connection.on("allowVoting", (votingOptions: Answer[]) => {
      sessionStorage.setItem("votingOptions", JSON.stringify(votingOptions));
      console.log(votingOptions);
    });
  }
  submitAnswer(roomcode: String, participantName: String, answer: String): void {
    this.connection.invoke("submitAnswer", roomcode, participantName, answer);
  }

  submitVote(roomcode: String, votername: String, voteename: String): Promise<any> {
    return this.connection.invoke("receiveVote", roomcode, votername, voteename);
  }

  leaveGame(room: string, name: string): Promise<any> {
    return this.connection.invoke("leaveGameRoom", room, name);
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
