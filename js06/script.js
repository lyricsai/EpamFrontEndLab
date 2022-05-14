// Describe base class Entity that can store name
// Implement child classes Stuff, Box, User. Box can store some stuff[]. Every box belongs to user
// Add example of usage of these classes, e.g., create some instances, display data related to them
// Push code to repo “sweet sugar”

class Entity {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

class Stuff extends Entity {
    digital = this.digital;
}

class Box extends Entity {
    stuff = [];
}

class User extends Entity {
    box = [];
}

const pete = new User("Pete");
const bigBox = new Box("Big box");
const laptop = new Stuff("Laptop");
const pencils = new Stuff("Pencils");
const notebook = new Stuff("Notebook");

bigBox.stuff.push(laptop, pencils, notebook);

pete.box = bigBox;

console.log(pete);

const p = document.createElement("p");
document.querySelector("body").appendChild(p);

p.innerHTML = `<strong>Hello, ${
    pete.name
}.</strong> You have <em>${pete.box.stuff.map(
    (e) => " " + e.name
)}</em> in your box <em>${pete.box.name}</em>`;
