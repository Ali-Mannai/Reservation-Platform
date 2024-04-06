// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { SharedDataService } from 'src/app/services/shared-data.service';

// @Component({
//   selector: 'app-add-house',
//   templateUrl: './add-house.component.html',
//   styleUrls: ['./add-house.component.css']
// })
// export class AddHouseComponent implements OnInit {
//   addHouseForm: FormGroup;
//   constructor(private formBuilder: FormBuilder, private sharedDataService: SharedDataService, private activatedRoute: ActivatedRoute, private router:Router) {
//     this.addHouseForm= this.formBuilder.group({
//       name:["", Validators.required],
//       address:["", Validators.required],
//       description:["",Validators.required],
//       city:["", Validators.required],
//       nbRooms:[, Validators.required]
//   })
// }

//   ngOnInit() {
//   }
//   addHouse() {
//     if (this.addHouseForm.valid) {
//       const newHouse = { ...this.addHouseForm.value, imageUrl: this.generateRandomImageUrl() };
//       this.sharedDataService.addHouse(newHouse);
//       this.addHouseForm.reset();
//     } else {
//       alert("Error");
//     }
//   }
  
//   generateRandomImageUrl(): string {
//     const randomNumber = Math.floor(Math.random() * 10) + 1;
//     return `assets/images/maison${randomNumber}.jpeg`;
//   }
  

//   goToDashboard(){
//     this.router.navigate(["admin/"]);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import axios from 'axios';



@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddGuestHouseComponent implements OnInit {
  addGuestHouseForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private sharedDataService: SharedDataService, private activatedRoute: ActivatedRoute, private router:Router) {
    this.addGuestHouseForm= this.formBuilder.group({
      name:["", Validators.required],
      address:["", Validators.required],
      description:["",Validators.required],
      city:["", Validators.required],
      nbRooms:[1 , Validators.required],
      image:""
  })
}
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  const imageControl = this.addGuestHouseForm.get('image');
  if (imageControl) {
    imageControl.setValue(file);
    imageControl.updateValueAndValidity();
  }
}



  ngOnInit() {
        // Initialize the form with default values or empty strings
        this.addGuestHouseForm.setValue({
          name: '',
          address: '',
          description: '',
          city: '',
          nbRooms:'',
          image: ''
        });
  }

  addGuestHouse() {
    console.log('add GuestHouse called');
    if (this.addGuestHouseForm.valid) {
      const formData = new FormData();
      formData.append('name', this.addGuestHouseForm.value.name);
      formData.append('address', this.addGuestHouseForm.value.address);
      formData.append('description', this.addGuestHouseForm.value.description);
      formData.append('city', this.addGuestHouseForm.value.city);
      formData.append('nbRooms', this.addGuestHouseForm.value.nbRooms);
      formData.append('image', this.addGuestHouseForm.value.image);
      console.log("here form data: ",formData);
  
      // Récupérer le token JWT de l'utilisateur (à remplacer par votre méthode pour obtenir le token)
      const token = localStorage.getItem('authToken'); // ou où vous stockez le token
      console.log("here token: ",token);

  
      axios.post('http://localhost:3000/guestHouses', formData,

      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('authToken'),
          'Content-Type': 'multipart/form-data' 

        }
      }
      )
      .then(response => {
        alert('GuestHouse added successfully')
        console.log('GuestHouse added successfully:', response.data);
        this.addGuestHouseForm.reset();
      })
      .catch(error => {
        console.error('Error adding GuestHouse:', error);
        alert('Error adding GuestHouse. Please try again.');
      });
    } else {
      alert('Form is not valid.');
    }
  }
  

}
