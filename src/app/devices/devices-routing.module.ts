import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'pip-clients-shell';

import { DevicesContainerComponent } from './containers/devices-container/devices-container.component';

export const routes: Routes = [
  { path: '', component: DevicesContainerComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
