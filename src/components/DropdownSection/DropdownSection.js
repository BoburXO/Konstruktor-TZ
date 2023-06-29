import { Dropdown } from "rsuite";
import s from "./DropdownSection.module.css";
import { useState } from "react";
// import pen from "../../assets/icons/pen.svg";
// import add from "../../../assets/icons/plus-add.svg";
// import addSub from "../../../assets/icons/addSub.png";

export default function SectionDropdown({ children }) {
  const [showIcons, setShowIcons] = useState(false);

  const toggleDropdown = (e) => {
    console.log(e.target.classList());
    // if (showIcons) {
    //   setShowIcons(false);
    // } else {
    //   setShowIcons(true);
    // }
  };

  return (
    <div className={s.section_dropdown} onClick={(e) => toggleDropdown(e)}>
      <i
        className={`${s.title} fa-solid fa-ellipsis-vertical fa-lg`}
        onClick={toggleDropdown}
      ></i>{" "}
      {showIcons ? <div className={s.children_wrapper}>{children}</div> : null}
    </div>
  );
}
