import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  addRoomForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sharedDataService: SharedDataService,
    private activatedRoute: ActivatedRoute
  ) {
    this.addRoomForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Initialize the form with default values or empty strings
    this.addRoomForm.setValue({
      id: Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1000)) + 1001,
      name: '',
      capacity: '',
      description: '',
      price: '',
      imageUrl: `assets/images/gallery${Math.floor(Math.random() * 8) + 1}.jpg`
    });
  }

  addRoom() {
    const newRoom = this.addRoomForm.value;
    const houseId = +this.activatedRoute.snapshot.params.id;
    this.sharedDataService.addRoomToHouse(houseId, newRoom);
    alert("room added with success")
    this.router.navigate([`rooms/${houseId}`]);
  }
}
