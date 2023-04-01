import { useRef } from "react";
import "./about.scss";
import { aboutArr } from "../assets/about/aboutArr";
import { Link } from "react-router-dom";
import fullLogo from "../assets/navbar/geek-gazette-high-resolution-logo-white-on-transparent-background.png"

interface AboutArr {
    p: string;
    avatar: string | undefined;
    tag: string;
}
export const About = () => {
    aboutArr[1].avatar = fullLogo;
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={scrollRef} className="about">
            {aboutArr.map(({ avatar, tag, p, link }) => {
                return (
                    <article className="about-article">
                        <header className="about-header">
                            <img
                                style={{ objectFit: tag === "geek gazette" ? "contain" : "fill" }}
                                className="about-avatar"
                                src={typeof avatar === 'string' ? avatar : avatar.fullLogo}
                                alt={tag}
                            />


                        </header>
                        <main className="about-main">
                            <h4 onClick={() => {
                                (scrollRef.current?.scrollHeight !== undefined)
                                    && window.scrollTo(0, scrollRef.current?.scrollHeight);
                            }}
                                className="about-tag"
                            >
                                About <Link to={link}><span>{` ${tag}`}</span></Link>
                            </h4>
                            <p className="about-body">{p}</p>
                        </main>
                    </article>
                )
            })}

        </section>
    )
}
