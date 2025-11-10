import httpStatus from 'http-status';
import { User } from '../models/user.model.js';
import bcrypt, { hash } from "bcrypt"


const register = async (req, res) => {
    const { name, email, password } = req.body;


    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User Registered" })

    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }

}