import { client } from '../db'

export type postType = {
	id: string
	title: string
	shortDescription: string
	content: string
	blogId: string
	blogName: string
}

export const postsRepository = {
	async returnAllPosts(): Promise<postType[]> {
		return await client
			.db('hm03')
			.collection<postType>('posts')
			.find({})
			.toArray()
	},
	async findPost(params: { id: string }): Promise<postType | undefined> {
		let post: postType | null = await client
			.db('hm03')
			.collection<postType>('posts')
			.findOne({ id: params.id })
		if (post) {
			return post
		} else {
			return
		}
	},
	async createPost(body: {
		title: string
		shortDescription: string
		content: string
		blogId: string
	}): Promise<postType> {
		const newPost: postType = {
			id: String(Date.now()),
			title: body.title,
			shortDescription: body.shortDescription,
			content: body.content,
			blogId: body.blogId,
			blogName: '',
		}
		const result = await client
			.db('hm03')
			.collection<postType>('posts')
			.insertOne(newPost)
		return newPost
	},
	async updatePost(
		id: string,
		body: {
			title: string
			shortDescription: string
			content: string
			blogId: string
		}
	): Promise<boolean> {
		const result = await client
			.db('hm03')
			.collection<postType>('posts')
			.updateOne(
				{ id: id },
				{
					$set: {
						title: body.title,
						shortDescription: body.shortDescription,
						content: body.content,
						blogId: body.blogId,
					},
				}
			)
		return result.matchedCount === 1
	},
	async deletePost(params: { id: string }): Promise<boolean> {
		let result = await client
			.db('hm03')
			.collection<postType>('posts')
			.deleteOne({ id: params.id })
		return result.deletedCount === 1
	},
}
