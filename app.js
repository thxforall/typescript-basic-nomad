var DCC = {
    0: 'Computer science, information & general works',
    100: 'Philosophy & psychology',
    200: 'Religion',
    300: 'Social Sciences',
    400: 'Language',
    500: 'Science',
    600: 'Technology',
    700: 'Art & recreation',
    800: 'Literature',
    900: 'History & geography',
};
var Book = /** @class */ (function () {
    function Book(title, genres, rating) {
        this.title = title;
        this.genres = genres;
        this.rating = rating;
    }
    return Book;
}());
var Librarian = /** @class */ (function () {
    function Librarian() {
        this.library = {};
    }
    Librarian.prototype.addBook = function (book) {
        if (book.title in this.library) {
            console.log("\u300C".concat(book.title, "\u300D already exists"));
            return false;
        }
        else {
            this.library[book.title] = {
                genres: book.genres,
                rating: book.rating,
            };
            console.log("\u300C".concat(book.title, "\u300D successfully added"));
            return true;
        }
    };
    Librarian.prototype.findBookByTitle = function (title) {
        var book = this.library[title];
        if (book) {
            var result = new Book(title, book.genres, book.rating);
            console.log("".concat(result.title, "'s genre is ").concat(DCC[result.genres], ", people rate this book ").concat(result.rating));
            return result;
        }
        console.log("".concat(title, " does not exist."));
        return undefined;
    };
    Librarian.prototype.deleteBookByTitle = function (title) {
        if (title in this.library) {
            delete this.library[title];
            console.log("\"".concat(title, "\" successfully deleted."));
            return true;
        }
        else {
            console.log("Can't find \"".concat(title, "\"."));
            return false;
        }
    };
    Librarian.prototype.updateBook = function (book) {
        if (book.title in this.library) {
            this.library[book.title] = {
                genres: book.genres,
                rating: book.rating,
            };
            console.log("\u300C".concat(book.title, "\u300D updated successfully."));
            return true;
        }
        else {
            console.log("Book title \u300C".concat(book.title, "\u300D does not exist."));
            return false;
        }
    };
    Librarian.prototype.showAll = function () {
        for (var title in this.library) {
            var book = this.library[title];
            console.log("Title: ".concat(title, ", Genre: ").concat(DCC[book.genres], ", Rating: ").concat(book.rating));
        }
    };
    Librarian.prototype.countBook = function () {
        var count = Object.keys(this.library).length;
        console.log("Total number of books: ".concat(count));
        return count;
    };
    Librarian.prototype.upsertBook = function (book) {
        if (this.findBookByTitle(book.title)) {
            this.updateBook(book);
        }
        else {
            this.addBook(book);
        }
    };
    Librarian.prototype.bulkAddBooks = function (books) {
        var _this = this;
        books.forEach(function (book) { return _this.addBook(book); });
    };
    Librarian.prototype.bulkDelete = function (titles) {
        var _this = this;
        titles.forEach(function (title) { return _this.deleteBookByTitle(title); });
    };
    return Librarian;
}());
// dumy data
var book1 = new Book('Introduction to Computer Science', 0, 4.5);
var book2 = new Book('Philosophy 101', 100, 4.0);
var book3 = new Book('World Religions', 200, 3.8);
var book4 = new Book('Social Science Basics', 300, 4.2);
var book5 = new Book('Learning Languages', 400, 4.7);
var book6 = new Book('Fundamentals of Science', 500, 4.9);
var librarian = new Librarian();
console.log('ADD BOOK');
librarian.addBook(book1);
librarian.addBook(book2);
librarian.addBook(book3);
console.log('SHOW ALL');
librarian.showAll();
console.log('FIND BOOK BY TITLE');
librarian.findBookByTitle('Philosophy 101');
librarian.findBookByTitle('Non-existing Book');
console.log('BOOK UPDATE');
var updatedBook = new Book('Philosophy 101', 100, 4.8);
librarian.updateBook(updatedBook);
console.log('BOOK DELETE');
librarian.deleteBookByTitle('World Religions');
console.log('SHOW ALL AFTER DELETE');
librarian.showAll();
console.log('BOOK COUNT');
librarian.countBook();
console.log('BOOK ADD MULTIPLE');
librarian.bulkAddBooks([book4, book5, book6]);
console.log('SHOW ALL AFTER BULK ADD');
librarian.showAll();
console.log('BOOK DELETE MULTIPLE');
librarian.bulkDelete(['Introduction to Computer Science', 'Philosophy 101']);
console.log('SHOW ALL AFTER BULK DELETE');
librarian.showAll();
