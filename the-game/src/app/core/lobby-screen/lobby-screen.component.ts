import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participant } from 'src/app/Models/participant.model';
import { BackendService } from 'src/app/services/backend.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { interval, Subscription } from 'rxjs';
import { Answer } from 'src/app/Models/answer.model';

@Component({
  selector: 'app-lobby-screen',
  templateUrl: './lobby-screen.component.html',
  styleUrls: ['./lobby-screen.component.scss']
})
export class LobbyScreenComponent implements OnInit, OnDestroy {

  allParticipants: Participant[] = [];
  subscription: Subscription;
  isReady: boolean = false;
  progressPercent: number = 0;
  isActive: boolean = false;

  constructor(private signalr: SignalrService, private router: Router) {
    //this.allParticipants = this.signalr.participantUpdate();
    const source = interval(2000);
    this.subscription = source.subscribe(val => this.autoRefresh());
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    //this.allParticipants = this.signalr.participantUpdate();
    //console.log(this.allParticipants);
    this.allParticipants = JSON.parse(sessionStorage.getItem("allParticipants") || "");
    let votes: Answer[] = JSON.parse(sessionStorage.getItem("votingOptions") || "[]");
    if (votes.length < 1) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }


  autoRefresh(): void {
    this.allParticipants = JSON.parse(sessionStorage.getItem("allParticipants") || "");
    let votes: Answer[] = JSON.parse(sessionStorage.getItem("votingOptions") || "[]");
    if (votes.length < 1) {
      this.isActive = true;
    }
    else {
      this.isActive = false;
    }

    console.log(this.isReady);
    if (this.isReady) {
      let count: number = 0;
      for (var person of this.allParticipants) {
        if (person.isReady == true) {
          count++;
        }
      }
      if (count === this.allParticipants.length) {
        this.router.navigate(['/question']);
      } else {
        this.progressPercent = (count / this.allParticipants.length) * 100;
        console.log(this.progressPercent);
      }
    }
  }

  setReady(): void {
    this.isReady = true;
    this.signalr.indicateReadiness(sessionStorage.getItem("roomcode") || "", sessionStorage.getItem("name") || "").then(
      (response) => {
        console.log(response);
      }
    )
  }
}