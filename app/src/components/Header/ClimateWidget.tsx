import useOpenMeto, { type Forecast } from "~hooks/useOpenMeto";
import { type Node } from "../../types";
import React from "react";
import useTimezone, { TimezoneResponse } from "~hooks/useTimezone";
import useFormattedTime from "~hooks/useFormattedTime";

type ClimateWidgetComponentProps = {
    node: Node
  }

function ClimateWidget({ node }: ClimateWidgetComponentProps) {
    const forecast = useOpenMeto(node)
    const timezone = useTimezone(node)

    return (
        <div style={{ margin: "auto", width: "280px" }}>
            <ForecastWidget forecast={forecast} />
            <LocalTimeWidget timezone={timezone} />
        </div>
    )
}

function ForecastWidget({ forecast }: { forecast?: Forecast }) {
    if (!forecast) {
        return (
            <>
                <Shimmer width="40%" />
                <Shimmer width="75%" />
            </>
        )
    }
    return (
        <>
            <p>Current temperature: {`${forecast?.current.temperature_2m}`}{forecast?.current_units.temperature_2m}</p>
            <p>Altitude: {`${forecast?.elevation}`}m</p>
        </>
    )
}

function LocalTimeWidget({ timezone }: { timezone?: TimezoneResponse}) {
    const localTime = useFormattedTime(timezone?.zoneName)
    if (!timezone) return <LocalTime><Shimmer width="50%" /></LocalTime>
    return <LocalTime>Local time: {localTime}</LocalTime>
}

function CurrentTemperature({ children }: React.ComponentProps<'p'>) {
    return children
}

function Altitude({ children }: React.ComponentProps<'p'>) {
    return children
}

function LocalTime({ children }: React.ComponentProps<'p'>) {
    return children
}

function Shimmer({ width }: { width: string }) {
    return <p className="shimmer" style={{ width }}>&nbsp;</p>
}

export default ClimateWidget
