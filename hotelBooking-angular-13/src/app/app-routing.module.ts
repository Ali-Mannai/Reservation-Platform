import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
import { AdminComponent } from './components/admin/admin.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { AllHotelsComponent } from './components/all-hotels/all-hotels.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { BookRoomComponent } from './components/book-room/book-room.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddGuestHouseComponent } from './components/maisonDHotes/add-house/add-house.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { EditInnComponent } from './components/edit-inn/edit-inn.component';
import { UserChoiceComponent } from './components/user-choice/user-choice.component';
import { AllInnsComponent } from './components/all-inns/all-inns.component';
import { RoomsClientComponent } from './components/rooms-client/rooms-client.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SuccessComponent } from './components/success/success.component';
import { FailComponent } from './components/fail/fail.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';


const routes: Routes = [
  {path: "", component:HomeComponent },
  { path:"addRoom/:id", component:AddRoomComponent},
  { path:"login", component:LoginComponent},
  { path:"signUp", component:SignupComponent},
  { path:":id/rooms", component:RoomsComponent},
  { path:":id/roomsClient", component:RoomsClientComponent},
  { path:"addHotel", component:AddHotelComponent},
  { path:"add-house", component:AddGuestHouseComponent},
  { path:"hotels/:id", component:HotelsComponent},
  { path:"admin", component:AdminComponent},
  { path:"editInn/:id", component:EditInnComponent},
  { path:"editRoom/:id", component:EditRoomComponent},
  { path:"allHotels", component:AllHotelsComponent},
  { path:"book/:id", component:BookRoomComponent},
  { path:"profile", component:ProfileComponent},
  { path:"userChoice", component:UserChoiceComponent},
  { path:"allInns", component:AllInnsComponent},
  { path:"payment", component:PaymentComponent},
  { path:"success", component:SuccessComponent},
  { path:"fail", component:FailComponent},
  { path:"thankYou", component:ThankYouComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
