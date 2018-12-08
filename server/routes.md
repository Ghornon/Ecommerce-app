# API Routes documentation

1. Users
2. Products
3. Cart
4. Checkout

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

```JSON
{
	"email": String,
    "password": String,
    "fname": String,
    "lname": String
}
```

#### `/signin` **body**:

```JSON
{
	"email": String,
    "password": String
}
```

#### `/profile` **body GET**:

```JSON
{
	"email": String,
    "fname": String,
    "lname": String
}
```

#### `/profile` **body POST/PUT**:

```JSON
{
	"email": String,
	"password": String,
    "fname": String,
    "lname": String
}
```

#### `/address` **body**:

```JSON
{
	"address": String,
    "country": String,
    "state": String,
    "zip": Number
}
```

#### `/address` **body**:

```JSON
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

#### `/` **body**:

```JSON
{
	"name": String,
    "price": Number,
    "description": String,
    "svg": String
}
```

## Cart: (`/api/products`)

#### Needed token to authorization **Headers:** (_Authorization/token_)

| Type       |       URL       |                    Description                    |
| ---------- | :-------------: | :-----------------------------------------------: |
| **GET**    |       `/`       |             Get products list in cart             |
| **GET**    |  `/add/{:id}`   |   Add product to cart with specific id as link    |
| **GET**    | `/remove/{:id}` | Remove product from cart with specific id as link |
| **POST**   |    `/{:id}`     |       Add product to cart with specific id        |
| **DELETE** |    `/{:id}`     |     Remove product from cart with specific id     |
