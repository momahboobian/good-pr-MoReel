import { timingSafeEqual } from "crypto";

export const sudo = (req, res, next) => {
  const sudoToken = Buffer.from(process.env.SUDO_TOKEN);
  const header = req.headers.authorization;
  const headerToken = header?.startsWith("Bearer ") ? header.slice(7) : "";

  const isAuthorized = timingSafeEqual(
    sudoToken,
    Buffer.alloc(sudoToken.length, headerToken)
  );

  if (isAuthorized) {
    next();
  } else {
    console.log("Authorization failed");
    console.log("Expected token:", sudoToken.toString());
    console.log("Provided token:", headerToken);
    res.status(403).json({ error: "Unauthorized" });
  }
};
