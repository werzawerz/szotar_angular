import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForditoComponent } from './components/fordito/fordito.component';
import { HomeComponent } from './components/home/home.component';
import { NavingComponent } from './components/naving/naving.component';


const routes: Routes = [
  {path: "fordito", component: ForditoComponent},
  {path: "", redirectTo: "home", pathMatch:'full'},
  {path: "home", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
