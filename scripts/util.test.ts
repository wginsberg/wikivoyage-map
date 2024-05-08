import { describe, it, expect } from 'vitest'
import { hasCities } from "./util";

describe("hasCities", () => {
    it("handles empty input", () => {
        const actual = hasCities()

        expect(actual).toEqual(false)
    })

    it("handles wikitext with no cities", () => {
        const actual = hasCities(`
            {{pagebanner|WV banner fake.jpg}}
            '''Not a real place''' is a department of [[Somewhere]].

            ==Cities==

            ==Other destinations==

            ==Understand==
            
            ==Get in==
        `)

        expect(actual).toEqual(false)
    })

    it("handles wikitext with cities", () => {
        const actual = hasCities(`
            {{pagebanner|WV banner fake.jpg}}
            '''Not a real place''' is a department of [[Somewhere]].

            ==Cities==
            {{mapframe}}

            [[Image:Museos Banco de la Republica.JPG|thumb|350px|Botero's museum at Banco de la República]]
            * [[Fake1]]
            * [[Fake2]]

            ==Other destinations==
        `)

        expect(actual).toEqual(true)
    })
})
