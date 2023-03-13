![Groupomania](/frontend/public/Images/icon-left-font-monochrome-black.png)

# Groupomania 👥🏢

[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://github.com/ArthurBlanc)
[![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://vuejs.org/)

<a href="#description-fr-">README en Français</a> - <a href="#en-description">English README</a>

## Description FR :

Ceci est un projet réalisé dans le cadre du programme de formation Développeur Web chez [OpenClassrooms](https://openclassrooms.com/fr/paths/717-developpeur-web)

> Créez le réseau social d'une entreprise et manipulez des bases de données SQL.
>
> #### Compétences évaluées :
>
> -   Implémenter un stockage de données sécurisé en utilisant SQL 🔒
> -   Personnaliser le contenu envoyé à un client web 📝
> -   Authentifier un utilisateur et maintenir sa session 🔑
> -   Gérer un stockage de données à l'aide de SQL 🗄️

### Situation (fictive) du projet :

Développeur web dans une petite agence web.

L'agence a obtenu un projet ambitieux de la part d'un de ses fidèles clients : la création d'un réseau social interne pour un groupe spécialisé dans la grande distribution. Le but de cet outil est de faciliter les interactions entre les employés, afin que ces derniers puissent partager des images, écrire des articles et commenter les différentes publications de leurs collègues.

Mon rôle a été de créer le front-end et le back-end du MVP (Minimum Viable Product) de ce réseau social interne.

### Cahier des charges :

#### Fonctionnalités :

-   La création d’un compte doit être simple et possible depuis un téléphone mobile
-   Le profil doit contenir très peu d’informations pour que sa complétion soit rapide
-   La suppression du compte doit être possible
-   La présentation des fonctionnalités doit être simple
-   Les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés
-   Le ou la chargé-e de communication doit pouvoir modérer les interactions entre salariés
-   Au moins une des deux fonctionnalités suivantes doit être présent dans le MVP :
    -   L’accès à un forum où les salariés publient des contenus multimédias doit être présent
    -   L’accès à un forum où les salariés publient des textes doit être présent

#### Contraintes techniques :

-   Utilisation d'une base de données relationnelles se manipulant avec le langage SQL pour le stockage de données
-   Les données de connexion des utilisateurs doivent être sécurisées
-   Utilisation d'un framework front-end Javascript
-   Respect des standards WCAG

## Installation :

### Procédure d'installation :

1. Cloner le repository :

-   `git clone https://github.com/ArthurBlanc/Groupomania`

2. Vous devez créer localement la base de données, avec le terminal MySQL, vous devez créer un nouvel utilisateur avec la commande :

-   `CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';`
    (en remplaçant **_newuser_** par votre nom d'utilisateur et **_password_** par le mot de passe que vous souhaitez utiliser).

3.  Ensuite, vous devez copier/coller le contenu du fichier **_backend/database_backup/groupomania.sql_** dans le terminal. Pour éviter toute erreur lors de la création de la base de données, il est recommandé de copier-coller paragraphe après paragraphe.

### Installation et lancement du back-end :

1. Aller dans le dossier "backend"

2. Installer toutes les dépendances pour le back-end :

-   `npm install` ou `yarn`

3. Créez un fichier **_.env_** et remplisez le en prenant comme exemple le fichier **_.env.example_**

4. Lancer le back-end :

-   `node server` ou `nodemon server`

### Installation et lancement du front-end :

1. Aller dans le dossier "frontend"

2. Installer toutes les dépendances pour le front-end:

-   `npm install` ou `yarn`

3. Lancer le front-end:

-   `npm run serve` ou `yarn run serve`

Le front-end sera lancé à l'URL:
`http://localhost:8080/`.

## Développé avec :

-   [Visual Studio Code](https://code.visualstudio.com/) - Éditeur de texte
-   [GitHub](https://github.com/) - Outil de gestion de versions
-   [Vue.js](https://vuejs.org/) - Framework JavaScript
-   [Node.js](https://nodejs.org/en/) - Plateforme pour exécuter du code JavaScript côté serveur
-   [Express](https://expressjs.com/fr/) - Framework web pour Node.js
-   [MySQL](https://www.mysql.com/fr/) - Système de gestion de base de données relationnelle open-source

## Auteur :

**Arthur Blanc** : [**GitHub**](https://github.com/ArthurBlanc/) - [**Portfolio**](https://abcoding.fr/portfolio)

---

## EN Description:

This is a project carried out as part of the Web Developer training program at [OpenClassrooms](https://openclassrooms.com/en/paths/555-web-developer).

> Create the social network of a company and manipulate SQL databases.
>
> #### Evaluated skills:
>
> -   Implement secure data storage using SQL 🔒
> -   Customize the content sent to a web client 📝
> -   Authenticate a user and maintain their session 🔑
> -   Manage data storage using SQL 🗄️

### Project (fictional) situation:

Web developer at a small web agency.

The agency has obtained an ambitious project from one of its loyal clients: the creation of an internal social network for a group specialized in large distribution. The goal of this tool is to facilitate interactions between employees so that they can share images, write articles, and comment on their colleagues' various publications.

My role was to create the front-end and back-end of the MVP (Minimum Viable Product) of this internal social network.

### Specifications:

#### Features:

-   Account creation should be simple and possible from a mobile phone
-   The profile must contain very little information so that it can be completed quickly
-   Account deletion should be possible
-   The presentation of features should be simple
-   Users should be able to easily spot the latest employee contributions
-   The communication manager must be able to moderate interactions between employees
-   At least one of the following two features must be present in the MVP:
    -   Access to a forum where employees post multimedia content must be present
    -   Access to a forum where employees post texts must be present

#### Technical constraints:

-   Use of a relational database that can be manipulated with SQL for data storage
-   User login information must be secure
-   Use of a Javascript front-end framework
-   Adherence to WCAG standards

## Installation:

### Installation procedure:

1. Clone the repository:

-   `git clone https://github.com/ArthurBlanc/Groupomania`

2. You need to create the local database with the MySQL terminal, you must create a new user with the command:

-   `CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';`
    (replacing newuser with your username and password with the password you want to use).

3.  Then, you need to copy/paste the contents of the file backend/database_backup/groupomania.sql into the terminal. To avoid any errors during the creation of the database, it is recommended to copy and paste paragraph by paragraph.

### Installation and launch of the back-end:

1. Go to the "backend" folder.

2. Install all dependencies for the back-end:

-   `npm install` or `yarn`

3. Create a .env file and fill it out using the .env.example file as an example.

4. Launch the back-end:

-   `node server` or `nodemon server`

### Installation and launch of the front-end:

1. Go to the "frontend" folder.

2. Install all dependencies for the front-end:

-   `npm install` or `yarn`

3. Launch the front-end:

-   `npm run serve` or `yarn run serve`

The front-end will be launched at the URL:
`http://localhost:8080/`.

## Build With:

-   [Visual Studio Code](https://code.visualstudio.com/) - Text editor
-   [GitHub](https://github.com/) - Version control tool
-   [Vue.js](https://vuejs.org/) - Javascript framework
-   [Node.js](https://nodejs.org/en/) - Platform for running server-side Javascript code
-   [Express](https://expressjs.com/fr/) - Web framework for Node.js
-   [MySQL](https://www.mysql.com/fr/) - Open-source relational database management system

## Author:

**Arthur Blanc**: [**GitHub**](https://github.com/ArthurBlanc/) - [**Portfolio**](https://abcoding.fr/portfolio)
