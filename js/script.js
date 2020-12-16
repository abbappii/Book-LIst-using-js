 
// Get the ui element 
let form = document.querySelector('#book-form');
let bookList = document.querySelector('#book-list');
//Book

class Book{
    constructor(title, author, isbn){
        this.title = title,
        this.author = author,
        this.isbn = isbn;
    }
}


class UI{
    static addToBookList(book){
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
    static clearFields(){
        document.querySelector('#title').value='',
        document.querySelector('#author').value='',
        document.querySelector('#isbn').value='';
    }

    static showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        // message pass 
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() =>{
            document.querySelector('.alert').remove(); 
        },3000);
    }

    static deleteFromBook(target){
        if (target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert('Book Removed', 'success');
        }
    }
}

// local storage class handle 
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){ 
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;  
    }
   
    static addBook(book){       
        let books = Store.getBooks();  
        books.push(book);               

        localStorage.setItem('books', JSON.stringify(books)); 
    }

    static displayBooks(){     
        let books = Store.getBooks();

        books.forEach(book =>{       
            UI.addToBookList(book);     
        })
    }

    

    static removeBook(isbn){    
        let books = Store.getBooks(); 

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// add event listener 

form.addEventListener('submit',newBook);
// for book delete add event listener
bookList.addEventListener('click',removeBook);
document.addEventListener("DOMContentLoaded", Store.displayBooks());

function newBook(e){
    let title = document.querySelector('#title').Value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;


    if (title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill all the fields', 'error');
    }
    else{
        let book = new Book(title, author, isbn);

        UI.addToBookList(book)

        // clear korar jonno
        UI.clearFields()
        UI.showAlert('Book added', 'success');

        Store.addBook(book);
    }
    
    
    e.preventDefault();
}

function removeBook(e){
    UI.deleteFromBook(e.target);
    e.preventDefault();
}