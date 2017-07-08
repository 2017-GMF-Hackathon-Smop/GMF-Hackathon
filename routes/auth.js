module.exports = auth;

function auth(app , userModel,randomstring){
    app.post('/auth/userSignup',(req,res)=>{
        var name = req.body.name;
        var age = req.body.name;
        var password = req.body.password;
        var email = req.body.email;

        var token = randomstring.generate();

        var saveModel = new userModel({"name":name,"age":age,"password":password,"email":email,"token":token});
    
        saveModel.save((err,model)=>{
            if(err) console.log(err);
            else{
                res.send(200);
            }
        });
    });

    app.post('/auth/userLogin',(req,res)=>{
        var email = req.body.email;
        var password = req.body.password;
        
        userModel.find({"email":email,"password":password},(err,model)=>{
            if(err) console.log(err);
            else{
                var token = model[0]["token"];
                req.session.token = token;
                res.send(token);
            }
        });
    });
}
