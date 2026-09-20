export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE, 10) || 7;

  res.status(statusCode).cookie(cookieName, token, {
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  }).json({
    success: true,
    message,
    user,
    token,
  });
};