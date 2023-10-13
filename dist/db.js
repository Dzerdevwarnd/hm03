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
exports.runDb = exports.postsCollection = exports.blogsCollection = exports.client = void 0;
const mongodb_1 = require("mongodb");
const mongoUri = 'mongodb+srv://admin:qwerty123@cluster0.hzh4nyr.mongodb.net/?retryWrites=true&w=majority';
console.log('url:', mongoUri);
exports.client = new mongodb_1.MongoClient(mongoUri);
exports.blogsCollection = exports.client.db().collection('blogs');
exports.postsCollection = exports.client.db().collection('posts');
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        console.log('Connect successfully to server');
    }
    catch (e) {
        console.log('Server connect ERROR');
        yield exports.client.close();
    }
});
exports.runDb = runDb;
