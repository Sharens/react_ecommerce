/// <reference types="cypress" />

describe('API: Products endpoint', () => {
  it('GET /api/products - success returns list of products', () => {
    cy.request('http://localhost:8080/api/products')
      .then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.be.an('array');
        expect(resp.body).to.have.length(4);
        expect(resp.body[0]).to.have.all.keys('id', 'name', 'description', 'price', 'available');
      });
  });

  it('POST /api/products - allowed returns 200', () => {
    cy.request('POST', 'http://localhost:8080/api/products')
      .its('status').should('eq', 200);
  });
});

describe('API: Payments endpoint', () => {
  it('POST /api/payments - success returns success=true', () => {
    cy.request('POST', 'http://localhost:8080/api/payments', {amount: 100})
      .then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.have.property('success', true);
      });
  });

  it('GET /api/payments - method not allowed returns 405', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/api/payments',
      failOnStatusCode: false
    }).its('status').should('eq', 405);
  });
});
