import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import axios from 'axios';


@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {
  addHotelForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private sharedDataService: SharedDataService, private activatedRoute: ActivatedRoute, private router:Router) {
    this.addHotelForm= this.formBuilder.group({
      name:["", Validators.required],
      address:["", Validators.required],
      description:["",Validators.required],
      city:["", Validators.required],
      nbRooms:[0 , Validators.required],
      image:""
  })
}
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  const imageControl = this.addHotelForm.get('image');
  if (imageControl) {
    imageControl.setValue(file);
    imageControl.updateValueAndValidity();
  }
}



  ngOnInit() {
        // Initialize the form with default values or empty strings
        this.addHotelForm.setValue({
          name: '',
          address: '',
          description: '',
          city: '',
          nbRooms:'',
          image: ''
        });
  }

  addHotel() {
    console.log('addHotel called');
    if (this.addHotelForm.valid) {
      const formData = new FormData();
      formData.append('name', this.addHotelForm.value.name);
      formData.append('address', this.addHotelForm.value.address);
      formData.append('description', this.addHotelForm.value.description);
      formData.append('city', this.addHotelForm.value.city);
      formData.append('nbRooms', this.addHotelForm.value.nbRooms);
      formData.append('image', this.addHotelForm.value.image);
      console.log("here form data: ",formData);
  
      // Récupérer le token JWT de l'utilisateur (à remplacer par votre méthode pour obtenir le token)
      const token = localStorage.getItem('authToken'); // ou où vous stockez le token
      console.log("here token: ",token);

  
      axios.post('http://localhost:3000/hotels', formData,

      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('authToken'),
          'Content-Type': 'multipart/form-data' // Définissez le type de contenu avec FormData

        }
      }
      )
      .then(response => {
        alert('Hotel added successfully:');
        console.log('Hotel added successfully:', response.data);
        this.addHotelForm.reset();
      })
      .catch(error => {
        console.error('Error adding hotel:', error);
        alert('Error adding hotel. Please try again.');
      });
    } else {
      alert('Form is not valid.');
    }
  }
  

}
