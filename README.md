E-Commerce App

Un projet d’application e-commerce full-stack permettant aux utilisateurs de parcourir des produits, les ajouter au panier et finaliser leurs commandes.
Ce projet illustre l’utilisation des technologies modernes côté frontend et backend, avec une base de données NoSQL pour stocker les informations.

🚀 Technologies utilisées
Frontend

React.js : Librairie JavaScript pour construire l’interface utilisateur.

Tailwind CSS : Framework CSS utilitaire pour un design moderne et réactif.

Backend

Node.js : Environnement d’exécution JavaScript côté serveur.

Express.js : Framework minimaliste pour la création d’API RESTful.

JWT (JSON Web Token) : Authentification sécurisée basée sur des tokens.

MongoDB : Base de données NoSQL pour stocker les produits, utilisateurs et commandes.

📂 Structure du projet
ecommerce-app/
│── backend/            → API Node.js + Express
│   ├── models/         → Schémas MongoDB
│   ├── routes/         → Routes API (produits, utilisateurs, commandes)
│   ├── controllers/    → Logique métier
│   └── server.js       → Point d’entrée du backend
│
│── frontend/           → Application React
│   ├── src/
│   │   ├── components/ → Composants UI
│   │   ├── pages/      → Pages principales (Home, Cart, Login, etc.)
│   │   └── App.js      → Point d’entrée du frontend
│
└── README.md

⚡ Fonctionnalités principales

✅ Inscription et connexion utilisateur avec JWT

✅ Ajout et gestion des produits dans MongoDB

✅ Panier d’achat avec React + gestion d’état

✅ API sécurisée avec Express

✅ Design réactif avec Tailwind CSS
  
 Installation & exécution
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm start