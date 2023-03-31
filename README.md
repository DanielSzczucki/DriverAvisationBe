## **Web Application - SimpleCargo App**

**Backend Api** "SimpleCargo App" is a server-side application written in TypeScript using the Express.js framework and NoSQL database. The application is used to manage information about drivers and assign drivers to loads.

**Requirements** The application requires Node.js version 16 or newer and a NoSQL database.

**You can use the application at the address: _simplecargo.networkmanager.pl_**

```TypeScript
{
"email": "user@user.com"
"password": "user11"
};
```

**Proposed User Story:**

1.  The first page is a form for adding a driver - add your driver and remember the reference number.
2.  Click on the key, you can log in with the above data, or register your user - administrator, then log in with the created data.
3.  Button Loads > add > add load, remember the reference number, which the application uses to match the driver.
4.  The application has matched the driver to the load and the load to the driver.
5.  In the `Drivers` tab, you will see a list of drivers, and using the `+Add` button, you can add a driver.
6.  Clicking on the driver's name will take you to their detailed information.
7.  The same applies to the `Loads` tab.

## **Installation and Execution**

- Clone the repository.
- Install required dependencies using the command `npm install`.
- Edit the utills/config file - configure the database connection, as well as cors and addresses:

```TypeScript
export const config = {
JWT_SECRET: "secret",
REFRESH_SECRET: "refreshsecret",
dbHost: "localhost", //database host address,
dbUser: "user", //database user,
dbDatabase: "db_name", //database name,
dbPassword: "password", //database password,
corsOrigin: "http://localhost:3000", //address allowed to make API requests,
};
```

- Create a NoSQL database:
  - copy and run the code from the createdb.txt file in the database.
- Run the server using the command `npm run start`.

**Tests:** The application has basic unit tests for driverRecord. `npm run test`

## Security

**Registration and login:**

- When registering a user, we do not save their password in the database. Instead, we use a hash created by the `bcrypt` module, along with a salt generated 10 times.
- During login, the hash function verifies the login password.
- During login, a **JWT** is created and sent with an `httpOnly cookie`.
- `api/refresh` - refreshes the **JWT** token.

**Authentication middleware**

- The middleware verifies the user on every request and checks their **JWT** token on every path except `PUSH /api/driver`.

**CORS:**

- In the `utils/config` file, you need to set the address that will accept CORS.

## API Endpoints

