# Utiliser l'image Node.js officielle comme base pour le build de l'application Angular
FROM node:lts-alpine as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app/frontend

# Copier les fichiers de configuration du package.json et package-lock.json (s'ils existent) pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application frontend
COPY . .

# Compiler l'application Angular
RUN npm run build --prod

# Utiliser l'image Nginx officielle pour servir l'application Angular compilée
FROM nginx:alpine

# Copier les fichiers de l'application Angular compilée depuis le builder stage vers le répertoire d'installation de Nginx
COPY --from=build /app/frontend/dist/hotel-booking /usr/share/nginx/html

# Exposer le port sur lequel Nginx écoute (par défaut, c'est 80)
# EXPOSE 80
