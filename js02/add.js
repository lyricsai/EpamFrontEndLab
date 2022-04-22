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
    return args.reduce((acc, curr) => {
        Object.keys(curr).forEach((key) => {
            acc[key] = acc[key] || 0;
            acc[key] += curr[key];
        });
        return acc;
    }, {});
};

const intersect = (...args) => {
    return args.reduce((acc, curr) => {
        Object.keys(curr).forEach((key) => {
            if (key in args[1] && args[0][key] === args[1][key]) {
                acc[key] = args[0][key];
            }
        });
        return acc;
    }, {});
};

console.log(add(a, b));
console.log(add(a, b, a));
console.log(add2(a, b, a));
console.log(intersect(a, b));
