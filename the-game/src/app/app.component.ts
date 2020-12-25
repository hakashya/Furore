import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'YIKES!';

  constructor(private backend: BackendService) {

  }

  onBeforeUnload(): void {

    this.backend.quitRoom(localStorage.getItem("roomcode"), localStorage.getItem("name")).subscribe(
      (response) => {
        console.log(response)
      },
      (err) => {
        console.log(err)
      }
    )
    localStorage.clear();
  }
}
