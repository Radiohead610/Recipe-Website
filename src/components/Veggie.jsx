import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide  } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Veggie() {

    const [veggie, setVeggie] = useState([]);

    //everytime the page gets refreshed, fetch veggie 
    useEffect(() => {
        getVeggie();
    }, []);

    
    //async cus it needs to wait for the data to be fully fetched 
    const getVeggie = async () => {

        const check = localStorage.getItem('veggie');
        //if we have local storage, we don't need to fetch again
        if(check){
            //when we pull it back, we aprse it from string to array
            setVeggie(JSON.parse(check));
        }
        else{
            const api = await fetch (
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
            );
            const data = await api.json();
            //set the local storage if it is empty. 
            //Since local storage only takes string, we need to stringigy
            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            
            //once it's been fetched, it needs to be saved somewhere
            setVeggie(data.recipes);
            console.log(data.recipes);
        }
    }

  return (
    <div> 
    <Wrapper>
        <h3>Our Vegetarian Picks</h3> 
            <Splide options={{
                perPage: 3,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '5rem'
            }}>
            {veggie.map((recipe) => {
                return(
                    <SplideSlide key={recipe.id}>
                        <Card>
                            <Link to={"/recipe/" + recipe.id}>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title}/>
                                <Gradient />
                            </Link>
                        </Card>
                    </SplideSlide>
                );
            })}
    </Splide>
    </Wrapper>
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
    position: relative;

    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color:white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`

export default Veggie
