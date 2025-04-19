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
* ✅ 3.5 Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing
* ✅ 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za pomocą React hooks
* ✅ 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz kliencką na dockerze via docker-compose
* ✅ 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS

## Wymagania techniczne
- Node.js >= 16.x i npm
- Go >= 1.20 (jeśli aplikacja uruchamiana bez dockera)
- Docker i Docker Compose

## Struktura projektu
```bash
react_ecommerce/
├── Dockerfile                # Frontend React
├── docker-compose.yml        # Docker Compose config
├── server/
│   ├── Dockerfile            # Backend Go
│   ├── go.mod                # Moduł Go
│   └── main.go               # Serwer API
├── src/
│   ├── components/
│   │   ├── Products/Products.js
│   │   ├── Cart/Cart.js
│   │   └── Payments/Payments.js
│   ├── context/
│   │   └── CartContext.js
│   ├── data/
│   │   └── sampleProducts.js
│   ├── App.js
│   └── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Konfiguracja środowiska
Aplikacja frontendowa używa zmiennej `REACT_APP_API_URL` ustawionej domyślnie na `http://localhost:8080/api`. Jeśli aplikacja jest uruchamiana za pomocą Docker Compose, nie trzeba nic zmieniać.
Jeśli aplikacja uruchamia backend lokalnie, należy się upewnić, że serwer Go działa na porcie 8080.

## Uruchomienie przez Docker Compose

Aby uruchomić aplikację frontendową i backendową w kontenerach Docker, wykonaj w katalogu projektu:

```bash
docker-compose up --build
```

Po zbudowaniu i uruchomieniu:
- Frontend dostępny jest pod: http://localhost:3000
- Backend API pod: http://localhost:8080/api

Aby zatrzymać i usunąć kontenery, użyj:

```bash
docker-compose down