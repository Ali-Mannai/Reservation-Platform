import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User } from 'src/app/classes/user';
import axios from 'axios';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {}


  // signup() {
  //   const newUser: User = this.signupForm.value;
  //   // Ajoutez la valeur du champ de sélection de rôle à newUser
  //   newUser.role = this.signupForm.get('role')?.value;
  //   this.authService.signup(newUser);
  //   console.log('User signed up:', newUser);
  //   this.router.navigate(["login"]);
  // }



signup() {
  const newUser: User = this.signupForm.value;
  newUser.role = this.signupForm.get('role')?.value;
  
  axios.post('http://localhost:3000/users/signup', newUser)
    .then(response => {
      console.log('User signed up:', newUser);
      this.router.navigate(["login"]);
    })
    .catch(error => {
      console.error('Error signing up:', error);
      // Gérer les erreurs ici
    });
}

  

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      role: ['', Validators.required]

    });
  }
}