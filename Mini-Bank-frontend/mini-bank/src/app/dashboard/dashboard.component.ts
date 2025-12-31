import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateService } from '../services/update.service';
import { AuthService } from '../services/auth.service';

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

  constructor(private route:Router, 
    private updateService: UpdateService,
  private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  deposit(){
    if(this.amount<=0){
      alert("deposit should be greater than 0");
      return;
    }

    this.user.balance += this.amount;
    
    this.updateService.updateUser();
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

    this.updateService.updateUser();
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.route.navigate(['/login'])
  }

  goToFd(){
    this.route.navigate(['/fd'])
  }


  }

  
 




