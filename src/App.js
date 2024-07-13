import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/firebase';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  //state to check if logged in
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  //check if logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        const uid = user.uid;
        console.log("uid", uid);
        setLoggedIn(true);
        setUser(user);
      }
      else{
        console.log("loggedout")
      }
    })
  })
  //signout
  const handleLogout = () => {
    signOut(auth).then(() => {
      setLoggedIn(false);
      console.log("logged out successfully");
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <>
      <h1 className="text-lg">Hello World</h1>
      {/* firebase user data */}
      <p className="text-sm">{user?.uid || "kys"}</p>
      <p className="text-sm">{user?.email || "kys"}</p>
      <p className="text-sm">{user?.displayName || "none"}</p>
      <p className="text-sm">
        {user?.providerData ? JSON.stringify(user?.providerData) : "none"}
      </p>
      <p className="text-sm">
        {user?.providerId ? JSON.stringify(user?.providerId) : "none"}
      </p>
      <p className="text-sm">
        {user?.metadata ? JSON.stringify(user?.metadata) : "none"}
      </p>
      {user?.photoURL && (
        <img
          src={user?.photoURL}
          alt="User Profile"
          className="w-16 h-16"
        />
      )}
      {/* logout button */}
      {loggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          logout nigg
        </button>
      ) : (
        <h1>Logged Out</h1>
      )}
    </>
  );
}

export default App;
