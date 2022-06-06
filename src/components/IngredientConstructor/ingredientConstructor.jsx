import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/types";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import style from "./IngredientConstructor.module.css";
import Actions from "../../services/actions";

const IngredientConstructor = ({ index, ingredient, onClick }) => {
  const ref = React.useRef(null);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: "constructorIngredients",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      if (item.ingredient._uid === ingredient._uid) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current
        ? ref.current.getBoundingClientRect()
        : undefined;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: Actions.CHANGE_CONSTRUCTOR_INGREDIENT_POSITION,
        payload: {
          whichIngredientDroppedId: item.ingredient._uid,
          onWhichIngredientDroppedId: ingredient._uid,
        },
      });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorIngredients",
    item: () => ({ ingredient, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const className = `${style.filling__element} ${isDragging ? style.opacity : ""}`;

  drag(drop(ref));

  return (
    <li
      className={className}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <div
        className={`${style.filling__info} ml-2`}
        onClick={(e) => onClick(e, ingredient._uid)}
      >
        <ConstructorElement
          isLocked={false}
          text={`${ingredient.name}`}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      </div>
    </li>
  );
}

IngredientConstructor.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: dataPropTypes.isRequired,
  onClick: PropTypes.func.isRequired
};

export default IngredientConstructor;
