import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-edit-inn',
  templateUrl: './edit-inn.component.html',
  styleUrls: ['./edit-inn.component.css']
})
export class EditInnComponent implements OnInit {
  editInnForm!: FormGroup;
  innData: any = {}; // Assurez-vous que le type de innData est conforme à vos données d'auberge
  imageUrlBase: string = "http://localhost:3000/"; // URL de base pour les images

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Initialiser le formulaire
    this.editInnForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      // nbRooms: ['', Validators.required],
      image: [''] // Assurez-vous que cette clé correspond au champ de fichier de votre formulaire
    });

    // Récupérer les données de l'auberge basées sur l'ID de l'auberge
    this.fetchInnData();
  }

  fetchInnData() {
    const innId = this.route.snapshot.queryParams['innId'];
    const innType = this.route.snapshot.queryParams['type'];

    let endpoint = '';
    if (innType === 'hotel') {
      endpoint = `http://localhost:3000/hotels/${innId}`;
    } else if (innType === 'guestHouse') {
      endpoint = `http://localhost:3000/guestHouses/${innId}`;
    }

    // Effectuer une requête GET pour récupérer les données de l'auberge
    axios.get(endpoint)
      .then((response) => {
        this.innData = response.data;
        // Pré-remplir le formulaire avec les données de l'auberge
        this.editInnForm.patchValue({
          name: this.innData.name,
          address: this.innData.address,
          description: this.innData.description,
          city: this.innData.city,
          nbRooms: this.innData.nbRooms
        });
      })
      .catch((error) => {
        console.error('Failed to fetch inn data', error);
      });
  }

  editInn() {
    const innId = this.route.snapshot.queryParams['innId'];
    const innType = this.route.snapshot.queryParams['type'];

    let endpoint = '';
    if (innType === 'hotel') {
      endpoint = `http://localhost:3000/hotels/${innId}`;
    } else if (innType === 'guestHouse') {
      endpoint = `http://localhost:3000/guestHouses/${innId}`;
    }

    // Créer un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append('name', this.editInnForm.value.name);
    formData.append('address', this.editInnForm.value.address);
    formData.append('description', this.editInnForm.value.description);
    formData.append('city', this.editInnForm.value.city);
    // formData.append('nbRooms', this.editInnForm.value.nbRooms);
    // Vérifier s'il y a une nouvelle image sélectionnée
    if (this.editInnForm.value.image) {
      formData.append('image', this.editInnForm.value.image);
    }
    console.log('here new data: ', formData);

    // Effectuer une requête PATCH pour mettre à jour l'auberge
    axios.patch(endpoint, formData)
      .then((response) => {
        alert('Inn updated successfully');
        console.log('Inn updated successfully', response.data);
        this.editInnForm.reset();
      })
      .catch((error) => {
        console.error('Failed to update inn', error);
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Stocker le fichier sélectionné dans le formulaire
    this.editInnForm.patchValue({ image: file });
  }
}
