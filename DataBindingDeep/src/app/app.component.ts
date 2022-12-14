import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [
    { type: 'server', name: 'Testserver', content: 'Just a test!' }
  ];

  oddNumbers:number[] = [];
  evenNumbers:number[] = [];

  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    })
  }

  onBlueprintAdded(bluePrintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: bluePrintData.serverName,
      content: bluePrintData.serverContent
    })
  }

  onChangeFirst(){
    this.serverElements[0].name = 'changed';
  }

  onDestroyFirst(){
    this.serverElements.splice(0,1);
  }

  onFiredInterval(num: number){
    if(num%2===0){
      this.evenNumbers.push(num);
    }else{
      this.oddNumbers.push(num);
    }
  }
}
