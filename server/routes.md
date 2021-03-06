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
