import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "../../utils/hooks";

import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "../../components/Button/button";
import { validateEmail } from "../../utils/validation";
import { registerUser } from "../../services/actions/auth";

import styles from "../common.module.css";

export function RegisterPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { loading, error } = useSelector((state) => state.auth);

  const isEmailValid = useCallback(() => validateEmail(email), [email]);
  const isFormValid = useCallback(
    () => isEmailValid() && password !== "" && name !== "",
    [isEmailValid, password, name]
  );

  const submitRegistrationForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name }));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitRegistrationForm}>
        <div className="text text_type_main-medium mb-6 ">Регистрация</div>
        <div className={`${styles.input} mb-6`}>
          <Input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={`${styles.input} mb-6`}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            error={email !== "" && !isEmailValid()}
            errorText={typeof error === "string" ? error : "Некорректный email"}
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
          <Button
            type="primary"
            size="large"
            disabled={!isFormValid() || !!loading}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <p className="text text_type_main-default text_color_inactive text_align_center mb-4">
        Уже зарегистрированы?
        <Link
          to="/login"
          className={`${styles.link} ml-2 text text_type_main-default`}
        >
          Войти
        </Link>
      </p>
    </div>
  );
}
