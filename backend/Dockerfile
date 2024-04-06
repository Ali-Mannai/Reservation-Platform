# Utiliser l'image Node.js officielle comme base
FROM node:lts-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app/backend

# Copier les fichiers du backend
COPY . .

# Installer les dépendances
RUN npm install

# Exposer le port sur lequel le serveur Express.js écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "server.js"]
