import userModel from "../models/users.js";

const UsersController = {
    getUsers: async (req, res) => {
        try {
            const users = await userModel.find();
            res.send(users);
        } catch (error) {
            console.error("Error retrieving users:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    getById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userModel.findById(userId);
            if (user) {
                res.send(user);
            } else {
                res.status(404).send("User not found");
            }
        } catch (error) {
            console.error("Error retrieving user by ID:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    addUser: async (req, res) => {
        try {
            const body = req.body;
            const newUser = new userModel(body);
            await newUser.save();
            res.status(200).json({ success: true });
        } catch (error) {
            console.error("Error adding user data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const userData = req.body;
            await userModel.findByIdAndUpdate(userId, userData);
            res.status(200).send("User data updated successfully!");
        } catch (error) {
            console.error("Error updating user data:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            await userModel.findByIdAndDelete(userId);
            res.status(200).send("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).send("Internal Server Error");
        }
    }
};

export default UsersController;