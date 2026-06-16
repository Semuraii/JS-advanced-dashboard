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
}