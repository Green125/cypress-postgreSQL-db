it('Verifying number of fidos', () => {
    cy.task(
        "queryDb",
        `SELECT * FROM pets where name = 'fido';`
    ).then(({rowCount}) => {

        expect(rowCount).to.equal(1);
    });
})

it('Verify that one of the pets is a dog', () => {
    cy.task(
        "queryDb",
        `SELECT species FROM pets;`
    ).then(array => {
        console.log('the species', array)
        const Newarray = array.rows.map(({species}) => species);
        expect(Newarray).to.include("dog");
    });
})

it('Verify that none of the pets are a lion', () => {
    cy.task(
        "queryDb",
        `SELECT species FROM pets p WHERE p.species LIKE 'lion';`
    ).then(array => {
        expect(array.rows).to.be.empty;
    });
})

it('Insert a new pet and check that it has been successfully added', () => {
    cy.task(
        "queryDb",
        `INSERT INTO pets (id, name, species) VALUES ( 8,'cole', 'duck');`
    );
    cy.task(
        "queryDb",
        `SELECT * FROM pets p WHERE  p.species LIKE 'duck';`
    ).then(array => {
        console.log(array)
        expect(array.rows[0]).to.exist;
    });
    cy.task(
        "queryDb",
        `SELECT * FROM pets p WHERE  p.species LIKE 'frog';`
    ).then(array => {
        console.log(array)
        expect(array.rows[0]).to.exist;
    });
    cy.task(
        "queryDb",
        `DELETE  FROM pets WHERE species LIKE 'duck';`
    ).then(array => {
        expect(array.rows).to.be.empty;
    });
})

it('Verify that a pet does NOT exist in the table', () => {
    cy.task(
        "queryDb",
        `SELECT * FROM pets WHERE name LIKE 'filex';`
    ).then(array => {
        expect(array.rows[0]).to.exist;
    });
})
