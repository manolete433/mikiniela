var express = require("express");
var router = express.Router();
var passport = require("passport");
const Team = require("../models/team");
var middleware = require("../middleware");

//Teams Index
router.get("/", middleware.isLoggedIn, function (req, res, next) {
    Team.findAll({
        order: [
            ['name', 'ASC']
        ]
    }).then((foundTeams) => {
        res.render("teams/index", {
            teams: foundTeams
        });
    }).catch((error) => {
        res.status(500).send(error);
    })
});

//Teams New
router.get("/new", middleware.isLoggedIn, function (req, res, next) {
    res.render("teams/new");
});

//Teams Create
router.post("/", middleware.isLoggedIn, function (req, res, next) {
    Team.create({
        name: req.body.inputName,
        imageURL: req.body.inputImageURL,
        isActive: req.body.inputIsActive === "on"
    }).then(createdTeam => {
        req.flash("success", "Team " + createdTeam.name + " was successfully created!");
        console.log("/Teams Create " + createdTeam.id);
        res.redirect("/teams");
    }).catch((error) => {
        req.flash("error", "Are you sure the name of the team, or the image URL are not linked to an existing team? " + error.message);
        console.log(error);
        res.status(500);
        res.redirect("/teams");
    });
});

//Team Show
router.get("/:id", middleware.isLoggedIn, function (req, res) {
    Team.findById(req.params.id).then((foundTeam) => {
        if (!foundTeam) {
            console.log("Team with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!!");
        } else {
            res.status(200).render("teams/show", {
                team: foundTeam
            });
        }
    }).catch((error) => {
        req.flash("error", "What the heck? " + error.message);
        console.log(error);
        res.status(500);
        res.redirect("/teams");
    });
});

// Team Edit
router.get("/:id/edit", middleware.isLoggedIn, function (req, res) {
    Team.findById(req.params.id).then((foundTeam) => {
        if (!foundTeam) {
            console.log("Team with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!!");
        } else {
            res.status(200).render("teams/edit", {
                team: foundTeam
            });
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        res.status(500).send(error);
    });
});

//Teams Update
router.put("/:id", middleware.isLoggedIn, function (req, res) {
    Team.findById(req.params.id).then((teamToUpdate) => {
        if (!teamToUpdate) {
            console.log("Team with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!! Team not found");
        } else {
            teamToUpdate.name = req.body.inputName;
            teamToUpdate.imageURL = req.body.inputImageURL;
            teamToUpdate.isActive = req.body.inputIsActive === "on";
            teamToUpdate.save();
            req.flash("success", "Team " + teamToUpdate.name + " successfully updated!");
            console.log("/Teams Update " + teamToUpdate.id);
            // res.status(200);
            res.redirect("/teams");
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        req.flash("error", error);
        res.status(500).send(error);
    });
});

//Team Destroy (deactivate)
router.delete("/:id", middleware.isLoggedIn, function (req, res) {
    Team.findById(req.params.id).then((teamToUpdate) => {
        if (!teamToUpdate) {
            console.log("Team with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!! Team not found");
        } else {
            teamToUpdate.isActive = 0;
            teamToUpdate.save();
            req.flash("success", "Team " + teamToUpdate.name + " was deactivated!");
            //Below line causes issues
            // res.redirect(200, "/teams");
            res.redirect("/teams");

        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        res.status(500).send(error);
    });
});

//Teams Reactivate
router.post("/:id/activate", middleware.isLoggedIn, function (req, res) {
    Team.findById(req.params.id).then((teamToUpdate) => {
        if (!teamToUpdate) {
            console.log("Team with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!! User not found");
        } else {
            // userToUpdate.isAdmin = req.body.inputIsAdmin === "off";
            teamToUpdate.isActive = 1;
            teamToUpdate.save();
            req.flash("success", "Team " + teamToUpdate.name + " was activated!");
            // res.status(200,"/teams");
            res.redirect("/teams");
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        res.status(500).send(error);
    });
});

module.exports = router;