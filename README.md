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
- [Qualité du code](#qualité-du-code)
- [Architecture](#architecture)
- [Backend](#backend)
- [API REST](#api-rest)
- [Frontend](#frontend)
- [Limites connues](#limites-connues)
- [Auteurs](#auteurs)

## Le principe

Chaque joueur démarre avec **2 500 gems**. Il les dépense pour ouvrir des **coffres thématiques** (Savane Soleil Rouge, Banquise Grand Blanc, Récif Grand Bleu, Jungle Vert Émeraude). Une ouverture révèle **5 espèces animales** tirées au sort, réparties selon quatre niveaux de rareté calqués sur le **statut de conservation UICN** : plus une espèce est menacée, plus elle est rare. Les doublons peuvent être **revendus** contre des gems pour ouvrir de nouveaux coffres.

Les espèces, leurs descriptions et leurs photos ne sont pas inventées : elles sont récupérées depuis l'API publique [iNaturalist](https://www.inaturalist.org/) au premier démarrage.

## Fonctionnalités

| | |
|---|---|
| **Compte joueur** | Inscription et connexion par nom d'utilisateur / mot de passe, 2 500 gems offertes à la création. |
| **Coffres par biome** | 4 coffres, chacun alimenté par les espèces d'une région du monde. |
| **Ouverture animée** | Une ouverture = 5 tirages, révélés carte par carte avec leur rareté, leur description et un lien Wikipédia. |
| **Collection** | Inventaire du joueur avec la quantité possédée, filtrable par rareté. Un clic sur une carte ouvre sa fiche détaillée. |
| **Revente** | Depuis la fiche d'une carte, revente d'un exemplaire au prix fixé par sa rareté (avec confirmation). |
| **Historique** | Chronologie des tirages et des ventes, de la plus récente à la plus ancienne. |
| **Statistiques** | Tableau de bord : total de tirages, gemmes gagnées en ventes, liste des espèces épiques et légendaires, répartition par rareté, coffres favoris. |
| **Solde en direct** | Le compteur de gems de la barre de navigation se met à jour après chaque ouverture et chaque vente. |
| **Écran de démarrage** | Tant que le backend démarre et charge les espèces, le front affiche un écran d'attente au lieu de pages vides. |
| **Responsive** | Interface adaptée au mobile (menu burger, grilles sur une colonne). |

### Les coffres

| Coffre | Région d'origine des espèces | Prix |
|---|---|---:|
| Coffre Savane Soleil Rouge | Kenya | 100 gems |
| Coffre Banquise Grand Blanc | Antarctique | 150 gems |
| Coffre Récif Grand Bleu | Hawaï | 150 gems |
| Coffre Jungle Vert Émeraude | Brésil | 150 gems |

Chaque coffre contient jusqu'à 15 espèces par niveau de rareté.

## Rareté et taux de drop

| Rareté | Statut UICN | Taux de drop | Prix de revente |
|---|---|---:|---:|
| Commun | LC, NT (préoccupation mineure, quasi menacée) | 60 % | 10 gems |
| Rare | VU (vulnérable) | 28 % | 50 gems |
| Épique | EN (en danger) | 10 % | 200 gems |
| Légendaire | CR, EW (en danger critique, éteinte à l'état sauvage) | 2 % | 1 000 gems |

Le tirage est pondéré : chaque espèce du coffre pèse le taux de drop de sa rareté. Le prix de revente est stocké sur chaque espèce au moment du seeding, à partir de sa rareté.

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

> **Premier démarrage.** Si la base est vide, le backend interroge iNaturalist pour créer les raretés, les 4 coffres et leurs espèces, puis télécharge les photos dans `backend/data/species-images/`. Cela peut prendre quelques minutes. Pendant ce temps, `GET /status` renvoie `{ "ready": false }` et le frontend affiche un écran « Démarrage du serveur… ». Aux démarrages suivants, les données existantes sont réutilisées.
>
> Pour repartir de zéro, arrêtez le backend et supprimez le dossier `backend/data/`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Le client est disponible sur **http://localhost:5173**. Créez un compte depuis la page de connexion, puis ouvrez votre premier coffre.

Autres scripts : `npm run build` (build de production dans `dist/`), `npm run lint` (ESLint), `npm run preview` (sert le build).

> Le frontend attend l'API sur `http://localhost:8080` (défini dans `frontend/src/services/apiClient.js`) et le backend n'autorise que l'origine `http://localhost:5173` (CORS, `WebConfig.java`). Gardez ces deux ports par défaut.

### Qualité du code

| Côté | Commande | Effet |
|---|---|---|
| Front | `npm run lint` | Analyse ESLint (règles JS + hooks React) |
| Front | `npx eslint . --fix` | Corrige automatiquement ce qui peut l'être |
| Back | `./gradlew spotlessApply` | Formate tout le code Java (Palantir Java Format, imports inutilisés supprimés) |
| Back | `./gradlew spotlessCheck` | Vérifie le formatage sans modifier les fichiers |
| Back | `./gradlew checkstyleMain` | Vérifie les conventions (nommage, imports, code douteux) ; rapport dans `backend/build/reports/checkstyle/main.html` |

Les règles Checkstyle sont dans `backend/config/checkstyle/checkstyle.xml` et remontent des avertissements sans bloquer le build.

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

**3. Démarrer le frontend** (second terminal)

```bash
cd frontend
npm install
npm run dev
```

**4. Ouvrir l'application** sur **http://localhost:5173**. Si le backend charge encore les espèces, l'écran de démarrage s'affiche puis laisse place à l'application automatiquement.

Pour tout arrêter, faites `Ctrl + C` dans chaque terminal.

## Architecture

```
.
├── backend/                         API REST Spring Boot
│   └── src/main/java/com/efrei/gacha/
│       ├── controller/              Endpoints HTTP et gestion des erreurs
│       ├── service/                 Interfaces métier
│       │   └── impl/                Implémentations (tirage, joueurs, coffres, stats)
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
        ├── pages/                   Une page par route
        ├── components/              Composants réutilisables
        └── services/                Appels API et état partagé
```

## Backend

Le backend suit une **architecture en couches** (controller → service → repository → model) avec **inversion de contrôle** via Spring (injection par constructeur), des **exceptions métier** converties en réponses HTTP par les `@ExceptionHandler` des contrôleurs, et un **logging SLF4J**.

### Modèle de données

| Entité | Rôle | Champs principaux |
|---|---|---|
| `Player` | Joueur | `username`, `password` (jamais sérialisé), `credits`, `createdAt` |
| `Rarity` | Niveau de rareté | `name`, `colorHex`, `dropRate` |
| `Item` | Espèce animale | `name`, `imageUrl`, `description`, `wikipediaUrl`, `sellPrice`, `rarity` |
| `Box` | Coffre | `name`, `price`, `description` |
| `BoxItem` | Contenu d'un coffre (clé composée `BoxItemId`) | `box`, `item` |
| `InventoryItem` | Espèce possédée par un joueur | `player`, `item`, `quantity` |
| `PullHistory` | Un tirage | `player`, `box`, `item`, `pulledAt`, `sold`, `soldAt`, `soldPrice` |
| `Stats` | Compteurs d'ouvertures d'un joueur | `boxOpened`, `boxOpenedByType` (map coffre → nombre) |

### Services

| Service | Responsabilité |
|---|---|
| `BoxOpeningService` | Vérifie le solde, débite le prix du coffre, effectue 5 tirages pondérés, met à jour l'inventaire, l'historique et les stats. |
| `PlayerService` | Inscription / connexion, profil, inventaire, historique, revente d'un exemplaire. |
| `BoxService` | Lecture des coffres. |
| `StatsService` | Compteurs d'ouvertures et calcul du tableau de bord (rareté, ventes, espèce la plus rare). |

### Démarrage et données

- `DataSeeder` (`CommandLineRunner`) remplit la base au premier lancement via `INaturalistClient`, et `SpeciesImageStorageService` enregistre les photos dans `backend/data/species-images/`.
- Les photos sont servies statiquement sous `/species-images/**` (`WebConfig`).
- `StatusController` expose l'état de disponibilité de Spring : il ne passe à `ready: true` qu'une fois le seeding terminé.

## API REST

Base URL : `http://localhost:8080`. Les corps de requête et de réponse sont en JSON. Toutes les erreurs renvoient `{ "message": "..." }` avec le code HTTP adapté.

### Statut

| Méthode | Route | Description | Codes |
|---|---|---|---|
| `GET` | `/status` | `{ "ready": true }` quand le backend a fini de démarrer et de charger les espèces | `200` |

### Authentification

| Méthode | Route | Description | Codes |
|---|---|---|---|
| `POST` | `/auth/register` | Crée un compte et renvoie le joueur | `201`, `409` nom déjà pris |
| `POST` | `/auth/login` | Connecte un joueur et le renvoie | `200`, `401` identifiants invalides |

```json
// Requête
{ "username": "nicolas", "password": "secret" }

// Réponse (Player)
{ "id": 1, "username": "nicolas", "credits": 2500, "createdAt": "2026-09-25T10:12:00" }
```

### Coffres

| Méthode | Route | Description | Codes |
|---|---|---|---|
| `GET` | `/boxes` | Liste des coffres (`id`, `name`, `price`, `description`) | `200` |
| `GET` | `/boxes/{boxId}` | Détail d'un coffre | `200`, `404` |

### Joueurs

| Méthode | Route | Description | Codes |
|---|---|---|---|
| `POST` | `/players` | Crée un joueur (`username`, `password`) | `201`, `409` |
| `GET` | `/players/{playerId}` | Profil et solde | `200`, `404` |
| `GET` | `/players/{playerId}/inventory` | Collection du joueur | `200`, `404` |
| `POST` | `/players/{playerId}/inventory/{itemId}/sell` | Revend **un** exemplaire au prix de sa rareté | `200`, `404` joueur ou espèce non possédée |
| `GET` | `/players/{playerId}/history` | Historique des tirages (et de leur éventuelle vente), du plus récent au plus ancien | `200`, `404` |
| `GET` | `/players/{playerId}/stats` | Tableau de bord du joueur | `200`, `404` |

<details>
<summary>Exemples de réponses</summary>

`GET /players/1/inventory`

```json
[
  {
    "itemId": 10,
    "itemName": "Grant's Gazelle",
    "itemImageUrl": "/species-images/74724.jpeg",
    "itemDescription": "The Grant's gazelle (Nanger granti) is a species of gazelle...",
    "itemWikipediaUrl": "http://en.wikipedia.org/wiki/Grant's_gazelle",
    "rarityName": "Commun",
    "rarityColorHex": "#B0B0B0",
    "sellPrice": 10,
    "quantity": 3
  }
]
```

`POST /players/1/inventory/10/sell`

```json
{ "itemId": 10, "creditsEarned": 10, "remainingCredits": 1230, "remainingQuantity": 2 }
```

`GET /players/1/history`

```json
[
  {
    "pullId": 42,
    "itemId": 10,
    "boxName": "Coffre Savane Soleil Rouge",
    "itemName": "Grant's Gazelle",
    "rarityName": "Commun",
    "sellPrice": 10,
    "sold": true,
    "pulledAt": "2026-09-25T10:15:00",
    "soldPrice": 10,
    "soldAt": "2026-09-25T10:20:00"
  }
]
```

`GET /players/1/stats`

```json
{
  "playerId": 1,
  "boxOpened": 6,
  "boxOpenedByType": { "Coffre Banquise Grand Blanc": 4, "Coffre Savane Soleil Rouge": 2 },
  "rarestCard": { "itemId": 57, "itemName": "Steppe Eagle", "rarityName": "Épique", "rarityColorHex": "#A855F7", "itemImageUrl": "/species-images/5086.jpeg", "quantity": 1 },
  "rareCards": [
    { "itemId": 57, "itemName": "Steppe Eagle", "rarityName": "Épique", "rarityColorHex": "#A855F7", "itemImageUrl": "/species-images/5086.jpeg", "quantity": 1 }
  ],
  "cardsByRarity": { "Commun": 46, "Rare": 15, "Épique": 1 },
  "cardsSold": 3,
  "creditsEarned": 220
}
```

</details>

### Ouvertures

| Méthode | Route | Description | Codes |
|---|---|---|---|
| `POST` | `/players/{playerId}/boxes/{boxId}/openings` | Ouvre un coffre : débite son prix et renvoie les 5 tirages | `201`, `400` solde insuffisant, `404`, `409` coffre vide |

Chaque tirage renvoyé contient `itemId`, `itemName`, `itemImageUrl`, `itemDescription`, `itemWikipediaUrl`, `rarityName`, `rarityColorHex`, `sellPrice` et `remainingCredits` (solde après l'ouverture).

## Frontend

Application React (Vite) sans librairie de state management : chaque page charge ses données via les services, et le joueur connecté est gardé dans le `localStorage`.

### Pages

| Route | Page | Contenu |
|---|---|---|
| `/login` | `Login` | Formulaire de connexion / inscription (bascule entre les deux modes). |
| `/` | `Home` | Liste des coffres avec leur visuel et leur prix, bouton d'ouverture. |
| `/boosters/:boxId/open` | `BoosterOpening` | Animation du paquet (brillance, secousse), puis révélation des 5 cartes. Affiche le solde restant et propose « Ouvrir un autre » ou « Voir la collection ». |
| `/collection` | `Collection` | Grille des espèces possédées, filtres par rareté, fiche détaillée au clic avec bouton de revente. |
| `/history` | `History` | Tableau chronologique : tirages (« Tirage » ou « Vendu » si la carte a été revendue) et ventes (« Vente +X 💎 »). |
| `/stats` | `Stats` | Tableau de bord : total des tirages, ventes, espèces épiques et légendaires possédées, donut de répartition par rareté, coffres les plus ouverts. |

### Composants

| Composant | Rôle |
|---|---|
| `NavBar` | Logo, liens, solde de gems en direct, connexion / déconnexion. Menu burger sous 820 px. |
| `BackendGate` | Enveloppe toute l'app : interroge `/status` toutes les 2 s et affiche l'écran de démarrage tant que le backend n'est pas prêt. |
| `LoadingOverlay` / `Spinner` | Voile de chargement global affiché pendant chaque appel API. |
| `BoosterCard` | Carte d'un coffre sur l'accueil. |
| `AnimalCard` | Carte d'une espèce et sa fiche détaillée (modale). Accepte un `onSell` optionnel qui ajoute la section de revente. |
| `TotalTiragesCard`, `SalesCard`, `RarestSpeciesCard`, `StatusDonutCard`, `TopBoostersCard` | Cartes du tableau de bord. |

### Services

| Service | Rôle |
|---|---|
| `apiClient` | `apiFetch` (préfixe l'URL de l'API, gère les erreurs et le compteur de chargement), `resolveAssetUrl` (URL des photos), `checkBackendReady`. |
| `AuthService` | Inscription, connexion, déconnexion, joueur courant dans le `localStorage` et notification des composants abonnés (mise à jour du solde). |
| `HomeService` | Liste des coffres. |
| `OpeningService` | Détail d'un coffre et ouverture ; met à jour le solde. |
| `CollectionService` | Inventaire et revente ; met à jour le solde. |
| `HistoryService` | Historique des tirages. |
| `StatsService` | Tableau de bord. |
| `boosterVisuals` | Associe à chaque coffre son image, sa couleur d'accent et son dégradé de secours. |

### Style

Les styles sont écrits en objets JS inline, avec un petit bloc `<style>` par composant pour les media queries (`@media (max-width: 820px)` et `640px`). Palette : fond `#0B0C10`, cartes `#14151B`, accent doré `#C9A24B` / `#E8C77A`, titres en serif (Georgia).

## Limites connues

Ce projet est un travail de cours, pas un produit fini :

- Les mots de passe sont stockés et comparés **en clair**, et il n'y a ni session ni jeton : le joueur connecté est simplement mémorisé dans le `localStorage` du navigateur, et l'API ne vérifie pas que l'appelant est bien le joueur ciblé.
- Sans joueur connecté, les pages **Collection** et **Historique** affichent par défaut le joueur d'id `1`.
- Les ventes réalisées avant l'ajout de `soldAt` / `soldPrice` n'ont pas de date : elles apparaissent comme « Vendu » dans l'historique, mais sans ligne de vente dédiée.

## Auteurs

- **Nicolas**
- **Henri**
