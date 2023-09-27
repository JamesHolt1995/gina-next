"use client"
import Image from 'next/image'
import { urlFor } from '@/Client';
import { useRef } from 'react';
import { gsap } from "gsap";
import { useLayoutEffect, useState } from "react";

export default function Hero({ data, timeIndex }) {
    const comp = useRef();

    // const [data, setdata] = useState(null);
    const [tl, setTl] = useState();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            setTl(tl);
        });
        return () => ctx.revert();
    }, [data]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            tl && tl.from(".gsap-in", {
                opacity: 0,
                y: 50,
                duration: .8,
                stagger: 0.4
            }, timeIndex);
        });
        return () => ctx.revert();
    }, [tl, data, timeIndex]);


    return (
        <div ref={comp} className="Hero">

            {data && tl &&
                <>
                    <img
                        className="Hero__img"
                        src={urlFor(data.bgImage).url()}
                        alt=""
                    />
                    <div className="Hero__content gsap-in">
                        <h1 className="Hero__title gsap-in">
                            {data.title}
                        </h1>
                        <p className="Hero__description gsap-in">
                            {data.description}
                        </p>
                        <div className="Hero__badge gsap-in">
                            <img
                                className="Hero__badge-svg"
                                src={urlFor(data.badge).url()}
                                alt=""
                            />
                            <p className="Hero__badge-text">{data.badgeText}</p>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}