import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LobbyScreenComponent } from './core/lobby-screen/lobby-screen.component';
import { QuestionComponent } from './core/question/question.component';
import { SignalrService } from './services/signalr.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LobbyScreenComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SignalrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
