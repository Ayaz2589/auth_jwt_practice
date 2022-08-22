const authRouter = require("express").Router();
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt');

authRouter.post("/signup", [
    check("email", "Please input a valid email").isEmail(),
    check("password", "Please input a password with a min length of 6").isLength({ min: 8 })
], async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if(!errors.length){
        return res.status(404).json({ errors })
    }

    let user = users.find((user) => user.email === email);

    if(user) {
        return res.status(404).json({ error: "This user already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ email, password: hashedPassword });

    const token = await JWT.sign({ email }, "testing123", {expiresIn: 360000});

    res.json({ token })
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    let user = users.find((user) => user.email === email);

    if(!user){
        return res.status(404).json({ error: "Invalid Credentials" })
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(404).json({ error: "Invalid Credentials" })
    }

    const token = await JWT.sign({email}, "test123", {expiresIn: 360000})

    res.json({ token })
})

module.exports = { authRouter }