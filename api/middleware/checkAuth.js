const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token')

    if(!token){
        res.status(404).json({ error: "No Token Found" });
    }

    try {
        const user = await jwt.verify(token, "test123");
        req.user = user.email
        next()
    } catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
    
}