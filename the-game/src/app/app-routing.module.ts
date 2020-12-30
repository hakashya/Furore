import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LobbyScreenComponent } from './core/lobby-screen/lobby-screen.component';
import { QuestionComponent } from './core/question/question.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'lobby', component: LobbyScreenComponent },
  { path: 'question', component: QuestionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', component: ThirdScreenComponent, pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
