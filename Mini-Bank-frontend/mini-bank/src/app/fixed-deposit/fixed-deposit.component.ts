import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateService } from '../services/update.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.css']
})
export class FixedDepositComponent implements OnInit {

  
  user: any;
  amount:number=0;

  fdAmount: number = 0;
  interestRate: number = 0;
  years: number = 0;
  startingDate: any;
  maturityAmount: number = 0;
  maturityDate: any;

  constructor(private route:Router, 
    private updateService:UpdateService,
  private authService: AuthService) { }

  ngOnInit( ): void {
    this.user = this.authService.getCurrentUser();
  }

  fixedDeposit(){
    if(this.fdAmount<=9999){
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

    if(this.user.balance<this.fdAmount){
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
     // Principal + (Principal * Rate * Time) / 100
     maturityAmount: Number(this.fdAmount) + (Number(this.fdAmount) * Number(this.interestRate) * Number(this.years)) / 100,
      startingDate: startDate,
      maturityDate: endDate


    };

    this.user.balance -= this.fdAmount;

    this.user.fixedDeposit.push(fd);

    this.updateService.updateUser();

    alert('Fixed Deposit Created Successfully');

    this.fdAmount = 0,
    this.interestRate = 0,
    this.years = 0
  }

   closeFd(index: number){
    const fd = this.user.fixedDeposit[index];

    this.user.balance = this.user.balance+ fd.fdAmount;

    this.user.fixedDeposit.splice(index, 1);

    this.updateService.updateUser();

    alert('Fixed Deposit cancelled and Principal amount is returned');
  }

  goBack(){
    this.route.navigate(['/dashboard'])
  }


}
