## **Web Application - SimpleCargo App**

**Backend Api**
**" SimpleCargo App"** jest serwerową aplikacją napisaną w języku TypeScript z użyciem frameworka Express.js oraz bazy danych NoSQL. Aplikacja służy do zarządzania informacjami o kierowcach i przypisywania kierowców do ładunków.

**Wymagania**
Aplikacja wymaga zainstalowania Node.js w wersji 16 lub nowszej oraz bazy danych NoSQL.

**Możesz skorzystać z aplikacji pod ardesem: _simplecargo.networkmanager.pl_**

```TypeScript
{
"email": "user@user.com"
"password": "user11"
};
```

**Proponowane "user story":**

1. Pierwsza strona to formularz do dodawania kierowcy - dodaj swojego kierowcę, zapamiętaj nr ref.
2. Kliknij w kluczyk, możesz się zalogować danymi powyżej, lub zarejestrować swojego użytkownika - administratora, następnie zalogować się utworzonymi danymi.
3. Button Loads > add > dodaj ładunek, zapamiętaj nr ref, to po nim aplikacja dopasowuje kierowcę.
4. Aplikacja dopasowała kierowcę do ładunku i ładunek do kierowcy.
5. W zakładce `Drivers` wyświetlisz listę kierowców, a za pomocą buttona `+Add` dodasz kierowcę.
6. Klikając na imię kierowcy, przejdziesz do jego szczegółowych informacji.
7. Tak samo w przypadku zakładki `Loads`

## **Instalacja i uruchomienie**

- Sklonuj repozytorium,
- Zainstaluj wymagane zależności przy pomocy polecenia `npm install`
- Edytuj plik utills/config - konfiguracja połączenia z bazą danych,
  oraz cors i adresy:

```TypeScript
export const config = {

JWT_SECRET: "secret",

REFRESH_SECRET: "refreshsecret",

dbHost: "localhost", //adres hosta bazy danych,

dbUser: "user", //użytkownik bazy danych,

dbDatabase: "db_name", //nazwa bazy danych,

dbPassword: "password", //hasło do bazy danych,

corsOrigin: "http://localhost:3000", //adres dopuszczony do wykonywania zapytań do API,
};
```

- Utwórz bazę danych w NoSQL:
  - skopiuj i uruchom w bazie danych kod z pliku createdb.txt
- Uruchom serwer przy pomocy polecenia `npm run start`

**Testy:**
Aplikacja ma podstawowe testy jednostkowe dla driverRecord
`npm run test`

## Security

**Rejestracja i logowanie:**

- Rejestrując użytkownika, w bazie danych nie zapisujemy jego hasła, a
  hash stworzony przez moduł `bcrypt`, wraz z 10 x sól.
- Podczas logowania, funkcja skrótu weryfikuje hasło logowania.
- Podczas logowania tworzony jest **JWT**, wysyłany z `httpOnly cookie`
- `api/refresh` - odświeża **JWT** token.

**Middleware do autentykacji**

- Middleware weryfikuje użytkownika przy każdym zapytaniu, sprawdza
  jego \*_JWT_ token na każdej ścieżce z wyjątkiem `PUSH /api/driver`

**CORS:**

- W pliku`utils/config`nalezy, ustawić adres który będzie akceptował CORS.

## Endpointy API

