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

  fdAmount: number = 0;
  interestRate: number = 0;
  years: number = 0;
  startingDate: any;
  maturityAmount: number = 0;
  maturityDate: any;

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

  fixedDeposit(){
    if(this.fdAmount<10000){
      alert('Minimum Fixed deposit should be more than 10000');
      return;
    }

    if(this.years<=0){
      alert('Minimum year should be more than 0');
      return;
    }

    if(this.interestRate<=0){
      alert('Minimum interest Should be more than 0');
      return;
    }

    if(this.user.balance<=this.fdAmount){
      alert("insufficiend balance to create fixed deposit");
      return;
    }

    const startDate = new Date();

    const endDate = new Date(startDate);

    endDate.setFullYear(startDate.getFullYear()+this.years);

    const fd = {
      fdAmount: this.fdAmount,
      interestRate: this.interestRate,
      years : this.years,
      maturityAmount : this.fdAmount+(this.fdAmount*this.interestRate*this.years)/100,
      startingDate: startDate,
      maturityDate: endDate


    };

    this.user.balance -= this.fdAmount;

    this.user.fixedDeposit.push(fd);

    this.updateUser();

    alert('Fixed Deposit Created Successfully');

    this.fdAmount = 0,
    this.interestRate = 0,
    this.years = 0
  }

  closeFd(index: number){
    const fd = this.user.fixedDeposit[index];

    this.user.balance = this.user.balance+ fd.fdAmount;

    this.user.fixedDeposit.splice(index, 1);

    this.updateUser();

    alert('Fixed Deposit cancelled and Principal amount is returned');
  }



}
