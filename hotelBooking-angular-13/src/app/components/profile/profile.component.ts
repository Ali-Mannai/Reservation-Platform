import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    axios.get<UserProfile>('http://localhost:3000/profile', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken')
      }
    })
      .then(response => {
        this.userProfile = response.data;
        console.log("User profile:", this.userProfile);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }
  
// afficherBouton: boolean = true;

  async logout() {
    try {
        // Appel à la route de déconnexion du backend
        const response = await axios.post('http://localhost:3000/users/logout', null, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('authToken')
            }
        });

        // Vérifier si la déconnexion a réussi
        if (response.status === 200) {
            alert('Logout successfull');
            console.log('Déconnexion réussie');
            
            // Supprimer le jeton d'authentification du localStorage
            localStorage.removeItem('authToken');

            // Supprimer l'utilisateur du localStorage
            localStorage.removeItem('currentUser');

            // Vider le profil après la déconnexion réussie
            this.userProfile = null;

            // Masquer le bouton après la déconnexion réussie
            // this.afficherBouton = false;

            // Redirection vers /home
            this.router.navigate(['/']);

            
        } else {
            console.error('Erreur lors de la déconnexion');
            // Gérer l'erreur
        }
    } catch (error) {
        console.error('Erreur lors de la déconnexion', error);
        // Gérer l'erreur
    }
}

goToDashboard(){
  this.router.navigate(['/admin']);
}

goToUserChoice(){
  this.router.navigate(['/userChoice']);
}
  

  cancel(){};
  update(){};



}
