import { useState } from "react";

function App() {

    const [login, setLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            setMessage("Email and password are required");
            return;
        }

        if (!login && !name) {
            setMessage("Name is required");
            return;
        }

        try {

            const url = login
                ? "http://localhost:5000/api/login"
                : "http://localhost:5000/api/register";

            const data = login
                ? { email, password }
                : { name, email, password };

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            setMessage(result.message);

            if (login && response.ok) {

                localStorage.setItem(
                    "token",
                    result.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                );
            }

        } catch (error) {

            setMessage("Server connection failed");

        }
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setMessage("Logged out successfully");
    };

    return (
        <div>

            <h1>
                {login ? "Login" : "Register"}
            </h1>

            <form onSubmit={handleSubmit}>

                {!login && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                )}

                <br /><br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br /><br />

                <button type="submit">
                    {login ? "Login" : "Register"}
                </button>

            </form>

            <p>{message}</p>

            <button
                onClick={() => {
                    setLogin(!login);
                    setMessage("");
                }}
            >
                {login
                    ? "Create Account"
                    : "Already have an account? Login"}
            </button>

            <br /><br />

            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
}

export default App;