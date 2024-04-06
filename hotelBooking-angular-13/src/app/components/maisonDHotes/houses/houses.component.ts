import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {
  house: any = {};
  housesTab: any[];
  id: any;

  constructor(private sharedDataService: SharedDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get("id");
    console.log("Here id: " + this.id);

    this.sharedDataService.housesTab.subscribe((housesTab) => {
      this.housesTab = housesTab;

      const house = this.housesTab.find(h => h.id === this.id);
      console.log("Here house "+ house);
      if (house) {
        this.house = house;
      } else {
        console.error("House not found with id: " + this.id);
      }
    });
  }
}
