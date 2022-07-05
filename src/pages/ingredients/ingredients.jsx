import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import IngredientDetails from "../../components/IngredientsDetails/IngredientsDetails";

import styles from "./ingredients.module.css";

export function IngredientsPage() {
  const history = useHistory();
  const { id } = useParams();

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const [ingredient, setIngredient] = useState(null);

  const redirectToMainPage = useCallback(() => history.replace("/"), [history]);

  useEffect(() => {
    if (!id) {
      redirectToMainPage();
    } else {
      const foundIngredient = ingredients.find(
        (_ingredient) => _ingredient._id === id
      );

      if (foundIngredient) {
        setIngredient(foundIngredient);
      } 
    }
  }, [history, id, ingredients, redirectToMainPage]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      {ingredient && <IngredientDetails />}
    </div>
  );
}
