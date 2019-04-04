import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatListModule,
} from '@angular/material';
import { MatProgressBarModule } from '@angular/material';

import { PipDocumentLayoutModule, PipMediaModule, PipShadowModule } from 'pip-webui2-layouts';
import { PipEmptyStateModule, PipRefItemModule } from 'pip-webui2-controls';
import { PipSelectedModule } from 'pip-webui2-behaviors';

import { DevicesListComponent } from './devices-list.component';

@NgModule({
  declarations: [
    DevicesListComponent
  ],
  imports: [
    PipDocumentLayoutModule,
    PipMediaModule,
    PipShadowModule,

    FormsModule,
    CommonModule,

    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,

    PipEmptyStateModule,
    PipRefItemModule,
    PipSelectedModule
  ],
  exports: [
    DevicesListComponent
  ],
  providers: [],
})
export class DevicesListModule { }
