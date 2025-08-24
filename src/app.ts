import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import expressSession from "express-session";
import passport from "passport";
import { envVars } from "./app/config/env";
import "./app/config/passport";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";
import path from "path";

const app = express();

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: envVars.FRONT_END_URL,
    credentials: true, 
  })
);

app.use("/api/w1", router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/welcome.html"));
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
