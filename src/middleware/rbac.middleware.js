const { errorResponse } = require('../helpers/response.helper');
const logger = require('../helpers/logger');

// const rbacMiddleware = (roles) => {
//     return (req, res, next) => {
//         logger.info(`Requested user roles: ${req.user.role}`);
//         if (roles.includes(req.user.role)) {
//             console.log('User:', req.user);

//             next();
//         } else {
//            return errorResponse(res, 'You do not have permission to access the resource', 403); 
//         } // not set data after login with token (check)
//     };
// };

const rbacMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return errorResponse(res, 'Unauthorized', 401);
        }

        const userRole = req.user.role.toUpperCase();
        logger.info(`Checking access for role: ${userRole}`);

        if (roles.includes(userRole)) {
            return next();
        }

        return errorResponse(res, 'You do not have permission to access the resource', 403); 
    };
};


module.exports = rbacMiddleware;