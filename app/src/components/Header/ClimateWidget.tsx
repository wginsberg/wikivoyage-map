import { type Node } from "../../types";
import React, { Suspense } from "react";
import useFormattedTime from "~hooks/useFormattedTime";
import { Forecast, WeatherCode, weatherDescriptions, weatherEmoji } from "app/utils/climate";
import { Await } from "@remix-run/react";
import { TimezoneResponse } from "app/utils/timezone";

type ClimateWidgetComponentProps = {
    nodeId: string,
    node: Node
    forecast: Promise<Forecast>
    timezone: Promise<TimezoneResponse>
  }

function ClimateWidget({ nodeId, node, forecast, timezone }: ClimateWidgetComponentProps) {
    if (!nodeId) return ""

    return (
        <div style={{ margin: "0.5rem" }}>
            <h3 style={{ textAlign: "center", margin: "0.5rem" }}>
                Current conditions in <span style={{ textWrap: "nowrap", fontWeight: "bold" }}>{node.title}</span>
            </h3>
            <table className="climate">
                <thead>
                    <tr>
                        <th>Temperature</th>
                        <th>Weather</th>
                        <th>Altitude</th>
                        <th>Local time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Suspense key={nodeId} fallback={<Shimmer width="40%" />}>
                                <Await resolve={forecast}>
                                    {
                                        forecast => `${forecast?.current.temperature_2m} ${forecast?.current_units.temperature_2m}`
                                    }
                                </Await>
                            </Suspense>
                        </td>
                        <td>
                            <Suspense key={nodeId} fallback={<Shimmer width="75%" />}>
                                <Await resolve={forecast}>
                                    {
                                        forecast =>  <WeatherIcon weatherCode={forecast?.current.weather_code} />
                                    }
                                </Await>
                            </Suspense>
                        </td>
                        <td>
                            <Suspense key={nodeId} fallback={<Shimmer width="40%" />}>
                                <Await resolve={forecast}>
                                    {
                                        forecast =>  forecast?.elevation
                                            ? `${forecast.elevation} m`
                                            : ''
                                    }
                                </Await>
                            </Suspense>
                        </td>
                        <td>
                            <Suspense key={nodeId} fallback={<Shimmer width="60%" />}>
                                <Await resolve={timezone}>
                                    {
                                        timezone =>  <LocalClock timezone={timezone} />
                                    }
                                </Await>
                            </Suspense>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

function WeatherIcon({ weatherCode }: { weatherCode: WeatherCode }) {
    const emoji = weatherEmoji[weatherCode] || "❓"
    return (
        <span title={weatherDescriptions[weatherCode]}>
            {emoji}
        </span>
    )
}

function LocalClock({ timezone }: { timezone: TimezoneResponse}) {
    const localTime = useFormattedTime(timezone.zoneName)
    return localTime
}

function Shimmer({ width }: { width: string }) {
    return <div className="shimmer" style={{ width }}>&nbsp;</div>
}

export default ClimateWidget
