# P7

![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://github.com/ArthurBlanc)
[![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://vuejs.org/)


## Description :

> Créez le réseau social d'une entreprise et manipulez des bases de données SQL.
>
> #### Compétences évaluées
>
> -   Implémenter un stockage de données sécurisé en utilisant SQL
> -   Personnaliser le contenu envoyé à un client web
> -   Authentifier un utilisateur et maintenir sa session
> -   Gérer un stockage de données à l'aide de SQL
>
### Situation (fictive) du projet :

Développeur web dans une petite agence web.

L'agence a obtenu un projet ambitieux de la part d'un de ses fidèles clients : la création d'un réseau social interne pour un groupe spécialisé dans la grande distribution. Le but de cet outil est de faciliter les interactions entre les employés, afin que ces derniers puissent partager des images, écrire des articles et commenter les différentes publications de leurs collègues.

Mon rôle a été de créer le front-end et le back-end du MVP (Minimum Viable Product) de ce réseau social interne.

### Cahier des charges :
#### Fonctionnalités :

- La création d’un compte doit être simple et possible depuis un téléphone mobile
- Le profil doit contenir très peu d’informations pour que sa complétion soit rapide
- La suppression du compte doit être possible
- La présentation des fonctionnalités doit être simple
- Les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés
- Le ou la chargé-e de communication  doit pouvoir modérer les interactions entre salariés
- Au moins une des deux fonctionnalités suivantes doit être présent dans le MVP :
  - L’accès à un forum où les salariés publient des contenus multimédias doit être présent
  - L’accès à un forum où les salariés publient des textes doit être présent

#### Contraintes techniques :
- Utilisation d'une base de données relationnelles se manipulant avec le langage SQL pour le stockage de données
- Les données de connexion des utilisateurs doivent être sécurisées
- Utilisation d'un framework front-end Javascript
- Respect des standards WCAG

## Installation

-   **Exécutez Git bash**
-   **git clone https://github.com/ArthurBlanc/ArthurBlanc_7_09032021**
     -   Vous devez créer localement la base de données, avec le terminal MySQL, vous devez créer un nouvel utilisateur avec la commande : ***CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';*** (en remplaçant ***newuser*** par votre nom d'utilisateur et ***password*** par le mot de passe que vous souhaitez utiliser).
     Ensuite, vous devez copier/coller le contenu du fichier ***backend/database_backup/groupomania.sql*** dans le terminal. Pour éviter toute erreur lors de la création de la base de données, il est recommandé de copier-coller paragraphe après paragraphe.
    -   Dans le dossier backend, exécutez la commande ***npm install***, une fois l'installation terminée, créez un fichier ***.env*** et remplissez le en prenant comme exemple le fichier ***.env.example***, enfin démarrez le serveur avec la commande ***node server*** ou ***nodemon server***.
    -   Dans le dossier frontend, exécutez la commande ***npm install***, une fois l'installation terminée, démarrez avec la commande ***npm run serve*** puis rendez-vous sur http://localhost:8080/.

## Développé avec

-   [Visual Studio Code](https://code.visualstudio.com/) - Éditeur de texte et son intégration de GitHub
-   [GitHub](https://github.com/) - Outil de gestion de versions
-   [Vue.js](https://vuejs.org/) - Framework JavaScript open-source
-   [Node.js](https://nodejs.org/en/) - Plateforme logicielle libre en JavaScript
-   [Express](https://expressjs.com/fr/) - Infrastructure Web minimaliste, souple et rapide pour Node.js
-   [MySQL](https://www.mysql.com/fr/) - Système de gestion de bases de données relationnelles

## Auteur

**Arthur Blanc** : [**GitHub**](https://github.com/ArthurBlanc/) - [**Portfolio**](https://abcoding.fr/)
