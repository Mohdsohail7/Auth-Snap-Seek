const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();


// Import route files
const authProvidersRoutes = require("./routes/authProviders");
const authUserRoutes = require("./routes/authUser");
const searchRoutes = require("./routes/searchRoutes");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session + Passport setup
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Mount all routes
app.use("/auth", authProvidersRoutes); // Google/GitHub/Facebook OAuth
app.use("/auth", authUserRoutes);      // /auth/me, /auth/logout
app.use("/api", searchRoutes);

// default route
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

const port = process.env.PORT

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    })
})