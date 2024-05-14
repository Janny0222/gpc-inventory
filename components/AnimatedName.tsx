import React, { useEffect, useRef } from 'react';
import anime from 'animejs'; // Import anime.js library
import { lato } from '@/styles/font';

export default function AnimatedName() {
    const textRef = useRef<HTMLSpanElement>(null); // Use ref with an explicit type for the DOM element

    useEffect(() => {
        // Ensure textWrapper is accessed after the component is mounted
        const textWrapper = textRef.current;
        
        if (textWrapper && textWrapper.textContent) {
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
            
            anime.timeline({ loop: true })
                .add({
                    targets: '.ml7 .letter',
                    translateY: ["1.1em", 0],
                    translateX: ["0.55em", 0],
                    translateZ: 0,
                    rotateZ: [180, 0],
                    duration: 750,
                    easing: "easeOutExpo",
                    delay: (el, i) => 50 * i
                }).add({
                    targets: '.ml7',
                    opacity: 0,
                    duration: 1000,
                    easing: "easeOutExpo",
                    delay: 1000
                });
        }
    }, []);

    return (
        <div className='absolute left-5 top-2'>
            <h1 className='ml7'>
                <span className='text-wrapper font-bold text-slate-50'>
                    <span ref={textRef} className={`letters font-bold text-slate-50 ${lato.className}`}>Greenstone</span>
                </span>
            </h1>
        </div>
    );
}
