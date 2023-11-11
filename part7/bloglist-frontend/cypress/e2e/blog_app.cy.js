describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
        const users = [
            {
                name: "Matti Luukkainen",
                username: "mluukkai",
                password: "salainen",
            },
            {
                name: "Jacek Różański",
                username: "jacek",
                password: "roza",
            },
        ];
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, users[0]);
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, users[1]);
        cy.visit("");
    });

    it("Login form is shown", function () {
        cy.contains("log in to application");
        cy.contains("login").click();
        cy.contains("username");
        cy.contains("password");
    });

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.contains("login").click();
            cy.get("#username").type("mluukkai");
            cy.get("#password").type("salainen");
            cy.get("#login-button").click();

            cy.contains("Matti Luukkainen logged in");
        });

        it("fails with wrong credentials", function () {
            cy.contains("login").click();
            cy.get("#username").type("mluukkai");
            cy.get("#password").type("wrong");
            cy.get("#login-button").click();

            cy.get(".notification").should("contain", "Wrong credentials");
            cy.get("html").should("not.contain", "Matti Luukkainen logged in");
        });
    });

    describe("when logged in", function () {
        beforeEach(function () {
            cy.login({ username: "mluukkai", password: "salainen" });
        });

        it("a blog can be created", function () {
            cy.get("html").should("not.contain", "a blog created by cypress");
            cy.contains("new blog").click();
            cy.get("#input-title").type("a blog created by cypress");
            cy.get("#input-author").type("cypress");
            cy.get("#input-url").type("http://cypress.io");
            cy.get("#create-button").click();
            cy.get("html").should("contain", "a blog created by cypress");
        });

        it("a blog can be liked", function () {
            cy.createBlog({ title: "a blog created by cypress", author: "cypress", url: "http://cypress.io" });
            cy.contains("view").click();
            cy.contains("likes 0");
            cy.contains("like").click();
            cy.contains("likes 1");
        });

        it("a blog can be deleted", function () {
            cy.get("html").should("not.contain", "a blog created by cypress");
            cy.createBlog({ title: "a blog created by cypress", author: "cypress", url: "http://cypress.io" });
            cy.get("html").should("contain", "a blog created by cypress");
            cy.contains("view").click();
            cy.contains("remove").click();
            cy.get("html").should("not.contain", "a blog created by cypress");
            cy.contains("Blog removed");
        });

        it("only creator can see the delete button", function () {
            cy.createBlog({ title: "a blog created by cypress", author: "cypress", url: "http://cypress.io" });
            cy.contains("view").click();
            cy.contains("remove");

            cy.login({ username: "jacek", password: "roza" });
            cy.contains("view").click();
            cy.contains("remove").should("not.exist");
        });

        it.only("a blog can be liked", function () {
            cy.createBlog({ title: "second", author: "cypress", url: "http://cypress.io" });
            cy.createBlog({ title: "first", author: "cypress", url: "http://cypress.io" });

            cy.get(".blog").eq(0).contains("second");
            cy.get(".blog").eq(1).contains("first");
            cy.contains("first").parent().as("first");
            cy.get("@first").contains("view").click();
            cy.get("@first").contains("like").click();
            cy.get(".blog").eq(0).contains("first");
            cy.get(".blog").eq(1).contains("second");
        });
    });
});
