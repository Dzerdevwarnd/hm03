import { Request, Response, Router } from 'express'
import { body } from 'express-validator'
import { basicAuthMiddleware } from '../middleware/authMiddleware'
import { inputValidationMiddleware } from '../middleware/inputValidationMiddleware'
import { postType, postsRepository } from '../repositories/PostsRepository'
import { blogsRepository } from '../repositories/blogsRepository'
type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<P, B> = Request<P, {}, B>

type blogType = {
	id: string
	name: string
	description: string
	websiteUrl: string
}

export const postsRouter = Router({})

const titleValidation = body('title')
	.trim()
	.isLength({ min: 1, max: 30 })
	.withMessage('title length should be from 1 to 30')
const shortDescriptionValidation = body('shortDescription')
	.trim()
	.isLength({ min: 1, max: 100 })
	.withMessage('shortDescription length should be from 1 to 100')
const contentValidation = body('content')
	.trim()
	.isLength({ min: 1, max: 1000 })
	.withMessage('Content length should be from 1 to 1000')
const blogIdValidation = body('blogId')
	.isString()
	.trim()
	.isLength({ min: 1, max: 100 })
	.withMessage('blogId length should be from 1 to 100')

const blogIdExistValidation = body('blogId').custom(
	async (value: string, { req }) => {
		const id = value
		const params = { id }
		const blog: blogType | undefined = await blogsRepository.findBlog(params)
		if (!blog) {
			throw new Error('Blog id does not exist')
		}
	}
)

postsRouter.get('/', async (req: Request, res: Response) => {
	const allPosts: postType[] = await postsRepository.returnAllPosts()
	res.status(200).send(allPosts)
})

postsRouter.get(
	'/:id',
	async (req: RequestWithParams<{ id: string }>, res: Response) => {
		const foundPost = await postsRepository.findPost(req.params)
		if (!foundPost) {
			res.sendStatus(404)
			return
		} else {
			res.status(200).send(foundPost)
		}
	}
)

postsRouter.post(
	'/',
	basicAuthMiddleware,
	blogIdExistValidation,
	titleValidation,
	shortDescriptionValidation,
	contentValidation,
	blogIdValidation,
	inputValidationMiddleware,
	async (
		req: RequestWithBody<{
			title: string
			shortDescription: string
			content: string
			blogId: string
		}>,
		res: Response
	) => {
		const newPost = await postsRepository.createPost(req.body)
		res.status(201).send(newPost)
	}
)

postsRouter.put(
	'/:id',
	basicAuthMiddleware,
	blogIdExistValidation,
	titleValidation,
	shortDescriptionValidation,
	contentValidation,
	blogIdValidation,
	inputValidationMiddleware,
	async (
		req: RequestWithParamsAndBody<
			{ id: string },
			{
				title: string
				shortDescription: string
				content: string
				blogId: string
			}
		>,
		res: Response
	) => {
		const ResultOfUpdatePost = await postsRepository.updatePost(
			req.params.id,
			req.body
		)
		if (!ResultOfUpdatePost) {
			res.sendStatus(404)
		} else {
			res.sendStatus(204)
		}
	}
)

postsRouter.delete(
	'/:id',
	basicAuthMiddleware,
	async (req: RequestWithParams<{ id: string }>, res: Response) => {
		const resultOfDelete = await postsRepository.deletePost(req.params)
		if (!resultOfDelete) {
			res.sendStatus(404)
			return
		} else {
			res.sendStatus(204)
			return
		}
	}
)
