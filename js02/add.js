// Implement function that can “add” objects
// example:
// var a = { x: 1 };
// var b = { x: 2, y: 2 };
// add(a, b); // {x: 3, y: 2}
// add(a, b, a); // {x: 4, y: 2}

// Provide link to this repo to your Mentor

// Optional
// * Create additional function that can intersect object by property names and values
// example:
var a = { x: 0, y: 1, z: 2 };
var b = { x: 0, y: 1, z: 3, a: 1, b: 2 };
// intersect(a,b) // { x: 0, y: 1 }



const add = (...args) => {
    let result = {};
    for (let i = args.length - 1; i >= 0; i--) {
        for (let key of Object.keys(args[i])) {
            if (key in result) {
                result[key] = args[i][key] + result[key];
            } else {
                result[key] = args[i][key];
            }
        }
    }
    return result;
};

const add2 = (...args) => {
    return args.reduce((acc, curr) => {
        Object.keys(curr).forEach((key) => {
            acc[key] = acc[key] || 0;
            acc[key] += curr[key];
        });
        return acc;
    }, {});
};

const intersect = (x, y) => {
    let result = {};
    for (let key of Object.keys(x)) {
        if (key in y && x[key] === y[key]) {
            result[key] = x[key];
        }
    }
    return result;
};

console.log(add(a, b));
console.log(add(a, b, a));
console.log(add2(a, b, a));
console.log(intersect(a, b));
