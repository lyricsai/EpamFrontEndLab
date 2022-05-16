// - Add to html page table with header and some rows
// - Add to header event listener to implement sorting functionality across the table data (alphabetical)
// - Add to cells user interaction feature (click and edit text)
// - Table in whole should be created with JS and appended to the document body on DOMContentLoaded event*

const data = [
    { name: "John", surname: "Doe", email: "john.doe@gmail.com" },
    { name: "Marie", surname: "Smith", email: "marie.smith@gmail.com" },
    { name: "Hans", surname: "Andersen", email: "hans.andersen@mail.com" },
    { name: "Alex", surname: "Johnson", email: "alex.johnson@mail.com", },
    { name: "Anna", surname: "Dvorenko", email: "anna_dv@gmail.com" },
    { name: "Satoshi", surname: "Ohno", email: "ohno-satoshi@gmail.com" },
    { name: "Kyoko", surname: "Abe", email: "abe.kyo@gmail.com" },
];

const sortTable = (tbody, index, ascending) => {
    Array.prototype.slice.call(tbody.children).sort(
        (tr_first, tr_second) => tr_first.children[index].textContent
            .localeCompare(tr_second.children[index].textContent) * (ascending ? 1 : -1)
    ).forEach(tr => tbody.appendChild(tr));
};

(function generateTable() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.querySelector('body').prepend(table);

    const input = document.createElement('input');
    table.appendChild(input);

    //table headings
    const row_headings = document.createElement('tr');
    const heading_first = document.createElement('th');
    heading_first.innerText = "Name";
    const heading_second = document.createElement('th');
    heading_second.innerText = "Surname";
    const heading_third = document.createElement('th');
    heading_third.innerText = "Email";

    row_headings.appendChild(heading_first);
    row_headings.appendChild(heading_second);
    row_headings.appendChild(heading_third);
    thead.appendChild(row_headings);

    //make table
    const makeCell = (text) => {
        const td = document.createElement('td');
        td.appendChild(document.createTextNode(text));
        return td;
    };

    const makeRow = (e) => {
        const tr = document.createElement('tr');
        for (let i in Object.values(e)) {
            tr.appendChild(makeCell(Object.values(e)[i]));
        };
        return tr;
    };

    data.forEach(e => {
        tbody.appendChild(makeRow(e));
    });

    //sort
    Array.prototype.forEach.call(row_headings.children, (thead, index) => {
        let asc_toggle = false;
        thead.addEventListener('click', () => sortTable(tbody, index, asc_toggle = !asc_toggle));
    });

    //edit
    Array.prototype.forEach.call(tbody.children, (td) => {
        td.addEventListener('click', ({ target }) => {
            let edit = confirm('edit?');
            if (edit) {
                target.innerText = input.value;
                input.value = '';
            }
        });
    });
}
)();

