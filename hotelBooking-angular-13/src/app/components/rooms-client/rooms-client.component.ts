import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
// const RoomH = require('../models/roomH');
// const RoomM = require('../models/roomM');


// rooms.model.ts
export interface Room {
  _id: string;
  name: string;
  capacity: number;
  description: string;
  price: number;
  image: string;
  status: string;
}

@Component({
  selector: 'app-rooms-client',
  templateUrl: './rooms-client.component.html',
  styleUrls: ['./rooms-client.component.css']
})
export class RoomsClientComponent implements OnInit {
  innId: string = '' ;
  innType: string = '' ;
  innName: string = '';
  // rooms: Room[] = [] ;
  rooms: Room[] = []; // Déclarez rooms comme un tableau union des deux types de chambres

  imageUrlBase: string = "http://localhost:3000/"; // URL de base pour les images


  constructor(private activatedRoute: ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.innId = params['id'];
      this.innType = params['type'];
      this.innName = params['name'];
      console.log("here id and type: ", this.innId, this.innType);

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

  goToBook(room: Room){
    this.route.navigate(["book/", room._id], {queryParams: {roomId: room._id, innType: this.innType}})
  }


}
