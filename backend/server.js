//server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the Images directory
app.use("/images", express.static(path.join(__dirname, "Images")));

mongoose
    .connect("mongodb://localhost:27017/food-delivery-app", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log("Error connecting to db", err));

const restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    menu: [
        {
            name: String,
            price: Number,
            image: String,
        },
    ],
    rating: Number,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Define the PreviousOrder schema
const previousOrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    dateOfOrder: { type: Date, required: true },
    amount: { type: Number, required: true },
});

const PreviousOrder = mongoose.model("PreviousOrder", previousOrderSchema);

// Seed initial data
const seedData = [
    {
        name: "Italian Delight",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004646/file.jpg",
        menu: [
            {
                name: "Pasta Alfredo",
                price: 10,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004646/file.jpg",
            },
            {
                name: "Margherita Pizza",
                price: 15,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004646/file.jpg",
            },
            {
                name: "Chicken Parmesan",
                price: 20,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004646/file.jpg",
            },
        ],
        rating: 4.5,
    },
    {
        name: "Seafood Paradise",
        image:
            "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
        menu: [
            {
                name: "Grilled Salmon",
                price: 12,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Lobster Bisque",
                price: 18,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Shrimp Scampi",
                price: 25,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
        ],
        rating: 3.8,
    },
    {
        name: "Vegetarian Haven",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
        menu: [
            {
                name: "Quinoa Salad",
                price: 8,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Eggplant Parmesan",
                price: 12,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Mushroom Risotto",
                price: 16,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
        ],
        rating: 4.2,
    },
    {
        name: "Sizzling Steakhouse",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
        menu: [
            {
                name: "Filet Mignon",
                price: 22,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "New York Strip",
                price: 18,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Ribeye Steak",
                price: 25,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
        ],
        rating: 4.7,
    },
    {
        name: "Asian Fusion",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
        menu: [
            {
                name: "Sushi Platter",
                price: 20,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Pad Thai",
                price: 15,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Mongolian Beef",
                price: 18,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
        ],
        rating: 4.0,
    },
];

const seedDatabase = async () => {
    try {
        await Restaurant.deleteMany(); // Clear existing data
        await Restaurant.insertMany(seedData);
        console.log("Database seeded successfully.");
    } catch (error) {
        console.error("Error seeding the database:", error.message);
    }
};

// Seed data when the server starts
seedDatabase();

// Insert dummy data when the server starts
const insertDummyData = async () => {
    try {
        const existingOrders = await PreviousOrder.find();

        // Insert dummy data only if the database is empty
        if (existingOrders.length === 0) {
            const dummyOrders = [
                { orderId: "001", dateOfOrder: new Date(), amount: 30 },
                { orderId: "002", dateOfOrder: new Date(), amount: 45 },
                // Add more dummy orders as needed
            ];

            await PreviousOrder.insertMany(dummyOrders);
            console.log("Dummy data inserted successfully!");
        }
    } catch (error) {
        console.error("Error inserting dummy data:", error);
    }
};
insertDummyData();

app.get("/restaurants", async (req, res) => {
    try {
        // Use the 'find' method of the 'Restaurant' model to retrieve all restaurants
        const restaurants = await Restaurant.find({});

        // Send the retrieved restaurants as a JSON response
        res.json(restaurants);
    } catch (error) {
        // Handle any errors that may occur during the process and send a 500 Internal Server Error response
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to retrieve previous orders
app.get("/previousOrders", async (req, res) => {
    try {
        const orders = await PreviousOrder.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
// Endpoint to save order data
app.post("/previousOrders", async (req, res) => {
    try {
        const { orderId, dateOfOrder, amount } = req.body;

        console.log(orderId, dateOfOrder, amount);

        const newOrder = new PreviousOrder({
            orderId,
            dateOfOrder: new Date(dateOfOrder),
            amount,
        });

        await newOrder.save();
        res.status(201).json({ message: "Dummy order saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
