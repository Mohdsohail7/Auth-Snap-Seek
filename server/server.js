const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const passport = require("passport");
const session = require('express-session');
const MongoStore = require("connect-mongo");
require("dotenv").config();
require("./config/passport")(passport);


// Import route files
const authProvidersRoutes = require("./routes/authProviders");
const authUserRoutes = require("./routes/authUser");
const searchRoutes = require("./routes/searchRoutes");

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "https://auth-snap-seek.vercel.app",
  credentials: true
}));
app.use(express.json());

app.set('trust proxy', 1);

// Session + Passport setup
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    httpOnly: true,
    secure: true, 
    sameSite: "none", 
    maxAge: 1000 * 60 * 60 * 24
  }
}));
app.use(passport.initialize());
app.use(passport.session());

//Mount all routes
app.use("/auth", authProvidersRoutes); // Google/GitHub/Facebook OAuth
app.use("/auth", authUserRoutes);      // /auth/me, /auth/logout
app.use("/api", searchRoutes);

// default route
app.get("/", (req, res) => {
  res.json({ message: "APP is running..." });
});

const port = process.env.PORT

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    })
})