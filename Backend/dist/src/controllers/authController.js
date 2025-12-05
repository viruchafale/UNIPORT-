import User from '../models/User.js';
// @ts-ignore
import { hashPassword, comparePassword } from "../services/hashService.js";
// @ts-ignore
import { generateToken, generateToken1 } from "../services/jwtService.js";
// Register user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "user already exists" });
        }
        const hashedPassword = await hashPassword(password);
        const user = new User({ name, email, password: hashedPassword });
        user.save();
        res.status(201).json({ message: "user register succesfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ email, password });
        // const user= await User.findOne({email})
        // if (!user){
        //   res.status(400).json({message:"user not exists"})
        // }
        // const isMatch=await comparePassword(password,user.password)
        // if (!isMatch){
        //   res.status(400).json({message:"Invalid email or password"})
        // }
        const token = generateToken({ id: "user._id", email: "user.email" });
        const token1 = generateToken1({ id: "user._id", email: "user.email" });
        res.json({ message: "Login successful!", token, token1 });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
// Protected profile route
export const profile = (req, res) => {
    // req.user is set by auth middleware after token verification
    res.json({
        message: "Welcome to your profile!",
        // user: req.user, // Type definition for req.user needed
    });
};
//# sourceMappingURL=authController.js.map