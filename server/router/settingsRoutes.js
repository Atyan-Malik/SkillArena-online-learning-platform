import express from "express";
import Settings from "../model/settings.js"

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


router.put("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        req.body,
        { new: true }
      );
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Update Failed" });
  }
});

export default router;
