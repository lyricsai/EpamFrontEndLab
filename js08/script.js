const selectCategories = document.getElementById('selectCategories');
const selectTitles = document.getElementById('selectTitles');
const table = document.getElementById('table');
const body = document.querySelector('tbody');

const url = 'https://api.publicapis.org/';
const endpoints = {
    entries: 'entries', categories: 'categories', titles: 'entries?title'
};

let cats = [];
let entries = [];

const makeCell = (text) => {
    const td = document.createElement('td');
    td.appendChild(document.createTextNode(text));
    return td;
};

const makeRow = (e) => {
    const tr = document.createElement('tr');
    for(let i in Object.values(e)) {
        tr.appendChild(makeCell(Object.values(e)[i]));
    };
    return tr;
};

const showCategories = async () => {
    let response = await fetch(url + endpoints.categories);
    let data = await response.json();
    return data.categories;
};

const debounce = (f, ms) => {

    let isCooldown = false;
    return function() {
        if(isCooldown) return;
        f.apply(this, arguments);
        isCooldown = true;
        setTimeout(() => isCooldown = false, ms);
    };
};

const showEntries = async (category) => {

    body.innerHTML = '';
    let query = '';
    if(category) {

        query = `?category=${category}`;
        console.log(query);
    }

    try {
        let response = await fetch(url + endpoints.entries + query);

        let data = await response.json();
        entries = data.entries.map(e => e.API);
        let filtered = filterFunction();

        return data.entries.map(e => {
            if(filtered.includes(e.API)) {
                return e;
            }
        });

    } catch(err) {
        console.error(`This error occured: ${err}`);
        return [];
    }

};

let categories = showCategories().then(res => res.map(c => {
    cats.push(c);
    return selectCategories.innerHTML += `<option value=${c}>${c}</option>`;
}));


const filtering = (arr) => {
    const input = document.getElementById("dropdown__input");
    const filter = input.value.toLowerCase();
    if(!input.value) return entries;
    return arr.map(e => {
        if(e.firstElementChild.innerText.toLowerCase().indexOf(filter) > -1) {
            e.style.display = "";
        } else {
            e.style.display = "none";
        }
    });
};

const dropDownSearch = () => {
    document.getElementById("dropdown").classList.toggle("show");
};

const filterFunction = () => {
    let rows = [...document.querySelectorAll("tr")];
    return filtering(rows);

};

let entriesData = () => showEntries(selectCategories.value).then(res => res.map(e => {
    return body.appendChild(makeRow(e));
}));

entriesData();
