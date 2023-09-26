import {prisma} from '../utils/db.js';

export const userController = {
    getAll: async (req, res) => {
        const users = await prisma.users.findMany();
        return res.json(users);
    },
    get: async (req, res) => {
        try{
            let {id} = req.params;
            id = parseInt(id);
            let user = await prisma.users.findFirst({where: {id},select:{email: true}});
            if(!user){
                return res.json({status: "FAILED", msg: "No existe el usuario con ese id"});
            }
            user = await prisma.users.findFirst({where: {id}});
            return res.json(user);
        }catch(err){
            console.log(err);
        }
    },
    update: async (req, res) => {
        try{
            let {id} = req.params;
            id = parseInt(id);
            const {name} = req.body;
            let user = await prisma.users.findFirst({where: {id}});
            if(!user){
                return res.json({status: "FAILED", msg: "No existe el usuario con ese id"});
            }
            user = await prisma.users.update({where: {id}, data: {name}});
            return res.json(user);
        }catch(err){
            console.log(err);
        }
    },
    delete: async (req, res) => {
        let {id} = req.params;
        id = parseInt(id);
        let user = await prisma.users.findFirst({where: {id},select:{id: true}});
        if(!user){
            return res.json({status: "FAILED", msg:"No existe el usuario con ese id"});
        }
        user = await prisma.users.delete({where: {id}});
        return res.json({status: "OK", msg: "Usuario eliminado con éxito"});
    }
}