import { Component} from '@angular/core';

@Component({
    selector: 'app-server',  //html tag to use it later, use unique selector name
    templateUrl: './server.component.html' //point to html file, where to find et THEN IMPORT EVERYTHING IN APP COMPONENT
}) 
export class ServerComponent {
    searchId = 10;
    searchStatus = 'offline';
}