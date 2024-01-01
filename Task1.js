"use strict";

/*
Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/
class Library {
  #books = [];
  constructor(initialBooksList) {
    if (!Array.isArray(initialBooksList)) {
      throw new Error("Array incl. the initial list of books");
    }

    const uniqueBooks = new Set(initialBooksList);
    if (uniqueBooks.size !== initialBooksList.length) {
      throw new Error("No copies are allowed in the initial list of books!");
    }

    this.#books = initialBooksList;
  }

  get allBooks() {
    return this.#books;
  }

  addBook(title) {
    if (this.#books.includes(title)) {
      throw new Error("The book already exists!");
    }

    this.#books.push(title);
  }

  removeBook(title) {
    const index = this.#books.indexOf(title);
    if (index === -1) {
      throw new Error("No such book in the library!");
    }

    this.#books.splice(index, 1);
  }

  hasBook(title) {
    return this.#books.includes(title);
  }
}

const myLibrary = new Library(["Book 1", "Book 2", "Book 3"]);

console.log(myLibrary.allBooks);

myLibrary.addBook("Book 4");
console.log(myLibrary.allBooks);

myLibrary.removeBook("Book 2");
console.log(myLibrary.allBooks);
myLibrary.removeBook("Book 5");
console.log(myLibrary.allBooks);

console.log(myLibrary.hasBook("Book 1"));
console.log(myLibrary.hasBook("Book 2"));
