import express from 'express';
import { Database } from './helpers/Database';
import { generateMediaRouter } from "./api/media";

const app = express();
app.use(express.json());

const PORT = 8080;
const database: Database = new Database();

app.use("/media", generateMediaRouter(database));
app.get('/', (req, res) => {
    res.json({message: "Welcome to uRecommend.me!"})
});

async function init() {
    await database.load();
    app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
};

init().catch(error => console.error('Something has gone wrong', error));
