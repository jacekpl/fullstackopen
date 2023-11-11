import PropTypes from "prop-types";
const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    id="username"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    id="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit" id="login-button">
                login
            </button>
        </form>
    );
};

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
