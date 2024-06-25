//DishesMenu.js

import React, { useContext } from 'react';
import DishCard from './DishCard';
import { RestaurantContext } from '../contexts/RestaurantContext';

const DishesMenu = () => {
    const { selectedRestaurant } = useContext(RestaurantContext);

    return (
        <div>
            <h2>Menu</h2>
            {selectedRestaurant && (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {selectedRestaurant.menu.map((dish) => (
                        <DishCard key={dish.name} dish={dish} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DishesMenu;
