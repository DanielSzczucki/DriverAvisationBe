Web Application
Backend Api
App name: Driver Avisation (SimpleCargo App)

Opis
"DriverAvisationBe" jest serwerową aplikacją napisaną w języku TypeScript z użyciem frameworka Express.js oraz bazy danych NoSQL. Aplikacja służy do zarządzania informacjami o kierowcach i przypisywania kierowców do ładunków.

Wymagania
Aplikacja wymaga zainstalowania Node.js w wersji 16 lub nowszej oraz bazy danych NoSQL.

Instalacja i uruchomienie
Sklonuj repozytorium
Zainstaluj wymagane zależności przy pomocy polecenia npm install
Edytuj plik utills/config - konfiguracja połączenia z bazą danych, oraz cors i adresy:

export const config = {
JWT_SECRET: "secret",
REFRESH_SECRET: "refreshsecret",
dbHost: "localhost" - adres hosta bazy danych,
dbUser: "user" - użytkownik bazy danych,
dbDatabase: "db_name" - nazwa bazy danych,
dbPassword: "password" - hasło do bazy danych,
corsOrigin: "http://localhost:3000" - adres dopuszczony do wykonywania zapytań do API,
};

Utwórz bazę danych w NoSQL:

- skopiuj i uruchomw bazie danych kod z pliku createdb.txt

Uruchom serwer przy pomocy polecenia npm run start

Testy:
Aplikacja ma podstawowe testy jednoskowe dla driverRecord
npm run test

Endpointy API
Aplikacja udostępnia następujące endpointy API:

GET /driver - zwraca listę wszystkich kierowców
GET /driver/:id - zwraca informacje o kierowcy o podanym identyfikatorze
POST /driver - dodaje nowego kierowcę
PUT /driver/:id - aktualizuje informacje o kierowcy o podanym identyfikatorze
DELETE /driver/:id - usuwa kierowcę o podanym identyfikatorze
GET /load - zwraca listę wszystkich ładunków
GET /load/:id - zwraca informacje o ładunku o podanym identyfikatorze
POST /load - dodaje nowy ładunek
PUT /load/:id - aktualizuje informacje o ładunku o podanym identyfikatorze
DELETE /load/:id - usuwa ładunek o podanym identyfikatorze

Opis endpointów API

GET /driver
Endpoint zwraca listę wszystkich kierowców w formacie JSON. Przykładowa odpowiedź:

GET /driver/:id
Endpoint zwraca informacje o kierowcy o podanym identyfikatorze w formacie JSON. Przykładowa odpowiedź:

POST /driver
Endpoint dodaje nowego kierowcę na podstawie przekazanych w ciele żądania danych w formacie JSON. Przykładowe żądanie:

PUT /driver/:id
Endpoint aktualizuje informacje o kierowcy o podanym identyfikatorze na podstawie przekazanych w ciele żądania danych w formacie JSON. Przykładowe żądanie:

DELETE /driver/:id
Endpoint usuwa kierowcę o podanym identyfikatorze.

GET /load
Endpoint zwraca listę wszystkich ładunków w formacie JSON. Przykładowa odpowiedź:

GET /load/:id
Endpoint zwraca informacje o ładunku o podanym identyfikatorze w formacie JSON. Przykładowa odpowiedź:

POST /load
Endpoint dodaje nowy ładunek na podstawie przekazanych w ciele żądania danych w formacie JSON. Przykładowe żądanie:

PUT /load/:id
Endpoint aktualizuje informacje o ładunku o podanym identyfikatorze na podstawie przekazanych w ciele żądania danych w formacie JSON. Przykładowe żądanie:

DELETE /load/:id
Endpoint usuwa ładunek o podanym identyfikatorze.

Możesz skorzystać z aplikacji pod ardesem: simplecargo.networkmanager.pl
login: user@user.com
password: user11

Proponowane user story:

1. Pierwsza strona to formularz do dodawania kierowcy.
2. Kliknij w kluczyk, możesz sie zalogować danymi powyżej, lub zarejestrować swojego użytkownika - administartora, następnie zalogowac się tymi danymi.
3. Button Loads > add > dodaj ładunek, zapamietan nr ref, to po nim aplikacja dopasowuje kierowcę.
4. Button Drivers > add > dodaj kierowcę z zapamiętanym nr. referencyjnym
5. Aplikacja ..

Instalacja/uruchomienie na twoim IDE:

Wszytskie branche są potrzebne, masz do dyspozycji:
Master: głowny, aktualny branch z którego aplikacja jest wstawiana na serwer.
Main: aktualny branch, który umożliwia uruchomienie na komputerze, zaraz po skopiowaniu brancha z serwisu github.
Dev: branch nad kórym pracuję, ale jeszce nie jest wstawiony na serwer.
Funkcjonalność: funkcjonalności nad którymi pracuję, lub skończyłem pracę.
Do dyspozycji masz cąłą historię branchy.

Sklonuj repozytorium: git clone https://github.com/DanielSzczucki/DriverAvisationBe/tree/main.git
Wejdź do folderu z aplikacją: cd DriverAvisationBe
Zainstaluj zależności: npm install

//Konfiguracja
//[Instrukcja konfiguracji aplikacji]

Uruchomienie
Uruchom serwer: npm start
Aplikacja będzie dostępna pod adresem http://localhost:3001

uruchomienie bazy danych lokalnie:
w php my admin wyłącz sprawdzanie kluczy obcych
kod z pliku createdb wklejasz do heidi lub phpMyAdmin.

Tu jest FrontEnd: https://github.com/DanielSzczucki/DriverAvisationFe
Przeczytaj readme!

Opis backend:
Opis frontend znajdziesz w readme tu: https://github.com/DanielSzczucki/DriverAvisationFe

Rejestrując użytkownika, w bazie danych nie zapisujemy jego hasła, a hash stworzony przez modół bcrypt, wraz z 10 x sól.
Podczas logowania, funkcja skrótu weryfikuje hasło logowania.
Możesz dodać swojego użytkownika admina.
Wszytsko odbywa się na ścieżce homeRouter:

- zarządzanie nowymi użytkownikami adminami,
- tworzenie jwt,
- odświerzanie jwt,
- hashowanie.

Aplikacja posiada system autentykacji i logowania.
Autentykacja odbywa się za pomocą JWT tworzonego na backendzie, wysyłanego w HttpOnly cookie.
Jwt tworzy token i refresh token - na ten moment, tymczasowo uprosciłem to rozwiązanie, jest to związane z częścią frontend, gdzie również potrzbny jest refresh token.
Teraz refreshToken i Token - to jeden, ten sam token.
A token - to token używany do weryfikacji na backendzie.
Aplikacja posiada middleware do sparwdzania tokena, zabezpieczone są prawie wszystkie ścieżki, oprócz dodawania kierowcy.

Folder record: znajdziesz tam klasy, prosty crud napisany od podstaw według wzorca Active Record (nie zawiera on wszytskich metod, np do ustalania relacji pomiędzy tabelami), służące do zarządzania rekordami w poszczególnych tabelach.

Folder Utills - zawiera narzędzia oraz pliki konfiguracyjne.

Routery zawierają w sobie częśc logiki do zarządzania kierowcami, towarami i userami.
DriverRouter - zwraca listy kierowców
LoadRouter - zwraca listy ładunków
