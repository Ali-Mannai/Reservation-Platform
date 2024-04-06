// all-houses.component.ts
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-all-houses',
  templateUrl: './all-houses.component.html',
  styleUrls: ['./all-houses.component.css'],
})
export class AllHousesComponent implements OnInit {
  houses: any[] = [];

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.housesTab.subscribe((houses) => {
      this.houses = houses;
    });
  }
}
