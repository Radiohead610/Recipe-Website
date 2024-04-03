import { useEffect, useState } from "react";
import styled from "styled-components";


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
        console.log(data.recipes);
    }

  return (
    <div> 
        {popular.map((recipe) => {
            return(
              <Wrapper>
                <h3>Popular Picks</h3> 
                {popular.map((recipe) => {
                    return(
                        <Card>
                            <p>{recipe.title}</p>
                            <img src={recipe.image} alt={recipe.title}/>
                        </Card>
                    );
                })}
              </Wrapper>
            );
        })}
    </div>
  )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
`;
export default Popular
