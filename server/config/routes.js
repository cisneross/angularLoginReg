var spots = require('./../controllers/spots.js');
var path = require('path');
module.exports = function(app){
    //routes
    app.post('/createuser', spots.register);
    app.post('/loguser', spots.login);
    app.get('/currentuser', spots.get_current);

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
      });
}