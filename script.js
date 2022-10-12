//gathering form input
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookRead = document.querySelector('#read');
//form btns
const addBookForm = document.querySelector('.add-form-btn');
const editBookForm = document.querySelector('.edit-form-btn');
editBookForm.style.display = 'none';
//Array saves all book objects
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

//add new book
addBookForm.addEventListener('click', (e) => {
  e.preventDefault();
  const readStatus = bookRead.value == 'yes' ? true : false;
  const id = Math.random();
  const newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    readStatus,
    id
  );
  clearForm();
  myLibrary.push(newBook);
  displayBook(newBook);
});

myLibrary.forEach((book) => displayBook(book));

function displayBook(book) {
  const cards = document.querySelector('.cards');

  let bookCard = document.createElement('div');

  bookCard.innerHTML = `<div class="book-card" id=${book.id}>
  <h3 class="book-title">${book.title}</h3>
  <div class="book-info">
    <div class="info-field">
      <p class="book-author">Author: ${book.author}</p>
    </div>
    <div class="info-field">
      <p class="book-pages"># of pages: ${book.pages}</p>
    </div>
    <div class="info-field">
      <p class="book-read-status">Read status: ${
        book.read ? 'Read' : 'Not read yet'
      }</p>
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
  //edit buttons event listener
  document.querySelectorAll('.edit-btn').forEach((editBtn) => {
    editBtn.addEventListener('click', (e) => {
      addBookForm.style.display = 'none';
      editBookForm.style.display = 'block';
      editBook(e);
    });
  });
}

function editBook(e) {
  let bookToEdit;

  myLibrary.forEach((book) => {
    if (book.id == e.target.value) {
      bookToEdit = book;
    }
  });
  bookTitle.value = bookToEdit.title;
  bookAuthor.value = bookToEdit.author;
  bookPages.value = bookToEdit.pages;
  bookRead.value = bookToEdit.read ? 'yes' : 'no';

  editBookForm.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
    addBookForm.style.display = 'block';
    editBookForm.style.display = 'none';

    myLibrary.forEach((book) => {
      if (book.id == bookToEdit.id) {
        book.title = bookTitle.value;
        book.author = bookAuthor.value;
        book.pages = bookPages.value;
        book.read = bookRead.value == 'yes' ? true : false;
        updateDisplay(book);
        console.log(book);
      }
    });
    console.log(myLibrary);
  });
}
function updateDisplay(book) {
  let bookDisplay = document.querySelectorAll('.book-card');

  bookDisplay.forEach((div) => {
    if (div.id == book.id) {
      div.querySelector('.book-title').innerHTML = book.title;
      div.querySelector('.book-author').innerHTML = `Author: ${book.author}`;
      div.querySelector('.book-pages').innerHTML = `# of pages: ${book.pages}`;
      div.querySelector('.book-read-status').innerHTML = `Read status: ${
        book.read ? 'Read' : 'Not read yet'
      }`;
    }
  });
  addBookForm.style.display = 'block';
  editBookForm.style.display = 'none';
  clearForm();
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

      //remove book from object array
      object.splice(index, 1);
    }
  });
}
function clearForm() {
  if (editBookForm.style.display == 'block') {
    return;
  }
  bookTitle.value = '';
  bookAuthor.value = '';
  bookPages.value = '';
  bookRead.value = 'yes';
}
