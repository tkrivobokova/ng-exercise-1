describe("Check that the material is found by the filter", () => {
    it("should open the webpage", () => {
      cy.visit("https://e-koolikott.ee/et/search");
      cy.url().should('include', '/search')
      cy.get(".spinner-border").should("not.exist");
    });
  
    it("should fill searching input", () => {
      cy.get("#search").type("Proovitöö");
    });
  
    it("should select material type", () => {
      cy.get("#musicFilterText").click();
      cy.get('.search-active-filters').should('contain', 'Heli')
    });
  
    it("should select link with the curriculum", () => {
      cy.get("#searchFilters .taxon-title-label").contains("Põhiharidus").click();
      cy.get("#searchFilters .taxon-title-label").contains("Kunstiained").click();
      cy.get("#searchFilters .taxon-title-label").contains("Muusika").click();
      cy.get('.search-active-filters').should('contain', 'Muusika')
    });
  
    it("should select grade", () => {
      cy.get("[aria-label='min-grade']")
        .focus()
        .type(
          "{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}"
        );
      cy.get("[aria-label='min-grade']")
        .should("have.attr", "aria-valuenow", 7)
        .and("have.attr", "aria-valuetext", "VII");
      cy.get('.search-active-filters').should('contain', '7 klass').and('contain', '9 klass')
    });
  
    it("should select supported general competencies", () => {
      cy.get("kott-add-key-competence #keyCompetenceCollapse")
        .contains("Kultuuri- ja väärtuspädevus")
        .click();
        cy.get('.search-active-filters').should('contain', 'Kultuuri- ja väärtuspädevus')
    });
  
    it("should check that the searched material exists", () => {
      cy.get("kott-search-results").should("contain", "Proovitöö materjal");
    });
  
    it("should open found material", () => {
      cy.get(".material-card").contains("Proovitöö materjal").click();
    });
  
    it("should check the materials data", () => {
      cy.get("#description").should("contain", "Proovitöö materjal");
      cy.get("kott-material-info")
        .should("contain", "Heli")
        .and("contain", "VII–IX klass")
        .and("contain", "Põhiharidus")
        .and("contain", "Kunstiained")
        .and("contain", "Muusika")
        .and("contain", "Kultuuri- ja väärtuspädevus");
    });
  });