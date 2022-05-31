const selectCategories = document.getElementById('selectCategories');
const selectTitles = document.getElementById('selectTitles');
const table = document.getElementById('table');

const url = 'https://api.publicapis.org/';
const endpoints = {
    entries: 'entries', categories: 'categories', titles: 'entries?title'
};

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

async function showCategories() {
    let response = await fetch(url + endpoints.categories);
    let data = await response.json();
    return data.categories;
}

async function showTitles(title) {
    if(title) {
        let response = await fetch(url + endpoints.entries + `?title=${title}`);
        let data = await response.json();
        return data.entries;
    } else {
        return;
    }
}

async function showEntries(category) {
    table.innerHTML = '';
    let query = '';
    if(category) {

        query = `?category=${category}`;
        console.log(query);
    }

    try {
        let response = await fetch(url + endpoints.entries + query);
        console.log(url + endpoints.entries + query);
        let data = await response.json();
        console.log(data.entries);
        return data.entries;

    } catch(err) {

        console.log(err);
        return [];
    }

}

let cats = [];
let entries = [];

let categories = showCategories().then(res => res.map(c => {
    cats.push(c);
    return selectCategories.innerHTML += `<option value=${c}>${c}</option>`;
}));

let titles = showTitles().then(res => res.map(c => {
    cats.push(c);
    return selectTitles.value += `<option value=${c}>${c}</option>`;
}));


let entriesData = () => showEntries(selectCategories.value).then(res => res.map(e => {
    return table.appendChild(makeRow(e));
}));
