import { Book } from "./Book";

export class Sale {
    constructor(
        public clientUsername: String, 
        public books: Array<Book>,
        public quantity: Array<number>,
        public total: Number, 
        public gainedPoints: Number,
        public date: Date,
        public shipping: Number) {
            this.clientUsername = clientUsername;
            this.books = books;
            this.quantity = quantity;
            this.total = total;
            this.gainedPoints = gainedPoints;
            this.date = date;
            this.shipping = shipping;
        }
    }