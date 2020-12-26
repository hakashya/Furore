import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participant } from 'src/app/Models/participant.model';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-lobby-screen',
  templateUrl: './lobby-screen.component.html',
  styleUrls: ['./lobby-screen.component.scss']
})
export class LobbyScreenComponent implements OnInit {

  allParticipants: Participant[] = [];

  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentState();
    //if (localStorage.getItem("roomcode") == null) {       //If somebody goes to lobby without logging in, they're redirected.
    //  this.router.navigate(['/home'])
    //}
  }

  getCurrentState(): void {
    this.backend.fetchCurrentState(localStorage.getItem("roomcode")).subscribe(
      (response) => {
        this.allParticipants = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setReady(): void {

  }
}
