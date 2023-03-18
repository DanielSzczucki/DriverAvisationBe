Web Application
Backend Api
App name: Driver Avisation (CargMan App)

Motywacja.
Szukałem pomysłu na aplikację/projekt do portfolio, która była by skorelowana z moimi doświadczeniami, projekt który pozwoli mi dalej uczyć się programowania.
Jestem związany z transportem towarów, dlatego chciałem zrobić prostą aplikacje do zarządzania kierowcami którzy przyjechali na załadunek/rozładunek.
Spotykam się z tym że, w wielu firmach nie ma systemu powiadomień dla kierowców, co wymaga od kierowcy ciągłego sprawdzania, dowiadywania się.
Generuje to problemy dla obu stron: ciągłe przerywanie pracy magazyniera, rozpraszanie, denerwowanie, dla kierowcy: przerywanie opoczynku, niepewność,
konieczność wychodzenia na np. niebezpieczny teren lub podczas złych warunków pogodowych.
Aplikacja ma rozwiązać te problemy by, zapewnić komfort pracy obu stronom, oraz poprawic jej efektywność.
dodałem równie modół w którym zarządzamy listą ładunków.
Głowna funkcjonalność: aplikacja w równych odstępach czasu sprawdza czy pojawił się kierowca po dany towar.
Towar z kierowcą łączy nr referencyjny.

Możesz skorzystać z aplikacji pod ardesem: //podaj adres
login: user@user.com
password: user11

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

Technologie wykorzystane do budowy aplikacji: Node.js, Express.js, TypeScript, MySQL, RestAPI, DRY, Acrive Record, Hash Functions.

Baza danych: mariaDB z zapytaniami SQL.
W bazie danych są trzy tabele: kierowców, ładunków i adminów/użytkowników.

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

Opis z punktu widzenia użytownika.
Po wejściu na strone palikacji zobaczysz formularz do rejestracji kierowcy.
Kierowca rejestruje się, podając podstawowe dane porzebne w logistyce i transporcie.
Dane kierowcy zapisywane są w tabelibazy danych: drivers_list

W górnej części aplikacji, w nagłowku, po lewej stronie znajdziesz ikone kluczyk, ikona pozwoli Ci się zalogować.
Nad formularzem rejestracji użytkowników jeszczę pracuję

Dokumentacja
[Link do dokumentacji]

Licencja
[Typ licencji i ewentualne ograniczenia]

Autorzy
[Listę autorów i wkład w projekt]

A backend side pf project to manage drivers and loads.
Technologies: TypeScript, MySQL, RestAPI, DRY, Acrive Record.
There are driver and cargo paths.
On the main path, the driver registers his data, the driver writes to the database.
On the cargo path, you can add, edit, delete cargo.
Own crud in the database.

To add, link loads to drivers, login and authorization: driver and program operator.
