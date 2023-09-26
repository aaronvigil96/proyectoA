import bcrypt from 'bcrypt';

export const hashPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const compareHash = (password, passHashed) => {
    return bcrypt.compareSync(password, passHashed);
}