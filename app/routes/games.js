var express = require("express");
var router = express.Router();
var passport = require("passport");
const Game = require("../models/game");
const Team = require("../models/team");
var middleware = require("../middleware");

//Games Index
router.get("/", middleware.isLoggedIn, function (req, res, next) {
    var games = []; //to be sent to our index.ejs
    Game.findAll({
        include: [{
                model: Team,
                as: 'awayTeam'
            },
            {
                model: Team,
                as: 'homeTeam'
            }
        ]
    }).then((foundGames) => {
        foundGames.forEach(function (game) {
            games.push({
                'id': game.id,
                'homeTeamName': game.homeTeam.name,
                'awayTeamName': game.awayTeam.name,
                'gameDate': game.gameDate
            });
        });
    }).then(() => {
        res.status(200).render("games/index", {
            games: games
        });
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//games New
router.get("/new", middleware.isLoggedIn, function (req, res, next) {
    Team.findAll({
        order: [
            ['name', 'ASC']
        ]
    }).then((foundTeams) => {
        res.render("games/new", {
            teams: foundTeams
        });
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//games Create
router.post("/", middleware.isLoggedIn, function (req, res, next) {
    Game.create({
        homeTeamId: req.body.selectHomeTeam,
        awayTeamId: req.body.selectAwayTeam,
        gameDate: req.body.inputGameDate
    }).then(createdGame => {
        Game.findById(
            createdGame.id, {
                include: [{
                        model: Team,
                        as: 'awayTeam'
                    },
                    {
                        model: Team,
                        as: 'homeTeam'
                    }
                ]
            }).then(foundGame => {
            req.flash("success", "Game " + foundGame.homeTeam.name + " VS " + foundGame.awayTeam.name + " was successfully created!");
            res.redirect("/games");
        });
    }).catch((error) => {
        //we can use flash to show the error!!!
        req.flash("error", error.message);
        console.log(error);
        res.status(500);
        res.redirect("/games");
        // res.status(500).send(error);
    });
});

//Game Show
router.get("/:id", middleware.isLoggedIn, function (req, res) {
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
    }).then((foundGame) => {
        if (!foundGame) {
            console.log("Game with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!!");
        } else {
            res.status(200).render("games/show", {
                game: foundGame
            });
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        res.status(500).send(error);
    });
});

// Game Edit
router.get("/:id/edit", middleware.isLoggedIn, function (req, res) {
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
    }).then((foundGame) => {
        if (!foundGame) {
            console.log("Game with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!!");
        } else {
            Team.findAll({
                order: [
                    ['name', 'ASC']
                ]
            }).then((foundTeams) => {
                res.status(200).render("games/edit", {
                    game: foundGame,
                    teams: foundTeams
                });
            }).catch((error) => {
                res.status(500).send(error);
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