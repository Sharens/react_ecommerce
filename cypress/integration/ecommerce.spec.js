/// <reference types="cypress" />

describe('React E-commerce App', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as('getProducts');
    cy.visit('/');
    cy.wait('@getProducts');
  });

  it('loads home page', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('displays header with title', () => {
    cy.get('.app-header h1').should('contain', 'React E-commerce Store');
  });

  it('has navigation links', () => {
    cy.get('.app-nav').within(() => {
      cy.contains('Produkty');
      cy.contains('Koszyk');
    });
  });

  it('displays 4 product cards', () => {
    cy.get('.product-card').should('have.length', 4);
  });

  it('shows product name, price and description', () => {
    cy.fixture('products.json').then(products => {
      cy.get('.product-card').first().within(() => {
        cy.get('h3').should('contain', products[0].name);
        cy.contains(`Cena: ${products[0].price} PLN`);
        cy.contains(products[0].description);
      });
    });
  });

  it('disables add button for unavailable products', () => {
    cy.fixture('products.json').then(products => {
      const idx = products.findIndex(p => !p.available);
      cy.get('.product-card').eq(idx).within(() => {
        cy.get('button.add-to-cart-btn').should('be.disabled');
      });
    });
  });

  it('enables add button for available products', () => {
    cy.fixture('products.json').then(products => {
      const idx = products.findIndex(p => p.available);
      cy.get('.product-card').eq(idx).within(() => {
        cy.get('button.add-to-cart-btn').should('not.be.disabled');
      });
    });
  });

  it('adds product to cart', () => {
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.get('.cart-item').should('have.length', 1);
  });

  it('removes item from cart', () => {
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.get('.cart-item').should('have.length', 1);
    cy.get('.cart-item').first().find('button').click();
    cy.contains('Twój koszyk jest pusty.').should('exist');
  });

  it('clears cart', () => {
    cy.get('.product-card').first().find('button').click();
    cy.get('.product-card').eq(1).find('button').click();
    cy.contains('Koszyk').click();
    cy.get('button.clear-cart-btn').click();
    cy.contains('Twój koszyk jest pusty.').should('exist');
  });

  it('shows empty cart on empty', () => {
    cy.contains('Koszyk').click();
    cy.contains('Twój koszyk jest pusty.').should('exist');
  });

  it('payment form is visible', () => {
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.get('.payment-form').should('exist');
  });

  it('alerts on empty payment', () => {
    cy.on('window:alert', txt => {
      expect(txt).to.contain('Proszę wypełnić wszystkie dane płatności');
    });
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.get('.pay-btn').click();
  });

  it('processes payment successfully', () => {
    cy.intercept('POST', '/api/payments', { success: true }).as('postPayment');
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.get('select').select('credit_card');
    cy.get('input[placeholder="1234 5678 9012 3456"]').type('1234 5678 9012 3456');
    cy.get('input[placeholder="MM/RR"]').type('12/25');
    cy.get('input[placeholder="123"]').type('123');
    cy.on('window:alert', txt => {
      expect(txt).to.contain('Płatność zakończona sukcesem!');
    });
    cy.get('.pay-btn').click();
    cy.wait('@postPayment');
  });

  it('handles payment failure', () => {
    cy.intercept('POST', '/api/payments', { success: false, message: 'Error' }).as('postFail');
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.get('select').select('credit_card');
    cy.get('input[placeholder="1234 5678 9012 3456"]').type('1234 5678 9012 3456');
    cy.get('input[placeholder="MM/RR"]').type('12/25');
    cy.get('input[placeholder="123"]').type('123');
    cy.on('window:alert', txt => {
      expect(txt).to.contain('Płatność nie powiodła się');
    });
    cy.get('.pay-btn').click();
    cy.wait('@postFail');
  });

  it('displays correct cart summary and total', () => {
    cy.fixture('products.json').then(products => {
      cy.get('.product-card').first().find('button').click();
      cy.get('.product-card').eq(1).find('button').click();
      cy.contains('Koszyk').click();
      cy.get('.cart-summary .cart-item').should('have.length', 2);
      const sum = products[0].price + products[1].price;
      cy.get('.total span').last().should('contain', sum);
    });
  });

  it('retains cart items on navigation', () => {
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.contains('Produkty').click();
    cy.contains('Koszyk').click();
    cy.get('.cart-item').should('have.length', 1);
  });

  it('shows processing state on payment', () => {
    cy.intercept('POST', '/api/payments', { delayMs: 500, body: { success: true, message: '' } }).as('delayed');
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.get('select').select('credit_card');
    cy.get('input[placeholder="1234 5678 9012 3456"]').type('1234 5678 9012 3456');
    cy.get('input[placeholder="MM/RR"]').type('12/25');
    cy.get('input[placeholder="123"]').type('123');
    cy.get('.pay-btn').click();
    cy.get('.pay-btn').should('contain', 'Przetwarzanie...');
    cy.wait('@delayed');
  });

  it('navigates back to products using nav link', () => {
    cy.contains('Koszyk').click();
    cy.contains('Produkty').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('navigates back to products using "Powrót do produktów" link', () => {
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.contains('Powrót do produktów').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

});
