//Array saves all books
const myLibrary = [];
//Book object
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
//manually added a few books
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const GameOfThrones = new Book(
  'A Game of Thrones',
  'George R. R. Martin',
  864,
  true
);
const TheGuestList = new Book('The Guest List', 'Lucy Foley', 384, false);
//pushing manually added books to the library
myLibrary.push(theHobbit);
myLibrary.push(GameOfThrones);
myLibrary.push(TheGuestList);
console.log(myLibrary);
