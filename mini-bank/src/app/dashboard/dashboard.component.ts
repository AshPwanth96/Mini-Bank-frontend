import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  amount:number=0;

  constructor(private route:Router) { }

  ngOnInit(): void {

    const storedUser = localStorage.getItem('currentUser');

    if(!storedUser){
      this.route.navigate(['/login']);
      return;
    }

    this.user = JSON.parse(storedUser);
 
  }

  deposit(){
    if(this.amount<=0){
      alert("deposit should be greater than 0");
      return;
    }

    this.user.balance += this.amount;
    this.updateUser();
  }

  withdraw(){
    if(this.amount<=0){
      alert('withdraw should be greater than 0');
      return;
    }

    if(this.amount>=this.user.balance){
      alert('Insufficient balance');
      return;
    }

    this.user.balance-=this.amount;
    this.updateUser();
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    this.route.navigate(['/login'])
  }

  private updateUser(){
    localStorage.setItem('currentUser', JSON.stringify(this.user));

    const users = JSON.parse(localStorage.getItem('users')||'[]');

    const index = users.findIndex((u:any) => u.id === this.user.id);

    if(index!==-1){
      users[index]=this.user;

      localStorage.setItem('users', JSON.stringify(users));

    }
  }





}
