import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  notes:any[]

  constructor(
    private authService:AuthService, 
    private router:Router) { }

  ngOnInit() {
    this.authService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

}
