FROM node:20-alpine

# Dossier de travail dans le container
WORKDIR /app

# Copier tous les fichiers du contexte (./mystorywithdata.client)
COPY . .

# Installer les dépendances npm
RUN npm install

# Exposer le port sur lequel Vite tourne
EXPOSE 5173

# Commande de démarrage en mode développement
CMD ["npm", "run", "dev"]
