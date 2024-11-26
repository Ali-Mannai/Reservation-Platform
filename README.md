# 🏨 Online Hotel and GuestHouse Booking Platform

**A full-stack web application for booking hotels and guesthouses, built using Angular, Node.js, Express.js, and MongoDB.**

---

## 🚀 Features

### 🧑‍💻 User Module:
- **Sign-up & Login:** Users can create an account and log in.
- **Hotel/GuestHouse Booking:** 
  - Browse available hotels and guesthouses.
  - View rooms by category (available, reserved, occupied).
  - Reserve a room by selecting dates.
  - Choose payment method: cash or online (Flouci API integration).
- **Profile Management:** Update personal information and view booking history.

### 🔑 Admin Module:
- **Dashboard Access:** 
  - Manage owned hotels and guesthouses.
  - Add, edit, or delete hotels, guesthouses, and rooms.
- **Room Management:**
  - View all rooms associated with a specific hotel or guesthouse.
  - Manage room availability and details.

---

## 🛠️ Technology Stack

### **Frontend:**
- **Framework:** Angular 13
- **Key Features:**
  - Responsive UI
  - Component-based architecture
  - Integration with backend APIs

### **Backend:**
- **Technologies:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Features:**
  - RESTful APIs
  - Authentication and Authorization (JWT)
  - Secure online payment using Flouci API

### **Deployment:**
- **Docker:** Containerized backend and frontend for seamless deployment
- **CI/CD:** Jenkins pipeline for continuous integration and deployment

---

## 📂 Project Structure

### **Backend**

- **backend/**  
  - `models/` : Contient les schémas Mongoose (User, Hotel, GuestHouse, Booking, Room, etc.)  
  - `routes/` : Routes API pour les utilisateurs, administrateurs, hôtels, etc.  
  - `server.js` : Point d'entrée pour le serveur backend  
  - `Dockerfile` : Configuration Docker pour le backend  

### **Frontend**

- **hotelBooking-angular-13/**  
  - `src/` : Répertoire principal des fichiers sources Angular  
    - `app/` : Contient l'application principale  
      - `components/` : Composants UI (home, hotels, rooms, etc.)  
      - `services/` : Services Angular pour la communication avec l'API  
      - `app.module.ts` : Module principal d'Angular  
    - `assets/` : Contient les ressources statiques comme les images  
  - `angular.json` : Configuration d'Angular  
  - `Dockerfile` : Configuration Docker pour le frontend  

---
# **Mon Application**

Voici une capture d'écran de l'application :

![Aperçu de l'application](home%20page.png)

## 🚀 Quick Start

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/online-booking-platform.git
cd online-booking-platform

2️⃣ **Backend Setup**
Navigate to the backend folder:

cd backend
Install dependencies:

npm install
Configure environment variables in .env:

PORT=3000
MONGO_URI=mongodb://<your_mongo_db_connection_string>
JWT_SECRET=<your_secret_key>
FLOUCI_API_KEY=<your_flouci_api_key>
Start the backend server:
npm start

3️⃣ **Frontend Setup**
Navigate to the frontend folder:

cd hotelBooking-angular-13
Install dependencies:

npm install
Start the Angular development server:

ng serve
Open the application in your browser:

http://localhost:4200

📊 **Database Models**
User

{
  "firstName": "String",
  "lastName": "String",
  "email": "String",
  "pwd": "String",
  "role": "String" // "user" or "admin"
}
Hotel/GuestHouse

{
  "name": "String",
  "address": "String",
  "description": "String",
  "city": "String",
  "nbRooms": "Number",
  "image": "String",
  "rooms": ["ObjectId"],
  "type": "String" // "hotel" or "guesthouse"
}
Room

{
  "name": "String",
  "capacity": "Number",
  "description": "String",
  "price": "Number",
  "image": "String",
  "status": "String" // "disponible", "réservée", "occupée"
}

🌟 **Features Under Development**
Email Notifications: Notify users for booking confirmation.
Admin Analytics: Insights into bookings and revenue.

🤝 **Contribution**
Contributions are welcome! Please submit a pull request or open an issue for suggestions.

📧 **Contact**
Developer: Ali Mannai
Email: alimannai106@gmail.com
LinkedIn: https://www.linkedin.com/in/ali-mannai

📝 **License**
This project is licensed under the MIT License. See the LICENSE file for details.



### **Steps to Use:**
1. Paste the above markdown content into your `README.md` file.
2. Replace:
   - `yourusername` with your GitHub username.
   - `path/to/home.jpg` and `path/to/dash.jpg` with the actual paths to your project screenshots (if any).
   - Add any missing or relevant project-specific details.

bash git clone https://github.com/Ali-Mannai/Reservation-Platform.git cd online-booking-platform
