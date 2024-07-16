import { describe, it, expect } from 'vitest'
import { getFirstSentence, hasCities } from "./util";

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

describe("getFirstSentence", () => {
    it("handles Sault Sainte Marie (Ontario)", () => {
        const actual = getFirstSentence(`
        {{pagebanner|Sault waterfront in winter 2 (cropped).JPG|pgname=Sault Ste. Marie}}
'''[https://saulttourism.com/ Sault Ste. Marie]''' is a city of approximately 72,000 people (2021), in [[Northern Ontario]]. It is the beginning and end point of the Agawa Canyon Tour Train. Directly across the St. Mary's River -- and the [[Canada]]/[[United States of America|US]] border -- is its twin city, [[Sault Ste. Marie (Michigan)|Sault Ste. Marie]], [[Michigan]].
        `)

        const expected = "Sault Ste. Marie is a city of approximately 72,000 people (2021), in Northern Ontario."

        expect(actual).toEqual(expected)
    })

    it("handles Mazunte", () => {
        const actual = getFirstSentence(`
        {{pagebanner|Mazunte_beach_from_the_Turtle_Center_(cropped).jpg}}
        '''Mazunte''' is a small beach village on the [[Pacific Coast (Mexico)|Pacific Coast]] in [[Oaxaca (state)|Oaxaca]].
        
        [[File:PuntaCometaDusk.JPG|thumbnail|The main beach with Punta Cometa in the background]]
        
        == Understand ==
        
        Mazunte is a quiet town next to a small but wonderful beach. Mazunte is a common stop on the [[Pacific Coast (Mexico)|Pacific Coast]] Backpacker Trail. The town remains fairly typical and only has a small collection of hostels, hotels and restaurants to service tourists. Most accommodation in town is quite basic, however there are a couple of luxury places available in the hills. There are a number of restaurants near the beach serving good quality (albeit expensive) food. Mazunte has a number of small but worthy attractions including the National Mexican Turtle Centre and Natural Cosmetics Centre. The main beach is not known for surfing however skim boarding and snorkelling are common activities on the beach. 
        `)

        const expected = "Mazunte is a small beach village on the Pacific Coast in Oaxaca."

        expect(actual).toEqual(expected)
    })

    it("handles St. Clairsville", () => {
        const actual = getFirstSentence(`
        {{pagebanner|Belmont County Courthouse (2) (10319131476) (Wikivoyage).jpg|pgname=St. Clairsville}}

        '''[https://www.visitbelmontcounty.com/ St. Clairsville]''' is a city of 5,100 people (2020) in western [[Belmont County (Ohio)|Belmont County]], [[Ohio]]. The city serves as the county seat.
        
        ==Understand==
        
        * {{listing
        | name=Chamber Of Commerce | alt= | url=http://www.stcchamber.com | email=
        | address=133 East Main Street | lat= | long= | directions=
        | phone=+1 740-695-9623 | tollfree= | fax=
        | hours= | price=
        | content=
        }}
        
        ==Get in==
        {{mapframe|40.079444|-80.901389|zoom=13}}
        
        US Route 40 runs through the city east and west. It connects to Interstate 70.  St. Clairsville can be accessed from the following Interstate 70 exits: 215, 216, and 218.
        
        The nearest major commercial airport is Pittsburgh International Airport, and the nearest general aviation airport is Wheeling Ohio County Airport.
        
        ==Get around==
        There is no public transportation; those traveling the area must use a car to to get around. If you are in downtown, walking may be preferred.        
        `)

        const expected = "St. Clairsville is a city of 5,100 people (2020) in western Belmont County, Ohio."

        expect(actual).toEqual(expected)
    })
})