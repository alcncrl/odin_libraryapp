'use strict';

const myLibrary = [
  { title: 'One Piece', author: 'Oda Eichiro', pages: 1500, read: true },
  { title: 'Hunter Hunter', author: 'Togashi', pages: 1500, read: true },
  { title: 'Bleach', author: 'Tite Kubo', pages: 1500, read: false },
];

// Search and filters
const searchBar = document.getElementById('search');
const filterUnread = document.getElementById('filter-btn-unread');
const filterRead = document.getElementById('filter-btn-read');

// Controls for modal/dialog
const addDialog = document.getElementById('addDialog');
const showModal = document.getElementById('showDialog');
const addButton = document.getElementById('add-btn');
const closeBtn = document.getElementById('close-btn');

// Inputs inside the modal/dialog
const author = document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages');
const read = document.getElementById('read');

// Selects the main container
const container = document.querySelector('.main_container');

let newBook;

// FUNCTIONS

function displayBooks() {
  myLibrary.forEach((book, i) => {
    printBookCards(book, i);
  });
}

function clearContainer() {
  container.innerHTML = '';
}

function printBookCards(book, i) {
  container.innerHTML += `
    <div class="book-card ${
      book.read === true ? 'read' : 'unread'
    }" data-book-index="${i}">
    <h3>${book.title}</h3>
    <div class="book-details">
    <p>by ${book.author}</p>
    <p>${book.pages} pages</p>
    <p>${book.read === true ? 'Read' : 'Unread'}</p>
    </div>
    <div class="card-controls">
    <img src="./icons/trash-can-outline.svg" alt="trash-can-outline" onclick="deleteBook(${i})">
    <img src="${
      book.read === false
        ? './icons/eye-check-outline.svg'
        : './icons/eye-remove-outline.svg'
    } " alt="eye-check-outline" onclick="readBook(${i})"/>
    </div>
    </div>
    `;
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  clearContainer();
  displayBooks();
}

function readBook(index) {
  myLibrary[index].read = myLibrary[index].read === true ? false : true;
  clearContainer();
  displayBooks();
}

// Make a functions that search based on filter
function searchBook(str) {
  clearContainer();
  // Filters the display based on the SEARCHBAR
  myLibrary
    .filter((book) => book.title.toLocaleLowerCase().includes(str))
    .forEach((book, i) => {
      printBookCards(book, i);
    });
}

function filterButtons(btn, val) {
  // Remove Class and Change Background Color of the Other Button
  btn.innerText === 'Read'
    ? filterUnread.classList.remove('active')
    : filterRead.classList.remove('active');
  btn.innerText === 'Read'
    ? (filterUnread.style.backgroundColor = '#171717')
    : (filterRead.style.backgroundColor = '#171717');
  // Checks if the button has the active class
  if (!btn.classList.contains('active')) {
    btn.classList.add('active');
    btn.style.backgroundColor = '#3f3f46';
    clearContainer();
    myLibrary
      .filter((book) => book.read === val)
      .forEach((book, i) => {
        printBookCards(book, i);
      });
  } else {
    btn.classList.remove('active');
    btn.style.backgroundColor = '#171717';
    clearContainer();
    displayBooks();
  }
}

displayBooks();

// CLASS

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  addToLibrary() {
    const book = {
      title: this.title,
      author: this.author,
      pages: this.pages,
      read: this.read,
    };
    myLibrary.push(book);
    clearContainer();
    displayBooks();
  }
}

// EVENTS

showModal.addEventListener('click', () => {
  addDialog.showModal();
});

addButton.addEventListener('click', (e) => {
  // Check if all input fields are not empty
  if (
    author.validity.valueMissing ||
    title.validity.valueMissing ||
    pages.validity.valueMissing
  ) {
    alert('Please fill out the required fields!');
  } else {
    e.preventDefault();
    newBook = new Book(
      title.value,
      author.value,
      Number(pages.value),
      read.checked
    );
    newBook.addToLibrary();
    addDialog.close();
  }
});

addDialog.addEventListener('close', () => {
  author.value = '';
  title.value = '';
  pages.value = '';
  read.checked = false;
});

closeBtn.addEventListener('click', () => {
  addDialog.close();
});

searchBar.addEventListener('input', () => {
  // Sets the filter buttons to default
  filterRead.classList.remove('active');
  filterUnread.classList.remove('active');
  filterRead.style.backgroundColor = '#171717';
  filterUnread.style.backgroundColor = '#171717';

  searchBook(searchBar.value);
});

filterUnread.addEventListener('click', () => {
  filterButtons(filterUnread, false);
});

filterRead.addEventListener('click', () => {
  filterButtons(filterRead, true);
});
