const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// Configure Handlebars
app.engine(
    "hbs",
    exphbs.engine({
        extname: "hbs",
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// MongoDB Connection
mongoose.connect("mongodb+srv://solankisarvesh18:K4upvJmBF8HFMn78@projectcluster.yhvn6.mongodb.net/")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
    res.render("home", { title: "Welcome to Home" });
});

// User Schema and Model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    orders: { type: Array, default: [] }, // Orders for the user
    cart: { type: Array, default: [] },   // Cart items for the user
});

const User = mongoose.model("User", userSchema);
module.exports = User;



// Sign Up Route
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: "Email already registered" });
        } else {
            res.status(500).json({ error: "Error registering user" });
        }
    }
});

// Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).json({
                message: "Login successful!",
                email: user.email,
            });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Error during login" });
    }
});

// Save Orders Route
app.get("/orders", async (req, res) => {
    try {
        const email = req.query.email; // Retrieve email from query parameters

        // Find the user and return their orders
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ orders: user.orders }); // Return the user's orders
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ error: "Error fetching orders" });
    }
});


app.post("/orders", async (req, res) => {
    try {
        const { email, items } = req.body; // Get email and items from the request body

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Save the orders for the user in MongoDB
        user.orders.push({ items, date: new Date() }); // You can also add a date for the order
        await user.save();

        res.status(200).json({ message: "Order placed successfully!" });
    } catch (err) {
        console.error("Error saving orders:", err);
        res.status(500).json({ error: "Error saving orders" });
    }
});


// cart
app.get("/cart", async (req, res) => {
    try {
        const email = req.query.email; // Get the user's email from query parameters
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ cart: user.cart || [] });
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ error: "Error fetching cart" });
    }
});



app.post("/cart", async (req, res) => {
    try {
        const { email, cart } = req.body; // Get the email and cart data from the request body
        if (!email || !Array.isArray(cart)) {
            return res.status(400).json({ error: "Email and valid cart data are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        user.cart = cart;  // Update the user's cart field
        await user.save();  // Save the updated user document in MongoDB

        res.status(200).json({ message: "Cart updated successfully!" });
    } catch (err) {
        console.error("Error updating cart:", err);
        res.status(500).json({ error: "Error updating cart." });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
