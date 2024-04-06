import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.css']
})
export class EditHouseComponent implements OnInit {
  id: any;
  editHouseForm: FormGroup;
  house: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private formBuilder: FormBuilder
  ) {
    this.editHouseForm = this.formBuilder.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      description: ["", Validators.required],
      city: ["", Validators.required],
      nbRooms: [, Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("Here id " + this.id);

    this.house = this.sharedDataService.getHouseById(this.id);

    this.editHouseForm.patchValue({
      name: this.house.name,
      address: this.house.address,
      description: this.house.description,
      city: this.house.city,
      nbRooms: this.house.nbRooms
    });
  }

  editHouse() {
    const updatedHouseData = this.editHouseForm.value;
  
    // Mettez à jour la maison dans le service
    this.sharedDataService.editHouse(this.id, updatedHouseData);
  
    // Mettez à jour la liste des maisons après la modification
    const updatedHousesTab = [...this.sharedDataService.getHousesTab()];
    this.sharedDataService.updateHousesTab(updatedHousesTab);
  
    alert("Data updated with success");
  }
  
}
