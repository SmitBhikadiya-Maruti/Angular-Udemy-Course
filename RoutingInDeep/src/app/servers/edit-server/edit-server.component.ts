import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changedSaved = false;

  constructor(
    private serversService: ServersService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((query: Params)=>{
      this.allowEdit = query['allowEdit'] === '1' ? true: false;
    })
    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changedSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route, queryParamsHandling: 'preserve' })
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean>{
    if(!this.allowEdit){
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changedSaved) {
      return confirm('Do you want to discard the changes?');
    }else{
      return true;
    }
  }

}
