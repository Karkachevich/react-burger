import style from "./IngredientsDetails.module.css";
import { dataPropTypes } from "../../utils/types";

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={style.modal}>
      <picture className={style.modal__image}>
        <img src={ingredient.image_large} alt={ingredient.name} />
      </picture>
      <p className="mb-8 text text_type_main-medium">{ingredient.name}</p>
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
};

IngredientDetails.propTypes = {
  ingredient: dataPropTypes.isRequired,
};

export default IngredientDetails;
