import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.acess_token;
  if (!token) {
    return res.json({ message: "unauthenticated" });
  }
  jwt.verify(token, process.env.JWT),
    (err, user) => {
      if (err) {
        return res.json({ message: "Token invalid" });
      }
      req.user = user;
      next();
    };
};
