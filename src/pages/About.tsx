import { Link } from "react-router-dom"
import BuyMeACoffee from "~/components/Support/BuyMeACoffee"

const About = () => {
    return (
    <div className="page">
            <div>
                <header>
                    <nav>
                        <Link to="/">Home</Link>
                    </nav>
                </header>
                <main>
                    <h1>About</h1>

                    <p>
                        This website is a simple map that I made for myself. Each point on the map is a page from <a href="https://www.wikivoyage.org/" rel="noopener noreferrer" target="_blank">https://www.wikivoyage.org/</a>, and all of the suggestions for where to go next come from the "Go next" section of that page.
                    </p>
                    <p>
                        The source code for this website is freely available <a href="https://github.com/wginsberg/wikivoyage-app
" rel="noopener noreferrer" target="_blank">here on Github</a>. The travel information on this website is re-distributable under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="noopener noreferrer" target="_blank">Creative Commons Attribution-ShareAlike 3.0 licence</a> and attribution should be given back directly to Wikivoyage.


                    </p>
                    <p>
                        If you have questions or feedback you can reach me <a href="mailto:will.j.ginsberg@gmail.com?subject=whereugo.ing">here</a>.
                    </p>
                </main>
            </div>
            <BuyMeACoffee />
        </div>
    )
}

export default About
