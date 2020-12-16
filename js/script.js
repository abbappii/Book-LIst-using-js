 
// Get the ui element 
let form = document.querySelector('#book-form');

//Book

class Book{
    constructor(title, author, isbn){
        this.title = title,
        this.author = author,
        this.isbn = isbn;
    }
}

//
// boi ke table e add korar jono ui class create

class UI{
    constructor(){

    }
    addToBookList(book){
        let list = document.querySelector('#book-list');
        let row = document.querySelector('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td> 
        <td><a href = '#' class= 'delete'>X</a></td>       
        `
        // list e row ke append kora 
        list.appendChild(row);
 
        
    }
    clearFields(){
        document.querySelector('#title').Value='',
        document.querySelector('#author').value='',
        document.querySelector('#isbn').value='';
    }
}

// add event listener 

form.addEventListener('submit',newBook);

function newBook(e){
    let title = document.querySelector('#title').Value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

    let book = new Book(title, author, isbn);

    let ui  = new UI();

    ui.addToBookList(book)

    // clear korar jonno
    ui.clearFields()
    // console.log(book);
    // console.log('hello');
    e.preventDefault();
}