const selectCategories = document.getElementById('selectCategories');
const table = document.getElementById('table');
const body = document.querySelector('tbody');
const input = document.querySelector('#dropdown__input');

const url = 'https://api.publicapis.org/';
const endpoints = {
    entries: 'entries', categories: 'categories'
};

let cats = [];

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

const wait = (delay) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
};

const fetchRetry = (url, delay, tries) => {
    function onError(err) {
        triesLeft = tries - 1;
        if(!triesLeft) {
            throw err;
        }
        return wait(delay).then(() => fetchRetry(url, delay, triesLeft));
    }
    return fetch(url).catch(onError);
};


const categories = showCategories().then(res => res.map(c => {
    cats.push(c);
    return selectCategories.innerHTML += `<option value=${c}>${c}</option>`;
}));

const dropDownSearch = () => {
    document.getElementById("dropdown").classList.toggle("show");
};

const filterFunction = async (category = '', title = '') => {

    body.innerHTML = '';
    let query = '';
    if(category) {
        query = `?category=${category}&`;

    } else {
        query = '?';
    }
    if(title) {
        query += `title=${title}`;
    }

    try {
        let response = await fetchRetry(url + endpoints.entries + query, 200, 3);
        let data = await response.json();
        return data.entries;

    } catch(error) {
        console.log('request failed', error);
    }
};

const entriesData = () => filterFunction(selectCategories.value, input.value)
    .then(res => {
        if(res) {
            return res.map(e => {
                return body.appendChild(makeRow(e));
            });
        } return;
    })
    .catch(error => console.error(error));

const delayLiveSearch = (f, ms) => {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => f.apply(this, arguments), ms);
    };
};

const handleLiveSearch = (e) => {
    e.target.disabled = true;
    setTimeout(() => {
        e.target.disabled = false;
        e.target.focus();
    }, 300);

};

const delay500 = delayLiveSearch(handleLiveSearch, 500);

input.addEventListener("input", function(e) {
    delay500(e);
});

entriesData();
