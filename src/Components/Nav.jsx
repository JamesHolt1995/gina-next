"use client"

import { useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { urlFor } from '@/Client';
import Link from 'next/link'

export default function Nav({ timeIndex, siteData, navData }) {

    const [tl, setTl] = useState();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            setTl(tl);
        });
        return () => ctx.revert();
    }, [siteData]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            tl && tl.from(".gsap-nav", {
                opacity: 0,
                y: 50,
                duration: .5,
            }, timeIndex);
            tl && tl.from(".gsap-nav-links", {
                opacity: 0,
                y: 50,
                duration: .4,
                stagger: 0.1,
            }, timeIndex);
        });
        return () => ctx.revert();
    }, [timeIndex, siteData, tl]);

    return (
        <nav className="Nav">
            {siteData && navData && tl &&
                <>
                    <div className="Nav__logo gsap-nav">
                        <Link href="/">
                            <img
                                src={urlFor(siteData.logo).url()} alt="" />
                        </Link>
                    </div>

                    <ul className="Nav__menu">
                        {
                            navData.map(item => {
                                return (
                                    <li
                                        key={item._key}
                                        className="gsap-nav-links">
                                        <Link href="/">{item.text}</Link>
                                    </li>
                                )
                            })

                        }
                        {/* <li className="gsap-nav-links">
                            <Link href="/">Services</Link>
                        </li>
                        <li className="gsap-nav-links">
                            <Link href="/">About</Link>
                        </li>
                        <li className="gsap-nav-links">
                            <Link href="/">Work</Link>
                        </li>
                        <li className="gsap-nav-links">
                            <Link href="/">Contact</Link>
                        </li> */}
                    </ul>
                </>
            }
        </nav>
    )
}