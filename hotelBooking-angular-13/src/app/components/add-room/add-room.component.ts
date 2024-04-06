import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  addRoomForm!: FormGroup;
  innId: number=0; // Supposons que vous recevez cet ID du composant précédent
  innType: string=''; // Supposons que vous recevez le type d'hôtel du composant précédent

  constructor(private formBuilder: FormBuilder,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.innId = params['id'];
      this.innType = params['type'];
      console.log("here innType: ", this.innType);
    });
      
      
      this.addRoomForm = this.formBuilder.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      roomImage: ['']
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.addRoomForm.patchValue({
      roomImage: file
    });
  }

  addRoom(): void {
    const formData = new FormData();
    formData.append('name', this.addRoomForm.value.name);
    formData.append('capacity', this.addRoomForm.value.capacity);
    formData.append('description', this.addRoomForm.value.description);
    formData.append('price', this.addRoomForm.value.price);
    formData.append('image', this.addRoomForm.value.roomImage);

    let url: string;
    if (this.innType === 'hotel') {
      url = `http://localhost:3000/hotels/${this.innId}/roomsH`;
    } else if (this.innType === 'guestHouse') {
      url = `http://localhost:3000/guestHouses/${this.innId}/roomsM`;
    } else {
      console.error('Invalid hotel type');
      return;
    }

    axios.post(url, formData)
      .then(response => {
        alert('Room added successfully');
        console.log('Room added successfully', response.data);
        this.addRoomForm.reset();
      })
      .catch(error => {
        console.error('Error adding room', error);
        alert('check that you have completed all the fields in the form correctly');
        // Ajoutez ici la logique pour gérer les erreurs lors de l'ajout de la chambre
      });
  }
}
