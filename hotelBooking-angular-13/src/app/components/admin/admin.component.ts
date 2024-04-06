  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import axios from 'axios';
  import { Chart } from 'chart.js';

  interface Inn {
    _id: string;
    name: string;
    address: string;
    description: string;
    city: string;
    nbRooms: number;
    image: string;
    type: string;
  }

  @Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
  })
  export class AdminComponent implements OnInit {
    // inns: any[] = [
    // ];
    inns: Inn[] = [];

    imageUrlBase: string = "http://localhost:3000/"; // URL de base pour les images



    feedbackCount: number = 365247;
    // positivePercentage: number = 83;
    // negativePercentage: number = 17;
    // feedbackNumberSize: number = 24;


  constructor(private router: Router) { }

      ngOnInit(): void {
            // this.createChart();

        // Récupérer l'ID de l'admin à partir du local storage
  const currentUserString = localStorage.getItem('currentUser');
  console.log("here current user: ",  currentUserString)
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        const adminId = currentUser._id;
        
        // URL pour récupérer les hôtels et les maisons d'hôtes associés à l'admin
        const innsUrl = `http://localhost:3000/users/admin/${adminId}/inns`;

        axios.get<any>(innsUrl).then(
          (response) => {
            this.inns = [...response.data.hotels, ...response.data.guestHouses];
          },
          (error) => {
            console.error('Erreur lors de la récupération des hôtels et maisons d\'hôtes :', error);
            console.error('Réponse complète de l\'erreur :', error.response);
            console.error('Données de la réponse de l\'erreur :', error.response.data);
          }
        );
        console.log("here inns: ",this.inns);
      };
    }
    



    createChart() {
      console.log("methode chart appelée");
      // Récupérez le contexte du canvas pour le graphique
      const ctx = document.getElementById('feedback-chart') as HTMLCanvasElement;
      const chart = new Chart(ctx, {
        type: 'doughnut', // Type de graphique en secteurs
        data: {
          labels: ['Positive', 'Negative'],
          datasets: [{
            data: [this.positivePercentage, this.negativePercentage], // Utilisation des pourcentages variables
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)', // Couleur pour les feedbacks positifs
              'rgba(255, 99, 132, 0.2)' // Couleur pour les feedbacks négatifs
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)', // Bordure pour les feedbacks positifs
              'rgba(255, 99, 132, 1)' // Bordure pour les feedbacks négatifs
            ],
            borderWidth: 1
          }]
        },
        options: {
          // Ajoutez des options supplémentaires ici si nécessaire
        }
      });
    }

    // Définissez vos variables pour les pourcentages ici
    positivePercentage: number = 83;
    negativePercentage: number = 17;

      goToAddHotel() {
      this.router.navigate(["addHotel/"]);
    }

    goToAddGuestHouse() {
      this.router.navigate(["add-house/"]);
    }

    
    
    editInn(inn:Inn) {
      this.selectInn(inn)
      if (this.selectedInn) {
      this.router.navigate(['editInn/',this.selectedInn._id ], { queryParams: { innId: this.selectedInn._id, type: this.selectedInn.type} });
      console.log("j'ai envoyé l'id et le  type:", this.selectedInn._id, this.selectedInn.type);  }
      }
    
    selectedInn: Inn | null = null;

  selectInn(inn: Inn) {
    this.selectedInn = inn;
    console.log("here selected inn: ",this.selectedInn);
  }
    

  goToRooms() {
    if (this.selectedInn) {
      this.router.navigate([this.selectedInn._id + '/rooms'], { queryParams: { id: this.selectedInn._id, type: this.selectedInn.type, name: this.selectedInn.name } });
    }
    else{
      console.log("error")
    }
  }



    confirmDelete(inn: Inn): void {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet auberge ?")) {
        this.deleteInn(inn);
      }
    }

      // Méthode pour supprimer une chambre
deleteInn(inn: Inn): void {
  this.selectInn(inn);
  if (this.selectedInn) {
    const apiUrl = this.selectedInn.type === 'hotel' ? `http://localhost:3000/hotels/${this.selectedInn._id}` : `http://localhost:3000/guestHouses/${this.selectedInn._id}`;
    axios.delete(apiUrl)
      .then(response => {
        console.log('Inn supprimé avec succès :', response.data);
        this.fetchInns(); // Rafraîchir la liste des auberges après la suppression
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'auberge :', error);
      });
  }
}


    fetchInns(): void {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        const adminId = currentUser._id;
        
        const innsUrl = `http://localhost:3000/users/admin/${adminId}/inns`;
    
        axios.get<any>(innsUrl).then(
          (response) => {
            this.inns = [...response.data.hotels, ...response.data.guestHouses];
          },
          (error) => {
            console.error('Erreur lors de la récupération des hôtels et maisons d\'hôtes :', error);
            console.error('Réponse complète de l\'erreur :', error.response);
            console.error('Données de la réponse de l\'erreur :', error.response.data);
          }
        );
      }
    }
    
    
  }
