describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should Naviage to Tuesday", ()=>{

    cy.visit("/");
    cy.get("li").contains("Tuesday").click();
  })


}); 
