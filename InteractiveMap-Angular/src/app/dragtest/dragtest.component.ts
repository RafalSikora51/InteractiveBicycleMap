import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dragtest',
  templateUrl: './dragtest.component.html',
  styleUrls: ['./dragtest.component.css']
})
export class DragtestComponent implements OnInit {
  listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
  constructor() { }

  ngOnInit() {
  }
}
