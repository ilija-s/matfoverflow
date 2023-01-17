export class Comment {
	public createdAt: Date;
    public updatedAt: Date;

    constructor(
		public _id: string,
		public questionId: string,
		public authorId: string,
		public authorName: string,
		public content: string,
		public votes: number,
		public upvotes: string,
		public downvotes: string,
        createdAt: string,
        updatedAt: string
    ) 
	{
		this.createdAt = new Date(createdAt);
		this.updatedAt = new Date(updatedAt);
	}
}
