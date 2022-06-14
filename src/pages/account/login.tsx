import { useState } from "react";
import { useUser } from "~/components/account/hooks";
import Layout from "~/components/account/layout";
import Form from "~/components/account/form";
import { apiRoutes } from "~/lib/api/apiRoutes";
import styles from "../../styles/login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAmbulance,
  faAnchor,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    // const body = {
    //   email: e.currentTarget.email.value,
    //   password: e.currentTarget.password.value,
    // };

    window.location.href = '/organizations'
  }

  return (
    <div className={styles.startingdiv}>
      <div className={styles.dFlex}>
        <div>
          <div className={styles.check}>
            <p className={styles.sigin}>Sign in</p>
            <p className={styles.create}>
              Create a new organization to start plan, track your progress with
              your team
            </p>
          </div>

          <div>
            <p className={styles.email}>Email Address</p>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter Email"
            />

            <p className={styles.email}>Password</p>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter Password"
            />
          </div>

          <div>
            <p className={styles.or}>or</p>
          </div>

          <div>
            <button onClick={handleSubmit} className={styles.button}>
              <FontAwesomeIcon icon={faSearch} style={{ color: "#fff" }} />{" "}
              Connect with Near
            </button>
            <p className={styles.donthave}>
              Don't have and account?{" "}
              <span className={styles.signup}>Signup here</span>
            </p>
          </div>
        </div>

        <div>
          <img className={styles.img} src="/img/process-success.svg" />
        </div>
      </div>
    </div>
  );
};

export default Login;
