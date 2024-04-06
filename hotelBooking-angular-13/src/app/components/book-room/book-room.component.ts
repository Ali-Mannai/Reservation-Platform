import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { response } from 'express';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {

  bookingForm!: FormGroup;
  id: any; // id de la chambre
  innType: any; // type d'auberge
  userId: any; //  id de l'utilisateur

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['roomId'];
      this.innType = params['innType'];
    });

    this.userId = localStorage.getItem('userId'); // Récupération de l'ID de l'utilisateur depuis le stockage local

    this.initializeForm();
  }

  initializeForm(): void {
    this.bookingForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      // totalPrice: [{ value: '', disabled: true }, Validators.required] // Désactivé au début, sera activé après le calcul du prix
    });
  }

  book(): void {
    if (this.bookingForm.valid) {
      console.log('Formulaire de réservation valide. Envoi de la demande de réservation...');
      const checkInDateControl = this.bookingForm.get('checkInDate');
      const checkOutDateControl = this.bookingForm.get('checkOutDate');

      if (checkInDateControl && checkOutDateControl) {
        const startDate = checkInDateControl.value;
        const endDate = checkOutDateControl.value;
        console.log('Dates de réservation : ', startDate, ' - ', endDate);
        console.log('ID de chambre : ', this.id);
        console.log('Type d\'auberge : ', this.innType);

        const token = localStorage.getItem('authToken');
        console.log("🚀 ~ BookRoomComponent ~ book ~ token: ", token)
        
        const headers = { Authorization: 'Bearer ' + token }; // Ajout du token JWT comme en-tête Authorization

        const payload = { startDate, endDate, roomId: this.id, userId: this.userId };

        axios.post(this.getBookingUrl(), payload, { headers })
          .then(response => {
            // Réponse réussie
            // alert(`Room booked successfully and ${response.data.message} dt`)
            alert(`${response.data.message}`);
            console.log('Réservation réussie : ', response.data);
            this.router.navigate(['/payment'],{queryParams:{amount:response.data.totalPrice}})
          })
          .catch(error => {
            // alert('Error, please check your infos');
            alert(error.response.data.message);
            // Erreur lors de la réservation
            console.error('Erreur lors de la réservation : ', error.response ? error.response.data : error.message);
            // Vous pouvez ajouter ici la gestion de l'erreur, par exemple afficher un message d'erreur à l'utilisateur
          });
      } else {
        alert('Unable to access date field values.');
        console.error('Impossible d\'accéder aux valeurs des champs de date.');
      }
    } else {
      // Le formulaire n'est pas valide
      console.warn('Formulaire de réservation invalide. Veuillez vérifier les champs.');
      alert('Invalid reservation form. Please check the fields.');
    }
  }

  private getBookingUrl(): string {
    let baseUrl = 'http://localhost:3000/';
    if (this.innType === 'hotel') {
      return baseUrl + `hotels/roomsH/${this.id}/reservation`;
    } else if (this.innType === 'guestHouse') {
      return baseUrl + `guestHouses/roomsM/${this.id}/reservation`;
    } else {
      throw new Error('Invalid inn type');
    }
  }
}