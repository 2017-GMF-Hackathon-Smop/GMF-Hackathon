module.exports = friends;

function friends(app,userModel){
    
    app.post('/friendsSave',(req,res)=>{
        var token = req.body.token;
        var friends = req.body.friends;

        userModel.find({"token":token},(err,model)=>{
            if(err) console.log(err);
            else{
                var friendsArray = model[0]["friends"];
                var num = friendsArray.length + 1;
                friendsArray[num] = friends;
                
                userModel.update({"friends":model[0]["friends"]},{$set:{"friends":friendsAsrray}},(err,model)=>{
                    if(err) console.log(err);
                    else{
                        res.send(200);
                    }
                });
            }
        });

    });

    app.get('/friendsList',(err,model)=>{
        if(err) console.log(err);
        else{
            var token = req.query.token;

            userModel.find({"token":token},(err,model)=>{
                if(err) console.log(err);
                else{
                    res.send(model);
                }
            });
        }
    }); 

}
