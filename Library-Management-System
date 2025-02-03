namespace LibrarySystem {
    export class Book {
        public title: string;
        public author: string;
        private isbn: string;
        constructor(title: string, author: string, isbn: string) {
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }
        getISBN(): string {
            return this.isbn;
        }
    }
    export class Library {
        protected books: Book[] = [];

        addBook(book: Book): void {
            this.books.push(book);
        }
        
        borrowBook(title: string): Book | null {
            const index = this.books.findIndex((book) => book.title === title);
            if (index !== -1) {
                return this.books.splice(index, 1)[0]; 
            }
            return null; 
        }
    }

    
    export class PublicLibrary extends Library {
        displayBooks(): void {
            console.log("Available Books in the Library:");
            this.books.forEach((book) => console.log(`Title: ${book.title}, Author: ${book.author}`));
        }
    }
}

const library = new LibrarySystem.PublicLibrary();
library.addBook(new LibrarySystem.Book("The Alchemist", "Paulo Coelho", "123456"));
library.addBook(new LibrarySystem.Book("Atomic Habits", "James Clear", "654321"));
library.displayBooks();

const borrowed = library.borrowBook("Silent Patient");
console.log(borrowed ? `Borrowed: ${borrowed.title}` : "Book not available");
