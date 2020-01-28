const router = require('express').Router();
const uuidv4 = require('uuid/v4');
const Compt = require('../Compt');
const Card = require('../Card');

router.get('/', async (req, res)=>{
    try {
        const compts = await Compt.findAll();
        return res.status(200).json({ compts });
    } catch (error) {
        return res.status(400).json(error);
    }    
});

router.post('/', async (req, res)=>{
    try{
        const compt = {
            id : uuidv4(),
            code : req.body.code,
            name: req.body.name,
            email: req.body.email
        };
        const createdCompt = await Compt.create(compt);
        return res.status(200).json(createdCompt);
    }catch(err){
        return res.status(400).json(err);
    }
});

router.put('/:id', async (req, res)=>{
    try{
        const {id} = req.params; 
        const updatedData = req.body;
        let compt; 
        compt = await Compt.findOne({
            where: {
                id: id
            }
        });
        if(compt){
            await Compt.update(updatedData, {
                where : {
                    id: id
                }
            });
            return res.status(201).json(updatedData);
        }else{
            return res.status(404).json({'message': 'Compt not found!'});
        }
    }catch(err){
        res.status(400).json(err);
    }
    
});

router.get('/:id', async (req, res)=>{
    try{
        const {id} = req.params; 
        let compt; 
        compt = await Compt.findOne({
            where: {
                id: id
            }, include: ['cards']
        });
        if(!compt){
            return res.status(404).json({'message': 'Compt not found!'});
        }
        return res.status(200).json(compt);
    }catch(error){
        console.log(error);
        return res.status(400).json({error});
    }
});

router.delete('/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const compt = await Compt.findOne({
            where: { id: id }
        });
        if(compt){
            const deletedCompt = await Compt.destroy({
                where: {
                    id: id
                }
            });
            if(deletedCompt)
                return res.status(200).json({'message': 'Compt deleted successfully'});
            return res.status(500).json({'message': 'something went wrong!'});           
        }else{
            return res.status(404).json({'message': 'Compt not found!'});
        }
      } catch (error) {
        res.status(400).json({error});
      }
});

module.exports = router;