The application provides the following API endpoints:
**GET api/** - returns a greeting.
**POST api/register** - registers a user/application operator.
**POST api/login** - logs in a user/application operator.
**POST api/logout** - logs out a user.
**POST api/refresh** - refreshes a user's session.

**GET api/driver/:id** - returns information about the driver with the specified identifier.

**POST api/driver** - adds a new driver.

**PATCH api/driver/:id** - updates information about the driver with the specified identifier.

**DELETE api/driver/:id** - deletes the driver with the specified identifier.

**GET api/load** - returns a list of all loads.

**GET api/load/:id** - returns information about the load with the specified identifier.

**POST api/load** - adds a new load.

**PATCH api/load/:id** - updates information about the load with the specified identifier.

**DELETE api/load/:id** - deletes the load with the specified identifier.

**_API Endpoints Description:_**
**`GET api/`** This endpoint returns a greeting message in JSON format:

```TypeScript
{
	"greet": "hello! test"
}
```

**`POST api/register`** This endpoint is used for user registration, and accepts data in JSON format:

```TypeScript
{
	"name":"string",
	"email": "string",
	"password": "string" //minimum 5 characters
}
```

**`POST api/login`** This endpoint is used for user login, and accepts data in JSON format:

```TypeScript
{
	"email": "string",
	"password": "string" //minimum 5 characters
}
```

**`POST api/logout`** This endpoint is used for user logout, clears authentication data from cookies, and returns JSON:

```TypeScript
{
	message:  "logged out",
}
```

**`POST api/refresh`** This endpoint is used for refreshing JWT. It verifies `req.body.refreshToken` sent in the body (front-end authentication: react-auth-kit), sends back `accesToken`, or a JSON message:

```TypeScript
{
	message:  "Unauthorized",
}
// or
{
	{ accestToken }
}
```

**`GET api/driver`** This endpoint returns a list of all drivers in JSON format. Sample response:

```TypeScript
{
	"driverRouter": "ok",
	"driverList": [
		{
			"id": "uuid",
			"referenceNumber": "string",
			"name": "string",
			"lastName": "string",
			"phoneNumber": number,
			"truckNumber": "string",
			"trailerNumber": "string",
			"companyName": number,
			"loadingUnloading": "string",
			"loadId": "uuid || NOT SIGN"
		},
		{
			"id": "uuid",
			"referenceNumber": "string",
			"name": "string",
			"lastName": "string",
			"phoneNumber": number,
			"truckNumber": "string",
			"trailerNumber": "string",
			"companyName": number,
			"loadingUnloading": "string",
			"loadId": "uuid || NOT SIGN"
		}
		]
}
```

**`GET api/driver/:id`** This endpoint returns information about the driver with the specified identifier in JSON format.

```TypeScript
{
	"id": "uuid",
	"referenceNumber": "string",
	"name": "string",
	"lastName": "string",
	"phoneNumber": number,
	"truckNumber": "string",
	"trailerNumber": "string",
	"companyName": number,
	"loadingUnloading": "string",
	"loadId": "uuid || NOT SIGN"
}
```

**`POST api/driver`** This endpoint adds a new driver based on the data provided in the request body in JSON format.

```TypeScript
{
	"id": "" //automatically set uuid when not provided,
	"referenceNumber": "string" //required,
	"name": "string",
	"lastName": "string",
	"phoneNumber": number,
	"truckNumber": "string",
	"trailerNumber": "string",
	"companyName": number,
	"loadingUnloading": "string",
	"loadId": "uuid || NOT SIGN" //automatically assigned,
}
```

**`PATCH api/driver/:id`** This endpoint updates the information about the driver with the given identifier based on the data passed in the JSON format request body:

```TypeScript
{
    "referenceNumber": "string",
    "name": "string",
    "lastName": "string",
    "phoneNumber": number,
    "truckNumber": "string",
    "trailerNumber": "string",
    "companyName": number,
    "loadingUnloading": "string",
    "loadId": "uuid || NOT SIGN"
}
```

**`GET api/load`** This endpoint returns a list of all loads in JSON format. Example response:

```TypeScript
{
    "loadRouter": "ok",
    "loadList": [
        {
            "id":  "uuid",
            "referenceNumber":  "string",
            "loadName":  "string ",
            "sender":  "string",
            "forwarder":  "string",
            "recipient": "string",
            "units": "string",
            "quantity": number,
            "weight": number,
            "driverId":  "uuid || NOT SIGN",
            "startDate":  "string DD/MM",
            "endDate":  "NOT SIGN"
        },
        {
            "id":  "uuid",
            "referenceNumber":  "string",
            "loadName":  "string ",
            "sender":  "string",
            "forwarder":  "string",
            "recipient": "string",
            "units": "string",
            "quantity": number,
            "weight": number,
            "driverId":  "uuid || NOT SIGN",
            "startDate":  "string DD/MM",
            "endDate":  "NOT SIGN"
        }
    ]
}
```

**`GET api/load/:id`** This endpoint returns information about the load with the given identifier in JSON format:

```TypeScript
{
    "id": "uuid",
    "referenceNumber": "string",
    "loadName": "string ",
    "sender": "string",
    "forwarder": "string",
    "recipient": "string",
    "units": "string",
    "quantity": number,
    "weight": number,
    "driverId": "uuid || NOT SIGN",
    "startDate": "string DD/MM",
    "endDate": "NOT SIGN"
}
```

`POST api/load` This endpoint adds a new load based on the data passed in the JSON format request body:

```TypeScript
{
    "id": "", // automatically assigned if not provided
    "referenceNumber": "string", // required
    "loadName": "string ",
    "sender": "string",
    "forwarder": "string",
    "recipient": "string",
    "units": "string",
    "quantity": number, // required
    "weight": number, // required
    "driverId": "uuid || NOT SIGN",
    "startDate": "string DD/MM", // automatically assigned
    "endDate": "NOT SIGN" // automatically assigned
}
```

**`PATCH api/load/:id`** This endpoint updates the information about the load with the given identifier based on the data passed in the JSON format request body:

```TypeScript
{
    "referenceNumber": "string", // required
    "loadName": "string ",
    "sender": "string",
    "forwarder": "string",
    "recipient": "string",
    "units": "string",
    "quantity": number, // required
    "weight": number, // required
    "driverId": "uuid || NOT SIGN",
    "startDate": "string DD/MM", // automatically assigned
    "
   }
```
