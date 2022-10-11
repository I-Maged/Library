//Array saves all books
const myLibrary = [];
//Book object
function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}
//manually added a few books
const theHobbit = new Book(
  'The Hobbit',
  'J.R.R. Tolkien',
  295,
  false,
  0.9878796876546542321
);
const GameOfThrones = new Book(
  'A Game of Thrones',
  'George R. R. Martin',
  864,
  true,
  0.987987987543543543
);
const TheGuestList = new Book(
  'The Guest List',
  'Lucy Foley',
  384,
  false,
  0.542356432654765476
);
//pushing manually added books to the library
myLibrary.push(theHobbit);
myLibrary.push(GameOfThrones);
myLibrary.push(TheGuestList);
// console.log(myLibrary);

//add new book
document.querySelector('.form-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector('#title').value;
  const bookAuthor = document.querySelector('#author').value;
  const bookPages = document.querySelector('#pages').value;
  const bookRead =
    document.querySelector('#read').value == 'yes' ? true : false;

  const id = Math.random();
  let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead, id);
  myLibrary.push(newBook);
  displayBook(newBook);
});

myLibrary.forEach((book) => displayBook(book));

function displayBook(book) {
  const cards = document.querySelector('.cards');

  let bookCard = document.createElement('div');

  bookCard.innerHTML = `<div class="book-card" id="div-01">
  <h3 class="book-title">${book.title}</h3>
  <div class="book-info">
    <div class="info-field">
      <p>Author: ${book.author}</p>
    </div>
    <div class="info-field">
      <p># of pages: ${book.pages}</p>
    </div>
    <div class="info-field">
      <p>Read status: ${book.read ? 'Read' : 'Not read yet'}</p>
    </div>
  </div>
  <div class="book-btns">
    <button class="edit-btn" value=${book.id}>Edit</button>
    <button class="remove-btn" value=${book.id}>Remove</button>
  </div>
</div>`;

  cards.appendChild(bookCard);

  //remove buttons event listener
  document.querySelectorAll('.remove-btn').forEach((removeBtn) => {
    removeBtn.addEventListener('click', removeBook);
  });
}

function removeBook(e) {
  myLibrary.forEach(function (book, index, object) {
    if (book.id == e.target.value) {
      // remove book from UI
      let bookBtns = e.target.parentNode;
      let bookCard = bookBtns.parentNode;
      let cards = bookCard.parentNode;

      cards.style.display = 'none';
      cards.remove();

      //remove book from array
      object.splice(index, 1);
      console.log(myLibrary);
    }
  });
}
