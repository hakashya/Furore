import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name: string = '';
  joincode: string = '';
  displayAlert: boolean = false;

  constructor(private backend: BackendService, private router: Router) {
  }

  ngOnInit(): void {
  }

  generateNewRoomCode(): void {
    this.joincode = this.createCode(8);
    console.log(this.joincode);
  }

  submitName(): void {

    this.displayAlert = false;
    if (this.name.length === 0 || this.joincode.length === 0) {
      this.displayAlert = true;
      return;
    }

    this.backend.joinTheRoom({ participantName: this.name, roomCode: this.joincode, score: 0, isReady: false }).subscribe(
      (response) => {
        console.log(response)
        sessionStorage.setItem("name", this.name);
        sessionStorage.setItem("roomcode", this.joincode);
        sessionStorage.setItem("score", "0");
        this.router.navigate(['/lobby']);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  createCode(length: number): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
