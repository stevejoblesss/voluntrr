import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();

  console.log({name, username, email, password, confirmPassword});

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, confirmPassword).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

  }

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

    if (loggedIn) {
      nav("/");
    }

        const handleGoogleSignIn = async () => {
          try {
            await signInWithPopup(auth, googleProvider);
          } catch (error) {
            console.error("Error signing in with Google: ", error);
          }
        };


  return (
    <div>
      <h1>Signup Page</h1>
      <form>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="string"
            label="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="">Username</label>
          <input
            type="string"
            label="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
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
        <div>
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            label="cpassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          type="submit"
          onClick={onSubmit}
        >
          Sign Up
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

export default SignupPage;
