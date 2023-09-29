import jsonwebtoken from "jsonwebtoken";
import responseHandller from "../handllers/response.handller.js";
import useModel from "../models/user.model.js";

const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers["authorization"]
        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1];
            return jsonwebtoken.verify(
                token,
                process.env.TOKEN_SECRET
            )
        }
        return false;
    } catch {
        return false;
    }
};

const auth = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);

    if (!tokenDecode) return responseHandller.unauthorize(res);

    const user = await useModel.findById(tokenDecoded.data);
    if (!user) return responseHandller.unauthorize(res);

    res.user = user;
    next();
}

export default { auth, tokenDecode };