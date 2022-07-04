import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Profile.module.css";
import { patchUser } from "../../services/actions/auth";

const PASSWORD_PLACEHOLDER_VALUE = "******";

export function Profile() {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: user.email, name: user.name, password: PASSWORD_PLACEHOLDER_VALUE });
 
  const [isDirty, setIsDirty] = useState(false);

  const inputNameRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);

  const onToggleNameEdit = () => {
    setIsNameEdit(!isNameEdit);

    setTimeout(() => {
      const currentInputNameRef = inputNameRef.current;
      return currentInputNameRef === null || currentInputNameRef === undefined
        ? undefined
        : currentInputNameRef.focus();
    }, 0);
  };

  const onTogglePasswordEdit = () => {
    const isEdit = !isPasswordEdit;
    if (isEdit && form.password === PASSWORD_PLACEHOLDER_VALUE) {
      setForm({ ...form, password: "" });
    }

    setIsPasswordEdit(isEdit);
    setTimeout(() => {
      const currentInputPasswordRef = inputPasswordRef.current;
      return currentInputPasswordRef === null ||
        currentInputPasswordRef === undefined
        ? undefined
        : currentInputPasswordRef.focus();
    }, 0);
  };

  const onChangeFormValue = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setIsDirty(true);
  };

  const onSubmitForm = () => {
      dispatch(
      patchUser({
        email: form.email,
        name: form.name,
        password:
          form.password !== PASSWORD_PLACEHOLDER_VALUE ? form.password : undefined,
      })
    );
  };

  const onCancelForm = () => {
    setIsDirty(false);
    setForm({
      email: user.email,
      name: user.name,
      password: PASSWORD_PLACEHOLDER_VALUE,
    });
  };

  useEffect(() => {
    if (user) {
      const { email, name } = user;
      setForm({
        email,
        name,
        password: PASSWORD_PLACEHOLDER_VALUE,
      });
      setIsDirty(false);
    }
  }, [user]);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <div className={styles.input}>
          <Input
            value={form.name}
            icon="EditIcon"
            name="name"
            placeholder="Имя"
            onChange={onChangeFormValue}
            onBlur={() => setIsNameEdit(false)}
            disabled={!isNameEdit}
            ref={inputNameRef}
            onIconClick={onToggleNameEdit}
          />
        </div>
        <div className={styles.input}>
          <EmailInput
            value={form.email}
            name="email"
            onChange={onChangeFormValue}
          />
        </div>
        <div className={styles.input}>
          <Input
            value={form.password}
            type="password"
            icon="EditIcon"
            name="password"
            placeholder="Пароль"
            onChange={onChangeFormValue}
            onBlur={() => setIsPasswordEdit(false)}
            disabled={!isPasswordEdit}
            ref={inputPasswordRef}
            onIconClick={onTogglePasswordEdit}
            error={form.password === ""}
          />
        </div>
      </form>
      {isDirty && (
        <div className={styles.actions}>
          <Button type="primary" size="small" disabled={!isDirty || loading} onClick={onSubmitForm}>
            <p className="text text_type_main-small">Сохранить</p>
          </Button>
          <div className="mt-4" />
          <Button type="secondary" size="small" disabled={loading} onClick={onCancelForm}>
            <p className="text text_type_main-small">Отменить изменения</p>
          </Button>
        </div>
      )}
    </>
  );
}
