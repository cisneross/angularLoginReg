var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');

module.exports = {
    //methods
    //creating an new user
    // schema.pre('save', function(next) {
    //     // do stuff
    //     next();
    //   });
    register: function(req,res){
        bcrypt.hash(req.body.password,10,function(err,hash){
            if (err){
                console.log('something went wrong', err)
                res.json(err);
            }
            else{
                //var hashedpw = hash;     can say this way tooooo
                req.body.password = hash;
                var newUser = new User(req.body);
                newUser.save(function(err){
                    if(err){
                        console.log('Validation erroswhen creating user', err);
                        res.json(err);
                    }
                    else{
                        console.log('registered a new user',newUser);
                        // If i want 
                        req.session.userId = newUser._id;
                        res.json(newUser);
                    }
                })
            }
        })
    },
    login: function(req,res){
        //1.query db for user
        console.log('got to server',req.body.email);
        User.findOne({email: req.body.email}, function(err,foundUser){
            console.log('line 41');
            if (foundUser){
                console.log('line 43');
                console.log(foundUser);
                console.log(req.body.password);
                console.log(foundUser.password);
                res.json("Found it")
                bcrypt.compare(req.body.password, foundUser.password, function(result){
                    console.log("res in bcrypt", result);
                    if(result){
                        console.log('passwords match');
                        req.session.userId = foundUser._id;
                        res.json({message:"login succesful!"}, result); 
                    }
                })
            }
            else{
                res.json({error: 'login invalid'});
            }
        })
    },

    get_current: function(req,res){
        if (req.session.userId != undefined){
            User.findOne({_id: req.session.userId}, function(err, user){
                if(err){
                    console.log('How???');
                    res.json(err);
                }
                else{
                    console.log('got current user');
                    res.json({email:user.email, _id:user._id});
                }
            })
        }
        else{
            res.json({error: 'You are not authorized'});
        }
    }
}