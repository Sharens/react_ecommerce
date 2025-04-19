## Opis
Należy stworzyć 20 przypadków testowych w jednym z rozwiązań:

- Cypress JS (JS)
- Selenium (Kotlin, Python, Java, JS, Go, Scala)

Testy mają w sumie zawierać minimum 50 asercji (3.5). Mają również
uruchamiać się na platformie Browserstack (5.0). Proszę pamiętać o
stworzeniu darmowego konta via https://education.github.com/pack.

* ✅ 3.0 Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium (Kotlin, Python, Java, JS, Go, Scala)
* ❌ 3.5 Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50 asercji
* ❌ 4.0 Należy stworzyć testy jednostkowe do wybranego wcześniejszego projektu z minimum 50 asercjami
* ❌ 4.5 Należy dodać testy API, należy pokryć wszystkie endpointy z minimum jednym scenariuszem negatywnym per endpoint
* ❌ 5.0 Należy uruchomić testy funkcjonalne na Browserstacku

## Wymagania
- Node.js >=14
- npm
- Darmowe konto BrowserStack (do testów CI)

## Instalacja
```bash
npm install
```

## Uruchamianie testów E2E lokalnie
- `npx cypress open`
- `npx cypress run`

## Uruchamianie testów na BrowserStack
1. Zarejestruj się na BrowserStack i pobierz `BROWSERSTACK_USERNAME` i `BROWSERSTACK_ACCESS_KEY`.
2. Dodaj do `cypress.json` lub ustaw jako zmienne środowiskowe:
```json
{
  "env": {
    "BROWSERSTACK_USERNAME": "<username>",
    "BROWSERSTACK_ACCESS_KEY": "<access_key>"
  }
}
```
3. Uruchom:
```bash
npx cypress run --browser chrome --record --key $BROWSERSTACK_ACCESS_KEY