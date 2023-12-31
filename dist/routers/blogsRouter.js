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
exports.blogsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const inputValidationMiddleware_1 = require("../middleware/inputValidationMiddleware");
const blogsRepository_1 = require("../repositories/blogsRepository");
const nameValidation = (0, express_validator_1.body)('name')
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage('Name length should be from 1 to 15');
const descriptionValidation = (0, express_validator_1.body)('description')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description length should be from 1 to 500');
const urlValidation = (0, express_validator_1.body)('websiteUrl')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('URL length should be from 1 to 101')
    .isURL()
    .withMessage('Invalid URl');
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBlogs = yield blogsRepository_1.blogsRepository.returnAllBlogs();
    res.status(200).send(allBlogs);
}));
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = yield blogsRepository_1.blogsRepository.findBlog(req.params);
    if (!foundBlog) {
        res.sendStatus(404);
        return;
    }
    else {
        res.status(200).send(foundBlog);
        return;
    }
}));
exports.blogsRouter.post('/', authMiddleware_1.basicAuthMiddleware, nameValidation, descriptionValidation, urlValidation, inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield blogsRepository_1.blogsRepository.createBlog(req.body);
    res.status(201).send(newBlog);
}));
exports.blogsRouter.put('/:id', authMiddleware_1.basicAuthMiddleware, nameValidation, descriptionValidation, urlValidation, inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resultOfUpdateBlog = yield blogsRepository_1.blogsRepository.updateBlog(req.params.id, req.body);
    if (!resultOfUpdateBlog) {
        res.sendStatus(404);
    }
    else {
        res.sendStatus(204);
    }
}));
exports.blogsRouter.delete('/:id', authMiddleware_1.basicAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ResultOfDeleteBlog = yield blogsRepository_1.blogsRepository.deleteBlog(req.params);
    if (!ResultOfDeleteBlog) {
        res.sendStatus(404);
        return;
    }
    else {
        res.sendStatus(204);
        return;
    }
}));
