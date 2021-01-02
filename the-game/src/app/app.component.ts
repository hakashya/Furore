import { Component, HostListener, OnDestroy } from '@angular/core';
import { sign } from 'crypto';
import { BackendService } from 'src/app/services/backend.service';
import { SignalrService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'YIKES!';
  trigger: string = '';

  constructor(private backend: BackendService, private signalr: SignalrService) {
    signalr.backendConnect();
    signalr.participantUpdate();
    signalr.receiveQuestion();
    signalr.reciveVotingOptions();
    console.log(signalr);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event: any) {
    this.trigger = event;
    console.log(this.trigger);
    return false;
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event: any) {
    console.log(event);
    this.signalr.leaveGame(sessionStorage.getItem("roomcode") || "", sessionStorage.getItem("name") || "").then(
      (response) => {
        console.log(response)
        sessionStorage.clear();
      }
    ).catch(
      (err) => {
        console.log(err)
      }
    );
    /*
    this.backend.quitRoom(sessionStorage.getItem("roomcode"), sessionStorage.getItem("name")).subscribe(
      (response) => {
        console.log(response)
        sessionStorage.clear();
      },
      (err) => {
        console.log(err)
      }
    );
    */
  }
}
