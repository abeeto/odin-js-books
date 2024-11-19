const myLibrary = [];

function Book(title, author, pages, availableCopies) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.availableCopies = availableCopies;
    this.readStatus = "not read";  // not read, reading, read
    this.isReadWish = false; 
    this.isBorrowed = false;
}

Book.prototype.startRead = function() {
    this.readStatus = "reading";
}
Book.prototype.finishRead = function() {
    this.readStatus = "read";
}
Book.prototype.setReadWish = function() {
    this.isReadWish = !this.isReadWish;
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


function addBookToLibrary(title, author, pages, availableCopies) {
    let newBook = new Book(title, author, pages, availableCopies);
    myLibrary.push(newBook);
}

addBookToLibrary("Harry", "Just Kidding Rowling", 134, 15);
addBookToLibrary("Erago", "Brisofer Poalini", 134, 7);
addBookToLibrary("Barnia", "C.K Lewis", 134, 4);
addBookToLibrary("Magik", "Ange Page", 340, 2);


for (const book in myLibrary){
    console.log(myLibrary[book].info());
}