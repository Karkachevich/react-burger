import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "../../utils/hooks";
import {
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "../../components/Button/button";
import { validateEmail } from "../../utils/validation";
import { requestPasswordResetCode } from "../../services/actions/auth";
import styles from "../common.module.css";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const { resetPasswordCodeRequested } = useSelector((state) => state.auth);
  const isEmailValid = useCallback(() => !!validateEmail(email), [email]);

  const restorePassword = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(requestPasswordResetCode(email));
  };

  useEffect(() => {
    if (resetPasswordCodeRequested) {
      history.push({
        pathname: "/reset-password",
        state: {
          email,
          emailTimestamp: new Date().getTime(),
        },
      });
    }
  }, [history, resetPasswordCodeRequested, email]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={restorePassword}>
        <div className="text text_type_main-medium mb-6 ">
          Восстановление пароля
        </div>
        <div className={`${styles.input} mb-6`}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Укажите e-mail"
            error={email !== "" && !isEmailValid()}
            errorText="некорректный email"
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="large" disabled={!isEmailValid()}>
            Восстановить
          </Button>
        </div>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?
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
