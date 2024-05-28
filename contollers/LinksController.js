import linkModel from '../models/links.js'
import Users from '../models/users.js';
import requestIp from 'request-ip'; 

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
        const { id } = req.params;

        try {
            const link = await linkModel.findById(id);
            if (!link) {
                return res.status(404).json({ message: 'Link not found' });
            }
    
            const targetParamName = link.targetParamName;
            const targetParamValue = req.query[targetParamName];

            const click = {
                insertedAt: new Date(),
                ipAddress: req.ip,
                targetParamValue: targetParamValue || ''
            };
            link.clicks.push(click);
            await link.save();
    
            res.redirect(link.originalUrl);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getLinkClicksBySource: async (req, res) => {
        const { id } = req.params;
    
        try {
            const link = await linkModel.findById(id);
            if (!link) {
                return res.status(404).json({ message: 'Link not found' });
            }
    
            const clicks = link.clicks;
            const clicksBySource = {};
    
            link.targetValues.forEach((source) => {
                clicksBySource[source.name] = clicks.filter((click) => click.targetParamValue === source.value).length;
            });
    
            res.status(200).json(clicksBySource);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    addLink: async (req, res) => {
        const { userId, originalUrl, clicks, targetParamName, targetValues } = req.body;

        try {
            const newLink = new linkModel({
                originalUrl,
                clicks: clicks || [],
                targetParamName: targetParamName || '',
                targetValues: targetValues || []
            });
            await newLink.save();
    
            const user = await Users.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.links.push(newLink._id);
            await user.save();
    
            res.status(201).json({
                message: 'Link created successfully',
                shortUrl: `http://localhost:8787/links/${newLink._id}?t=VALUE`
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
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
