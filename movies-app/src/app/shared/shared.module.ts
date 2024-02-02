import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';



@NgModule({
  declarations: [
    NavbarComponent,
    PageNotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatCardModule,
    NavbarComponent
  ]
})
export class SharedModule { }
