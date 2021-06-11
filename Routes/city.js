const express = require('express');
const router = express.Router();
const City = require('../model/city');

router.get('/', (req, res) =>{ 
    City.find({}, (err, data)=>{
        if(err) return res.send({error: 'Erro na consulta da cidade!'});
        return res.send(data);
    })
    
});


router.post('/create', (req, res) =>{ 
    const {nome, estado} = req.body;

    if(!nome || !estado) return res.send({error: 'Dados insuficientes!'});
    City.findOne({nome},(err, data)=>{
        if(err) return res.send({error: 'Erro ao buscar cidade!'});
        if(data) return res.send({error: 'Cidade já registrado'});

        City.create(req.body, (err, data)=>{
            if(err) return res.send({error: 'Erro ao criar cidade!'});
            data.password = undefined;
            return res.send(data);
        });
    });
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const _id = City.count({id: req.params.id});
        await City.deleteOne({"_id": req.params.id});
        return res.status(202).send({message: 'deleted!'});

    }catch (err) {
        return res.sendStatus(400).send({ error: 'Error deleting project' });
    }
});

router.patch('/update/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const updates = req.body;

        const result = await City.replaceOne(id, updates);
        res.send(result);
    }catch(error){
        return res.sendStatus(400).send({ error: 'Erro em atualizar o a Cidade!' });
    }
});
module.exports = router;