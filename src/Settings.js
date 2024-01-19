import { Link } from "react-router-dom"

function Settings() {
    return (
        <div className="settings">
            <header>
                <nav>
                    <Link to="/">Home</Link>
                </nav>
            </header>
            <h1>Settings</h1>
            <form>
                <label>
                    <p>Use current device location</p>
                    <input type="checkbox" />
                </label>
            </form>
        </div>
    )
}

export default Settings
