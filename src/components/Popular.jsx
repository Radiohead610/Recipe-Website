import { useEffect, useState } from "react";


function Popular() {

    //popular is the variable, and setPop is the function 
    const [popular, setPopular] = useState([]);

    //everytime the page gets refreshed, fetch popular 
    useEffect(() => {
        getPopular();
    }, []);

    
    //async cus it needs to wait for the data to be fully fetched 
    const getPopular = async () => {
        const api = await fetch (
            `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
        );
        const data = await api.json();
        //once it's been fetched, it needs to be saved somewhere
        setPopular(data.recipes);
        console.log(data);
    }



  return (
    <div> 
        {popular.map((recipe) => {
            return(
                <div key={recipe.id}>
                    <p>{recipe.title}</p>
                </div>
            );
        })}
    </div>
  )
}

export default Popular
