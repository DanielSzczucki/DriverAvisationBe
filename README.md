Driver Avisation (CargMan App) - Backend Api - Web Application

Motywacja.
Szukałem pomysłu na aplikację do portfolio, tak żeby miała sens, a nie była kolejną aplikacja pogodową.
Jestem związany z transportem towarów, dlatego chciałem zrobić prostą aplikacje do zarządzania kierowcami którzy przyjechali na załadunek/rozładunek.
Spotykam się z tym że w wielu firmach nie ma systemu powiadomień dla kierowców, co wymaga od kierowcy ciągłego sprawdzania, dowiadywania się.
Generuje to problemy dla obu stron: ciągłe przerywanie pracy magazyniera, rozpraszanie, denerwowanie, dla kierowcy: przerywanie opoczynku, niepewność,
konieczność poruszanie się co jakiś czas po terenie zała...

Opis


Instalacja
Sklonuj repozytorium: git clone https://github.com/[nazwa_użytkownika]/[nazwa_repozytorium].git
Wejdź do folderu z aplikacją: cd [nazwa_aplikacji]
Zainstaluj zależności: npm install
Konfiguracja
[Instrukcja konfiguracji aplikacji]

Uruchomienie
Uruchom serwer: npm start
Aplikacja będzie dostępna pod adresem http://localhost:3000
Dokumentacja
[Link do dokumentacji]

Wkład w projekt
[Instrukcja dla osób chcących przyczynić się do rozwoju aplikacji]

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
