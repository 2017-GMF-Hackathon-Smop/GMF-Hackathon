module.exports = graph;

function graph(app,userModel,graphModel,allModel){
    app.get('/graph/graph',(req,res)=>{
        graphModel.find({},(err,model)=>{
            if(err) console.log(err);
            else{
                res.send(model);
            }
        });
    });

    app.post('/graph/userData',(req,res)=>{
        var token = req.body.token;

        graphModel.find({"token":token},(err,model)=>{
            if(err) console.log(err);
            else{
                res.send(model);
            }
        });
    });

    app.post('/graph/updateUserData',(req,res)=>{
        var token = req.body.token;
        var graphData = req.body.graphData;
        
        if(err) console.log(err);
        else{
            graphModel.find({"token":token},(err,model)=>{
                var arr = model[0]["graph"];
                var save = new Array;
                var length = arr.length + 1;

                save = arr;
                save[length] = graphData;

                graphModel.update({"token":token},{$set:{"graph":save}},(err,ShangusModel)=>{
                    if(err) console.log(err);
                    else{
                        allModel.find({},(err,aModel)=>{
                            if(err) console.log(err);
                            else{
                                var allArr = aModel[0]["graph"];
                                var allSave = allArr;
                                var allLength = allArr.length + 1;

                                allSave[allLength] = graphData;

                                allModel.update({},{$set:{"graph":allSave}},(err,shangus)=>{
                                    if(err) console.log(err);
                                    else{
                                        res.send(200);
                                    }
                                });
                            }
                        })
                    }
                }); 
            });
        }
    });
}
