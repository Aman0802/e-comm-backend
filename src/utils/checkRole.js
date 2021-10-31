exports.checkRole = (...roles) => (req, res, next) => {
    const { user } = req;
    if(user && roles.includes(user.role)) {
        return next();
    }

    return res.status(400).send({
        status: false,
        code: 400,
        message: "Not authorised."
    });
};