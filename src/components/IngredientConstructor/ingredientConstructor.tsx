import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";

import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "../../utils/hooks";
import style from "./IngredientConstructor.module.css";
import * as Actions from "../../services/actions";
import { IIngredient } from "../../utils/interface/ingredient.interface";

interface IBurgerConstructorIngredientProps {
  index: number,
  ingredient: (IIngredient & { _uid: string }),
  onClick: (e: React.MouseEvent<HTMLDivElement>, uid: string) => void
}

const IngredientConstructor: FC<IBurgerConstructorIngredientProps> = ({ index, ingredient, onClick }) => {
  const ref = React.useRef<HTMLDivElement>(null);
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

      let definedItem;
      if (typeof item === 'object') {
        definedItem = item as { index: number, ingredient: (IIngredient & { _uid: string }) };
        
      } else {return; }

      const dragIndex = definedItem.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current
        ? ref.current.getBoundingClientRect()
        : undefined;
        if (!hoverBoundingRect) {
          return;
        }  
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
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
          whichIngredientDroppedId: definedItem.ingredient._uid,
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
    <div
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
    </div>
  );
}



export default IngredientConstructor;
