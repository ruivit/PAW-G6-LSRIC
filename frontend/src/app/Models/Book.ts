export class Book {
    constructor(
        public _id: number, 
        public title: String, 
        public author: String, 
        public genre: String, 
        public editor: String, 
        public resume: String, 
        public avaliation: number, 
        public isbn: number, 
        public date: String, 
        public condition: String, 
        public provider: String,
        public quantityToBuy: number,
        public stock: number, 
        public sellPrice: number, 
        public buyPrice: number) {
            this._id = _id;
            this.title = title;
            this.author = author;
            this.genre = genre;
            this.editor = editor;
            this.resume = resume;
            this.avaliation = avaliation;
            this.isbn = isbn;
            this.date = date;
            this.condition = condition;
            this.provider = provider;
            this.quantityToBuy = quantityToBuy;
            this.stock = stock;
            this.sellPrice = sellPrice;
            this.buyPrice = buyPrice;
        }
    }