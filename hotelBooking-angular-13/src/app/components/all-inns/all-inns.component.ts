import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

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
  selector: 'app-all-inns',
  templateUrl: './all-inns.component.html',
  styleUrls: ['./all-inns.component.css']
})
export class AllInnsComponent implements OnInit {

  inns: Inn[] = [];
  innType: string='';
  imageUrlBase: string = "http://localhost:3000/"; // URL de base pour les images
  searchTerm: string = '';
  // searchTerm$ = new BehaviorSubject<string>('');



  constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.innType = params['type'];})
  }

  
  // ngOnInit(): void {
  //   this.getInns();
  // }

  

  // getInns(): void {
  //   const apiUrl = this.innType === 'hotel' ? 'http://localhost:3000/hotels' : 'http://localhost:3000/guestHouses';
  //   axios.get(apiUrl)
  //     .then((response) => {
  //       this.inns = response.data;
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching inns:', error);
  //     });
  // }

  getInns(): void {
    const apiUrl = this.innType === 'hotel' ? 'http://localhost:3000/hotels' : 'http://localhost:3000/guestHouses';
    axios.get(apiUrl, { params: { searchTerm: this.searchTerm } })
      .then((response) => {
        // Vérifier si la propriété existe avant d'appeler toLowerCase()
        this.inns = response.data.filter((inn: Inn) => {
          return inn.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                 inn.address?.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
      })
      .catch((error) => {
        console.error('Error fetching inns:', error);
      });
  }
  
  

  ngOnInit(): void {
    this.getInns();
  }

  // getInns(): void {
  //   const apiUrl = this.innType === 'hotel' ? 'http://localhost:3000/hotels' : 'http://localhost:3000/guestHouses';
  //   axios.get(apiUrl, { params: { searchTerm: this.searchTerm } })
  //     .then((response) => {
  //       this.inns = response.data;
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching inns:', error);
  //     });
  // }

  searchTermChanged(): void {
    this.getInns();
  }
  


  selectedInn: Inn | null = null;

  selectInn(inn: Inn) {
    this.selectedInn = inn;
    console.log("here selected inn: ",this.selectedInn);
  }

  goToRoomsClient(inn: Inn){
    if (this.selectedInn) {
      this.router.navigate([this.selectedInn._id + '/roomsClient'], { queryParams: { id: this.selectedInn._id, type: this.selectedInn.type, name: this.selectedInn.name } });
    }
    else{
      console.log("error")
    }
  }
}
