import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotel: any = {};
  hotelsTab: any[] = [];
  id: any;

  constructor(private sharedDataService: SharedDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const idParam = this.activatedRoute.snapshot.paramMap.get("id");
    if (idParam !== null) {
        this.id = +idParam;
    } else {
        this.id = 0; 
    }
        console.log("Here id: " + this.id);

    this.sharedDataService.hotelsTab.subscribe((hotelsTab) => {
      this.hotelsTab = hotelsTab;

      const hotel = this.hotelsTab.find(h => h.id === this.id);
      console.log("Here hotel "+ hotel);
      if (hotel) {
        this.hotel = hotel;
      } else {
        console.error("Hotel not found with id: " + this.id);
      }
    });
  }
}
