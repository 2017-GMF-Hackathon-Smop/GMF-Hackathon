module.exports = time;

function time(app,userModel,timeModel){
    app.post('/time/userData',(req,res)=>{
        var token = req.query.token;

        timeModel.find({"token":token},(err,model)=>{
            if(err) console.log(err);
            else{
                res.send(model[0]["time"]);
            }
        });
    });

    app.post('/time/userDataUpdate',(req,res)=>{
        if(err) console.log(err);
        else{
            var token = req.body.token;
            timeModel.find({"token":token},(err,model)=>{
                if(err) console.log(err);
                else{
                    var time = model[0]["time"];
                    var replace = time.split('/');
                    
                    replace[2] = replace[2] + 1;
                    if(replace[2] == 30){
                        replace[2] = 0;
                        replace[1] = replace[1] + 1;

                        if(replace[1] == 365){
                            replace[1] = 1;
                            replace[0] = replace[0] + 1;
                        }
                    }

                    time = replace[0] + "/" + replace[1] + "/" + replace[2];
                    timeModel.update({"token":token},{$set:{"time":time}},(err,model)=>{
                        if(err) console.log(err);
                        else{
                            res.send(200);
                        }
                    });
                }
            });
        }
    });
}
