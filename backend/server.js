const express = require('express');
// const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const path = require('path'); // Importer le module path


// Configuration de la session
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'default_secret_key',
//   resave: false,
//   saveUninitialized: false
// }));


require('dotenv').config(); // Pour charger les variables d'environnement depuis un fichier .env
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;


// Importer les modèles
const Hotel = require('./models/hotel');
const RoomH = require('./models/roomH');
const RoomM = require('./models/roomM');
const User = require('./models/user');
const Admin = require('./models/admin');
const Booking = require('./models/bookingH');
const Review = require('./models/review');

// Importer les routes
const hotelRoutes = require('./routes/hotels');
const guestHouseRoutes = require('./routes/guestHouses');
const roomHRoutes = require('./routes/roomsH');
const roomMRoutes = require('./routes/roomsM');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admins');
// const paymentRoutes = require('./routes/payment');
// const sessionRoutes = require('./routes/session'); 
const profileRoutes = require('./routes/profile'); 
const reviewRoutes = require('./routes/reviews'); 
const paymentRoutes = require('./routes/payment');


// Middleware pour activer CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Middleware pour parser le corps des requêtes JSON
// app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//configuer APP with bodyparser to send response => JSON
app.use(bodyParser.json());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Utilisation des routes
app.use('/hotels', hotelRoutes);
app.use('/guestHouses', guestHouseRoutes);
app.use('/hotels', roomHRoutes);
app.use('/guestHouses', roomMRoutes);
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
// app.use('/payment', paymentRoutes);
// app.use(sessionRoutes); 
app.use('', profileRoutes);
app.use('/hotels', reviewRoutes);
app.use('/api', paymentRoutes);

// Définir le dossier des ressources statiques pour servir les images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// var routes = require('./route/routes');
// const cors = require('cors');
// app.use(cors(
//   {
//     origin: "http://localhost:4200"
//   }
// ));

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
