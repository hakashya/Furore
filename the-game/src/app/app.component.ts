import { Component, HostListener, OnDestroy } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title: string = 'YIKES!';
  trigger: string = '';

  constructor(private backend: BackendService) {
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event: any) {
    this.trigger = event;
    console.log(this.trigger);
    return false;
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event: any) {
    console.log(this.trigger);
    this.backend.quitRoom(sessionStorage.getItem("roomcode"), sessionStorage.getItem("name")).subscribe(
      (response) => {
        console.log(response)    
        sessionStorage.clear();
      },
      (err) => {
        console.log(err)
      }
    );
  }  

}
