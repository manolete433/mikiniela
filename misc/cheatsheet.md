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
    