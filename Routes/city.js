const express = require('express');
const router = express.Router();
const Users = require('../model/city');

router.get('/', (req, res) =>{ 
    Users.find({}, (err, data)=>{
        if(err) return res.send({error: 'Erro na consulta da cidade!'});
        return res.send(data);
    })
    
});


router.post('/create', (req, res) =>{ 
    const {nome, estado} = req.body;

    if(!nome || !estado) return res.send({error: 'Dados insuficientes!'});
    Users.findOne({nome},(err, data)=>{
        if(err) return res.send({error: 'Erro ao buscar cidade!'});
        if(data) return res.send({error: 'Cidade já registrado'});

        Users.create(req.body, (err, data)=>{
            if(err) return res.send({error: 'Erro ao criar cidade!'});
            data.password = undefined;
            return res.send(data);
        });
    });
});

router.delete('/delete/:id',(req, res)=>{
    const {nome, estado} = req.body;
    try {
        Project.findByIdAndRemove(nome);
        return res.status(204);
    } catch (err) {
        return res.sendStatus(400).send({ error: 'Error deleting project' });
    }
}); 

module.exports = router;