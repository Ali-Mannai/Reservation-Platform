import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: any = {}; 

  constructor(private authService: AuthenticationService) {}

  login() {
    const loginData = {
      email: this.user.email,
      pwd: this.user.pwd
    };

    axios.post('http://localhost:3000/users/login', loginData)
      .then(response => {
        const user = response.data; // Supposons que le backend renvoie les données de l'utilisateur après une connexion réussie, y compris le rôle
        console.log("here response from backend dans login.ts: ",user);

        console.log('Here user role: ', user.user.role);

        // Stockez le jeton d'authentification dans localStorage
        localStorage.setItem('authToken', user.token);

        // Stockez l'utilisateur dans localStorage
        localStorage.setItem('currentUser', JSON.stringify(user.user));

        // Réinitialiser les valeurs du formulaire
        this.user.email = '';
        this.user.pwd = '';

        if (user.user.role === 'admin') {
          // Redirigez l'utilisateur vers le tableau de bord des administrateurs
          this.authService.navigateToAdmin();
        } else {
          // Redirigez l'utilisateur vers la page de tous les hôtels pour les utilisateurs
          this.authService.navigateToUserChoice();
        }

        alert('Login successful');
        console.log('Login successful');
        
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert("Login failed, please check your info");
      });
  }
}
