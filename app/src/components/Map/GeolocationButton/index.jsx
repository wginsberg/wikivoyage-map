function GeolocationButton(props) {
    const { onClick } = props

    return (
        <button onClick={onClick} className="geolocation leaflet-bar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="midnightblue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6"/>
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.22" y1="12" x2="7.78" y2="12" />
                <line x1="16.22" y1="12" x2="19.78" y2="12" />
                <line x1="12" y1="4.22" x2="12" y2="7.78" />
                <line x1="12" y1="16.22" x2="12" y2="19.78" />
            </svg>
        </button>
    )
}

export default GeolocationButton
