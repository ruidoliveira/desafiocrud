const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{ 
    return res.send({message: 'Tudo ok com o médoto GET da raiz'})
});

router.post('/', (req, res) =>{ 
    return res.send({message: 'Tudo ok com o médoto POST da raiz'})
});

module.exports = router;