"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const db_1 = require("../db");
exports.postsRepository = {
    returnAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.client
                .db('hm03')
                .collection('posts')
                .find({}, { projection: { _id: 0 } })
                .toArray();
        });
    },
    findPost(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield db_1.client
                .db('hm03')
                .collection('posts')
                .findOne({ id: params.id });
            if (post) {
                return post;
            }
            else {
                return;
            }
        });
    },
    createPost(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdDate = new Date();
            const newPost = {
                id: String(Date.now()),
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: body.blogId,
                blogName: '',
                createdAt: createdDate,
            };
            const result = yield db_1.client
                .db('hm03')
                .collection('posts')
                .insertOne(newPost);
            return newPost;
        });
    },
    updatePost(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client
                .db('hm03')
                .collection('posts')
                .updateOne({ id: id }, {
                $set: {
                    title: body.title,
                    shortDescription: body.shortDescription,
                    content: body.content,
                    blogId: body.blogId,
                },
            });
            return result.matchedCount === 1;
        });
    },
    deletePost(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield db_1.client
                .db('hm03')
                .collection('posts')
                .deleteOne({ id: params.id });
            return result.deletedCount === 1;
        });
    },
};
