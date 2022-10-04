import { useState, useEffect } from "react";
import { useUser } from "~/components/account/hooks";
import Link from "next/link";
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
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.href = '/organizations';
      router.push('/organizations');
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      email: state.email,
      password: state.password,
    };

    // window.location.href = '/organizations'
    try {
      const res = await fetch(apiRoutes.account.login.href, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const response = await res.json();
      if (res.status === 200) {
        window.location.href = '/organizations'
        localStorage.setItem("user", JSON.stringify(response.user));
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg("You have entered an invalid username or password");
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState(state => ({
      ...state,
      [name]: value
    }))
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
          {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
          <div>
            <p className={styles.email}>Email Address</p>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />

            <p className={styles.email}>Password</p>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
          </div>

          

          <div>
            <button disabled={!state.email || !state.password} onClick={handleSubmit} className={styles.button}>
              <FontAwesomeIcon icon={faSearch} style={{ color: "#fff" }} />{" "}
              Login
            </button>
            <p className={styles.donthave}>
              Don't have and account?{" "}
              <Link className={styles.signup} href="/account/signup">
                  <a>Signup here</a>
                </Link>
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
