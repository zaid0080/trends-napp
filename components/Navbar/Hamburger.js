import React, { useRef, useState } from "react";
import styles from '../../styles/Hamburger.module.scss';
// import useClickOutside from "../useClickOutside/useClickOutside";

function Hamburger(props) {
  const [hamb, setHamb] = useState(false);
  const hambRef = useRef(null);

  const hamHandler = () => {
    setHamb(!hamb);
  };

  // useClickOutside(hambRef, () => {
  //   if (hamb) {
  //     setHamb(false);
  //   }
  // });

  return (
    <div
      className={`${styles.menubtn} ${hamb ? styles.showCross : styles.hideCross}`}
      onClick={hamHandler}
      ref={hambRef}
    >
      <div className={styles.menubtn__burger}></div>
    </div>
  );
}

export default Hamburger;
