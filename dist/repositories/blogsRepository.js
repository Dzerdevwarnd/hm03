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
exports.blogsRepository = void 0;
const db_1 = require("../db");
exports.blogsRepository = {
    returnAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.client
                .db('hm03')
                .collection('blogs')
                .find({})
                .toArray();
        });
    },
    findBlog(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let blog = yield db_1.client
                .db('hm03')
                .collection('blogs')
                .findOne({ id: params.id });
            if (blog) {
                return blog;
            }
            else {
                return;
            }
        });
    },
    createBlog(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdDate = new Date();
            const newBlog = {
                id: String(Date.now()),
                name: body.name,
                description: body.description,
                websiteUrl: body.websiteUrl,
                createdAt: createdDate,
                isMembership: false,
            };
            const result = yield db_1.client
                .db('hm03')
                .collection('blogs')
                .insertOne(newBlog);
            //push
            return newBlog;
        });
    },
    updateBlog(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client
                .db('hm03')
                .collection('blogs')
                .updateOne({ id: id }, {
                $set: {
                    name: body.name,
                    description: body.description,
                    websiteUrl: body.websiteUrl,
                },
            });
            return result.matchedCount === 1;
        });
    },
    deleteBlog(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield db_1.client
                .db('hm03')
                .collection('blogs')
                .deleteOne({ id: params.id });
            return result.deletedCount === 1;
        });
    },
};
