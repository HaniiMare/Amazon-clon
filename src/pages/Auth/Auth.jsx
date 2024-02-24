import React, { useState,useContext} from "react"
import Classes from "./SignUp.module.css"
import { Link, useNavigate,useLocation} from "react-router-dom"
import { auth } from "../../Utility/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Component/DataProvider/DataProvider"
import { Type } from "../../Utility/action.type"
import ProtectedRoute from "../../Component/ProtactRoute/ProtectRoute"



function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState({
    signIn: false,
    signUp:false
  })
  const [{ user }, dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const navStateData =useLocation()
  

  const authHandler = async (e) => {
    e.preventDefault()
    console.log(e.target.name);
    if (e.target.name == "signin") {
      
      // firebase auth

      setLoading({ ...loading, signIn: true })
      signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
        dispatch({
          type: Type.SET_USER,
          user:userInfo.user,
        })
        setLoading({ ...loading, signIn: false });
        navigate(navStateData?.state?.redirect || "/");
        
      }).catch((err) => {
          setError(err.massage);
          setLoading({ ...loading, signIn: false });
      })
    } else {

setLoading({ ...loading, signUp:true });
      createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
        dispatch({
           type: Type.SET_USER,
           user: userInfo.user,
        });
        setLoading({ ...loading, signUp: false });
        navigate(navStateData?.state?.redirect || "/");
        
        
      })
        .catch((err) => {
          setError(err.massage);
          setLoading({ ...loading, signUp: false });

        })
    }
  };


  return (
    <section className={Classes.login_containerWhole}>
      {/* logo */}
      <div className={Classes.login_containers}>
        {" "}
        <Link to="/">
          <img src="https://pngimg.com/uploads/amazon/amazon_PNG6.png" />
        </Link>
      </div>

      {/* form */}

      <div className={Classes.login_container}>
        <h1>sign In</h1>

        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        <form action="">
          <div>
            <label htmlFor="Email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="Password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={Classes.login_signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "sign In"
            )}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing-in your agree to the AMAZON FAKE CLONE conditions of use &
          sale.please see our privacy Notice,our Cookies Notice and our Interest
          -base ads Notice
        </p>
        {/* creat account button */}

        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={Classes.login_registerButton}
        >
          Create Your Amazon Account
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}
export default Auth;



