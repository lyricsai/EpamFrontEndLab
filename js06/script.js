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
    constructor(name, digital) {
        super();
        this.name = name;
        this.digital = digital;
    }
}

class Box extends Entity {
    constructor(name, stuff = []) {
        super();
        this.name = name;
        this.stuff = stuff;
    }
    getStuff() {
        console.log(`${this.stuff}`);
    }
}

class User extends Entity {
    constructor(name, box = new Box()) {
        super();
        this.name = name;
        this.box = box;
        this.digitalBox = new Box("Digital");
        this.regularBox = new Box("Regular Stuff");
    }
}

const laptop = new Stuff("Laptop", true);
const pencils = new Stuff("Pencils", false);
const eraser = new Stuff("Eraser", false);
const notebook = new Stuff("Notebook", false);

const stuff = [laptop, pencils, eraser, notebook];
const bigBox = new Box("Big Box", stuff);

User.prototype.sortStuff = function () {
    for (let i in this.box.stuff) {
        if (this.box.stuff[i].digital) {
            this.digitalBox.stuff.push(this.box.stuff[i]);
        } else {
            this.regularBox.stuff.push(this.box.stuff[i]);
        }
    }
};

const pete = new User("Pete", bigBox);
pete.sortStuff();

console.log(pete);

const p = document.createElement("p");
document.querySelector("body").appendChild(p);

p.innerHTML = `<strong>Hello, ${pete.name}.</strong> You had <em>${
    bigBox.stuff.length
} items</em> 
in your <em>${
    pete.box.name
}</em> box, and we splited them up to digital and regular stuff. <br>
In ${pete.digitalBox.name} there are ${pete.digitalBox.stuff.map(
    (e) => " " + e.name
)} and in there are ${pete.regularBox.stuff.map((e) => " " + e.name)}`;
