import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Participant } from 'src/app/Models/participant.model';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-lobby-screen',
  templateUrl: './lobby-screen.component.html',
  styleUrls: ['./lobby-screen.component.scss']
})
export class LobbyScreenComponent implements OnInit {

  allParticipants: Participant[] = [];

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.getCurrentState();
  }

  getCurrentState(): void {
    this.backend.fetchCurrentState(sessionStorage.getItem("roomcode")).subscribe(
      (response) => {
        console.log(response)
        this.allParticipants = response;
        console.log(this.allParticipants);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
