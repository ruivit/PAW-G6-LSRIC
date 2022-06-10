export class UsedBook {
    _id: number;
    title: String;
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

    constructor(usedBook: UsedBook) {
        this._id = usedBook._id;
        this.title = usedBook.title;
        this.author = usedBook.author;
        this.genre = usedBook.genre;
        this.editor = usedBook.editor;
        this.resume = usedBook.resume;
        this.avaliation = usedBook.avaliation;
        this.isbn = usedBook.isbn;
        this.date = usedBook.date;
        this.condition = usedBook.condition;
        this.provider = usedBook.provider;
        this.stock = usedBook.stock;
        this.sellPrice = usedBook.sellPrice;
        this.buyPrice = usedBook.buyPrice;
    }
}

