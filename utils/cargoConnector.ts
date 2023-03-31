//załóżenie:
//funkcja, głowna logika programu,
//automatyczna funkcja łącząca kierowcę z ładunkiem/ładunek z kierowcą
//weż listę ładunków
//wez nr ref z tych ładunków i nr id
//weź listę kierowców
//weź weź ref kiero i id
//sprawdz czy ref ładunku jest taki jak ref kiero
//jesli tak przypisz kierowce do ładunku
//zwróć rekord na fron
//w tym rekordzie daj moliwośc wysłania smsa do kierowcy
// jeśli nie to sprawdz kolejny ładunek,
//jelsi nie ma to nie rób nic
//

// Aby przeszukać tabele z ładunkami i kierowcami w celu znalezienia par, które mają ten sam numer referencyjny,:  INNER JOIN, aby znaleźć tylko ładunki i kierowców, którzy mają takie same numery referencyjne.
// vbnet
// Copy code
// SELECT l.id as loadId, d.id as driverId FROM loads l
// INNER JOIN drivers d ON l.referenceNumber = d.referenceNumber

// lin mysql2,

// typescript
// Copy code
// import { pool } from "../utils/db";
// import { LoadRecord } from "./load";

// async function assignDriversToLoads(): Promise<void> {
//   const query = `
//     SELECT l.id as loadId, d.id as driverId FROM loads l
//     INNER JOIN drivers d ON l.referenceNumber = d.referenceNumber
//   `;
//   const [results] = await pool.execute(query);
//   for (const result of results) {
//     const { loadId, driverId } = result;
//     const load = await LoadRecord.getOne(loadId);
//     load.driverId = driverId;
//     await load.update();
//   }
// }

//overloaded - zmienić w razie czego metode w klasie userRecord
// export { assignDriversToLoads };

// W celu zaimplementowania funkcjonalności, potrzebujesz połączyć te dwie klasy i dodać dodatkową funkcjonalność. Zasadniczo, będziesz musiał wykonać następujące kroki:

// Pobierz listę wszystkich ładunków z tabeli loads i listę wszystkich kierowców z tabeli drivers.
// Iteruj przez listę ładunków i sprawdź, czy którykolwiek z kierowców ma ten sam numer referencyjny co ładunek.
// Jeśli tak, ustaw driverId dla tego ładunku na id kierowcy, który ma ten sam numer referencyjny.
// Zaktualizuj rekord ładunku w bazie danych, aby odzwierciedlał jego nowego kierowcę.
// Powtórz kroki 2-4 dla każdego ładunku, który ma kierowcę.
// Oto przykładowy kod, który wykonuje te kroki:

// typescript
// Copy code
// import { LoadRecord } from "./loadRecord";
// import { DriverRecord } from "./driverRecord";

// async function assignDriversToLoads(): Promise<void> {
//   // Pobierz listę wszystkich ładunków i kierowców
//   const loads = await LoadRecord.listAll();
//   const drivers = await DriverRecord.listAll();

//   // Iteruj przez listę ładunków
//   for (const load of loads) {
//     // Sprawdź, czy którykolwiek z kierowców ma ten sam numer referencyjny co ładunek
//     const driver = drivers.find((d) => d.referenceNumber === load.referenceNumber);

//     // Jeśli tak, ustaw `driverId` dla tego ładunku na `id` kierowcy, który ma ten sam numer referencyjny
//     if (driver) {
//       load.driverId = driver.id;
//       await load.update(); // zaktualizuj rekord ładunku w bazie danych
//     }
//   }
// }

// zapytanie, które zwróci wszystkich użytkowników z tabeli "uzytkownicy", którzy mieszkają w kraju o nazwie "Polska" i mają więcej niż 18 lat, mogłoby wyglądać tak:

// SQL
// Copy code
// SELECT * FROM uzytkownicy WHERE kraj='Polska' AND wiek > 18;
// Zapytanie to wybiera wszystkie kolumny z tabeli "uzytkownicy" dla wierszy, gdzie wartość kolumny "kraj" jest równa "Polska" oraz wartość kolumny "wiek" jest większa niż 18.

//poprawne zapytanie
// SELECT loads_list.referenceNumber, loads_list.id AS loadId, drivers_list.id AS driverId
// FROM loads_list
// INNER JOIN drivers_list
// ON loads_list.referenceNumber = drivers_list.referenceNumber;
