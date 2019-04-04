import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'pip-clients-shell';

import { DevicesContainerComponent } from './devices/containers/devices-container/devices-container.component';

const appRoutes: Routes = [
  { path: '', component: DevicesContainerComponent, canActivate: [AuthGuard] },
  { path: '404', redirectTo: '' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
