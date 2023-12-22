import { ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'app/services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String
  username: String
  email: String
  password: String
  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    console.log(this.name)
    console.log(this.username)
    console.log(this.email)
    console.log(this.password)
    //required fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Please fill all fields", {cssClass: 'alert-danger', timeout: 3000})
      return false
    }
    

    // validate email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Please user correct email", {cssClass: 'alert-danger', timeout: 3000})
      return false
    }


    //register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show("You are now registered", {cssClass: 'alert-success', timeout: 3000})
        this.router.navigate(['/login'])
      }else {
        this.flashMessage.show("Something went wrong", {cssClass: 'alert-danger', timeout: 3000})
        this.router.navigate(['/register'])
      }
    })


  }

 


}
