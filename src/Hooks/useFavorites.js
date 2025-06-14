import { useState, useEffect } from 'react';

const useFavorites = () => {

    //localStorage only accepts strings as values
    //upon initial render, access data from localStorage if available and use as state
    const [favorites, setFavorites] = useState(() => {

        const storedFavorites = localStorage.getItem('favorited'); //take the favorited JSON string..
        return storedFavorites ? JSON.parse(storedFavorites): []; //turn into giant JavaScript object with inner objects
        
    });

    useEffect(() => {
        localStorage.setItem('favorited', JSON.stringify(favorites)) //save as giant JSON string under key 'favorited'
    }, [favorites])

    const addFavorite = (poem) => {
        setFavorites((prev) => [...prev, poem]); //create new array and set as state, so we don't directly mutate state
    };

    const removeFavorite = (poemId) => {
        setFavorites((prev) => prev.filter((p) => p.id !== poemId));
    };

    //check if poem is already in favorited list; does ANY poem in list match with current?
    const isFavorite = (poemId) => {
        return favorites.some(p => p.id === poemId);
    };

    //export as an object with the list, and the three functions
    return { favorites, addFavorite, removeFavorite, isFavorite };

}

export default useFavorites;