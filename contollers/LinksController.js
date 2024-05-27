import linkModel from '../models/links.js'

const LinksController = {
    getLinks: async (req, res) => {
        try {
            const links = await linkModel.find();
            res.send(links);
        } catch (error) {
            console.error("Error retrieving users:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    getById: async (req, res) => {
        try {
            const linkId = req.params.id;
            const link = await linkModel.findById(linkId);
            if (link) {
                res.send(link);
            } else {
                res.status(404).send("Link not found");
            }
        } catch (error) {
            console.error("Error retrieving link by ID:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    addLink: async (req, res) => {
        try {
            const body = req.body;
            const newLink = new linkModel(body);
            await newLink.save();
            res.status(200).json({ success: true });
        } catch (error) {
            console.error("Error adding user data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    updateLink: async (req, res) => {
        try {
            const linkId = req.params.id;
            const linkData = req.body;
            await linkModel.findByIdAndUpdate(linkId, linkData);
            res.status(200).send("User data updated successfully!");
        } catch (error) {
            console.error("Error updating user data:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    deleteLink: async (req, res) => {
        try {
            const linkId = req.params.id;
            await linkModel.findByIdAndDelete(linkId);
            res.status(200).send("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).send("Internal Server Error");
        }
    }
};

export default LinksController;
