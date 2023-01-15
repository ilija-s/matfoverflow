export class Question {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public author: string,
        public votes: number,
        public views: number,
        public tags: string[],
        public answers: number,
        public upvoters: string[],
        public downvoters: string[],
        public createdAt: string,
        public updatedAt: string,
        public __v: number
    ) {

    }
}