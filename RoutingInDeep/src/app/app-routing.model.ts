import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', canActivateChild: [AuthGuard], component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },
      ] 
    },
    { path: 'servers', canActivate: [AuthGuard], component: ServersComponent, children: [
        { path: ':id', component: ServerComponent, resolve: { server: ServerResolver } },
        { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]},
      ] 
    },
    { path: '**', component: PageNotFoundComponent, data: { message: 'Page not found!!!' }}
  ]

@NgModule({
   imports: [
    RouterModule.forRoot(appRoutes)
   ],
   exports: [RouterModule]
})
export class AppRoutingModule {

}