import { useState, useEffect } from 'react';
import './App.css';
import MyNutrientsComponent from './MyNutrientsComponent';
import "./blueberry.jpg";
import Swal from 'sweetalert2';

import { Loader } from './Loader';




function App() {
 const MY_ID = "3d86b29a";
 const MY_KEY = "46057ab1237b6e9778c74d5a800af5ef";
 const APP_URL = 'https://api.edamam.com/api/nutrition-details';

 const [mySearch, setMySearch] = useState("");
 const [myNutrients, setMyNutrients] = useState("");
 const [wordSubmitted, setWordSubmitted] = useState("1 avocado, 50g rice")
 const [stateLoader, setStateLoader] = useState(false);

 const fetchData = async (ingr) => {
  setStateLoader(true);

 const response = await fetch(`${APP_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Edamam-Account-User': '3d86b29a'
  },
  body: JSON.stringify({ ingr: ingr })
})

 if(response.ok) {
  setStateLoader(false);
  const data = await response.json();
  setMyNutrients(data);
  }
  else if (response.status === 400) {
    setStateLoader(false);
    Swal.fire({
      icon: 'error',
      title: 'Invalid Ingredients',
      text: 'Please check the ingredients and try again.',
    });
  }
  else if (response.status === 403) {
    setStateLoader(false);
    Swal.fire({
      icon: 'error',
      title: 'Request limit',
      text: 'The request limit has been reached.',
    });
   }
  else {
    setStateLoader(false);
    Swal.fire({
      icon: 'error',
      title: 'Network Error',
      text: 'Please check your connection or try again later.',
    });
  }
}

useEffect(() => {
  if (wordSubmitted !== '') {
    let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
    fetchData(ingr);
  }
}, [wordSubmitted])

const myNutrSearch = (e) => {
  console.log (e.target.value)
  setMySearch(e.target.value)
}
const finalSearch = (e) => {
  e.preventDefault()
  setWordSubmitted(mySearch)
}
 
  return (
    <div className="App">
      <div className='container'>
      {stateLoader && <Loader/>}
    <h1>Nutrition Analysis</h1>
      <div>
        <form onSubmit={finalSearch}>
          <input className='search' onChange={myNutrSearch} value={mySearch} placeholder='1 avocado, 50g rice'/>
        </form>
      </div>
      <div>
      <button onClick={finalSearch}>Search</button>
      </div>
      <div>
        {
          myNutrients && <p className='calorien'>{myNutrients.calories} kcal</p>
        }
        {
          myNutrients && Object.values(myNutrients.totalNutrients)
            .slice(1)
            .map(({ label, quantity, unit }) =>
              <MyNutrientsComponent
                key={label}
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
      
      </div>
    </div>
  );
}

export default App;
