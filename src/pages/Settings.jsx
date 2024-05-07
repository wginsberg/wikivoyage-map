import { Link } from "react-router-dom"
import usePersistentState from "~hooks/usePersistentState"
import useResetScrollPosition from "~hooks/useResetScrollPosition"
import { GEOLOCATION_OPTION } from "~constants"
import BuyMeACoffee from "~components/Support/BuyMeACoffee"

function Settings() {
    useResetScrollPosition()
    const [location, setLocation] = usePersistentState(GEOLOCATION_OPTION, false)
    const handleLocationChange = () => setLocation(!location)

    return (
        <div className="settings page">
            <div>
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
            <BuyMeACoffee />
        </div>
    )
}

export default Settings
