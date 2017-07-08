module.exports = facebookAuth;

function facebookAuth(app,userModel,passport){

    app.get('/facebookAuth',passport.authenticate('facebook',{
        authType:'request',scope:['public_profile','email']
    }));

    app.get('/facebookAuth/callback',passport.authenticate('facebook',{
        failureRedirect:'/facebookAuth/loginFail'}),
        function(req,res){
            res.redirect('/');
        }
    );
    
    app.get('/facebookAuth/loginFail',(req,res)=>{
        res.send(404);
    });

}
