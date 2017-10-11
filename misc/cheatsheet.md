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
    


    req.check("inputFirstName", "Name is invalid").notEmpty();
    req.check("inputLastName", "Last Name is invalid").notEmpty();
    req.check("inputUsername", "Username is invalid").notEmpty();
    req.check("inputEmail", "Email is invalid").isEmail();
    req.check("inputPassword", "Password is invalid").isLength({min: 4});
    req.check("inputPasswordConfirm", "Password didn't match").equals("inputPassword");

    if(errors){
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('back');
    }else{
        req.session.success = true;