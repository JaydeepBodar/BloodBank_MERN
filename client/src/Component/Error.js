import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Style/Error.module.css'
const Error = () => {
const user=localStorage.getItem('user')
  return (
<section className={styles.page_404}>
  <div className="container">
    <div className="row">
      <div className="col-sm-12 ">
        <div className="col-sm-10 col-sm-offset-1 text-center mx-auto">
          <div className={styles.four_zero_four_bg}>
            <h1 class="text-center ">404</h1>

          </div>

          <div className={styles.contant_box_404}>
            <h3 class="h2">
              Look like you're lost
            </h3>

            <p>the page you are looking for not avaible!</p>

            <Link to={`${!user ? "/home/login" : "/home/dashboard"}`} className={styles.link_404}>Go to Home</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Error
