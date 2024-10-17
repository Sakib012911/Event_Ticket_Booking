const express = require("express");
const router = express.Router();
const userModel = require("../model/user")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');

// creating user http://localhost:5500/api/user/createuser
// it looks like router.post("/createuser", [to check value] , async (req, res) => {

router.post("/createuser", [body('name', "Enter a valid name").isLength({ min: 1 }),body('email', "Enter a valid email").isEmail(),
body('password', "Password must be atleast 5 character").isLength({ min: 1 }),body('rolee',"role is mandatory").isLength({min:1})], async (req, res) => {
let sucess=false
    //    if error in body value
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json({sucess, error: error.array()});
    }

    // inserting value in database and checking user in already exists or not
    try {
        let { name, email, password, rolee} = req.body;
        // checking user exists or not
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({sucess,error:"User is already exists with this email",message:"User is already exists with this email"});
        }

        // Genreating hash for password by adding salt 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {

                // Store  data and hash in your password field 
             const  user = await userModel.create({
                    name,
                    email,
                    password: hash,
                    role:rolee
                })
                const id=user._id.toString();
                let role=user.role;
                var token = jwt.sign(id, 'sultanbhai');
                sucess=true;
                res.status(200).json({sucess,role,token})
            });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({sucess,error:"internal server error",message:"SOMETHING WENT WRONG"})
    }
})

// ****************************************************************************************

// user login http://localhost:5500/api/user/login
router.post("/login", [body('email', "Enter a valid email").isEmail(), body('password', "Password cannot be blank").exists().isLength({min:1})], async (req, res) => {
    //    if error in body value
    let sucess=false;
    const error = validationResult(req);       //Result { formatter: [Function: formatter], errors: [] }
    if (!error.isEmpty()) {
        return res.json({sucess,error: error.array(),message:"INVALID INPUT" });
    }

    let { email, password } = req.body;

    try {
        // fetching user data by using their email
        let user = await userModel.findOne({ email });

        // checking user is in database or not
        if (!user) {
          return  res.status(404).json({sucess,error: " user NOT found",message:"TRY AGAIN"})
        }

        // comparing pasword with database password
        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
               return res.status(401).json({sucess,error: "please login with correct cridentials",message:"WRONG CREDENTIALS"})
            }
            const id=user._id.toString();
            let role=user.role;
            const token = jwt.sign(id, "sultanbhai");
            sucess=true;
            res.status(200).json({sucess,token,role});
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({sucess,error:"Internal server error",message:"SOMETHING WENT WRONG"})
    }
})









module.exports = router;