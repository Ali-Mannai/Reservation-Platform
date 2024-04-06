import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private router: Router) {}

  signup(user: User): void {
    // Enregistrez le nouvel utilisateur dans le localStorage
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }


  authenticate(email: string, password: string): boolean {
    const usersJSON = localStorage.getItem('users');
    if (usersJSON) {
      const users: User[] = JSON.parse(usersJSON);
      const user = users.find(u => u.email === email && u.pwd === password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
    }
    return false;
  }
  
  

  navigateToUserChoice() {
    this.router.navigate(['userChoice']);
  }


  navigateToAdmin() {
    this.router.navigate(['admin']);
  }

}