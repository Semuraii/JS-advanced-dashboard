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

        const {id, title, author, genre, favorite} = book;
        return `
        <div class="book ${favorite ? "favorite":""}>
            <li class="book-item">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
            </li>

            <div class="book-buttons">
            <button onclick="toggleFavorite('${id}')">
            ${favorite ?"⭐ Favoritt" : "⭐ Favoritt"}
            </button>

            <button onclick="deleteBook('${id}')">
            Slett
            </button>
            </div>
            </div>
        `;
    }).join("");
    
    updateGenres();
    updateStats();
}

function updateGenres() {
    const genres = [...new Set(books.map(book => book.genre))];

    filterGenre.innerHTML =
    `<option value="">Alle sjangre</options>` + genres.map(genre =>
        `<option value="${genre}">${genre}</option>`
    ).join("");
}

function updateStats() {
    const totalBooks = books.length;
    const favoriteCount = books.reduce((count, book) => {
        return book.favorite ? count + 1 : count;
    }, 0);

    stats.innerHTML = `
    total antall bøker: ${totalBooks}<br>
    Favoritter: ${favoriteCount}
    `;
} 

addBookBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const genre = genreInput.value.trim();

    if (!title || !author || !genre) {
        alert("Fyll ut alle feltene!");
        return;
    }

    const newBook = {
        id: crypto.randomUUID(),
        title,
        author,
        genre,
        favorite: false
    };

    books.push(newBook);

    saveBooks();
    renderBooks();

    titleInput.value = "";
    authorInput.value = "";
    genreInput.value = "";
});

function toggleFavorite(id) {
    books = books.map(book =>
        book.id === id
        ? {...book, favotite: !book.favorite}
        :book
    );

    saveBooks();
    renderBooks();
}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);

    saveBooks();
    renderBooks();
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
