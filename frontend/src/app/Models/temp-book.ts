export class TempBook {
    constructor(
        public title: string,
        public author: string,
        public genre: string,
        public editor: string,
        public resume: string,
        public isbn: number,
        public dateAdded: Date,
        public dateString: string,
        public provider: string,
        public sellPrice: number,
    ) { }
}