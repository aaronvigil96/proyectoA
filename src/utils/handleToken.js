import jwt from 'jsonwebtoken';

export const signToken = user => {
    return jwt.sign({
        id: user.id
    }, process.env.SECRETKEY,{expiresIn: '20s'})
}

export const authJwt = (req, res, next) => {
    try{
        const token = req.cookies.token;
        const user = jwt.verify(token, process.env.SECRETKEY);
        req.user = user;
        next()
    }catch(err){
        res.clearCookie("token");
        return res.json({status: "FAILED", msg: "Error en la válidación"});
    }
}