import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.css']
})

export class AgeComponent implements OnInit {
  public show = true;
  onSubmit(){
    this.show = false;
  }
  constructor() { 
    
  }
  
  ngOnInit() {
  }

}
