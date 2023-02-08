import React from "react";
import s from "../Footer/Footer.module.css";
import logofff from "../../assets/imgs/logofff.svg";
import logodots from "../../assets/imgs/logodots.svg";
import { Link } from "react-router-dom";
import facebook from "../../assets/icons/facebook.svg";
import instagram from "../../assets/icons/instagram.svg";
import location from "../../assets/icons/location.svg";
import mail from "../../assets/icons/Mail.svg";
import phone from "../../assets/icons/phone.svg";
import telegram from "../../assets/icons/telegram.svg";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <footer>
        <div className={s.container}>
          <ul className={s.footer_parent}>
            <li>
              <Link className={s.logofff_link}>
                <img src={logofff} alt="" />
              </Link>
            </li>
            <li className={s.twink3}>
              <img src={logodots} alt="" />
              <p>
              {t("footer1")}
              </p>
            </li>
            <li className={s.phone_style}>
              <h6>{t("footer2")}</h6>
              <span className={s.twink} style={{ paddingLeft: "5px" }}>
                <img style={{ width: "20px" }} src={mail} alt="" />
                <p>info@egov.uz</p>
              </span>
              <span className={s.twink}>
                <img src={phone} alt="" />
                <p>(+998) 55 501–36–36</p>
              </span>
              <span style={{ padding: "30px 0" }} className={s.twink}>
                <img style={{ height: "30px" }} src={location} alt="" />
                <p>
                  100128, Ташкент, <br /> ул Лабзак 70, Б-блок
                </p>
              </span>
            </li>
            <li  className={s.phone_style}>
              <h6>{t("footer3")}</h6>
              <a href="https://www.facebook.com/">
                <span className={s.twink}>
                  <img src={facebook} alt="" />
                  <p>Facebook</p>
                </span>
              </a>
              <a href="https://www.instagram.com/">
                <span className={s.twink}>
                  <img src={instagram} alt="" />
                  <p>Instagram</p>
                </span>
              </a>
              <a href="https://web.telegram.org/k/">
                <span className={s.twink}>
                  <img src={telegram} alt="" />
                  <p>Telegram</p>
                </span>
              </a>
            </li>
            <li className={s.twink2}>
              <img src={logodots} alt="" />
              <p>
              {t("footer1")}
              </p>
            </li>
          </ul>
          <hr />
          <div className={s.footer_center_content}>
            <p>
              2022 © tz.egov.uz <br /> {t("footer4")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
