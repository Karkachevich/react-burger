import Ingredient from "../Ingredient/ingredient";
import style from './IngredientsList.module.css';

const IngredientsList = ({id, title, ingredients}) => {
  return (
    <section >
      <h3 id={id} className="text text_type_main-medium" >{title}</h3>
      <ul className={style.ingredientsList__container}>
      {ingredients.map((card) => (
          <Ingredient key={card._id} data={card} />
        ))}
      </ul>
    </section>
  );
};

export default IngredientsList;