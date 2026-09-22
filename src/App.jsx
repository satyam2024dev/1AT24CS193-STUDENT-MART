import { useState } from "react";
import "./App.css";

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [loggedIn, setLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [activePage, setActivePage] = useState("Dashboard");

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!email || !password) {
            setMessage("Please fill all required fields.");
            return;
        }

        if (!isLogin && !name) {
            setMessage("Please enter your name.");
            return;
        }

        try {
            const url = isLogin
                ? "http://localhost:5000/api/login"
                : "http://localhost:5000/api/register";

            const body = isLogin
                ? { email, password }
                : { name, email, password };

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();

            if (!response.ok) {
                setMessage(result.message);
                return;
            }

            if (isLogin) {
                localStorage.setItem(
                    "token",
                    result.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                );

                setLoggedIn(true);
            } else {
                setMessage(
                    "Registration successful! Please login."
                );

                setIsLogin(true);
                setName("");
                setPassword("");
            }

        } catch (error) {
            setMessage(
                "Unable to connect to server."
            );
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setLoggedIn(false);
        setActivePage("Dashboard");
    };

    // ================= AUTH SCREEN =================

    if (!loggedIn) {
        return (
            <div className="auth-container">

                <div className="auth-left">
                    <div className="brand">
                        <div className="brand-icon">S</div>
                        <span>StudentMart</span>
                    </div>

                    <div className="hero-content">
                        <h1>
                            Everything students
                            <span> need, in one place.</span>
                        </h1>

                        <p>
                            Buy, sell and discover useful
                            products with your student
                            community.
                        </p>

                        <div className="features">
                            <div>
                                <span>✓</span>
                                Easy to use
                            </div>

                            <div>
                                <span>✓</span>
                                Student friendly
                            </div>

                            <div>
                                <span>✓</span>
                                Secure authentication
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-right">

                    <div className="auth-card">

                        <div className="mobile-brand">
                            <div className="brand-icon">S</div>
                            StudentMart
                        </div>

                        <div className="auth-heading">
                            <h2>
                                {isLogin
                                    ? "Welcome back 👋"
                                    : "Create your account"}
                            </h2>

                            <p>
                                {isLogin
                                    ? "Login to continue to StudentMart"
                                    : "Join your student marketplace today"}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>

                            {!isLogin && (
                                <div className="input-group">
                                    <label>Full Name</label>

                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                            )}

                            <div className="input-group">
                                <label>Email Address</label>

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </div>

                            <div className="input-group">
                                <label>Password</label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            {message && (
                                <div className="message">
                                    {message}
                                </div>
                            )}

                            <button
                                className="primary-btn"
                                type="submit"
                            >
                                {isLogin
                                    ? "Login to Dashboard"
                                    : "Create Account"}
                            </button>

                        </form>

                        <div className="switch-auth">

                            {isLogin
                                ? "Don't have an account?"
                                : "Already have an account?"}

                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setMessage("");
                                }}
                            >
                                {isLogin
                                    ? "Create account"
                                    : "Login"}
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    // ================= DASHBOARD =================

    return (
        <div className="dashboard">

            {/* SIDEBAR */}

            <aside className="sidebar">

                <div className="sidebar-brand">
                    <div className="brand-icon">S</div>
                    <span>StudentMart</span>
                </div>

                <nav>

                    <button
                        className={
                            activePage === "Dashboard"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage("Dashboard")
                        }
                    >
                        <span>⌂</span>
                        Dashboard
                    </button>

                    <button
                        className={
                            activePage === "Marketplace"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage("Marketplace")
                        }
                    >
                        <span>🛍</span>
                        Marketplace
                    </button>

                    <button
                        className={
                            activePage === "Messages"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage("Messages")
                        }
                    >
                        <span>💬</span>
                        Messages
                    </button>

                    <button
                        className={
                            activePage === "Orders"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage("Orders")
                        }
                    >
                        <span>📦</span>
                        My Orders
                    </button>

                    <button
                        className={
                            activePage === "Profile"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage("Profile")
                        }
                    >
                        <span>👤</span>
                        Profile
                    </button>

                </nav>

                <div className="sidebar-bottom">

                    <button
                        className="nav-item logout"
                        onClick={logout}
                    >
                        <span>↪</span>
                        Logout
                    </button>

                </div>

            </aside>


            {/* MAIN CONTENT */}

            <main className="main-content">

                <header className="topbar">

                    <div>
                        <h2>{activePage}</h2>
                        <p>
                            Welcome back,{" "}
                            {user.name || "Student"}!
                        </p>
                    </div>

                    <div className="profile-mini">

                        <div className="avatar">
                            {(user.name || "S")
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>
                            <strong>
                                {user.name || "Student"}
                            </strong>

                            <small>
                                {user.email}
                            </small>
                        </div>

                    </div>

                </header>


                {activePage === "Dashboard" && (
                    <>

                        {/* WELCOME CARD */}

                        <section className="welcome-card">

                            <div>
                                <span className="welcome-label">
                                    STUDENTMART
                                </span>

                                <h1>
                                    Your student
                                    <br />
                                    marketplace is ready.
                                </h1>

                                <p>
                                    Discover products,
                                    connect with students
                                    and manage your activity.
                                </p>

                                <button
                                    onClick={() =>
                                        setActivePage(
                                            "Marketplace"
                                        )
                                    }
                                    className="white-btn"
                                >
                                    Explore Marketplace →
                                </button>
                            </div>

                            <div className="welcome-shape">
                                🛍️
                            </div>

                        </section>


                        {/* STATISTICS */}

                        <section className="stats-grid">

                            <div className="stat-card">
                                <div className="stat-icon purple">
                                    🛍
                                </div>

                                <div>
                                    <p>Available Items</p>
                                    <h2>248</h2>
                                </div>

                                <span className="growth">
                                    +12%
                                </span>
                            </div>


                            <div className="stat-card">
                                <div className="stat-icon blue">
                                    📦
                                </div>

                                <div>
                                    <p>My Orders</p>
                                    <h2>12</h2>
                                </div>

                                <span className="growth">
                                    +4
                                </span>
                            </div>


                            <div className="stat-card">
                                <div className="stat-icon green">
                                    💰
                                </div>

                                <div>
                                    <p>Money Saved</p>
                                    <h2>₹8,450</h2>
                                </div>

                                <span className="growth">
                                    +18%
                                </span>
                            </div>


                            <div className="stat-card">
                                <div className="stat-icon orange">
                                    ❤️
                                </div>

                                <div>
                                    <p>Wishlist</p>
                                    <h2>16</h2>
                                </div>

                                <span className="growth">
                                    +3
                                </span>
                            </div>

                        </section>


                        {/* LOWER SECTION */}

                        <section className="dashboard-grid">

                            <div className="panel">

                                <div className="panel-header">
                                    <div>
                                        <h3>Recent Activity</h3>
                                        <p>
                                            Your latest activity
                                        </p>
                                    </div>

                                    <button>
                                        View all
                                    </button>
                                </div>


                                <div className="activity">

                                    <div className="activity-icon">
                                        📦
                                    </div>

                                    <div>
                                        <strong>
                                            Order placed
                                        </strong>

                                        <p>
                                            Engineering Calculator
                                        </p>

                                        <small>
                                            2 hours ago
                                        </small>
                                    </div>

                                    <b>₹450</b>

                                </div>


                                <div className="activity">

                                    <div className="activity-icon">
                                        ❤️
                                    </div>

                                    <div>
                                        <strong>
                                            Item added to wishlist
                                        </strong>

                                        <p>
                                            Scientific Calculator
                                        </p>

                                        <small>
                                            Yesterday
                                        </small>
                                    </div>

                                    <b>♡</b>

                                </div>


                                <div className="activity">

                                    <div className="activity-icon">
                                        🛍
                                    </div>

                                    <div>
                                        <strong>
                                            Marketplace visit
                                        </strong>

                                        <p>
                                            5 products viewed
                                        </p>

                                        <small>
                                            2 days ago
                                        </small>
                                    </div>

                                    <b>→</b>

                                </div>

                            </div>


                            <div className="panel quick-panel">

                                <div className="panel-header">
                                    <div>
                                        <h3>Quick Actions</h3>
                                        <p>
                                            Get things done faster
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        setActivePage(
                                            "Marketplace"
                                        )
                                    }
                                    className="quick-action"
                                >
                                    <span>🛍️</span>

                                    <div>
                                        <strong>
                                            Browse Marketplace
                                        </strong>

                                        <small>
                                            Find student products
                                        </small>
                                    </div>

                                    →
                                </button>


                                <button className="quick-action">
                                    <span>📦</span>

                                    <div>
                                        <strong>
                                            View My Orders
                                        </strong>

                                        <small>
                                            Track your purchases
                                        </small>
                                    </div>

                                    →
                                </button>


                                <button
                                    onClick={() =>
                                        setActivePage(
                                            "Profile"
                                        )
                                    }
                                    className="quick-action"
                                >
                                    <span>👤</span>

                                    <div>
                                        <strong>
                                            Edit Profile
                                        </strong>

                                        <small>
                                            Manage your account
                                        </small>
                                    </div>

                                    →
                                </button>

                            </div>

                        </section>

                    </>
                )}


                {/* MARKETPLACE */}

                {activePage === "Marketplace" && (
                    <section className="page-section">

                        <div className="page-title">
                            <h1>Marketplace 🛍️</h1>
                            <p>
                                Discover useful products
                                from students.
                            </p>
                        </div>

                        <div className="product-grid">

                            {[
                                ["📚", "Engineering Books", "₹350"],
                                ["🧮", "Scientific Calculator", "₹450"],
                                ["💻", "Laptop Stand", "₹800"],
                                ["🎧", "Wireless Headphones", "₹1,200"],
                                ["🎒", "College Backpack", "₹650"],
                                ["⌨️", "Mechanical Keyboard", "₹1,500"]
                            ].map((product, index) => (

                                <div
                                    className="product-card"
                                    key={index}
                                >

                                    <div className="product-image">
                                        {product[0]}
                                    </div>

                                    <h3>{product[1]}</h3>

                                    <p>
                                        Available from
                                        student sellers
                                    </p>

                                    <div className="product-bottom">
                                        <strong>
                                            {product[2]}
                                        </strong>

                                        <button>
                                            View
                                        </button>
                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>
                )}


                {/* MESSAGES */}

                {activePage === "Messages" && (
                    <section className="empty-page">
                        <div>💬</div>
                        <h1>Messages</h1>
                        <p>
                            Your student conversations
                            will appear here.
                        </p>
                    </section>
                )}


                {/* ORDERS */}

                {activePage === "Orders" && (
                    <section className="empty-page">
                        <div>📦</div>
                        <h1>My Orders</h1>
                        <p>
                            Your orders will appear here.
                        </p>
                    </section>
                )}


                {/* PROFILE */}

                {activePage === "Profile" && (
                    <section className="profile-page">

                        <div className="profile-card">

                            <div className="large-avatar">
                                {(user.name || "S")
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <h1>
                                {user.name || "Student"}
                            </h1>

                            <p>{user.email}</p>

                            <span className="verified">
                                ✓ Account Verified
                            </span>

                        </div>

                        <div className="profile-details">

                            <h2>Account Information</h2>

                            <div className="detail">
                                <span>Name</span>
                                <strong>
                                    {user.name || "Student"}
                                </strong>
                            </div>

                            <div className="detail">
                                <span>Email</span>
                                <strong>
                                    {user.email}
                                </strong>
                            </div>

                            <div className="detail">
                                <span>Account Status</span>
                                <strong>
                                    Active
                                </strong>
                            </div>

                        </div>

                    </section>
                )}

            </main>

        </div>
    );
}

export default App;