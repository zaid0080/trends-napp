import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import styles from "../../styles/Navbar.module.scss";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { FaBars, FaTwitter } from "react-icons/fa";
import { sidebarData } from "./sidebarData";
// import { GlobalContext } from "../../global";
import Link from "next/link";
import useSWR from "swr";

const woeidList = require("./countrys.json");

let woeidListTree = {};

function createTree(filterCountries) {
  woeidListTree = {};
  filterCountries.forEach((d) => {
    if (woeidListTree[d.country] === undefined) {
      woeidListTree[d.country] = [];
      woeidListTree[d.country].push(d);
    } else {
      woeidListTree[d.country].push(d);
    }
  });
}





function Navbar() {
  // const { country, city } = useContext(GlobalContext);
  const [dropdown, setDropdown] = useState(false);
  const [searchIcon, setSearchIcon] = useState(false);
  const [countryInput, setCountryInput] = useState("");
  const [filterCountries, setFilterCountries] = useState(woeidList);
  const inputRef = useRef(null); //reference for input box
  const [sidebar, setSidebar] = useState(false);

  const {data, error} = useSWR('https://trendsend.herokuapp.com/place/get-all-places')
  if(error){
    return <p>Failed to load data</p>
  }
  if(!data){
    return <p>Loading....</p>
  }

  // useOnClickOutside(inputRef, () => {
  //   if (searchIcon) {
  //     setSearchIcon(false);
  //     setDropdown(false);
  //   }
  // });
  console.log(data.places)

  const searchHandler = () => {
    setSearchIcon(!searchIcon);
    setDropdown(!dropdown);
    inputRef.current.focus();
    if(dropdown){
      inputRef.current.blur();
    }
  };


  // useEffect(() => {
  //   setFilterCountries(
  //     woeidList
  //       .filter((d) =>
  //         d.name.toLowerCase().includes(countryInput.toLowerCase())
  //       )
  //       .sort()
  //   );
  // }, [countryInput]);


  createTree(filterCountries);
  return (
    <>
      <nav className={`${styles.navmenu} ${sidebar ? styles.active : ""}`}>
        <ul
          className={styles.nav_menu_items}
          onClick={() => setSidebar(!sidebar)}
        >
          <li className={styles.navbar_toggle}>
            <AiOutlineClose className={styles.menu_bars} />
          </li>
          {sidebarData.map((item, index) => {
            return (
                <li key={index} className={styles.nav_text}>
                  <Link href={item.path}>
                    <a>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>  
                  </Link>
                </li>
            );
          })}
          <li className={styles.nav_text}>
            <a href=" " target="_blank" rel="noreferrer">
              <FaTwitter />
              <span>Login</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.navbar}>
        <FaBars
          onClick={() => setSidebar(!sidebar)}
          className={styles.menu_bars}
        />
        <Link href="/" passHref>
          <Image src="/ADT.png" width="60" height="25" alt="Logo" />
        </Link>
        <span>
          <span>Country Name</span>
          <AiOutlineSearch
            onClick={searchHandler}
            className={styles.nav_search}
          />
        </span>
      </div>
      <ul
        className={`${styles.listitems} ${dropdown ? styles.list_active : ""}`}
      >
        <input
          ref={inputRef}
          type="text"
          value={countryInput}
          className={styles.Search}
          onChange={(e) => setCountryInput(e.target.value)}
          placeholder="Search Country..."
        />
        {Object.keys(woeidListTree)
          .sort()
          .map((d) => {
            return (
              <div key={d}>
                <h2 className={styles.countriesNames}>{d}</h2>
                <hr />
                <span className={styles.list_cities}>
                  {woeidListTree[d].reverse().map((l) => {
                    if (d !== l.name) {
                      return (
                        <li
                          value={l.name}
                          key={l.woeid}
                          onClick={() => setDropdown(!dropdown)}
                        >
                          <Link
                            className="c-name"
                            href={d !== "" ? `/${d}/${l.name}` : `/${l.name}`}
                          >
                            {l.name}
                          </Link>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          value={l.name}
                          key={l.woeid}
                          onClick={() => setDropdown(!dropdown)}
                        >
                          <Link className="c-name" href={`/${d}`} >
                            {l.name}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </span>
              </div>
            );
          })}
      </ul>
    </>
  );
}

// export async function getStaticProps(context) {
//   const res = await fetch(`https://trendsend.herokuapp.com/place/get-all-places`)
//   const data = await res.json()

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//   }
// }



export default Navbar;
