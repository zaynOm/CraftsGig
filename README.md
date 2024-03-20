# CraftsGig - Find skillful Craftsman

## Introduction

CraftsGig connect's you with top-notch professionals, backed by glowing reviews from satisfied customers just like you, It help's you find reliable craftsmen quickly with CraftsGig! Browse reviews and hire trustworthy workers for your project. Check out our deployed site in [craftsgig.me](), you can learn more in [this blog article](). If you want to get in touch [here is my linkedin account](https://www.linkedin.com/in/omar-ouaziz).

## Installation

1. Clone the repo:

   ```
   $ git clone https://github.com/zaynOm/CraftsGig
   ```

2. Postgres setup:

   > Note: It's important to setup the database correctly, otherwise the app will trow an error.

   ```sql
   $ cat setup_database.sql | psql -uroot -p
   ```

   or

   ```sql
   $ psql
   postgres=# CREATE DATABASE craftsman;
   ```

   After creating the database you should add it's url to an environment variable `DATABASE_URL`.

   ```text
   CraftsGig > backend > .env

   DATABASE_URL=postgresql://username:password@localhost/craftsman
   ```

3. Back-end dependencies:

   ```py
   $ cd craftsgig/backend
   $ pip install -r requirements.txt
   ```

4. Front-end dependencies:

   ```py
   $ cd ..
   $ npm install
   ```

## Usage

To start interacting with the app you need to start both back-end & front-end.

- Run the back-end:

  make sure you're inside the `backend` folder.

  ```
  $ flask run
  ```

- Run the front-end:

  make sure you're inside the `frontend` folder.

  ```
  $ npm run dev
  ```

## Licensing

This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.

For more details, please see: https://creativecommons.org/licenses/by-nc/4.0/
