import { test, expect } from "vitest"
import { getFormattedName, parseFormattedName, isExternalReferrer } from "./utils"

test('getFormattedName returns the same URI fragment', () => {
    const actual = getFormattedName("Bogotá")
    const expected = "Bogotá"

    expect(actual).toEqual(expected)
})

test('getFormattedName replaces spaces', () => {
    const actual = getFormattedName("Greater Toronto Area")
    const expected = "Greater_Toronto_Area"

    expect(actual).toEqual(expected)
})

test('getFormattedName replaces ampersands', () => {
    const actual = getFormattedName("Blairgowrie & Rattray")
    const expected = "Blairgowrie_%26_Rattray"

    expect(actual).toEqual(expected)
})

test('parseFormattedName returns the same URI fragment', () => {
    const actual = parseFormattedName("Bogotá")
    const expected = "Bogotá"

    expect(actual).toEqual(expected)
})

test('parseFormattedName replaces underscores', () => {
    const actual = parseFormattedName("Greater_Toronto_Area")
    const expected = "Greater Toronto Area"

    expect(actual).toEqual(expected)
})

test('parseFormattedName adds ampersands', () => {
    const actual = parseFormattedName("Blairgowrie_%26_Rattray")
    const expected = "Blairgowrie & Rattray"

    expect(actual).toEqual(expected)
})
