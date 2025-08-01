import React from 'react'
import styles from '../Home/Home.module.css'

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.overlay}></div>
      <div className="content">
          <h1 className={styles.heading}>Creativity is a Most<br/>Valueable Asset</h1>
          <p className={styles.parag}>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. </p>
          <button className={styles.butn} >Get Started</button>
        </div>
        <div className={styles.counters}>
                <div className={styles.counterItem}>
                  <p className={styles.counterLabel}>Clients</p>
                  <h3 className={styles.counterNumber}>3K+</h3>
                  
                </div>
                <div className={styles.counterItem}>
                  <p className={styles.counterLabel}>Projects</p>
                  <h3 className={styles.counterNumber}>10K+</h3>
                  
                </div>
                <div className={styles.counterItem}>
                  <p className={styles.counterLabel}>Employee</p>
                  <h3 className={styles.counterNumber}>500+</h3>
                  
                </div>
                <div className={styles.counterItem}>
                  <p className={styles.counterLabel}>Years</p>
                  <h3 className={styles.counterNumber}>10+</h3>
                  
                </div>
        </div>
    </div>
  )
}
