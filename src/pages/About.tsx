import "./about.scss";
import { aboutArr } from "../assets/about/aboutArr";
import fullLogo from "../assets/navbar/geek-gazette-high-resolution-logo-white-on-transparent-background.png"

interface AboutArr {
    p: string;
    avatar: string | undefined;
    tag: string;
}
export const About = () => {
    aboutArr[1].avatar = fullLogo;

    return (
        <section className="about">
            {aboutArr.map(({ avatar, tag, p }) => {
                return (
                    <article className="about-article">
                        <header className="about-header">
                            <img
                                className="about-avatar"
                                src={avatar}
                                alt={tag}
                            />


                        </header>
                        <main className="about-main">
                            <h4 className="about-tag">{`About the ${tag}`}</h4>
                            <p>{p}</p>
                        </main>
                    </article>
                )
            })}

        </section>
    )
}
