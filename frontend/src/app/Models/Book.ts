export class Book {
    _id: number;
    title: string;
    author: String;
    genre: String;
    editor: String;
    resume: String;
    avaliation: number;
    isbn: number;
    date: Date;
    condition: String;
    provider: any;
    stock: number;
    sellPrice: number;
    buyPrice: number;

    constructor(book: Book) {
        this._id = book._id;
        this.title = book.title;
        this.author = book.author;
        this.genre = book.genre;
        this.editor = book.editor;
        this.resume = book.resume;
        this.avaliation = book.avaliation;
        this.isbn = book.isbn;
        this.date = book.date;
        this.condition = book.condition;
        this.provider = book.provider;
        this.stock = book.stock;
        this.sellPrice = book.sellPrice;
        this.buyPrice = book.buyPrice;
    }
}

