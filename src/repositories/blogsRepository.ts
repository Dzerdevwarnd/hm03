import { client } from '../db'

export type blogType = {
	id: string
	name: string
	description: string
	websiteUrl: string
}

export const blogsRepository = {
	async returnAllBlogs(): Promise<blogType[]> {
		return await client
			.db('hm03')
			.collection<blogType>('blogs')
			.find({})
			.toArray()
	},
	async findBlog(params: { id: string }): Promise<blogType | undefined> {
		let blog: blogType | null = await client
			.db('hm03')
			.collection<blogType>('blogs')
			.findOne({ id: params.id })
		if (blog) {
			return blog
		} else {
			return
		}
	},
	async createBlog(body: {
		name: string
		description: string
		websiteUrl: string
	}): Promise<blogType> {
		const newBlog: blogType = {
			id: String(Date.now()),
			name: body.name,
			description: body.description,
			websiteUrl: body.websiteUrl,
		}
		const result = await client
			.db('hm03')
			.collection<blogType>('blogs')
			.insertOne(newBlog)
		//push
		return newBlog
	},
	async updateBlog(
		id: string,
		body: { name: string; description: string; websiteUrl: string }
	): Promise<boolean | undefined> {
		const result = await client
			.db('hm03')
			.collection<blogType>('blogs')
			.updateOne(
				{ id: id },
				{
					$set: {
						name: body.name,
						description: body.description,
						websiteUrl: body.websiteUrl,
					},
				}
			)
		return result.matchedCount === 1
	},
	async deleteBlog(params: { id: string }): Promise<boolean> {
		let result = await client
			.db('hm03')
			.collection<blogType>('blogs')
			.deleteOne({ id: params.id })
		return result.deletedCount === 1
	},
}
