module.exports = friend;

function friend(app,userModel){
    
    app.post('/friends/friendsSave',(req,res)=>{
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

    app.get('/friends/friendsList',(err,model)=>{
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

    app.get('/friends/friendsData',(req,res)=>{
        var name = req.query.name;

        userModel.find({"name":name},(err,model)=>{
            if(err) console.log(err);
            else{
                res.send(model); 
            }
        });
    });
}

