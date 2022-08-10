import React from 'react';

import { Order } from '../../components/Order/Order';
import styles from './orderdetails.module.css';


export const OrderDetailsPage = () => (
 
    <div className={styles.orderDetailsPage}>
      <Order />
    </div>
  
);