const myLibrary = [];

function Book(title, author, pages, availableCopies) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.availableCopies = availableCopies;
    this.readStatus = "unread";  // unread, reading, read
}

function addBookToLibrary(title, author, pages, availableCopies) {
    let newBook = new Book(title, author, pages, availableCopies);
    myLibrary.push(newBook);
}

// TODO: make this a promise?
Book.prototype.borrow = function() {
    if (!this.isBorrowed && this.availableCopies > 0) { 
        this.availableCopies -= 1;
        this.isBorrowed = true;
    } else {
        return `ERROR: No available copies to borrow from or you've already borrowed`;
    };
}
Book.prototype.returnBook = function() {
    this.isBorrowed = false;
    this.availableCopies += 1;
}

Book.prototype.info = function() {
    return `${this.title} by author ${this.author} has ${this.pages} pages. At this moment, this book ${this.isBorrowed ? "borrowed": "not borrowed"} by you. There are ${this.availableCopies} in the library. Book Reading Status: ${this.readStatus}. Want to read: ${this.isReadWish ? "Y" : "N"}`;
}

addBookToLibrary("Harry", "Just Kidding Rowling", 134, 15);
addBookToLibrary("Erago", "Brisofer Poalini", 134, 7);
addBookToLibrary("Barnia", "C.K Lewis", 134, 4);
addBookToLibrary("Magik", "Ange Page", 340, 2);


const libraryWrapperDiv = document.querySelector(".library-wrapper");

const createBookCard = function(bookObj, index) {
    const newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");
    newBookCard.dataset.index = index;

    const createBookCover = (title, author) =>
    {
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
    createAndSetTag("p", `${bookObj.availableCopies} copies available`);;
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

    const currentReadStatus= bookObject.readStatus;
    
    const readStatusLabel = bookCard.querySelector(".readStatusLabel");
    const toChange = {"unread": "read", "read": "unread"};
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

for (index in myLibrary){
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