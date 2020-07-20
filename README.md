# SFH - API

## Prerequisite

Create database with `sfh` name:

```bash
mysqladmin -u root -p create sfh
mysql -u root -p sfh < database/sfh.sql
mysql -u root -p sfh < database/sfh-001.sql
```

Add special user for `sfh` database, e.g. `sfh_user`:

```bash
mysql -u root -p
```

```mysql
-- localhost
CREATE USER 'sfh_user'@'localhost' IDENTIFIED BY 'myPassword123';
GRANT ALL PRIVILEGES ON sfh.* TO 'sfh_user'@'localhost' WITH GRANT OPTION;

-- non localhost
CREATE USER 'sfh_user'@'%' IDENTIFIED BY 'myPassword123';
GRANT ALL PRIVILEGES ON sfh.* TO 'sfh_user'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
```

## Installation

Install dependencies:

```bash
npm install
```

Add your credentials:

```bash
cp .env.example .env
vi .env
```

## Start application

We use `http.js` for starting point, check `scripts` inside `package.json` file.
Run app with:

```bash
npm start
```

Try login with this account:

```text
username: admin@sakola.co.id
password: admin123
```

Don't forget to delete this after installation
