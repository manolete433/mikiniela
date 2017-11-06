var express = require("express");
var router = express.Router();
var passport = require("passport");
const Game = require("../models/game");
const Team = require("../models/team");
var middleware = require("../middleware");

//Games Index
router.get("/", middleware.isLoggedIn, function (req, res, next) {
    Game.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then((foundGames) => {
        const games = {
            game: []
        };
        foundGames.forEach(function (game) {
            var homeTeamName;
            var awayTeamName;
            Team.findById(parseInt(game.homeTeam)).then((foundHomeTeam) => {
                if (!foundHomeTeam) {
                    console.log("Team with ID: " + game.foundHomeTeam + " not found.");
                } else {
                    //insert the team.name based on foundTeam
                    homeTeamName = foundHomeTeam.name;
                }
            });
            Team.findById(parseInt(game.homeAway)).then((foundAwayTeam) => {
                if (!foundAwayTeam) {
                    console.log("Team with ID: " + game.foundAwayTeam + " not found.");
                } else {
                    //insert the team.name based on foundTeam
                    awayTeamName = foundAwayTeam.name;
                }
            });
            games.game.push({
                "id": game.id,
                "homeTeamName": homeTeamName,
                "awayTeamName": awayTeamName,
                "gameDate": game.gameDate
            });
        });
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
//CONTINUE HERE!!! HAVE TO CREATE ANOTHER TABLE FOR SCORES
router.post("/", middleware.isLoggedIn, function (req, res, next) {
    Game.create({
        homeTeam: req.body.selectHomeTeam,
        awayTeam: req.body.selectAwayTeam,
        gameDate: req.body.inputGameDate
    }).then(createdGame => {
        console.log(createdGame.get({
            plain: true
        }));
        req.flash("success", "Game " + createdGame.homeTeam + " VS " + createdGame.awayTeam + " was successfully created!");
        console.log("/games Create " + createdGame.id);
        res.redirect("/games");
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
    Game.findById(req.params.id).then((foundGame) => {
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
    Game.findById(req.params.id).then((foundGame) => {
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
            // res.status(200).render("games/edit", {
            //     game: foundGame,
            //     teams: foundTeams
            // });
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        res.status(500).send(error);
    });
});

//games Update
router.put("/:id", middleware.isLoggedIn, function (req, res) {
    Game.findById(req.params.id).then((gameToUpdate) => {
        if (!gameToUpdate) {
            console.log("Game with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!! Game not found");
        } else {
            gameToUpdate.homeTeam = req.body.selectHomeTeam;
            gameToUpdate.awayTeam = req.body.selectAwayTeam;
            gameToUpdate.gameDate = req.body.inputGameDate;
            gameToUpdate.save();
            req.flash("success", "Game " + gameToUpdate.homeTeam + " VS " + gameToUpdate.awayTeam + " was successfully updated!");
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
    Game.findById(req.params.id).then((gameToDelete) => {
        if (!gameToDelete) {
            console.log("Game with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!! Game not found");
        } else {
            req.flash("success", "Game " + gameToDelete.homeTeam + " VS " + gameToDelete.awayTeam + " was successfully deleted!");
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