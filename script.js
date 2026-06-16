let books = json.parse(localStorage.getItem("books")) || [];

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const genreInput = document.querySelector("#genre");