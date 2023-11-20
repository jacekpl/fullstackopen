import PropTypes from "prop-types";
const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                <label className="block">username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                <label className="block">password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit" id="login-button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded my-1">
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
