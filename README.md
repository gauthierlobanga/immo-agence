# 🏠 IMMO Agence - Plateforme de Gestion Immobilière

IMMO Agence est une solution logicielle complète pour la gestion et la promotion de biens immobiliers. Développée avec les technologies les plus modernes de l'écosystème Laravel, elle offre une expérience utilisateur fluide et performante tant pour les clients que pour les agents immobiliers.

## 🚀 Fonctionnalités principales

### 🏘️ Gestion Immobilière

- **Annuaire de Biens** : Recherche et filtrage avancés de propriétés.
- **Fiches Détaillées** : Galeries d'images, documents joints, caractéristiques complètes.
- **Interactions** : Ajout aux favoris, demandes de visite, soumission d'offres d'achat/location.
- **Avis & Témoignages** : Système de notation et commentaires sur les biens et agences.

### 🏢 Gestion des Agences

- **Multi-Agences** : Support complet pour plusieurs agences avec gestion d'équipe.
- **Tableau de Bord** : Statistiques et suivi des activités en temps réel.
- **Gestion des Rôles** : Permissions fines via Filament Shield.

### 📝 Blog & Contenu

- **Système de Blog** : Publication d'articles, catégories, likes et commentaires.
- **Pages Statiques** : FAQ, À propos, Contact, Mentions légales, Cookies, etc.

### ⚙️ Infrastructure & Admin

- **Administration Puissante** : Back-office complet via Filament PHP.
- **Temps Réel** : Notifications et mises à jour live avec Laravel Reverb.
- **Recherche Instantanée** : Intégration de Laravel Scout.
- **Suivi des Performances** : Monitoring système avec Laravel Pulse.
- **Paiements & Abonnements** : Intégration Stripe via Laravel Cashier.
- **IA Intégrée** : Fonctionnalités basées sur l'intelligence artificielle.

## 🛠️ Stack Technique

- **Backend** : Laravel 11+
- **Frontend** : React 19 + Inertia.js 3.0 (avec SSR)
- **UI/UX** : Tailwind CSS 4 + Radix UI + Framer Motion + Three.js (Globe 3D interactif)
- **Base de données** : PostgreSQL
- **Cache/File d'attente** : Redis (Memurai sur Windows)
- **Admin Panel** : Filament v5
- **Outils de Dev** : Vite, TypeScript, Pest (Testing)

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **PHP 8.3+**
- **Composer**
- **Node.js & NPM**
- **Laravel Herd** (Recommandé pour Windows/Mac)
- **PostgreSQL**
- **Memurai** (Serveur Redis pour Windows) : [Télécharger ici](https://www.memurai.com/)
- **php_redis-6.3.0-8.4-nts-vs17-x64** (Extension PHP Redis pour Windows) : [Télécharger ici](https://downloads.php.net/~windows/pecl/releases/redis/6.3.0/)
- **cacert.pem** (Certificats d'autorité de certification) : [Télécharger ici](https://curl.se/docs/caextract.html)

## Comment intégré Memurai, php_redis et cacert

### Configurations

1. **Configuration de Mamurai** : Suivez toutes ces instructions correctement en ordre

    - Télécharger Mamurai avec Extension **.exe ou .msi** [Ici](https://www.memurai.com/)
    - Lancer l'installateur Mamurai **(.exe ou .msi)** [Memurai-for-Redis-v8.2-RC1.msi]
    - Vérifie que le service Mamurai est en cours d'exécution :

    ```powershell
    Get-Service -Name Memurai
    ```

    ```bash
    sc query Memurai | grep STATE
    ```

2. **Configuration l'extension php_redis** : Suivez toutes les instructions

    - Télécharger php_redis avec Extension **.zip** [Ici](https://downloads.php.net/~windows/pecl/releases/redis/6.3.0/)
    - Lancer la décompression
    - Copié le fichier **php_redis.dll**
    - Allez dans le dossier où php est installé selon votre système Ex: C:/php/ext/
    - Coller le fichier **php_redis.dll** dans le sous dossier **ext** Ex: C:/php/ext/
    - Vérifie que l'extension est activé :

    ```powershell
    php -m | Select-String "redis"
    ```

    ```bash
    php -m | grep -i redis
    ```

3. **Configuration de certificat** : Suivez toutes les instructions

    1. Télécharger le fichier cacert.pem

        - Télécharger Certificats d'autorité de certification [Ici]( https://curl.se/docs/caextract.html)

    2. Placer le fichier dans un dossier stable

        - Dans le dossier d’installation de PHP : **C:\php\cacert.pem**
        - Ou dans un dossier dédié : **C:\php\extras\cacert.pem**

    3. Configurer php.ini

        - Ouvrez le fichier php.ini utilisé par votre installation (celui indiqué par php --ini en ligne de commande).
        -Cherchez (ou ajoutez) ces directives et renseignez le chemin complet vers cacert.pem :

    [curl]
    curl.cainfo = C:\php\cacert.pem

    [openssl]
    openssl.cafile = C:\php\cacert.pem

    `Powershell`

    ```powershell
    php -i | Select-String "cainfo|cafile"
    ```

## 🔧 Installation

1. **Cloner le dépôt** :

   ```bash
   git clone https://github.com/gauthierlobanga/immo-agence.git
   cd immo-agence
   ```

2. **Installation des dépendances PHP** :

   ```bash
   composer install
   ```

3. **Installation des dépendances JavaScript** :

   ```bash
   npm install
   ```

4. **Configuration de l'environnement** :

   ```bash
   cp .env.example .env
   ```

   *Éditez le fichier `.env` pour configurer vos accès PostgreSQL et Redis.*

5. **Génération de la clé d'application** :

   ```bash
   php artisan key:generate
   ```

6. **Migration et Seed de la base de données** :
   Pour initialiser la base de données avec des données de test (création de 50 utilisateurs et remplissage des propriétés via `PropertySeeder`) :

   ```bash
   php artisan migrate --seed
   ```

   *Ou si la base est déjà migrée :*

   ```bash
   php artisan db:seed
   ```

7. **Configuration de Laravel Herd** :
   - Ajoutez le site dans Herd.
   - **Activez le mode HTTPS** dans les réglages de Herd pour ce site.

8. **Configuration des Rôles et Permissions (Filament Shield)** :
   L'application utilise **Filament Shield** pour la gestion des accès. Suivez impérativement ces étapes pour accéder à l'administration :
   - **Créer un compte** : Rendez-vous sur la page d'inscription de l'application et créez un nouvel utilisateur.
   - **Récupérer l'UUID** : Identifiez l'UUID de l'utilisateur créé (via la base de données).
   - **Installer Shield** :

     ```bash
     php artisan shield:install
     ```

   - **Générer les permissions** :

     ```bash
     php artisan shield:generate --all
     ```

     *(Choisissez l'option `permissions` lors de la demande).*
   - **Assigner le rôle Super Admin** :

     ```bash
     php artisan shield:super-admin --user=VOTRE_UUID_ICI --panel=admin
     ```

## 🖥️ Exécution du projet

Pour lancer le projet en développement, utilisez la commande suivante (qui lance simultanément le serveur, Vite et les files d'attente) :

```bash
npm run dev
```

### Autres commandes utiles

- **Files d'attente** : `php artisan queue:work`
- **Reverb (WebSocket)** : `php artisan reverb:start`
- **Pulse (Monitoring)** : Accédez à `/pulse`
- **Admin** : Accédez à `/admin`

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).
