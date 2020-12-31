import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question: string = "ques";

  constructor(public signalr: SignalrService) { }

  ngOnInit(): void {
    this.question = sessionStorage.getItem("question") || "NoQ";
  }

}





/* Ref:

https://freefrontend.com/css-speech-bubbles/





*/