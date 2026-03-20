const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            message: "Users fetched",
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};

exports.registerUser = async  (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword, role });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    } catch (error) {

        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];

            return res.status(400).json({
                success: false,
                message: `${field} already exists`
            });
        }

        res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};

const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOneAndDelete({ _id: id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: `User with ID ${id} deleted`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {

        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const user = await User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: `User with ID ${id} updated`,
            data: user
        });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];

            return res.status(400).json({
                success: false,
                message: `${field} already exists`
            });
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
}