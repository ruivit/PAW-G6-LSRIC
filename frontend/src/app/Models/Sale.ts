import { Book } from "./Book";

export class Sale {
    _id: number;
    clientUsername: String;
    books: String;
    booksInfo: Array<any>;
    total: Number;
    gainedPoints: Number;
    date: Date;
    dateString: String;
    shipping: Number;

    constructor(sale: Sale) {
        this._id = sale._id;
        this.clientUsername = sale.clientUsername;
        this.books = sale.books;
        this.booksInfo = sale.booksInfo;
        this.total = sale.total;
        this.gainedPoints = sale.gainedPoints;
        this.date = sale.date;
        this.dateString = sale.dateString;
        this.shipping = sale.shipping;
    }
}


