// res.render("landing");
    db.getConnection(function(err, tempCon){
        if(err){
            tempCon.release();
            console.log(err);
        }else{
            let sql = "SELECT * FROM users";
            tempCon.query(sql, function(err, rows, fields){
                tempCon.release();
                if(err){
                    console.log("Error in the query " + err);
                }else{
                    console.log("No errors in the query");
                    res.json(rows);
                }
            });
        };
    });

JQUERY VALIDATION
https://jsfiddle.net/elektriheart/vwoojkob/
jsfiddle.net
Bootstrap jQuery Validation - JSFiddle
Test your JavaScript, CSS, HTML or CoffeeScript online with JSFiddle code editor.


[11:23] 
http://jsfiddle.net/sTDcF/8/


passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findAll({
            where: {
                username: username
            }
        }).then(foundUser => {
            if (foundUser.length === 0) {
                return done(null, false);
            } else {
                const hashedPassword = foundUser[0].password.toString();
                bcrypt.compare(password, hashedPassword, function (error, response) {
                    if (response === true) {
                        console.log(foundUser[0].id);
                        return done(null, {
                            user: foundUser[0]
                        });
                    } else {
                        console.log(foundUser[0].username + " didn't enter the right password")
                        return done(null, false);
                    }
                });
            }
        }).catch((error) => {
            //we can use flash to show the error!!!
            res.status(500).send(error);
        });
    }
));