export class Question {
    constructor(
		public _id: string,
		public questionId: string,
		public authorId: string,
		public content: string,
		public votes: number,
		public upvotes: string,
		public downvotes: string,
        public createdAt: string,
        public updatedAt: string,
    ) {}
}
