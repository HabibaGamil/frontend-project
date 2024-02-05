import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';

const routes: Routes = [

  {path: '', redirectTo: "discover", pathMatch:'full'},

  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  { path: 'discover', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  {path: "page-not-found", component: PageNotFoundComponent},
  {path: "server-error", component: ServerErrorComponent},
  { path: '**', component: PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
