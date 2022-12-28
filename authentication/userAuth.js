const checkUser = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return next();
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    checkUser
};
