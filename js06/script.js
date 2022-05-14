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

}

class Box extends Entity {
    stuff = [];

}

class User extends Entity {
    box = [];
}

const user1 = new User('Pete');
const box1 = new Box('Big box');
const stuff1 = new Stuff('something');
const stuff2 = new Stuff('anything');

box1.stuff.push(stuff1, stuff2);

user1.box.push(box1);

console.log(user1);