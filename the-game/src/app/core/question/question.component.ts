import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Answer } from 'src/app/Models/answer.model';
import { Participant } from 'src/app/Models/participant.model';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question: string = "No Question";
  showAnswers: boolean = false;
  allParticipants: Participant[] = []
  submitAnswer: boolean = false;
  answer: string = "";
  progressPercent: number = 0;
  subscription: Subscription;
  votingOptions: Answer[] = [];

  constructor(public signalr: SignalrService) {
    const source = interval(2000);
    this.subscription = source.subscribe(val => this.autoRefreshQuestions());
  }

  ngOnInit(): void {
    this.question = sessionStorage.getItem("question") || this.question;
  }

  answerSubmitted(): void {
    this.submitAnswer = true;
    this.signalr.submitAnswer(sessionStorage.getItem("roomcode") || "", sessionStorage.getItem("name") || "", this.answer);
    console.log("I told: ", this.answer);
  }


  autoRefreshQuestions(): void {

    this.allParticipants = JSON.parse(sessionStorage.getItem("allParticipants") || "");
    console.log(this.submitAnswer);
    if (this.submitAnswer) {
      this.votingOptions = JSON.parse(sessionStorage.getItem("votingOptions") || "[]");

      if (this.votingOptions.length === this.allParticipants.length) {
        this.showAnswers = true;
      }
    }
  }

  relayVote(name: string): void {

  }

  loginconsole(name: string): void {
    console.log("Card was clicked ", name);
  }
}



/* Ref:

https://freefrontend.com/css-speech-bubbles/





*/