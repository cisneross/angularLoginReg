var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
//fields
email:{type:String, required: [true, "Email is required"],unique: [true, "Email already exist"],minlength: [6,"Email must be at least 4 characters long"]},
password:{type: String, required: [true, "Password is requireed"], minlength: [6,"Password must be at least 6 characters long"]},
}, {timestamps:true});

mongoose.model('User', UserSchema);