module.exports = smoke;

function smoke(app,smokeModel){
    app.post('/smoke/getData',(req,res)=>{
        var token = req.body.token;

        smokeModel.find({"token":token},(err,model)=>{
            if(err) console.log(err);
            else{
                res.send(model[0]["smoke"]);
            }
        });
    });

    app.post('/smoke/userUpdate',(req,res)=>{
        var token = req.body.token;
        
        smokeModel.find({"token":token},(err,model)=>{
            if(err) console.log(err);
            else{
                var smoke = model[0]["smoke"];
                smoke = smoke+1;

                smokeModel.update({"token":token},{$set:{"smoke":smoke}},(err,model)=>{
                    if(err) console.log(err);
                    else{
                        res.send(200);
                    }
                });
            }
        });
    });
}
