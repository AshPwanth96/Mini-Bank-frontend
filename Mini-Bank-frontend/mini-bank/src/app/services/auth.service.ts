import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  
  getCurrentUser(){
    
  const storedUser = localStorage.getItem('currentUser');

  if(storedUser){
    return JSON.parse(storedUser)
  }else{
    return null;
  }
  

  }
}

