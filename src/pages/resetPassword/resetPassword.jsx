import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../common.module.css';
import { resetPassword } from '../../services/actions/auth';

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const email = useSelector((state) => state.auth.resetPasswordCodeEmail);

  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!email) {
      history.replace('/forgot-password');
    }
  }, [history, email]);


  const onSubmitResetPasswordForm = (e) => {
    e.preventDefault();

    dispatch(resetPassword({ email, password, token }));
  };

  return (
    <div className={styles.container}>
      
        <form className={styles.form} onSubmit={onSubmitResetPasswordForm}>
          <div className='text text_type_main-medium mb-6 '>Восстановление пароля</div>
          <div className={`${styles.input} mb-6`}>
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
            />
          </div>
          <div className={`${styles.input} mb-6`}>
            <Input
              type="text"
              placeholder="Введите код из письма"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>

          <div className="mb-20">
            <Button type="primary" size="large" disabled={token === '' && password === ''}>
              Сохранить
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?
          <Link to="/login" className={`${styles.link} ml-2 text text_type_main-default`}>Войти</Link>
        </p>
     
    </div>
  );
}
