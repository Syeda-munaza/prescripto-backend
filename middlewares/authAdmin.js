import jwt from "jsonwebtoken";

//admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken)
      return res
        .status(401)
        .json({ success: false, message: "not Authenticated Login first" });
    const tokenDecode = jwt.verify(atoken, process.env.JWT_SECRET_KEY);
    if (tokenDecode.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(401)
        .json({ success: false, message: "not Authenticated Login first" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};

export default authAdmin;
