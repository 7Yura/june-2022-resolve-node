const express = require('express');
const fs = require('fs/promises');

const userDB= require('../june-2022-resolve/dataBase/users.json')
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/users',(req, res) => {
    res.json(userDB);
})

app.post('/users',async (req, res) => {
    const {name,age}= req.body
    // console.log(userInfo);
    const newUser = { id: userDB[userDB.length -1].id + 1, name, age }
    userDB.push(newUser);
    await fs.writeFile(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(userDB));
    res.json(userDB);
})

app.put('/users/:userid',async (req, res) => {
    const newUser = req.body;
    const {userid} = req.params;
    const index = userDB.findIndex((user) => user.id === +userid);

    if (index === -1) {
        return res.status(404).json(`User with id ${userid} not found`);
    }
    // userDB[index] = newUser;
    userDB[index] = { ...userDB[index], ...newUser };
    await fs.writeFile(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(userDB));
    res.json(userDB);
})

app.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    // const users = await fileServices.reader();
    const index = userDB.findIndex((user) => user.id === +userId);

    console.log(index);
    if (index === -1) {
        return res.status(404).json(`User with id ${userId} not found`);
    }
        userDB.splice(index, 1);
        await fs.writeFile(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(userDB));
        // res.sendStatus(204);
    res.json(userDB);
});

app.get('/users/:userid',(req, res) => {
    console.log('users endpoint');
    // res.json({name: 'Yura'});
    const{userid}=req.params
    res.json(userDB[userid]);
})

app.listen(5000,()=>{
    console.log('Server listen 5000');
})