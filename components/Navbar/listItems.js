import React from 'react'
import styles from '../../public/Navbar.module.scss';

function listItems() {
    return (
        <ul className={`${styles.listitems} ${dropdown ? styles.list_active : ''}`}>
        <input
          id="searchbar"
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
                          <li value={l.name} key={l.woeid} onClick={() => setDropdown(!dropdown)}>
                            <Link
                              className="c-name"
                              href={d !== "" ? `/${d}/${l.name}` : `/${l.name}`}
                              key={l.woeid}
                            >
                              {l.name}
                            </Link>
                          </li>
                        );
                      } else {
                        return (
                          <li value={l.name} key={l.woeid} onClick={() => setDropdown(!dropdown)}>
                            <Link className="c-name" href={`/${d}`} key={l.woeid}>
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
    )
}

export default listItems
