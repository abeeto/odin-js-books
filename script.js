const myLibrary = [];

function addBookToLibrary(title, author, pages, availableCopies) {
    let newBook = new Book(title, author, pages, availableCopies);
    myLibrary.push(newBook);
}

class Book {
    #title;
    #author;
    #pages;
    #readBool;
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.#readBool = false;
    }

    set title(titleName){
        if (typeof titleName === "string" && titleName.length > 0){
            this.#title = titleName
        }else {
            console.error(`Invalid title entry`);
        }
    }
    set author(authorName){
        if (typeof authorName === "string" && authorName.length > 0){
            this.#author = authorName;
        }else if (authorName === undefined || authorName === null ) {
            this.#author = "Anonymous"
        }else {
            throw console.error(`Invalid author entry`);
        }
    }
    set pages(pageNumbers){
        if (typeof pageNumbers === "number" && pageNumbers > 0){
            this.#pages = pageNumbers;
        }else {
            console.error(`Invalid page number`);
        }
    }
    get #readStatus() {
        return this.#readBool ? "read" : "unread";
    }
    get readBool() {
        return this.#readBool;
    }
    set readBool(x) {
        this.#readBool = x;
    }
    toggleReadStatus() {
        this.#readBool = !this.#readBool;
    }

    get info() {
        return `${this.#title} written by ${this.#author} has ${this.#pages} pages. Book Reading Status: ${this.#readStatus}.`;
    }
    get object() {
        return {title: this.#title, author: this.#author, pages: this.#pages, readStatus: this.#readStatus}
    }
}


const bookOne = new Book("Harry", "Just Kidding Rowling", 134);
const bookTwo = new Book("Erago", "Brisofer Poalini", 134);
const bookThree = new Book("Barnia", "C.K Lewis", 134);
const bookFour = new Book("Magik", "Ange Page", 340);


const libraryWrapperDiv = document.querySelector(".library-wrapper");

const createBookCard = function (bookObj, index) {
    const newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");
    newBookCard.dataset.index = index;

    const createBookCover = (title, author) => {
        const bookCoverNode = document.createElement("div");
        bookCoverNode.classList.add("book-cover");
        const titleNode = document.createElement("h2");
        titleNode.innerText = title;
        const authorNode = document.createElement("h3");
        authorNode.innerText = author;

        bookCoverNode.appendChild(titleNode);
        bookCoverNode.appendChild(authorNode);
        newBookCard.appendChild(bookCoverNode);
    }

    const createAndSetTag = (tag, innerContent, className) => {
        const newElement = document.createElement(tag);
        newElement.innerText = innerContent;
        className ? newElement.classList.add(className) : "";
        newBookCard.appendChild(newElement);
        return newElement;
    }

    createBookCover(bookObj.title, bookObj.author);
    createAndSetTag("p", `${bookObj.pages} pages`);
    createAndSetTag("p", `${bookObj.availableCopies} copies available`);
    createAndSetTag("p", bookObj.readStatus, "readStatusLabel");

    const deleteButton = createAndSetTag("button", "Remove Book", "removeBook");
    const readStatusButton = createAndSetTag("button", "Already Read?", "readStatusButton")

    readStatusButton.addEventListener("click", updateReadStatus);
    deleteButton.addEventListener("click", deleteBook);

    return newBookCard;
}

const updateReadStatus = (e) => {
    const bookCard = e.target.parentNode;
    const bookIndex = bookCard.dataset.index;

    const bookObject = myLibrary[bookIndex];
    const currentReadStatus = bookObject.readStatus;

    const readStatusLabel = bookCard.querySelector(".readStatusLabel");
    const toChange = { "unread": "read", "read": "unread" };
    const newStatus = toChange[currentReadStatus];

    bookObject.readStatus = newStatus;
    const newReadStatus = newStatus;

    readStatusLabel.innerText = newReadStatus;
    e.target.innerText = bookObject.readStatus === "read" ? "Set to unread" : "Already read";
}

const deleteBook = (e) => {
    const bookCardToDelete = e.target.parentNode;
    const bookIndexToRemove = bookCardToDelete.dataset.index;
    delete myLibrary[bookIndexToRemove];
    libraryWrapperDiv.removeChild(bookCardToDelete);
}

for (index in myLibrary) {
    libraryWrapperDiv.appendChild(createBookCard(myLibrary[index], index));
}

const addBookButton = document.querySelector('.add-book-btn');
addBookButton.addEventListener("click", () => {
    const addBookForm = document.querySelector('.add-book-form');
    addBookForm.classList.toggle("hidden");
})

const createBookButton = document.querySelector('.create-book-btn');
const createBookForm = document.querySelector('.add-book-form');
createBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(createBookForm);
    const [...values] = formData.values();
    addBookToLibrary(...values);

    const newBookObj = myLibrary[myLibrary.length - 1];
    const newBookCard = createBookCard(newBookObj, myLibrary.length - 1);

    libraryWrapperDiv.appendChild(newBookCard);
    createBookForm.reset();
});