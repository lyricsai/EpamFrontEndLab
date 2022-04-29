const input = document.getElementById('input');
const output = document.getElementById('output');
const btn = document.getElementById('btn');


//first try
function* permutation(string) {

    if (string.length < 3) {
        yield string;
        if (string.length === 2) yield string[1] + string[0];

    } else {
        for (let i = 0; i < string.length; i++) {

            for (let t of permutation(
                string.substr(0, i) + string.substr(i + 1)
            )) {
                yield string[i] + t;
            }
        }
    }
}

const showPermutatian = (string) => {
    let result = [];

    for (let s of permutation(string)) {
        result.push(s);
    }

    output.innerHTML = [...new Set(result.sort())]
        .map(e => `<li>${e}</li>`).join("");
};




//second try

const result = [];
const usedChars = [];

function permute(string) {

    let chars = string.split('');

    chars.map((e, i) => {

        usedChars.push(chars.splice(i, 1));

        if (chars.length === 0) {
            result[result.length] = usedChars.join('');
        }

        permute(chars.join(''));
        chars.splice(i, 0, e);
        usedChars.pop();
    });

    output.innerHTML = [...new Set(result.sort())]
        .map(e => `<li>${e}</li>`).join("");
};


btn.addEventListener('click', () => showPermutatian(input.value));
// btn.addEventListener('click', () => permute(input.value));