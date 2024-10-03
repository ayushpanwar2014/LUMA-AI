import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Not Authenticate!" });

    jwt.verify(token, "12encbsb2381bbd&&", async (err, payload) => {

        if (err) return res.status(403).json({ message: "Token is not Valid!" });

        req.userId = payload.id;

        next();
    })

}