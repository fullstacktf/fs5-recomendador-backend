import express from 'express';

const app = express();
app.use(express.json());

const PORT = 80;

app.get('/', (req, res) => {
    res.json({message: "Welcome to uRecommend.me!"})
});

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
