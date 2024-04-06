import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  editRoomForm!: FormGroup;
  roomData: any = {}; // Assurez-vous que le type de roomData est conforme à vos données de chambre
  imageUrlBase: string = "http://localhost:3000/"; // URL de base pour les images
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Initialiser le formulaire
    this.editRoomForm = this.formBuilder.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: [''] // Assurez-vous que cette clé correspond au champ de fichier de votre formulaire
    });

    // Récupérer les données de la chambre basées sur innType et room ID
    this.fetchRoomData();
  }

  fetchRoomData() {
    const innType = this.route.snapshot.queryParams['type'];
    const roomId = this.route.snapshot.queryParams['id'];
    const innId = this.route.snapshot.queryParams['innId'];

    let endpoint = '';
    if (innType === 'hotel') {
      endpoint = `http://localhost:3000/hotels/${innId}/roomsH/${roomId}`;
    } else if (innType === 'guestHouse') {
      endpoint = `http://localhost:3000/guestHouses/${innId}/roomsM/${roomId}`;
    }

    // Effectuer une requête GET pour récupérer les données de la chambre
    axios.get(endpoint)
      .then((response) => {
        this.roomData = response.data;
        // Pré-remplir le formulaire avec les données de la chambre
        this.editRoomForm.patchValue({
          name: this.roomData.name,
          capacity: this.roomData.capacity,
          description: this.roomData.description,
          price: this.roomData.price
        });
      })
      .catch((error) => {
        console.error('Failed to fetch room data', error);
      });
  }

  editRoom() {
    const innType = this.route.snapshot.queryParams['type'];
    const roomId = this.route.snapshot.queryParams['id'];
    const innId = this.route.snapshot.queryParams['innId'];

    let endpoint = '';
    if (innType === 'hotel') {
      endpoint = `http://localhost:3000/hotels/${innId}/roomsH/${roomId}`;
    } else if (innType === 'guestHouse') {
      endpoint = `http://localhost:3000/guestHouses/${innId}/roomsM/${roomId}`;
    }

    // Créer un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append('name', this.editRoomForm.value.name);
    formData.append('capacity', this.editRoomForm.value.capacity);
    formData.append('description', this.editRoomForm.value.description);
    formData.append('price', this.editRoomForm.value.price);
    // Vérifier s'il y a une nouvelle image sélectionnée
    if (this.editRoomForm.value.image) {
      formData.append('image', this.editRoomForm.value.image);
    }

    // Effectuer une requête PATCH pour mettre à jour la chambre
    axios.patch(endpoint, formData)
      .then((response) => {
        alert('Room updated successfully');
        console.log('Room updated successfully', response.data);
        this.editRoomForm.reset();
      })
      .catch((error) => {
        console.error('Failed to update room', error);
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Stocker le fichier sélectionné dans le formulaire
    this.editRoomForm.patchValue({ image: file });
  }
}
