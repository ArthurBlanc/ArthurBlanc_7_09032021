/*RESET AND CREATION SECTION*/
DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE IF NOT EXISTS groupomania;
USE groupomania;

SET NAMES utf8;

DROP TABLE IF EXISTS users;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `prenom` varchar(128) NOT NULL,
  `nom` varchar(128) NOT NULL,
  `email` varchar(128) UNIQUE NOT NULL,
  `password` varchar(64) NOT NULL,
  `admin` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------