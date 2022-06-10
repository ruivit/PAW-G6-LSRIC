export class UsedBook {
    constructor(
        public title?: string,
        public author?: string,
        public genre?: string,
        public editor?: string,
        public resume?: string,
        public isbn?: number,
        public provider?: string,
        public sellPrice?: number) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.editor = editor;
        this.resume = resume;
        this.isbn = isbn;
        this.provider = "ruiv";
        this.sellPrice = sellPrice;
    }
}
