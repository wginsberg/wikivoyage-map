import { test, expect } from "vitest"
import { getMapTileHost } from "./utils"

test('getMapTileHost returns the production URL', () => {
    const expected = "https://pub-5ba95de8cc2f4dada22bfe563b284734.r2.dev"

    const oldNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = "production"
    const actual = getMapTileHost()
    process.env.NODE_ENV = oldNodeEnv

    expect(actual).toEqual(expected)
})

test('getMapTileHost returns the development URL', () => {
    const expected = "/proxy"

    const oldNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = "development"
    const actual = getMapTileHost()
    process.env.NODE_ENV = oldNodeEnv

    expect(actual).toEqual(expected)
})