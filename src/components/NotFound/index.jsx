import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
import notFound from "../../assets/img/NotFound.svg";

export default function NotFound() {
  return (
    <div className={styles.root}>
      <div className={styles.textBlock}>
        <div>
          <h1 className={styles.h1}>Страница не найдена</h1>
          <h3 className={styles.h3}>
            Повторите корректность введённого адреса <br /> или повторите
            попытку позже
          </h3>
        </div>
        <div className={styles.button}>
          <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
      <img className={styles.imageBlock} src={notFound} alt="notFound" />
    </div>
  );
}
