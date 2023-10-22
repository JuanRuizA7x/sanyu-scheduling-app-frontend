import { Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  currentYear:number;

  constructor(){
    this.currentYear = new Date().getFullYear();
  }

}
