const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');

router.use(express.json());

router.get('/', (req, res) =>{ 
    Users.find({}, (err, data)=>{
        if(err) return res.send({error: 'Erro na consulta de usuários!'});
        return res.send(data);
    })
    
});


router.post('/create', (req, res) =>{ 
    const {email, password} = req.body;

    if(!email || !password) return res.send({error: 'Dados insuficientes!'});
    Users.findOne({email},(err, data)=>{
        if(err) return res.send({error: 'Erro ao buscar usuário!'});
        if(data) return res.send({error: 'Usuário já registrado'});

        Users.create(req.body, (err, data)=>{
            if(err) return res.send({error: 'Erro ao criar usuário!'});
            data.password = undefined;
            return res.send(data);
        });
    });
});

router.post('/auth', (req, res) =>{

});

router.delete('/delete/:id', async (req, res) => {
    try {
        const _id = Users.count({id: req.params.id});
        await Users.deleteOne({"_id": req.params.id});
        return res.status(202).send({message: 'deleted!'});

    }catch (err) {
        return res.sendStatus(400).send({ error: 'Error deleting project' });
    }
});

router.patch('/update/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const updates = req.body;

        const result = await Users.findByIdAndUpdate(id, updates);
        res.send(result);
    }catch(error){
        return res.sendStatus(400).send({ error: 'Erro em atualizar o a usuario!' });
    }
});

module.exports = router;