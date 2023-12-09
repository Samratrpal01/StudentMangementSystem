const jwt=require("jsonwebtoken");
const SECRET_KEY="RESULTMANAGEMENT";
const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            console.log("Auth session token: " + token);
            
            if (token === req.session.token) {
                next();
            } else {
                res.redirect('/');
                res.status(401).json({ message: "Unauthorized User" });
                
               
            }
        } else {
            res.redirect('/');
            res.status(401).json({ message: "Unauthorized User" });
            
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized User" });
       
    }
};

module.exports = auth;