import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { QuestionComponent } from '../core/question/question.component';
import { Answer } from '../Models/Answer.model';
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
