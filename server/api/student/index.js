const express = require("express");
const router = express.Router();

// Database imports
const {
    db,
    model: { Campus, Student },
} = require("../../db");

router.get("/", async (req, res, next) => {
    try {
        // Get all campuses
        const allStudents = await Student.findAll({
            include: {
                model: Campus,
            },
        });

        // Return proper status
        if (allStudents.length) {
            res.status(200).send(allStudents);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        // Get individual student with campus joined
        const { id } = req.params;
        const oneStudent = await Student.findOne({
            where: {
                id: id,
            },
            include: {
                model: Campus,
            },
        });

        // Return proper status
        if (oneStudent !== null) {
            res.status(200).send(oneStudent);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;