# Ecommerce app

It is my first React app with my own backend API.
App isn't perfect but work :) Have fun!
Images used in project are from [flaticon.com](https://www.flaticon.com/packs/color-design-tools)

### #1: Download

Clone files to your computer. If you want to use wordpress, use the "/wp-contentt/themes" dir. Next install node dependencies.

```bash
$ git clone https://github.com/Ghornon/Ecommerce-app.git dirName
$ cd dirName
```

### #2: Setup database

Downlad and install MySQL (https://www.mysql.com/)

### #2.1: Import ecommerce.sql

Import included [eccommerce.sql](https://github.com/Ghornon/Ecommerce-app/blob/master/ecommerce.sql) file into your database

### #2.2: Change your connection information

Go to `server/config/index.js` and modify **DB_CONFIG** to connect with your database.

```JavaScript
const DB_CONFIG = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'ecommerce',
	connectionLimit: 10,
};
```

### #3: Install dependencies

I used create-react-app for easier setup so you need to install it

```bash
$ npm install -g create-react-app
$ cd client
$ npm install
# AND server
$ cd server
$ npm install
```

### #4: Run app

```bash
$ cd client
$ npm start
# OR
$ cd server
$ npm start
# To stop press CTRL + C
```

# API Routes documentation

1. Users
2. Products
3. Cart
4. Checkout
5. Orders

## Users: (`/api/users`)

| Type     |    URL     |        Description         |
| -------- | :--------: | :------------------------: |
| **GET**  | `/profile` |   Get user profile data    |
| **GET**  | `/address` |   Get user address data    |
| **GET**  | `/payment` |   Get user payment data    |
| **POST** | `/signin`  |    Sign in to get token    |
| **POST** | `/signup`  | Sing up user and get token |
| **POST** | `/profile` |  Insert user profile data  |
| **POST** | `/address` |  Insert user address data  |
| **POST** | `/payment` |  Insert user payment data  |
| **PUT**  | `/profile` |  Update user profile data  |
| **PUT**  | `/address` |  Update user address data  |
| **PUT**  | `/payment` |  Update user payment data  |

#### `/signup` **body**:

```
{
	"email": String,
    "password": String,
    "fname": String,
    "lname": String
}
```

#### `/signin` **body**:

```
{
	"email": String,
    "password": String
}
```

#### `/profile` **body GET**:

```
{
	"email": String,
    "fname": String,
    "lname": String
}
```

#### `/profile` **body POST/PUT**:

```
{
	"email": String,
	"password": String,
    "fname": String,
    "lname": String
}
```

#### `/address` **body**:

```
{
	"address": String,
    "country": String,
    "state": String,
    "zip": Number
}
```

#### `/payment` **body**:

```
{
	"name": String,
    "number": Number,
    "expiration": Date,
    "ccv": Number
}
```

## Products: (`/api/products`)

| Type       |   URL    |     Description      |
| ---------- | :------: | :------------------: |
| **GET**    |   `/`    |  Get products list   |
| **GET**    | `/{:id}` | Get specific product |
| **POST**   |   `/`    |   Add new product    |
| **PUT**    | `/{:id}` | Update product data  |
| **DELETE** | `/{:id}` |    Delete prduct     |

#### `/products` **body**:

```
{
	"name": String,
    "price": Number,
    "description": String,
    "svg": String
}
```

## Cart: (`/api/cart`)

#### Needed token to authorization **Headers:** (_Authorization/token_)

| Type       |       URL       |                    Description                    |
| ---------- | :-------------: | :-----------------------------------------------: |
| **GET**    |       `/`       |             Get products list in cart             |
| **GET**    |  `/add/{:id}`   |   Add product to cart with specific id as link    |
| **GET**    | `/remove/{:id}` | Remove product from cart with specific id as link |
| **POST**   |    `/{:id}`     |       Add product to cart with specific id        |
| **DELETE** |    `/{:id}`     |     Remove product from cart with specific id     |

#### `/cart` **body** (array of):

```
{
	"cart_id": Number,
    "product_id": Number,
    "name": String,
    "price": Number,
    "svg": String
}
```

## Orders: (`/api/orders`)

#### Needed token to authorization **Headers:** (_Authorization/token_)

| Type     | URL |   Description    |
| -------- | :-: | :--------------: |
| **GET**  | `/` | Get orders list  |
| **POST** | `/` | Create new order |

#### `/orders` **body** (array of):

```
{
	"shipping_id": Number,
    "name": String,
    "price": Number,
    "svg": String,
    "status": String
}
```
