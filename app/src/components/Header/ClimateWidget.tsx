import { type Node } from "../../types";
import React, { Suspense } from "react";
import useFormattedTime from "~hooks/useFormattedTime";
import { Forecast, weatherDescriptions, weatherEmoji } from "app/utils/climate";
import { Await } from "@remix-run/react";
import { TimezoneResponse } from "app/utils/timezone";

type ClimateWidgetComponentProps = {
    nodeId: string,
    node: Node
    forecast: Promise<Forecast>
    timezone: Promise<TimezoneResponse>
  }

function ClimateWidget({ nodeId, node, forecast, timezone }: ClimateWidgetComponentProps) {
    return (
        <div style={{ margin: "auto", width: "280px" }}>
            <ForecastWidget nodeId={nodeId} node={node}forecast={forecast} />
            <LocalTimeWidget nodeId={nodeId} timezone={timezone} />
        </div>
    )
}

function ForecastWidget({ nodeId, node, forecast }: { nodeId: string, node: Node, forecast?: Promise<Forecast> }) {
    return (
        <Suspense key={nodeId} fallback={<><Shimmer width="40%" /><Shimmer width="75%" /></>}>
            <Await resolve={forecast}>
                {
                    forecast => (
                        <div>
                            <p style={{ textAlign: "center" }}>Current conditions in <strong style={{ whiteSpace: "nowrap" }}>{node.title}</strong>:</p>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <div
                                    style={{ marginRight: "10px" }}
                                    title={forecast?.current.weather_code ? weatherDescriptions[forecast?.current.weather_code] : ''}
                                >
                                    {forecast?.current.weather_code ? weatherEmoji[forecast?.current.weather_code] : ''}
                                </div>
                                <div>
                                    {`${forecast?.current.temperature_2m}`}{forecast?.current_units.temperature_2m}
                                </div>
                            </div>
                            <p style={{ textAlign: "center" }}>Altitude:</p>
                            <p style={{ textAlign: "center" }}>{`${forecast?.elevation}`}m</p>
                        </div>
                    )
                }
            </Await>
        </Suspense>
    )
}

function LocalTimeWidget({ nodeId, timezone }: { nodeId: string, timezone?: Promise<TimezoneResponse>}) {
    return (
        <Suspense key={nodeId} fallback={<><Shimmer width="30%" /></>}>
            <Await resolve={timezone}>
                {
                    timezone => (
                        timezone && <LocalTimeWidgetConcrete nodeId={nodeId} timezone={timezone} />
                    )
                }
            </Await>
        </Suspense>
    )
}

function LocalTimeWidgetConcrete({ nodeId, timezone }: { nodeId: string, timezone: TimezoneResponse}) {
    const localTime = useFormattedTime(timezone.zoneName)
    return <LocalTime>
        <p style={{ textAlign: "center" }}>
            Local time:
        </p>
        <p style={{ textAlign: "center" }}>
            {localTime}
        </p>
    </LocalTime>
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
