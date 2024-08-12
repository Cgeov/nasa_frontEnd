import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  //RUTA BASE
  { path: '', component: HomeComponent },
  //RUTAS ANIDADAS
  { path: 'details/:id', component: DetailsComponent },
  //EN CASO EXISTA UNA RUTA QUE NO ESTE DECLARADA AQUI REDIRIGIRA A HOME
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
