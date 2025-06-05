const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("./src/config/passport"); // ✅ Directly import passport instance
const path = require('path');


const app = express();
const port = 3000;
const JWT_SECRET = "s6sd7d7f7d8f9gd66fdg78df786df78g"

// Middleware
app.use(express.json());
app.use(cors());

// Session configuration
app.use(
  session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// app.use("/", (req, res) => {
//   res.send("API is running...");
// });

// API Routes
app.use('/uploads/dogs', express.static(path.join(__dirname, './uploads/dogs')));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/breeds", require("./src/routes/breedRoutes"));
app.use("/api/stud-certificates", require("./src/routes/studCertificationRoutes"));
app.use("/api/country", require("./src/routes/countryRoutes"));
app.use("/api/dog", require("./src/routes/dogRoutes"));
app.use("/api/litter", require("./src/routes/litterRoutes"));
app.use("/api/litter-detail", require("./src/routes/litterDetailRoutes"));
app.use("/api/cities", require("./src/routes/cityRoutes"));
app.use('/api/line', require("./src/routes/linebreedingRoutes"));
app.use('/api/dashboard', require("./src/routes/dashboardRoutes"));
app.use('/api/microchip', require("./src/routes/microchipRoutes"));
app.use('/api/vaccinations', require("./src/routes/vaccinationRoutes"));
app.use("/api/training", require("./src/routes/trainingRoutes"));
app.use("/api/prophylaxis", require("./src/routes/prophylaxisRoutes"));
app.use("/api/deworming", require("./src/routes/dewormingRoutes"));
app.use("/api/sickness", require("./src/routes/sicknessRoutes"));


////////////////////////////

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});


