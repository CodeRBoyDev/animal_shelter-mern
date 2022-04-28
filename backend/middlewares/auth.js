const expressJwt = require('express-jwt');




exports.isAuthenticatedUser = (...roles) => {


    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret: 'THEQUICKBROWNFOX', algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: `Role (${req.user.role}) is not allowed to acccess this resource` });
            }

            // authentication and authorization successful
            next();
        }
    ];
}

// exports.isAuthenticatedUser = expressJwt({
//    secret: 'THEQUICKBROWNFOX',
//     algorithms: ["HS256"], // added later
//     userProperty: "auth",
// });

// // Handling users roles
// exports.authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return next(
//                 new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
//         }
//         next()
//     }
// }
