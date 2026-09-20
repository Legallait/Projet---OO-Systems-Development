<div align="center">

<img src="frontend/public/logo.png" alt="One More Time" width="240" />

# One More Time

**Simulateur de loot box / gacha autour de la faune sauvage.**
Ouvrez des coffres par biome, collectionnez de vraies espèces animales et tentez de dénicher les plus rares.

![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![H2](https://img.shields.io/badge/H2-file_DB-1021FF)

*Projet réalisé dans le cadre du cours **OO Systems Development** (EFREI, A4).*

</div>

---

## Sommaire

- [Le principe](#le-principe)
- [Fonctionnalités](#fonctionnalités)
- [Rareté et taux de drop](#rareté-et-taux-de-drop)
- [Stack technique](#stack-technique)
- [Lancer le projet](#lancer-le-projet)
- [Architecture](#architecture)
- [API REST](#api-rest)
- [Limites connues](#limites-connues)
- [Auteurs](#auteurs)

## Le principe

Chaque joueur démarre avec **2 500 gems**. Il les dépense pour ouvrir des **coffres thématiques** (Savane, Froid, Océan, Forêt Tropicale). Une ouverture révèle **5 espèces animales** tirées au sort, réparties selon quatre niveaux de rareté calqués sur le **statut de conservation UICN** : plus une espèce est menacée, plus elle est rare.

Les espèces, leurs descriptions et leurs photos ne sont pas inventées : elles sont récupérées depuis l'API publique [iNaturalist](https://www.inaturalist.org/) au premier démarrage.

## Fonctionnalités

| | |
|---|---|
| **Compte joueur** | Inscription et connexion par nom d'utilisateur / mot de passe, 2 500 gems offertes à la création. |
| **Coffres par biome** | 4 coffres, chacun alimenté par les espèces d'une région du monde. |
| **Ouverture animée** | Une ouverture = 5 tirages, révélés carte par carte avec leur rareté, leur description et un lien Wikipédia. |
| **Collection** | Inventaire du joueur avec la quantité possédée pour chaque espèce. |
| **Historique** | Liste de tous les tirages, du plus récent au plus ancien. |
| **Statistiques** | Tableau de bord (total de tirages, répartition par rareté, espèces les plus rares, coffres favoris). |
| **Solde en direct** | Le compteur de gems de la barre de navigation se met à jour après chaque ouverture. |

### Les coffres

| Coffre | Région d'origine des espèces | Prix |
|---|---|---:|
| Coffre Savane | Kenya | 100 gems |
| Coffre Froid | Antarctique | 150 gems |
| Coffre Océan | Hawaï | 150 gems |
| Coffre Forêt Tropicale | Brésil | 150 gems |

Chaque coffre contient jusqu'à 15 espèces par niveau de rareté.

## Rareté et taux de drop

| Rareté | Statut UICN | Taux de drop | Prix de revente |
|---|---|---:|---:|
| Commun | LC, NT (préoccupation mineure, quasi menacée) | 60 % | 10 gems |
| Rare | VU (vulnérable) | 28 % | 50 gems |
| Épique | EN (en danger) | 10 % | 200 gems |
| Légendaire | CR, EW (en danger critique, éteinte à l'état sauvage) | 2 % | 1 000 gems |

Le tirage est pondéré : chaque espèce du coffre pèse le taux de drop de sa rareté.

## Stack technique

| Couche | Technologies |
|---|---|
| **Backend** | Java 21, Spring Boot 4, Spring Web MVC, Spring Data JPA, Bean Validation, Lombok |
| **Base de données** | H2 en mode fichier (`backend/data/gachadb`), schéma géré par Hibernate (`ddl-auto=update`) |
| **Frontend** | React 19, Vite 8, React Router 7, lucide-react |
| **Données externes** | API iNaturalist (espèces, descriptions, photos) |

## Lancer le projet

### Prérequis

- **JDK 21**
- **Node.js 20.19+** (ou 22.12+) et npm
- Une **connexion internet** au premier lancement du backend (voir ci-dessous)

### 1. Backend

```bash
cd backend
./gradlew bootRun          # Windows : .\gradlew.bat bootRun
```

L'API est disponible sur **http://localhost:8080**.

> **Premier démarrage.** Si la base est vide, le backend interroge iNaturalist pour créer les raretés, les 4 coffres et leurs espèces, puis télécharge les photos dans `backend/data/species-images/`. Cela peut prendre quelques minutes. Aux démarrages suivants, les données existantes sont réutilisées.
>
> Pour repartir de zéro, arrêtez le backend et supprimez le dossier `backend/data/`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Le client est disponible sur **http://localhost:5173**. Créez un compte depuis la page de connexion, puis ouvrez votre premier coffre.

> Le frontend attend l'API sur `http://localhost:8080` (défini dans `frontend/src/services/apiClient.js`) et le backend n'autorise que l'origine `http://localhost:5173` (CORS, `WebConfig.java`). Gardez ces deux ports par défaut.

### Lancer sous macOS

Les commandes ci-dessus fonctionnent sur Mac, avec deux particularités : il faut installer un JDK 21, et rendre le script `gradlew` exécutable.

**1. Installer les prérequis** (avec [Homebrew](https://brew.sh))

```bash
brew install --cask temurin@21
brew install node
```

Vérifiez les versions : `java -version` doit afficher `21`, et `node -v` au moins `20.19`.

> Si `java -version` affiche une autre version, forcez le JDK 21 pour la session en cours :
> ```bash
> export JAVA_HOME=$(/usr/libexec/java_home -v 21)
> ```

**2. Démarrer le backend** (premier terminal)

```bash
cd backend
chmod +x gradlew
./gradlew bootRun
```

> Sans le `chmod +x`, macOS répond `permission denied: ./gradlew`. Vous pouvez aussi lancer `sh gradlew bootRun`.

Attendez la fin du chargement des espèces (voir la note « Premier démarrage » ci-dessus) : le backend est prêt quand les logs affichent `Started GachaApplication`.

**3. Démarrer le frontend** (second terminal)

```bash
cd frontend
npm install
npm run dev
```

**4. Ouvrir l'application** sur **http://localhost:5173**.

Pour tout arrêter, faites `Ctrl + C` dans chaque terminal.

## Architecture

```
.
├── backend/                         API REST Spring Boot
│   └── src/main/java/com/efrei/gacha/
│       ├── controller/              Endpoints HTTP et gestion des erreurs
│       ├── service/                 Interfaces métier
│       │   └── impl/                Implémentations (tirage, joueurs, coffres)
│       ├── repository/              Accès aux données (Spring Data JPA)
│       ├── model/                   Entités JPA (Player, Box, Item, Rarity, ...)
│       ├── dto/                     Objets de requête / réponse
│       ├── exception/               Exceptions métier
│       ├── integration/             Client iNaturalist et ses DTO
│       ├── storage/                 Stockage local des photos d'espèces
│       ├── seed/                    Remplissage initial de la base
│       └── config/                  CORS et exposition des images
│
└── frontend/                        Client React
    ├── public/                      Logo et visuels des coffres
    └── src/
        ├── pages/                   Home, BoosterOpening, Collection, History, Stats, Login
        ├── components/              NavBar, AnimalCard, BoosterCard, cartes de stats, ...
        └── services/                Appels API (apiClient, AuthService, OpeningService, ...)
```

Le backend suit une **architecture en couches** (controller → service → repository → model) avec **inversion de contrôle** via Spring, des **exceptions métier** converties en réponses HTTP par les contrôleurs, et un **logging SLF4J**.


## API REST

Toutes les erreurs renvoient un JSON `{ "message": "..." }` avec le code HTTP adapté.

### Authentification

| Méthode | Route | Description | Codes |
|---|---|---|---|
| `POST` | `/auth/register` | Crée un compte (`username`, `password`) | `201`, `409` nom déjà pris |
| `POST` | `/auth/login` | Connecte un joueur (`username`, `password`) | `200`, `401` identifiants invalides |

### Coffres

| Méthode | Route | Description | Codes |
|---|---|---|---|
| `GET` | `/boxes` | Liste des coffres | `200` |
| `GET` | `/boxes/{boxId}` | Détail d'un coffre | `200`, `404` |

### Joueurs

| Méthode | Route | Description | Codes |
|---|---|---|---|
| `POST` | `/players` | Crée un joueur | `201`, `409` |
| `GET` | `/players/{playerId}` | Profil et solde | `200`, `404` |
| `GET` | `/players/{playerId}/inventory` | Collection du joueur | `200`, `404` |
| `GET` | `/players/{playerId}/history` | Historique des tirages | `200`, `404` |
| `POST` | `/players/{playerId}/inventory/{itemId}/sell` | Revend une espèce contre des gems | `200`, `404` |
| `POST` | `/players/{playerId}/boxes/{boxId}/openings` | Ouvre un coffre (5 tirages) | `201`, `400` solde insuffisant, `404`, `409` coffre vide |

Les photos des espèces sont servies statiquement sous `/species-images/**`.

## Limites connues

Ce projet est un travail de cours, pas un produit fini :

- Les mots de passe sont stockés et comparés **en clair**, et il n'y a ni session ni jeton : le joueur connecté est simplement mémorisé dans le `localStorage` du navigateur.
- Les pages **Collection** et **Historique** interrogent pour l'instant le joueur d'id `1` au lieu du joueur connecté.
- La page **Statistiques** affiche des valeurs de démonstration et n'est pas encore branchée sur l'API.
- La revente d'espèces existe côté API mais n'a pas encore d'interface.

## Auteurs

- **Nicolas**
- **Henri**
