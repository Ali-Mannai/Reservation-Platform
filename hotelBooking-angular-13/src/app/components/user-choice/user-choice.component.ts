import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-choice',
  templateUrl: './user-choice.component.html',
  styleUrls: ['./user-choice.component.css']
})
export class UserChoiceComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToAllHotels() {
    console.log('navigate to all hotels');
    this.router.navigate(['allInns'], {queryParams: {type: 'hotel'}});
  }
  goToAllGuestHouses() {
    this.router.navigate(['allInns'], {queryParams: {type: 'guestHouse'}});
  }
}
