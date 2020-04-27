import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ForditoComponent } from './components/fordito/fordito.component';
import { SzinonimakComponent } from './components/szinonimak/szinonimak.component' 


const routes: Routes = [
  {path: "fordito", component: ForditoComponent},
  {path: "szinonimak", component: SzinonimakComponent},
  {path: "", component: HomeComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
