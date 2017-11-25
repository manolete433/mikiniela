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
//CONTINUE HERE!!!!!!!!!!!
router.post("/", middleware.isLoggedIn, function (req, res, next) {
    console.log("console.log(req.body.inputImageURL);" + req.body.inputImageURL);
    Team.create({
        name: req.body.inputName,
        imageURL: req.body.inputImageURL
    }).then(createdTeam => {
        req.flash("success", "Team " + createdTeam.name  + " was successfully created!");
        console.log("/Teams Create " + createdTeam.id);
        res.redirect("/teams");
    }).catch((error) => {
        //we can use flash to show the error!!!
        req.flash("error", "Are you sure the name of the team, or the image URL are not linked to an existing team? " + error.message );
        console.log(error);
        res.status(500);
        res.redirect("/teams");
        // res.status(500).send(error);
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
        //we can use flash to show the error!!!
        res.status(500).send(error);
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
            res.status(200);
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
            res.status(200);
            res.redirect("/teams");
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        res.status(500).send(error);
    });
});

//Teams Reactivate
router.post("/:id/activate", middleware.isLoggedIn, function(req, res){
    Team.findById(req.params.id).then((teamToUpdate) => {
        if (!teamToUpdate) {
            console.log("Team with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!! User not found");
        } else {
            // userToUpdate.isAdmin = req.body.inputIsAdmin === "off";
            teamToUpdate.isActive = 1;
            teamToUpdate.save();
            res.status(200);
            res.redirect("/teams");
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        res.status(500).send(error);
    });
});

module.exports = router;