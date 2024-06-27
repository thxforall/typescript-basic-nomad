const DCC = {
  0o0: 'Computer science, information & general works',
  100: 'Philosophy & psychology',
  200: 'Religion',
  300: 'Social Sciences',
  400: 'Language',
  500: 'Science',
  600: 'Technology',
  700: 'Art & recreation',
  800: 'Literature',
  900: 'History & geography',
} as const;

type DCCKeys = keyof typeof DCC;

type Library = {
  [title: string]: {
    genres: DCCKeys;
    rating: number;
  };
};

class Book {
  constructor(
    public title: string,
    public genres: DCCKeys,
    public rating: number
  ) {}
}

class Librarian {
  public library: Library;

  constructor() {
    this.library = {};
  }

  addBook(book: Book): boolean {
    if (book.title in this.library) {
      console.log(`「${book.title}」 already exists`);
      return false;
    } else {
      this.library[book.title] = {
        genres: book.genres,
        rating: book.rating,
      };
      console.log(`「${book.title}」 successfully added`);
      return true;
    }
  }

  findBookByTitle(title: string): Book | undefined {
    const book = this.library[title];
    if (book) {
      const result = new Book(title, book.genres, book.rating);
      console.log(
        `${result.title}'s genre is ${
          DCC[result.genres]
        }, people rate this book ${result.rating}`
      );
      return result;
    }
    console.log(`${title} does not exist.`);
    return undefined;
  }

  deleteBookByTitle(title: string): boolean {
    if (title in this.library) {
      delete this.library[title];
      console.log(`"${title}" successfully deleted.`);
      return true;
    } else {
      console.log(`Can't find "${title}".`);
      return false;
    }
  }

  updateBook(book: Book): boolean {
    if (book.title in this.library) {
      this.library[book.title] = {
        genres: book.genres,
        rating: book.rating,
      };
      console.log(`「${book.title}」 updated successfully.`);
      return true;
    } else {
      console.log(`Book title 「${book.title}」 does not exist.`);
      return false;
    }
  }

  showAll(): void {
    for (const title in this.library) {
      const book = this.library[title];
      console.log(
        `Title: ${title}, Genre: ${DCC[book.genres]}, Rating: ${book.rating}`
      );
    }
  }

  countBook(): number {
    const count = Object.keys(this.library).length;
    console.log(`Total number of books: ${count}`);
    return count;
  }

  upsertBook(book: Book): void {
    if (this.findBookByTitle(book.title)) {
      this.updateBook(book);
    } else {
      this.addBook(book);
    }
  }

  bulkAddBooks(books: Book[]): void {
    books.forEach((book) => this.addBook(book));
  }

  bulkDelete(titles: string[]): void {
    titles.forEach((title) => this.deleteBookByTitle(title));
  }
}

// dumy data
const book1 = new Book('Introduction to Computer Science', 0o0, 4.5);
const book2 = new Book('Philosophy 101', 100, 4.0);
const book3 = new Book('World Religions', 200, 3.8);
const book4 = new Book('Social Science Basics', 300, 4.2);
const book5 = new Book('Learning Languages', 400, 4.7);
const book6 = new Book('Fundamentals of Science', 500, 4.9);

const librarian = new Librarian();

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
const updatedBook = new Book('Philosophy 101', 100, 4.8);
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
