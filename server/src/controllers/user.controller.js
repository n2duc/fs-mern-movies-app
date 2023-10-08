import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandller from "../handllers/response.handller.js";

const signup = async (req, res) => {
    try {
        const { username, password, displayName } = req.body;

        const checkUser = await userModel.findOne({ username });
        if (checkUser) return responseHandller.badrequest(res, "username already used");

        const user = new userModel();
        user.displayName = displayName;
        user.username = username;
        user.setPassword(password);

        await user.save();

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        );

        responseHandller.created(res, {
            token,
            ...user._doc,
            id: user.id
        });
    } catch {
        responseHandller.error(res);
    }
}

const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username }).select("username password salt id displayName");
        if (!user) return responseHandller.badrequest(res, "User not exist");

        if (!user.validPassword(password)) return responseHandller.badrequest(res, "Wrong password");

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        );

        user.password = undefined;
        user.salt = undefined;

        responseHandller.created(res, {
            token,
            ...user._doc,
            id: user.id
        });

    } catch {
        responseHandller.error(res);
    }
};

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        const user = await userModel.findById(req.user.id).select("password is salt");
        
        if (!user) return responseHandller.unauthorize(res);
        if (!user.validPassword(password)) return responseHandller.badrequest(res, "Wrong password");

        user.setPassword(newPassword);

        await user.save();
        responseHandller.oke(res);
    } catch {
        responseHandller.error(res);
    }
};

const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) return responseHandller.notfound(res);
        
        responseHandller.oke(res, user);
    } catch {
        responseHandller.error(res);
    }
};

export default {
    signup,
    signin,
    updatePassword,
    getInfo
}