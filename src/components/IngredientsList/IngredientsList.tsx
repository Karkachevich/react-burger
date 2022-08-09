import React, {FC} from "react";
import Ingredient from "../Ingredient/ingredient";
import style from "./IngredientsList.module.css";
import { useSelector } from "../../utils/hooks";
import { IIngredient } from "../../utils/interface/ingredient.interface";

export interface IIngredientProps {
  id: string,
  title: string,
  ingredients: IIngredient[]
}

const IngredientsList: FC<IIngredientProps>  = ({ id, title, ingredients }) => {
  const basket = useSelector((state) => state.constructorIngredients.basket);

  const getCount = React.useCallback((ingredient: IIngredient) => {
    const { _id, type } = ingredient;
    const ingredientsCount = basket.filter((b) => b._id === _id).length;

    return type === 'bun' ? ingredientsCount * 2 : ingredientsCount;
  }, [basket]);

  return (
    <section id={id}>
      <h3  className="text text_type_main-medium mt-10">
        {title}
      </h3>
      <ul className={style.container}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
            count={getCount(ingredient)}
          />
        ))}
      </ul>
    </section>
  );
};



export default IngredientsList;
