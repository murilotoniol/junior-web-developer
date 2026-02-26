import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const usuarios = [
    {id: 1, username: 'murilo', displayName: 'Murilo'},
    {id: 2, username: 'giovani', displayName: 'Giovani'},
    {id: 3, username: 'joao', displayName: 'Joao'},
    {id: 4, username: 'felipe', displayName: 'Felipe'},
    {id: 5, username: 'matheus', displayName: 'Matheus'},
    {id: 6, username: 'kayke', displayName: 'Kayke'}
];



app.get('/', (request, response) => {
    response.status(201).send({msg: "ola"})
})

app.get('/api/users', (request, response) => {
    response.status(200).send(usuarios)
})


app.get('/api/users/:id', (request, response)=>{
    console.log(request.params)
    const parsedId = parseInt(request.params.id)
    console.log(parsedId)
    
    if(isNaN(parsedId)) return response.status(400).send({msg: "Bad request"})
    
    const findUser = usuarios.find((user) => user.id === parsedId)
    
    if(!findUser) return response.sendStatus(404)
    return response.send(findUser)
})


app.get('/api/products', (request, response) => {
    response.status(201).send([{id: 123, name: "chicken breast", price: 12.99}])
})


app.listen(PORT, () => {
    console.log(`opa, server rodando http://localhost:${PORT}/`) 
})