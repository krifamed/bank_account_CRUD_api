const router = require('express').Router();
const uuidv4 = require('uuid/v4');
const db = require('../config/db');


router.get('/', async (req, res)=>{
    try {
        const compts = await db.compts.findAll({include : db.cards});
        return res.status(200).json({ compts });
    } catch (error) {
        return res.status(400).json(error);
    }    
});
// router.get('/', async (req, res)=>{
//     try {
//         const compts = await Compt.findAll();
//         return res.status(200).json({ compts });
//     } catch (error) {
//         return res.status(400).json(error);
//     }    
// });

router.post('/', async (req, res)=>{
    try{
        const compt = {
            id : uuidv4(),
            code : req.body.code,
            name: req.body.name,
            email: req.body.email
        };
        const createdCompt = await db.compts.create(compt);
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
        compt = await db.compts.findOne({
            where: {
                id: id
            }
        });
        if(compt){
            const data = await db.compts.update(updatedData, {
                where : {
                    id: id
                }
            });
            if(data)
                return res.status(201).json({'message': 'Compt successfuly updated'});
            else return res.status(500).json({'message': 'internal server error!'});
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
        compt = await db.compts.findOne({
            where: {
                id: id
            },
            include: [db.cards]
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
        const compt = await db.compts.findOne({
            where: { id: id },
            include: [db.cards]
        });
        if(compt){
            const deletedCompt = await db.compts.destroy({
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


router.post('/:id/cards', async (req, res)=>{
    try{
        const {id} = req.params;

        const card = {
            id : uuidv4(),
            owner : req.body.owner,
            expires: req.body.expires,
            code: req.body.code,
            email: req.body.email,
            comptId : id
        };
        const createdCard = await db.cards.create(card);
        return res.status(200).json(createdCard);
    }catch(err){
        return res.status(400).json(err);
    }
});

module.exports = router;