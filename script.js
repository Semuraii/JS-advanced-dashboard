let books = JSON.parse(localStorage.getItem("books")) || [];

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const genreInput = document.querySelector("#genre");

const addBookBtn = document.querySelector("#addBook");
const deleteAllBtn = document.querySelector("#deleteAll");

const filterGenre = document.querySelector("#filterGenre");
const sortBooks = document.querySelector("#sortBooks");

const bookList = document.querySelector("#bookList");
const stats = document.querySelector("#stats");


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

        const {id, title, author, genre, favorite} = books;
        return `
        <div class="book ${favorite ? "favorite":""}>
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

addBookBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const genre = genreInput.value.trim();

    if (!title || !author || !genre) {
        alert("Fyll ut alle feltene!");
        return;
    }
})

function toggleFavorite(id) {
    books = books.map(book =>
        book.id === id
        ? {...book, favotite: !book.favorite}
        :book
    );
}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);
}

deleteAllBtn.addEventListener("click", () => {
    if (confirm("Vil du slette alle bøker?")) {
        books = [];
        saveBooks();
        renderBooks();
    }
});

filterGenre.addEventListener("change", renderBooks);

sortBooks.addEventListener("change", renderBooks);

renderBooks();
