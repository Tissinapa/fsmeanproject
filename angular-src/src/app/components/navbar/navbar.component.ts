import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService
    
    ) { }

  ngOnInit() {
  }
  onLogoutClick(){
    
    if(!this.authService.loggedIn()){
      this.flashMessage.show("You are not logged in", {
        cssClass: "alert-success", timeout: 3000
      })
      return false;
    }

    this.authService.logout()
    this.flashMessage.show("Logged out", {
      cssClass: "alert-success", timeout: 3000
    })
    this.router.navigate(['/'])
    return false

  }
}
