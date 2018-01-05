var express = require("express");
var router = express.Router();
var passport = require("passport");
const Week = require("../models/week");
const Game = require("../models/game");
const Team = require("../models/team");
var middleware = require("../middleware");
var moment = require('moment');

//Weeks Index
router.get("/", middleware.isLoggedIn, function (req, res, next) {
    Week.findAll().then((foundWeeks) => {
        res.status(200).render("weeks/index", {
            weeks: foundWeeks
        });
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Weeks New
router.get("/new", middleware.isLoggedIn, function (req, res, next) {
    Team.findAll({
        order: [
            ['name', 'ASC']
        ]
    }).then((foundTeams) => {
        res.render("weeks/new", {
            teams: foundTeams
        });
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//weeks Create
router.post("/", middleware.isLoggedIn, function (req, res, next) {
    Week.create({
        name: req.body.inputName,
        startDate: req.body.inputStartDate,
        endDate: req.body.inputEndDate,
        isActive: req.body.inputIsActive === "on"
    }).then(createdWeek => {
        Team.findAll({}).then((foundTeams) => {
            var totalTeams = foundTeams.length;
            for (var i = 0; i < (totalTeams / 2); i++) {
                Game.create({
                    homeTeamId: req.body.selectHomeTeam[i],
                    awayTeamId: req.body.selectAwayTeam[i],
                    gameDate: req.body.inputGameDate[i],
                    weekId: createdWeek.id
                }).catch((error) => {
                    console.log("Error when trying to create games under a week: " + error);
                });
            };
        })
        req.flash("success", "Week " + createdWeek.name + " was successfully created!");
        res.redirect("/weeks");
    }).catch((error) => {
        //we can use flash to show the error!!!
        req.flash("error", error.message);
        console.log(error);
        res.status(500);
        res.redirect("/weeks");
        // res.status(500).send(error);
    });
});

//Week Show
router.get("/:id", middleware.isLoggedIn, function (req, res) {
    Game.findAll({
        where: {
            weekId: req.params.id
        },
        include: [{
                model: Week,
                as: 'week'
            },
            {
                model: Team,
                as: 'awayTeam'
            },
            {
                model: Team,
                as: 'homeTeam'
            }
        ]
    }).then((foundGames) => {
        if (!foundGames) {
            console.log("Week with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!!");
        } else {
            res.status(200).render("weeks/show", {
                                games: foundGames
                                });
        }
    }).catch((error) => {
            //we can use flash to show the error!!!
            res.status(500).send(error);
            });
});

// Game Edit
router.get("/:id/edit", middleware.isLoggedIn, function (req, res) {
    Game.findAll({
        where: {
            weekId: req.params.id
        },
        include: [{
                model: Week,
                as: 'week'
            },
            {
                model: Team,
                as: 'awayTeam'
            },
            {
                model: Team,
                as: 'homeTeam'
            }
        ]
    }).then((foundGames) => {
        if (!foundGames) {
            console.log("Week with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!!");
        } else {
            Team.findAll({}).then((teams) => {
                res.status(200).render("weeks/edit", {
                    moment: moment,
                    games: foundGames,
                    teams: teams
                    });
            });
        }
    }).catch((error) => {
            //we can use flash to show the error!!!
            res.status(500).send(error);
            });
});

//games Update
router.put("/:id", middleware.isLoggedIn, function (req, res) {
    Game.findById(req.params.id, {
        include: [{
                model: Team,
                as: 'awayTeam'
            },
            {
                model: Team,
                as: 'homeTeam'
            }
        ]
    }).then((gameToUpdate) => {
        if (!gameToUpdate) {
            console.log("Game with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!! Game not found");
        } else {
            gameToUpdate.homeTeamId = req.body.selectHomeTeam;
            gameToUpdate.awayTeamId = req.body.selectAwayTeam;
            gameToUpdate.gameDate = req.body.inputGameDate;
            gameToUpdate.save();
            req.flash("success", "Game was successfully updated!");
            console.log("/games Update " + gameToUpdate.id);
            res.status(200);
            res.redirect("/games");
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        req.flash("error", error);
        res.status(500).send(error);
    });
});

//Game Destroy
router.delete("/:id", middleware.isLoggedIn, function (req, res) {
    Game.findById(req.params.id, {
        include: [{
                model: Team,
                as: 'awayTeam'
            },
            {
                model: Team,
                as: 'homeTeam'
            }
        ]
    }).then((gameToDelete) => {
        if (!gameToDelete) {
            console.log("Game with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!! Game not found");
        } else {
            req.flash("success", "Game " + gameToDelete.homeTeam.name + " VS " + gameToDelete.awayTeam.name + " was successfully deleted!");
            gameToDelete.destroy();
            res.status(200);
            res.redirect("/games");
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        res.status(500).send(error);
    });
});

module.exports = router;