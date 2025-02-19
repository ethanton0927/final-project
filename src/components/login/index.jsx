import { useState } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await pb.collection("users").authWithPassword(username, password);

      if (pb.authStore.isValid) {
        window.location.pathname = "/Dashboard";
        // store these variables to use later
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("password", password);
      }
    } catch (error) {
      alert("couldn't log in.");
    }
  }
  return (
    <main className="bg-green-900 flex-grow">
      <div className="flex items-center justify-center h-[calc(100vh-136px)]">
        <div className="bg-red-800 text-white rounded-xl border-neutral-50 border-4 border-solid px-8 py-6 mt-4 text-left bg-grey-100 shadow-lg">
          <h3 className="text-2xl font-bold text-center">
            Log in to your account
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-neutral-50 hover:text-green-600"
                >
                  Login
                </button>
                <a
                  href="/Forgot"
                  className="text-sm text-white hover:underline hover:text-green-600"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
