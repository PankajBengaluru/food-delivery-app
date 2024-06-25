// App.js

import React, { useContext } from "react";
import RestaurantList from "./components/RestaurantList";
import DishesMenu from "./components/DishesMenu";
import Cart from "./components/Cart";
import { RestaurantContext } from "./contexts/RestaurantContext";
import "./App.css"; // Import the CSS file

const App = () => {
    const { selectedRestaurant } = useContext(RestaurantContext);

    return (
        <>
            <div className="container">
                <h1 className="header"> Food Delivery App</h1>
                <Cart
                    style={{ position: "absolute", right: "20px", top: "20px" }}
                />
                <RestaurantList />
                {selectedRestaurant && <DishesMenu />}
            </div>
        </>
    );
};

export default App;
