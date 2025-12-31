import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UpdateService } from '../services/update.service';

@Component({
  selector: 'app-nominee',
  templateUrl: './nominee.component.html',
  styleUrls: ['./nominee.component.css']
})
export class NomineeComponent implements OnInit {

  user: any;

  name='';
  dateOfBirth:any;
  address='';
  relationship='';

  constructor(private authService: AuthService,
    private updateService: UpdateService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  addNominee(){
    if(!this.name||!this.dateOfBirth||!this.address||!this.relationship){
      alert('All fields are mandatory');
    }

    if(this.dateOfBirth<2007){
      alert('Nominee Age should be more than 18')
    }


  }

}
