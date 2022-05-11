import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import {data as ingredients} from '../../utils/data';


function App() {

 

  return (
    <div className="App">
      <AppHeader/>
      <div style={{display: 'flex'}}>
      <BurgerIngredients data={ingredients}/>
      <BurgerConstructor data={ingredients} />
      </div>   
     
    </div>
  );
}

export default App;
