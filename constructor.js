const checkbox = document.getElementById("read-checkbox");

const button = document.getElementById("add-book");
const libraryContainer = document.getElementById("library");

const popupForm = document.getElementById("popup-form");
const form = document.getElementById("form-container");

const submitButton = document.getElementById("submit-button");
const closeButton = document.getElementById("close-button");

const overlay = document.getElementById("overlay");

const background = document.querySelector("body");

var readToggleButtons = document.getElementsByClassName("read-toggle");


let bookUniqueValue = 0;

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.newBookIndex = bookUniqueValue;

    updateBookUniqueValue();
    

}

Book.prototype.toggleRead = function(button) {
    if (this.read == "Read") {
        this.read = "Not read";
        button.textContent = "Not read"
    } else if (this.read == "Not read") {
        this.read = "Read";
        button.textContent = "Read;"
    } else return;
}

button.addEventListener("click", function() {
    overlay.className = "dimmer";
});

submitButton.addEventListener("click", function() {
    addBookToLibrary();
});

submitButton.addEventListener("click", function() {
    hideForm();
});

submitButton.addEventListener("click", function() {
    overlay.className = "";
});

closeButton.addEventListener("click", function() {
    overlay.className = "";
});

closeButton.addEventListener("click", function() {
    hideForm();
});

function addBookToLibrary() {

    var title = form.title.value;
    var author = form.author.value;
    var pages = form.pages.value;

    if (checkbox.checked) {
        var read = "Read";
    } else {
        var read = "Not read";
    }
    var book = new Book(title, author, pages, read);

    myLibrary.push(book)
    displayNewBook(book);
    bookUniqueValue ++;
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read");
const book2 = new Book("The Count of Monte Cristo", "xxx", 295, "Not read");
const book3 = new Book("Norwegian Wood", "Haruki Murakami", 295, "Read");
const book4 = new Book("無職転生 (vol. 1)", "xxx", 295, "Read");
const book5 = new Book("Otaria (vol. 1)", "xxx", 295, "Read");
const book6 = new Book("Rust", "xxx", 295, "Not read");

myLibrary.push(book1, book2, book3, book4, book5, book6);
for (book of myLibrary) {
    displayNewBook(book);
}

function displayNewBook(newBook) {
    const newCard = document.createElement('div');
    newCard.className = "card";

    const header = document.createElement('div');
    header.className = 'header';


    for (const[key, value] of Object.entries(newBook)) {

        if (key == 'newBookIndex') continue;

        const cardElement = document.createElement("div");
        cardElement.className = "card-element";

        if (key == 'read') {
            const readToggle = document.createElement("button");
            readToggle.className = "read-toggle";
            readToggle.dataset.action = "read-toggle";
            readToggle.textContent = value;

            readToggle.addEventListener('click', function() {
                newBook.toggleRead(readToggle);
            })
            cardElement.appendChild(readToggle);
            newCard.appendChild(cardElement);
        } 

        else {

            const cardText = document.createTextNode(value);
            cardElement.appendChild(cardText);

         if (key == 'title') {
            header.appendChild(cardElement);
            newCard.appendChild(header);

         } else {
            newCard.appendChild(cardElement);
         }
        }
    }

    const removeButton = document.createElement("button");
    removeButton.className = "remove";
    removeButton.textContent = "Remove";

    removeButton.addEventListener('click', function() {
        removeBookFromLibrary(newBook.newBookIndex);
    })

    newCard.appendChild(removeButton);

    libraryContainer.appendChild(newCard);
}

function openForm() {
    popupForm.style.display = "grid";
}

function hideForm() {
    popupForm.style.display = "none";
}

document.addEventListener('click', function(e) {
    if (e.target.className != "remove") return;
        var btn = e.target;
        var card = btn.parentElement;
        card.parentElement.removeChild(card);
} );

document.addEventListener('click', function(e) {
    if (e.target.dataset.action!= "read-toggle") return;

    if (e.target.className == "read") {
        e.target.className = "not-read";
    } else {
 (e.target.className = "read");
    }
} );

function updateBookUniqueValue() {
    bookUniqueValue ++;
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

const tempBook = myLibrary[0];
console.log(tempBook);