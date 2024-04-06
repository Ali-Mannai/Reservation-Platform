import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-all-hotels',
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.css'],
})
export class AllHotelsComponent implements OnInit {
  hotels: any[] = [];

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.hotelsTab.subscribe((hotels) => {
      this.hotels = hotels;
    });
  }
}
