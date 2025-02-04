import { type Node } from "../../types";
import React, { Suspense } from "react";
import useFormattedTime from "~hooks/useFormattedTime";
import { Forecast } from "app/utils/climate";
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
            <ForecastWidget nodeId={nodeId} forecast={forecast} />
            <LocalTimeWidget nodeId={nodeId} timezone={timezone} />
        </div>
    )
}

function ForecastWidget({ nodeId, forecast }: { nodeId: string, forecast?: Promise<Forecast> }) {
    return (
        <Suspense key={nodeId} fallback={<><Shimmer width="40%" /><Shimmer width="75%" /></>}>
            <Await resolve={forecast}>
                {
                    forecast => (
                        <>
                            <p>Current temperature: {`${forecast?.current.temperature_2m}`}{forecast?.current_units.temperature_2m}</p>
                            <p>Altitude: {`${forecast?.elevation}`}m</p>
                        </>
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
