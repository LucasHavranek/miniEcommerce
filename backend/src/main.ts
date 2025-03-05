import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3333;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/products', async (req, res) => {
  const products = await axios.get('https://alphalabs.webdiet.com.br/api/products', {
    headers: {
      Authorization: '8d0b85bddc06168e1e33d30f4a5258186bc15e0dd4ace259b47879a1238c481e'
    }
  })

  if (products.status === 200 && products.data) {
    res.json(products.data.items)
  } 
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});