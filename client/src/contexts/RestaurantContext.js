//RestaurantContext.js

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/restaurants"
                );
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error.message);
            }
        };

        fetchRestaurants();
    }, []);

    const handleAddItems = (dish) => {
        console.log("Dish:", dish);

        // Check if the dish already exists in the cart
        const existingItemIndex = cartItems.findIndex(
            (item) => item._id === dish._id
        );

        if (existingItemIndex !== -1) {
            // If the dish already exists, update 
            // the quantity or any other logic
            console.log("Dish already exists in the cart. You may want to update the quantity.");
            // Example: Increment the quantity
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex] = {
                ...updatedCartItems[existingItemIndex],
                quantity: updatedCartItems[existingItemIndex].quantity + 1,
            };
            // console.log('cart',cartItems.length);
            // setTotalPrice(prev=>prev-dish.price)

            setCartItems(updatedCartItems);
        } else {
            // If the dish is not in the cart, add it
            console.log("Dish does not exist in the cart. Adding to the cart.");
            console.log("cart", cartItems.length);
            // setTotalPrice(prev=>prev-dish.price)

            setCartItems([...cartItems, { ...dish, quantity: 1 }]);
        }
        setTotalPrice((prev) => prev + dish.price);
    };

    const handleRemoveItems = (dish) => {
        console.log("Dish ID to remove:", dish);

        // Check if the dish exists in the cart
        const existingItemIndex = cartItems.findIndex(
            (item) => item._id === dish._id
        );

        if (existingItemIndex !== -1) {
            // If the dish exists, decrement the 
            // quantity or remove it from the cart
            console.log("Dish exists in the cart. You may want to decrease the quantity or remove it.");

            const updatedCartItems = [...cartItems];

            if (updatedCartItems[existingItemIndex].quantity > 1) {
                // If the quantity is greater than 1, decrement the quantity
                updatedCartItems[existingItemIndex] = {
                    ...updatedCartItems[existingItemIndex],
                    quantity: updatedCartItems[existingItemIndex].quantity - 1,
                };
                setTotalPrice(totalPrice - cartItems[existingItemIndex].price);
            } else {
                // If the quantity is 1, remove the dish from the cart
                updatedCartItems.splice(existingItemIndex, 1);
                setTotalPrice(totalPrice - cartItems[existingItemIndex].price);
            }

            setCartItems(updatedCartItems);
        } else {
            // If the dish is not in the cart, 
            // log a message or handle accordingly
            console.log("Dish does not exist in the cart.");
        }
    };

    const emptyCart = () => {
        setCartItems([]);
        setTotalPrice(0);
    };
    const value = {
        restaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        handleAddItems,
        handleRemoveItems,
        totalPrice,
        emptyCart,
    };

    return (
        <RestaurantContext.Provider value={value}>
            {children}
        </RestaurantContext.Provider>
    );
};

export { RestaurantContext, RestaurantProvider };
