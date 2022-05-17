const jwt = require('jsonwebtoken');

const isAllowedUserType = (allowedUserType, role) => {
    // eslint-disable-next-line max-len
    allowedUserType = Array.isArray(allowedUserType) ? allowedUserType : [allowedUserType];
    return allowedUserType
        .map((allowedUserType) => allowedUserType.toUpperCase())
        .includes(role.toUpperCase());
};

module.exports =
    // eslint-disable-next-line space-before-function-paren
    ({ allowedUserType }) => async(req, res, next) => {
        // get auth header value
        const bearerHeader = req.headers['authorization'];
        // check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // get token from array
            const bearerToken = bearer[1];
            // set token
            req.token = bearerToken;
            // next middleware
            // eslint-disable-next-line max-len
            jwt.verify(req.token, process.env.JWT_SECRET_TOKEN, function(err, result) {
                if (err) {
                    return res.status(401).json({
                        status: false,
                        error: 'Unauthorised request',
                    });
                }
                req.user = result.user;
                req.userType = result.user.userType;
                if (req.userType) {
                    console.log(allowedUserType, req.userType);
                    if (isAllowedUserType(allowedUserType, req.userType)) {
                        next();
                    } else {
                        return res
                            .status(401)
                            // eslint-disable-next-line max-len
                            .errorMessage('You are not authorized to perform this action');
                    }
                } else {
                    return res
                        .status(401)
                        // eslint-disable-next-line max-len
                        .errorMessage('You are not authorized to perform this action');
                }
            });
        } else {
            // return res.sendStatus(403);
            return res.status(401).json({
                status: false,
                error: 'Unauthorised request',
            });
        }
    };