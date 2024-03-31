import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPass = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPass });
    try {
    await newUser.save();
    res.status(201).json('user created');
    } catch (err) {
        next(errHandler(550, 'error: from the function' ))
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errHandler(401, 'Wrong Credentials'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        // so we do not return the password or encrypted pw
        const { password: pass, ...restInfo } = validUser._doc;
        res.cookie('access_token', token, 
            { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 32) })
            .status(200)
            .json(restInfo);
    } catch (error) {
        next(error);
    }
}