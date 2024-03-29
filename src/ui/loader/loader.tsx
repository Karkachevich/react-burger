import React, { FC} from "react";
import style from './loader.module.css';
import { LoaderSvg } from './loader.svg';

interface ILoaderSizes {
  [name: string]: number; 
}

const loaderSizes: ILoaderSizes
 = {
  small: 16,
  medium: 24,
  large: 40
};
export const Loader: FC<{ size: string, inverse: boolean }> = ({ size, inverse = false }) => {
  const loaderColor = inverse ? '#fff' : '#3C39EC';

  const wrapperStyleKey = 'wrapper_' + size;
  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size] } />
    </div>
  );
};