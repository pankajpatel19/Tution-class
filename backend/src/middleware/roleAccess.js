export const roleAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError("Unauthorized", 401);
    }
    next();
  };
};
