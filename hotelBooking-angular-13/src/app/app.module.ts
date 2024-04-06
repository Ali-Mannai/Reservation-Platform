import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AdminComponent } from './components/admin/admin.component';
// import { BookComponent } from './components/book/book.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { DeleteHotelComponent } from './components/delete-hotel/delete-hotel.component';
// import { EditHotelComponent } from './components/edit-hotel/edit-hotel.component';
import { AllHotelsComponent } from './components/all-hotels/all-hotels.component';
import { BookRoomComponent } from './components/book-room/book-room.component';
import { SuccessComponent } from './components/success/success.component';
import { FailComponent } from './components/fail/fail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DisplayOwnerComponent } from './components/display-owner/display-owner.component';
import { AddGuestHouseComponent } from './components/maisonDHotes/add-house/add-house.component';
import { RoomsClientComponent } from './components/rooms-client/rooms-client.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { EditInnComponent } from './components/edit-inn/edit-inn.component';
import { UserChoiceComponent } from './components/user-choice/user-choice.component';
import { AllInnsComponent } from './components/all-inns/all-inns.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
// import { HttpClientModule } from './components/all-hotels/all-hotels.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    RoomsComponent,
    AdminComponent,
    // BookComponent,
    AddHotelComponent,
    AddRoomComponent,
    HotelsComponent,
    DeleteHotelComponent,
    // EditHotelComponent,
    AllHotelsComponent,
    BookRoomComponent,
    SuccessComponent,
    FailComponent,
    ProfileComponent,
    DisplayOwnerComponent,
    AddGuestHouseComponent,
    RoomsClientComponent,
    EditRoomComponent,
    EditInnComponent,
    UserChoiceComponent,
    AllInnsComponent,
    PaymentComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
