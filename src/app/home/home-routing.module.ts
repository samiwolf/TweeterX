import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {AuthGuard} from "../service/auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
