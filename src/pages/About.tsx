import "./about.scss";
import { aboutArr } from "../assets/about/aboutArr";

interface AboutArr  {
    p:string;
    avatar:string|undefined;
    tag:string;
}
export const About = () => {

    return (
        <section className="about">
            {aboutArr.map(({ avatar, tag, p }) => {
                return (
                    <article className="about-article">
                        <header className="about-header">
                            <img
                                className="dev-avatar"
                                src={avatar}
                                alt={tag}
                            />
                            <h4 className="about-tag">{`About the ${tag}`}</h4>

                        </header>
                        <main>
                            <p>{p}</p>
                        </main>
                    </article>
                )
            })}

        </section>
    )
}
