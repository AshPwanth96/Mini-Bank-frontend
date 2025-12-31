import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  email = '';
  password = '';

  constructor(private route: Router) { }

  login(){

  const users = JSON.parse(localStorage.getItem('users')||'[]');

  const user = users.find(
    (u:any) => u.email === this.email && u.password === this.password
  );

  if(!user){
    alert('Enter correct email and password');
    return;
  }



      user.lastLogin = new Date();

      localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true')

    alert('Login successfull');

    this.route.navigate(['/dashboard'])
 
    
  }

  
  goToSignup(){
    this.route.navigate(['/signup'])
  }


}

