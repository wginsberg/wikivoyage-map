import { Link } from "react-router-dom"
import usePersistentState from "./hooks/usePersistentState"
import { GEOLOCATION_OPTION } from "./constants.js"

function Settings() {
    const [location, setLocation] = usePersistentState(GEOLOCATION_OPTION, false)
    const handleLocationChange = () => setLocation(!location)
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
                    <span>Show my location on the map</span>
                    <input type="checkbox" checked={!!location} onChange={handleLocationChange} />
                </label>
            </form>
        </div>
    )
}

export default Settings
