import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "../../utils/hooks";

import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "../../components/Button/button";
import { validateEmail } from "../../utils/validation";

import styles from "../common.module.css";
import { loginUser } from "../../services/actions/auth";

export function LoginPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = useCallback(() => !!validateEmail(email), [email]);
  const isFormValid = useCallback(
    () => isEmailValid() && password !== "",
    [isEmailValid, password]
  );

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className={styles.container}>
      <form className={`${styles.form} `} onSubmit={login}>
        <div className="text text_type_main-medium mb-6">Вход</div>
        <div className={`${styles.input} mb-6`}>
          <Input
            size="default"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Укажите e-mail"
            error={email !== "" && !isEmailValid()}
            errorText="Некорректный email"
          />
        </div>
        <div className={`${styles.input} mb-6`}>
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="large" disabled={!isFormValid()}>
            Войти
          </Button>
        </div>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы - новый пользователь?
        <Link
          to="/register"
          className={`${styles.link} ml-2 text text_type_main-default`}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive ">
        Забыли пароль?
        <Link
          to="/forgot-password"
          className={`${styles.link} ml-2 text text_type_main-default`}
        >
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}
