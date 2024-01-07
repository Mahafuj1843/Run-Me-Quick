import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { createError } from "../utils/error.js"

export const register = async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.email || !req.body.password)
            return next(createError(401, "Please fill the all requried fields."));
        else if (req.body.password.length < 6 || req.body.password.length > 12)
            return next(createError(401, "Password must be 6 to 12 characters."));
        else {
            const user = await User.findOne({ email: req.body.email })
            if (user) return next(createError(400, "Email has already been registered."));
            else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })
            await newUser.save();
            res.status(201).send("Registration successfull.")
            }
        }
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "User not found!"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or email!"))

        const token = jwt.sign({ id: user._id }, process.env.JWT)

        const { password, createdAt, updatedAt, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 86400) }).status(200).json({ token: token, data: {...otherDetails} })
    } catch (err) {
        next(err)
    }
}

export const profileDetails = async (req, res, next) => {
    try {
        const userProfile = await User.findById(req.user.id,{ _id:0,password:0,createdAt:0,updatedAt:0});
        res.status(200).json({ data: userProfile })
    } catch (err) {
        next(err);
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const updateProfile = await User.findByIdAndUpdate(
            req.user.id,
            { $set: req.body },
            { new: true });
        const { _id,password, updatedAt, createdAt, ...otherDetails } = updateProfile._doc;
        res.status(200).json({ data: {...otherDetails}})
    } catch (err) {
        next(err);
    }
}

export const logout = async (req, res, next) => {
    try {
        res.cookie("access_token", "", { httpOnly: true, expires: new Date(Date.now()) }).status(200).send("Logout successfully.")
    } catch (err) {
        next(err)
    }
}