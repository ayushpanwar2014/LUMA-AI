import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/Prisma.js";

export const register = async (req, res) => {

    const {username, email, password} = req.body;

    try {
        
        //Hash the password
    
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        
        //Create a new user and save to DB
    
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
    
        console.log(newUser); 
    
        res.status(201).json({message: "User created sucessfully"});

    } catch (error) {

        console.log(error);
        res.status(500).json({message: "Failed to create user"});
        
    }
}

export const login = async (req, res) => {

    const {email, password} = req.body;

    try {
        
        //Check if the User exists  or not

        const user = await prisma.user.findUnique({
            where : {email:email}
        })

        console.log(user);


        if(!user) return res.status(401).json({message : "Invalid credentials!"});

        //Check if the Password is correct

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) return res.status(401).json({message : "Invalid credentials!"});
    
        //Generate cookie token and send to the user

        // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")

        const age =  1000 * 60 * 60 * 24 * 7;  
        
        const token = jwt.sign(
            {
                id : user.id,
                isAdmin: false,
            }, 
             "12encbsb2381bbd&&", 
            {expiresIn: age}
        )

        const {password: userPassword, ...userInfo} = user

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: age,
        }).status(200).json(userInfo)

    } catch (error) {

        console.log(error);
        res.status(500).json({message: "Failed to Login"});
          
    }

}
export const logout = (req, res) => {

    res.clearCookie("token").status(200).json({message : "Logout Successful"}); 

}