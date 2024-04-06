import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
// const RoomH = require('../models/roomH');
// const RoomM = require('../models/roomM');


// rooms.model.ts
export interface Room {
  _id: number;
  name: string;
  capacity: number;
  description: string;
  price: number;
  image: string;
  status: string;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  innId: string = '' ;
  innType: string = '' ;
  innName: string = '' ;

  // rooms: Room[] = [] ;
  rooms: Room[] = []; // Déclarez rooms comme un tableau 

  imageUrlBase: string = "http://localhost:3000/"; // URL de base pour les images


  constructor(private activatedRoute: ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.innId = params['id'];
      this.innType = params['type'];
      this.innName = params['name'];

      console.log("here name, id and type: ",this.innName, this.innId, this.innType);

      // Determine l'URL de l'API en fonction de innType et innId
      const apiUrl = this.innType === 'hotel' ? `http://localhost:3000/hotels/${this.innId}/roomsH` : `http://localhost:3000/guestHouses/${this.innId}/roomsM`;
      console.log("sent to: ",apiUrl)
      // Appeler l'API pour récupérer les chambres
      axios.get(apiUrl)
        .then(response => {
          this.rooms = response.data;
          // this.rooms = [...response.data];

        })
        .catch(error => {
          console.error('Error fetching rooms:', error);
        });
    });
  }

  AddRoom(){
    this.route.navigate(['addRoom/', this.innId], { queryParams: { id: this.innId, type: this.innType} });
    console.log("j'ai envoyé l'id et le  type:", this.innId, this.innType);
  }


  editRoom(id: number): void {
    console.log("here id of this room from roomsComponent: ",id);
    this.route.navigate(['editRoom', id], { queryParams: { id: id, type: this.innType, innId: this.innId} });
  }



confirmDelete(roomId: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?")) {
      this.deleteRoom(roomId);
    }
  }

  // Méthode pour supprimer une chambre
  deleteRoom(roomId: number): void {
    const apiUrl = this.innType === 'hotel' ? `http://localhost:3000/hotels/${this.innId}/roomsH/${roomId}` : `http://localhost:3000/guestHouses/${this.innId}/roomsM/${roomId}`;
    
    axios.delete(apiUrl)
      .then(response => {
        console.log('Chambre supprimée avec succès:', response.data);
        this.fetchRooms(); // Rafraîchir la liste des chambres après la suppression
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la chambre:', error);
      });
  }
  
  
  // Méthode pour récupérer les chambres après la suppression
  fetchRooms(): void {
    const apiUrl = this.innType === 'hotel' ? `http://localhost:3000/hotels/${this.innId}/roomsH` : `http://localhost:3000/guestHouses/${this.innId}/roomsM`;
      
    axios.get(apiUrl)
      .then(response => {
        this.rooms = response.data;
      })
      .catch(error => {
        console.error('Error fetching rooms:', error);
      });
  }
}
