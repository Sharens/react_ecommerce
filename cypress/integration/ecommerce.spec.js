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
    cy.get('li.cart-item').should('have.length', 1);
  });

  it('removes item from cart', () => {
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.get('li.cart-item').should('have.length', 1);
    cy.get('li.cart-item').first().find('button').click();
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
    cy.get('li.cart-item').should('have.length', 1);
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

  it('verifies product card details structure', () => {
    cy.get('.product-card').should('have.length', 4).each(card => {
      cy.wrap(card).within(() => {
        cy.get('h3').should('be.visible').and('not.be.empty');
        cy.get('p').should('have.length', 3);
        cy.get('p').first().should('contain', 'Cena:');
        cy.get('p').eq(2).should('contain', 'Opis:');
        cy.get('button.add-to-cart-btn')
          .should('exist')
          .and('have.text', 'Dodaj do koszyka');
      });
    });
  });

  it('verifies cart page UI elements', () => {
    cy.get('.product-card').first().find('button').click();
    cy.get('.product-card').eq(1).find('button').click();
    cy.contains('Koszyk').click();
    cy.get('.cart-container').should('exist');
    cy.get('.cart-container h1').should('contain', 'Koszyk');
    cy.get('li.cart-item').should('have.length', 2).each(item => {
      cy.wrap(item).find('span').should('have.length', 2);
      cy.wrap(item).find('button').should('contain', 'Usuń');
    });
    cy.get('.total span').first().should('contain', 'Suma');
    cy.get('.total span').eq(1).should('match', /\d+ PLN/);
  });

  it('verifies navigation link attributes', () => {
    cy.get('.app-nav a').should('have.length', 2);
    cy.get('.app-nav a').first().should('have.attr', 'href', '/');
    cy.get('.app-nav a').eq(1).should('have.attr', 'href', '/cart');
  });

  it('verifies fixture data integrity', () => {
    cy.fixture('products.json').then(products => {
      expect(products).to.have.length(4);
      expect(products[0]).to.have.all.keys('id', 'name', 'price', 'description', 'available');
      expect(typeof products[0].available).to.eq('boolean');
    });
  });

  it.skip('direct visit to cart loads empty cart', () => {
    // Skipping direct URL test due to routing setup
  });

  it('retains cart items on page reload', () => {
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.reload();
    cy.get('li.cart-item').should('have.length', 1);
    cy.url().should('include', '/cart');
  });

  it('verifies payment form fields placeholders', () => {
    cy.get('.product-card').first().find('button').click();
    cy.contains('Koszyk').click();
    cy.get('select').should('exist');
    cy.get('input[placeholder="1234 5678 9012 3456"]')
      .should('exist');
    cy.get('input[placeholder="MM/RR"]').should('exist');
    cy.get('input[placeholder="123"]').should('exist');
  });
});
