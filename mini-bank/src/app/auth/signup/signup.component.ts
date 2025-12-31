import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name = '';
  email= '';
  password='';
  balance = 0;

  constructor(private route:Router){}

  signup(){

    if(!this.name||!this.email||!this.password){
      alert('All fields are mandatory');
      return;

    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

    if(!emailPattern.test(this.email)){
      alert("please enter valid email address");
      return;
    }

    if(this.password.length<=5){
      alert('Password must be atleast 6 characters long');
      return;
    }

    if(this.balance< 1000){
      alert("initial deposit should be greater than 1000");
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')||'[]');

    const userExists =  users.find(
      (u:any) => u.email === this.email
    )

    if(userExists){
      alert('User exists already, please login');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: this.name,
      email: this.email,
      password: this.password,
      balance: this.balance,
      accountNumber : 'SB'+Math.floor(1000000 +Math.random()*9000000),
      fixedDeposit: [],
      lastLogin : null
    }

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    alert('Account Created successfully');

    this.route.navigate(['/login'])

  

  }

  ngOnInit(): void {
    
  }

  goToLogin(){
    this.route.navigate(['/login'])
  }

}
