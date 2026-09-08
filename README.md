# Projet - OO Systems Development

Simulateur de loot box / gacha : ouverture de boîtes avec taux de drop par rareté, inventaire par joueur, historique des tirages.

Projet réalisé dans le cadre du cours OO Systems Development (EFREI).

## Stack

- **Backend** : Java 21, Spring Boot, Spring Data JPA, H2 (dev)
- **Frontend** : React (Vite), React Router
- **Architecture** : couches (controller / service / repository / model), IoC via Spring, gestion des erreurs HTTP via exception handler, logging SLF4J

## Structure

```
.
├── backend/    # API REST Spring Boot
└── frontend/   # Client React
```

## Lancer le projet

### Backend

```
cd backend
.\gradlew.bat bootRun
```

API disponible sur `http://localhost:8080`

### Frontend

```
cd frontend
npm install
npm run dev
```

Client disponible sur `http://localhost:5173`

## Fonctionnalités

- Ouverture de boîtes (boxes) avec tirage aléatoire selon des taux de rareté
- Inventaire des objets obtenus par joueur
- Historique des tirages

## Auteurs

- Nicolas
- Henri
