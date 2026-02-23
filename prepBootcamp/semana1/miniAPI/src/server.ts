import express from 'express';
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API rodando")
})
app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333")
})