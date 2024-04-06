import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private hotelsTabSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
  {
    id: 1,
    name: 'Hotel 1',
    address: '123 Rue de l hotel',
    description: 'Bon hotel avec vue panoramique',
    city: 'Ville A',
    nbRooms: 5,
    imageUrl: "assets/images/hotel1.jpeg",
    rooms: [
      { id: 1, name: "Room A", capacity: 4, description: "Spacious quadruple room with a king-size bed and additional amenities.", price: 260, imageUrl:"assets/images/room1.jpg", idHotel: 1 },
      { id: 3, name: "Room C", capacity: 1, description: "Compact single room with a comfortable twin-size bed and essential facilities.", price: 90, imageUrl:"assets/images/room3.jpg", idHotel: 1 },
      { id: 7, name: "Room G", capacity: 4, description: "Spacious quadruple room with a king-size bed and additional amenities.", price: 260, imageUrl:"assets/images/gallery1.jpg", idHotel: 1 },
      { id: 9, name: "Room I", capacity: 1, description: "Compact single room with a comfortable twin-size bed and essential facilities.", price: 90, imageUrl:"assets/images/gallery3.jpg", idHotel: 1 },
      { id: 13, name: "Room M", capacity: 4, description: "Spacious quadruple room with a king-size bed and additional amenities.", price: 260, imageUrl:"assets/images/gallery7.jpg", idHotel: 1 }
    ]
  },
  {
    id: 2,
    name: 'Hotel 2',
    address: '456 Avenue de la Liberté',
    description: 'Grand hotel moderne',
    city: 'Ville B',
    nbRooms: 5,
    imageUrl: 'assets/images/hotel2.jpeg',
    rooms: [
      { id: 2, name: "Room B", capacity: 2, description: "Cozy double room with a queen-size bed and modern furnishings.", price: 180, imageUrl:"assets/images/room2.jpg", idHotel: 2 },
      { id: 4, name: "Room D", capacity: 2, description: "Spacious family suite with a combination of double and single beds, perfect for families.", price: 220, imageUrl:"assets/images/room4.jpg", idHotel: 2 },
      { id: 8, name: "Room H", capacity: 2, description: "Cozy double room with a queen-size bed and modern furnishings.", price: 180, imageUrl:"assets/images/gallery2.jpg", idHotel: 2 },
      { id: 14, name: "Room N", capacity: 2, description: "Cozy double room with a queen-size bed and modern furnishings.", price: 180, imageUrl:"assets/images/gallery8.jpg", idHotel: 2 },
      { id: 19, name: "Room S", capacity: 4, description: "Spacious quadruple room with a king-size bed and additional amenities.", price: 260, imageUrl:"assets/images/room1.jpg", idHotel: 2 }
    ]
  },
  {
    id: 3,
    name: 'Hotel 3',
    address: '789 Boulevard de la hotel',
    description: 'hotel historique rénové',
    city: 'Ville C',
    nbRooms: 2,
    imageUrl: 'assets/images/hotel3.jpeg',
    rooms: [
      { id: 5, name: "Room E", capacity: 2, description: "Standard double room with a queen-size bed and a pleasant ambiance.", price: 130, imageUrl:"assets/images/room5.jpg", idHotel: 3 },
      { id: 17, name: "Room Q", capacity: 2, description: "Standard double room with a queen-size bed and a pleasant ambiance.", price: 130, imageUrl:"assets/images/gallery1.jpg", idHotel: 3 }
    ]
  },
  {
    id: 4,
    name: 'Hotel 4',
    address: '101 Rue des Fleurs',
    description: 'Charmant hotel de campagne',
    city: 'Ville D',
    nbRooms: 2,
    imageUrl: 'assets/images/hotel4.jpeg',
    rooms: [
      { id: 6, name: "Room F", capacity: 2, description: "Comfortable single room with a twin-size bed and a relaxing atmosphere.", price: 100, imageUrl:"assets/images/room6.jpg", idHotel: 4 },
      { id: 18, name: "Room R", capacity: 2, description: "Comfortable single room with a twin-size bed and a relaxing atmosphere.", price: 100, imageUrl:"assets/images/gallery2.jpg", idHotel: 4 }
    ]
  },
  {
    id: 5,
    name: 'Hotel 5',
    address: '202 Avenue des Arbres',
    description: 'hotel contemporain avec jardin',
    city: 'Ville E',
    nbRooms: 2,
    imageUrl: 'assets/images/hotel5.jpeg',
    rooms: [
      { id: 23, name: "Room W", capacity: 2, description: "Standard double room with a queen-size bed and a pleasant ambiance.", price: 130, imageUrl:"assets/images/room5.jpg", idHotel: 5 },
      { id: 36, name: "Room JJ", capacity: 2, description: "Comfortable single room with a twin-size bed and a relaxing atmosphere.", price: 100, imageUrl:"assets/images/gallery2.jpg", idHotel: 5 }
    ]
  },
  {
    id: 6,
    name: 'Hotel 6',
    address: '303 Boulevard du Lac',
    description: 'hotel au bord du lac',
    city: 'Ville F',
    nbRooms: 3,
    imageUrl: 'assets/images/hotel6.jpeg',
    rooms: [
      { id: 25, name: "Room Y", capacity: 4, description: "Spacious quadruple room with a king-size bed and additional amenities.", price: 260, imageUrl:"assets/images/gallery1.jpg", idHotel: 6 },
      { id: 28, name: "Room BB", capacity: 2, description: "Spacious family suite with a combination of double and single beds, perfect for families.", price: 220, imageUrl:"assets/images/gallery4.jpg", idHotel: 6 },
      { id: 32, name: "Room FF", capacity: 2, description: "Cozy double room with a queen-size bed and modern furnishings.", price: 180, imageUrl:"assets/images/gallery8.jpg", idHotel: 6 }
    ]
  },
  {
    id: 7,
    name: 'Hotel 7',
    address: '404 Rue des Montagnes',
    description: 'hotel de montagne avec vue',
    city: 'Ville G',
    nbRooms: 3,
    imageUrl: 'assets/images/hotel7.jpeg',
    rooms: [
      { id: 26, name: "Room Z", capacity: 2, description: "Cozy double room with a queen-size bed and modern furnishings.", price: 180, imageUrl:"assets/images/gallery2.jpg", idHotel: 7 },
      { id: 27, name: "Room AA", capacity: 1, description: "Compact single room with a comfortable twin-size bed and essential facilities.", price: 90, imageUrl:"assets/images/gallery3.jpg", idHotel: 7 },
      { id: 31, name: "Room EE", capacity: 4, description: "Spacious quadruple room with a king-size bed and additional amenities.", price: 260, imageUrl:"assets/images/gallery7.jpg", idHotel: 7 }
    ]
  },
  {
    id: 8,
    name: 'Hotel 8',
    address: '505 Avenue du Soleil',
    description: 'hotel ensoleillé avec piscine',
    city: 'Ville H',
    nbRooms: 2,
    imageUrl: 'assets/images/hotel8.jpeg',
    rooms: [
      { id: 29, name: "Room CC", capacity: 2, description: "Standard double room with a queen-size bed and a pleasant ambiance.", price: 130, imageUrl:"assets/images/gallery5.jpg", idHotel: 8 },
      { id: 30, name: "Room DD", capacity: 2, description: "Comfortable single room with a twin-size bed and a relaxing atmosphere.", price: 100, imageUrl:"assets/images/gallery6.jpg", idHotel: 8 }
    ]
  },
  {
    id: 9,
    name: 'Hotel 9',
    address: '606 Boulevard des Étoiles',
    description: 'hotel futuriste avec toit en verre',
    city: 'Ville I',
    nbRooms: 2,
    imageUrl: 'assets/images/hotel9.jpeg',
    rooms: [
      { id: 33, name: "Room GG", capacity: 1, description: "Compact single room with a comfortable twin-size bed and essential facilities.", price: 90, imageUrl:"assets/images/blog3.jpg", idHotel: 9 },
      { id: 34, name: "Room HH", capacity: 2, description: "Spacious family suite with a combination of double and single beds, perfect for families.", price: 220, imageUrl:"assets/images/banner1.jpg", idHotel: 9 }
    ]
  }]
  );
  hotelsTab: Observable<any[]> = this.hotelsTabSubject.asObservable();

  constructor() {}

  getHotelsTab(): any[] {
    return this.hotelsTabSubject.value;
  }

  updateHotelsTab(newHotelsTab: any[]): void {
    this.hotelsTabSubject.next(newHotelsTab);
  }

  addHotel(newHotel: any): void {
    const currentHotelsTab = this.hotelsTabSubject.value;
    const newId = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1000)) + 1001;
    const hotelWithId = { ...newHotel, id: newId };
    const updatedHotelsTab = [...currentHotelsTab, hotelWithId];
    this.updateHotelsTab(updatedHotelsTab);
    alert(`Nouveau hotel ajouté avec l'ID généré : ${newId}, return to dashboard and click display `);
  }

  editHotel(hotelId: any, updatedHotelData: any): void {
    const currentHotelsTab = this.hotelsTabSubject.value;
    const hotelIndex = currentHotelsTab.findIndex((hotel) => hotel.id === hotelId);

    if (hotelIndex !== -1) {
      const updatedHotel = { ...currentHotelsTab[hotelIndex], ...updatedHotelData };
      const updatedHotelsTab = [
        ...currentHotelsTab.slice(0, hotelIndex),
        updatedHotel,
        ...currentHotelsTab.slice(hotelIndex + 1),
      ];

      this.updateHotelsTab(updatedHotelsTab);
    }
  }

  getHotelById(id: any): any {
    return this.hotelsTabSubject.value.find((hotel) => hotel.id == id);
  }

  deleteHotel(hotelId: number): void {
    const currentHotelsTab = this.hotelsTabSubject.value;
    const updatedHotelsTab = currentHotelsTab.filter((hotel) => hotel.id !== hotelId);
    this.updateHotelsTab(updatedHotelsTab);
  }

  // Inside SharedDataService class
addRoomToHotel(hotelId: number, newRoom: any): void {
  const currentHotelsTab = this.hotelsTabSubject.value;
  const hotelIndex = currentHotelsTab.findIndex((hotel) => hotel.id === hotelId);

  if (hotelIndex !== -1) {
    const updatedHotel = { ...currentHotelsTab[hotelIndex] };
    updatedHotel.rooms = [...updatedHotel.rooms, { ...newRoom, idHotel: hotelId }];
    
    const updatedHotelsTab = [
      ...currentHotelsTab.slice(0, hotelIndex),
      updatedHotel,
      ...currentHotelsTab.slice(hotelIndex + 1),
    ];

    this.updateHotelsTab(updatedHotelsTab);
  }
}

}
