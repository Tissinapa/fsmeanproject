import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formDataArray: any[] = [];
  formData = {
    title: '',
    url: ''
  };
  submitted = false;

  constructor() { }

  ngOnInit() {
  }
  submitForm() {
    this.submitted = true;
  }
}


