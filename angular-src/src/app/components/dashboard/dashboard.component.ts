import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string
  memo: string

  constructor(
    private http: Http,   
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
  }
  onAddNote() {
    const note = {
      title: this.title,
      memo: this.memo
    }
    this.authService.addNote(note).subscribe(data => {
      if(data.success){
        this.flashMessage.show("You aded note", {cssClass: 'alert-success', timeout: 3000})
        
      }else {
        this.flashMessage.show("Something went wrong", {cssClass: 'alert-danger', timeout: 3000})
  
      }
    })
  }
}


