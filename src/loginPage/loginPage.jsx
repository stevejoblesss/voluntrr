import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  console.log({ email, password });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      console.log("Kill Yourselfffffff");
      return;
    }

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            }
        );
  };

    const handleGoogleSignIn = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Error signing in with Google: ", error);
      }
    };

  const [loggedIn, setLoggedIn] = useState(false);
   useEffect(() => {
     onAuthStateChanged(auth, (user) => {
       if (user) {
         const uid = user.uid;
         console.log("uid", uid);
         setLoggedIn(true);
       } else {
         console.log("loggedout");
       }
     });
   });

   if(loggedIn){
    nav('/')
   }

  return (
    <div>
      <h1>Signup Page</h1>
      <form>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            label="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            label="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          type="submit"
          onClick={onSubmit}
        >
          Log In
        </button>
      </form>
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
