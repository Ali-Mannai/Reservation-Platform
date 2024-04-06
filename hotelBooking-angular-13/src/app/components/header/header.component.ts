import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // userRole: string | null = null;

  constructor() { }

  ngOnInit(): void {
    // const currentUserData = localStorage.getItem('currentUser');
    // if (currentUserData) {
    //     const currentUser = JSON.parse(currentUserData);
    //     this.userRole = currentUser.role;
    // }
}

}
