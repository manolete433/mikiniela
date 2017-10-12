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