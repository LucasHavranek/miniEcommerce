"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3333;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
app.get('/products', async (req, res) => {
    const products = await axios_1.default.get('https://alphalabs.webdiet.com.br/api/products', {
        headers: {
            Authorization: '8d0b85bddc06168e1e33d30f4a5258186bc15e0dd4ace259b47879a1238c481e'
        }
    });
    if (products.status === 200 && products.data) {
        res.json(products.data.items);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
