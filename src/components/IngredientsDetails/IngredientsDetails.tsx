import React, { useEffect, useState } from "react";
import style from "./IngredientsDetails.module.css";
import { useSelector } from "../../utils/hooks";
import { IIngredient } from "../../utils/interface/ingredient.interface";
import { useHistory, useParams } from 'react-router-dom';


function IngredientDetails() {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();
  const [ingredient, setIngredient] = useState<IIngredient | null>(null);

  const { ingredients, loaded } = useSelector((state) => state.ingredients);
  
  useEffect(() => {
    if (loaded) {
      const foundIngredient = ingredients.find((_ingredient) => _ingredient._id === id);
      if (!foundIngredient) {
        setIngredient(null);
        history.replace('/');
      } else {
        setIngredient(foundIngredient);
      }
    }
  }, [history, id, ingredients, loaded]);


  if(loaded && ingredient){
    return (
      <div className={style.modal}>
        <picture className={style.modal__image}>
          <img src={ingredient.image_large} alt={ingredient.name} />
        </picture>
        <p className={`${style.text} mb-8 text text_type_main-medium`}>{ingredient.name}</p>
        <div className={style.ingredients}>
          <div className={style.ingredients__element}>
            <div className="mb-2 text text_type_main-default text_color_inactive">
              Калории, ккал
            </div>
            <div className="text text_type_digits-default text_color_inactive">
              {ingredient.calories}
            </div>
          </div>
          <div className={style.ingredients__element} >
            <div className="mb-2 text text_type_main-default text_color_inactive">
              Белки, г
            </div>
            <div className="text text_type_digits-default text_color_inactive">
              {ingredient.proteins}
            </div>
          </div>
          <div className={style.ingredients__element} >
            <div className="mb-2 text text_type_main-default text_color_inactive">
              Жиры, г
            </div>
            <div className="text text_type_digits-default text_color_inactive">
              {ingredient.fat}
            </div>
          </div>
          <div className={style.ingredients__element}>
            <div className="mb-2 text text_type_main-default text_color_inactive">
              Углеводы, г
            </div>
            <div className="text text_type_digits-default text_color_inactive">
              {ingredient.carbohydrates}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (<></>);
  }
  
};

/*
IngredientDetails.propTypes = {
  ingredient: dataPropTypes.isRequired,
};
*/
export default IngredientDetails;
