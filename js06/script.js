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

}

class User extends Entity {


}

let user = new User('Pete');
let box = new Box('Big box');
