import React from "react";
import s from "../404/pnf.module.css";
import pnf from "../../assets/imgs/404.png";
import left from "../../assets/icons/404left.svg";
import around from "../../assets/icons/around.svg";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
       const navigate = useNavigate()
  return (
    <>
      <div className={s.pnf_Head}>
        <img src={pnf} alt="404" />
        <h1>Не найдено</h1>
        <p>
          Сервер не может найти запрашиваемый ресурс. Код этого ответа,
          возможно, самый известный из-за частоты его появления в вебе.{" "}
        </p>
        <div className={s.pnfbtn}>
          <button
          onClick={() => navigate("/")}
          >
            <img src={left} alt="Arrow-left" />
            Перейти на главную
          </button>
          <button onClick={() => window.location.reload()}>
            Попробовать снова
            <img src={around} alt="Spin" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
