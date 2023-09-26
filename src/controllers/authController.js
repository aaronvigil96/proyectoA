import {prisma} from '../utils/db.js';
import { hashPassword, compareHash } from '../utils/handleBcrypt.js';
import { signToken } from '../utils/handleToken.js';

export const authController = {
    register: async (req, res) => {
        try{
            const {name, email, password} = req.body;
            if(!name || !email || !password) {
                return res.json({status: "DENIED", msg: "Los campos son obligatorios"});
            }
            let user = await prisma.users.findFirst({where: {email},select:{email: true}});
            if(user){
                return res.json({status: "DENIED", msg:"Ya existe el usuario con ese correo"});
            }
            user = await prisma.users.create({data:{name, email, password: hashPassword(password)}});
            return res.json({status: "OK", msg: "Usuario creado con éxito"});
        }catch(err){
            console.log(err);
        }
    },
    login: async (req, res) => {       
        try{
            const {email, password} = req.body;
            let user = await prisma.users.findFirst({where: {email},select: {email: true}});
            if(!user){
                return res.json({status: "FAILED", msg: "Email y/o password incorrectos"});
            }
            user = await prisma.users.findFirst({where: {email}});
            if(!compareHash(password, user.password)){
                return res.json({status: "FAILED", msg: "Email y/o password incorrectos"});
            }
            let token = signToken(user);
            res.cookie("token", token);
            return res.json({status: "Ok", msg: "Bienvenido"});
        }catch(err){
            console.log(err);
        }
    }
}