Aplikacja udostępnia następujące endpointy API:
**GET api/** - zwraca przywitanie
**POST api/register** -rejestracja użytkownika/operatora aplikacji
**POST api/login** - logowanie użytkownika/operatora aplikacji
**POST api/logout** - wylogowanie użytkownika
**POST api/refresh** - wylogowanie użytkownika

**GET api/driver/:id** - zwraca informacje o kierowcy o podanym identyfikatorze

**POST api/driver** - dodaje nowego kierowcę

**PATCH api/driver/:id** - aktualizuje informacje o kierowcy o podanym identyfikatorze

**DELETE api/driver/:id** - usuwa kierowcę o podanym identyfikatorze

**GET api/load** - zwraca listę wszystkich ładunków

**GET api/load/:id** - zwraca informacje o ładunku o podanym identyfikatorze

**POST api/load** - dodaje nowy ładunek

**PATCH api/load/:id** - aktualizuje informacje o ładunku o podanym identyfikatorze

**DELETE api/load/:id** - usuwa ładunek o podanym identyfikatorze

_Opis endpointów API:_
**`GET api/`**
Endpoint zwraca przywitanie w formacie JSON:

```TypeScript
{
	"greet": "hello! test"
}
```

**`POST api/register`**
Endpoint służący do rejestracji użytkownika, przyjmuje dane w formacie JSON:

```TypeScript
{
	"name":"string",
	"email": "string",
	"password": "string" //minimum 5 znaków
}
```

**`POST api/login`**
Endpoint służący do logowania użytkownika, przyjmuje dane w formacie JSON:

```TypeScript
{
	"email": "string",
	"password": "string" //minimum 5 znaków
}
```

**`POST api/logout`**
Endpoint służący do wylogowania użytkownika, czyści dane autoryzacyjne z ciastka, zwraca JSON:

```TypeScript
{
	message:  "logged out",
}
```

**`POST api/refresh`**
Endpoint służący do odświeżania JWT. Weryfikuje `req.body.refreshToken` przesłany w body (autoryzacja na front-end), odsyła `accesToken` lub wiadomość JSON:

```TypeScript
{
	message:  "Unauthorized",
}
//lub
{
	{ accestToken }
}
```

**`GET api/driver`**
Endpoint zwraca listę wszystkich kierowców w formacie JSON. Przykładowa odpowiedź:

````TypeScript
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
		]}```

````

**`GET api/driver/:id`**
Endpoint zwraca informacje o kierowcy o podanym identyfikatorze w formacie JSON.

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

**`POST api/driver`**
Endpoint dodaje nowego kierowcę na podstawie przekazanych w ciele żądania danych w formacie JSON.

```TypeScript

			{
			"id": "" //automatycznie ustawia uuid gdy nie podano,
			"referenceNumber": "string" //wymagany,
			"name": "string",
			"lastName": "string",
			"phoneNumber": number,
			"truckNumber": "string",
			"trailerNumber": "string",
			"companyName": number,
			"loadingUnloading": "string",
			"loadId": "uuid || NOT SIGN" //automatycznie przypisany,
		}

```

**`PATCH api/driver/:id`**
Endpoint aktualizuje informacje o kierowcy o podanym identyfikatorze na podstawie przekazanych w ciele żądania danych w formacie JSON:

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

**`GET api/load`**
Endpoint zwraca listę wszystkich ładunków w formacie JSON. Przykładowa odpowiedź:

```TypeScript
{
	"loadRouter": "ok",
	"loadList": [
		{
			"id": "uuid",
			"referenceNumber": "string",
			"loadName": "string	",
			"sender": "string",
			"forwarder": "string",
			"recipient": string",
			"units": "string",
			"quantity": number,
			"weight": number,
			"driverId": "uuid || NOT SIGN",
			"startDate": "string DD/MM",
			"endDate": "NOT SIGN"
		},
		{
			"id": "uuid",
			"referenceNumber": "string",
			"loadName": "string	",
			"sender": "string",
			"forwarder": "string",
			"recipient": string",
			"units": "string",
			"quantity": number,
			"weight": number,
			"driverId": "uuid || NOT SIGN",
			"startDate": "string DD/MM",
			"endDate": "NOT SIGN"
		}]
	}
```

**`GET api/load/:id`**
Endpoint zwraca informacje o ładunku o podanym identyfikatorze w formacie JSON.

```TypeScript
{
			"id": "uuid",
			"referenceNumber": "string",
			"loadName": "string	",
			"sender": "string",
			"forwarder": "string",
			"recipient": string",
			"units": "string",
			"quantity": number,
			"weight": number,
			"driverId": "uuid || NOT SIGN",
			"startDate": "string DD/MM",
			"endDate": "NOT SIGN"
		}
```

`POST api/load`
Endpoint dodaje nowy ładunek na podstawie przekazanych w ciele żądania danych w formacie JSON.

```TypeScript
{
			"id": "" //automatycznie przypisuje gdy nie podano,
			"referenceNumber": "string" //wymagany,
			"loadName": "string	",
			"sender": "string",
			"forwarder": "string",
			"recipient": string",
			"units": "string",
			"quantity": number //wymagany,
			"weight": number //wymagany,
			"driverId": "uuid || NOT SIGN",
			"startDate": "string DD/MM" //automatycznie przypisany,
			"endDate": "NOT SIGN" //automatycznie przypisany,
		}
```

**`PATCH api/load/:id`**
Endpoint aktualizuje informacje o ładunku o podanym identyfikatorze na podstawie przekazanych w ciele żądania danych w formacie JSON.

```TypeScript
{
			"referenceNumber": "string" //wymagany,
			"loadName": "string	",
			"sender": "string",
			"forwarder": "string",
			"recipient": string",
			"units": "string",
			"quantity": number //wymagany,
			"weight": number //wymagany,
			"driverId": "uuid || NOT SIGN",
			"startDate": "string DD/MM" //automatycznie przypisany,
			"endDate": "NOT SIGN" //automatycznie przypisany,
		}
```
