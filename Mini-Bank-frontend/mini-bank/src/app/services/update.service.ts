import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  user: any;

  constructor() { }

     updateUser(){
    localStorage.setItem('currentUser', JSON.stringify(this.user));

    const users = JSON.parse(localStorage.getItem('users')||'[]');

    const index = users.findIndex((u:any) => u.id === this.user.id);

    if(index!==-1){
      users[index]=this.user;

      localStorage.setItem('users', JSON.stringify(users));

    }
  }
}
