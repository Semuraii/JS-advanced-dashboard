let books = JSON.parse(localStorage.getItem("books")) || [];

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const genreInput = document.querySelector("#genre");

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function renderBooks() {
    let filteredBooks = [...books];

    if (filterGenre.value) {
        filteredBooks = filteredBooks.filter(
            book => book.genre === filterGenre.value
        );
    }

    filteredBooks.sort((a, b) => a[sortBooks.value].localeCompare(b[sortBooks.value]));

    bookList.innerHTML = filteredBooks.map(book => {
        return `
            <li class="book-item">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Genre: ${book.genre}</p>
            </li>
        `;
    }).join("");
}

function updateGenres() {
    const genres = [...new Set(books.map(book => book.genre))];

    filterGenre.innerHTML =
    `<option value="">Alle sjangre</options>` + genres.map(genre =>
        `<option value="${genre}">{genre}</option>`
    ).join("");
}