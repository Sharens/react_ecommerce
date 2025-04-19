## Opis zadania
Należy stworzyć aplikację kliencką wykorzystując bibliotekę React.js.
W ramach projektu należy stworzyć trzy komponenty: Produkty, Koszyk
oraz Płatności. Koszyk oraz Płatności powinny wysyłać do aplikacji
serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach
z aplikacji serwerowej. Aplikacja serwera w jednym z trzech języków:
Kotlin, Scala, Go. Dane pomiędzy wszystkimi komponentami powinny być
przesyłane za pomocą React hooks.

## Wymagania projektu
* ✅ 3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty oraz
Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w
Produktach powinniśmy pobierać dane o produktach z aplikacji
serwerowej;
* ❌ 3.5 Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing
* ❌ 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za
pomocą React hooks
* ❌ 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz
kliencką na dockerze via docker-compose
* ❌ 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS

# Rozpoczęcie pracy z Create React App

Ten projekt został utworzony za pomocą [Create React App](https://github.com/facebook/create-react-app).

## Dostępne skrypty

W katalogu projektu możesz uruchomić:

### `npm start`

Uruchamia aplikację w trybie deweloperskim.  
Otwórz [http://localhost:3000](http://localhost:3000), aby zobaczyć ją w przeglądarce.

Strona przeładuje się przy zapisie zmian.  
Możesz również zobaczyć w konsoli ewentualne błędy lintera.

### `npm test`

Uruchamia runner testów w trybie watch (interaktywnym).  
Zobacz sekcję o [uruchamianiu testów](https://facebook.github.io/create-react-app/docs/running-tests), aby uzyskać więcej informacji.

### `npm run build`

Tworzy wersję produkcyjną aplikacji w folderze `build`.  
Poprawnie pakuje React w trybie produkcyjnym i optymalizuje wydajność.

Zbudowana aplikacja jest zminimalizowana, a nazwy plików zawierają hashe.  
Twoja aplikacja jest gotowa do wdrożenia!

Zobacz sekcję o [wdrożeniu](https://facebook.github.io/create-react-app/docs/deployment), aby uzyskać więcej informacji.

### `npm run eject`

**Uwaga: to operacja nieodwracalna. Po wykonaniu `eject` nie możesz wrócić do wcześniejszego stanu!**

Jeśli nie jesteś zadowolony z wyboru narzędzi i konfiguracji, możesz wykonać `eject` w dowolnym momencie. Polecenie to usunie pojedynczą zależność budowania z Twojego projektu.

Zamiast tego, skopiuje wszystkie pliki konfiguracyjne i zależności transatywne (webpack, Babel, ESLint itp.) bezpośrednio do Twojego projektu, dzięki czemu będziesz miał pełną kontrolę nad nimi. Wszystkie polecenia, z wyjątkiem `eject`, nadal będą działać, ale będą wskazywać na skopiowane skrypty, dzięki czemu będziesz mógł je dostosować. W tym momencie jesteś sam.

Nie musisz nigdy używać `eject`. Zestaw funkcji jest odpowiedni dla małych i średnich wdrożeń, i nie powinieneś czuć się zobowiązany do korzystania z tej funkcji. Jednakże, rozumiemy, że to narzędzie nie byłoby użyteczne, gdybyś nie mógł go dostosować, gdy jesteś gotowy.

## Dowiedz się więcej

Możesz dowiedzieć się więcej w [dokumentacji Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Aby nauczyć się React, sprawdź [dokumentację React](https://reactjs.org/).

### Podział kodu

Ta sekcja została przeniesiona tutaj: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analiza rozmiaru pakietu

Ta sekcja została przeniesiona tutaj: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Tworzenie aplikacji PWA

Ta sekcja została przeniesiona tutaj: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Zaawansowana konfiguracja

Ta sekcja została przeniesiona tutaj: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Wdrożenie

Ta sekcja została przeniesiona tutaj: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` nie powiedzie się przy minimalizacji

Ta sekcja została przeniesiona tutaj: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
