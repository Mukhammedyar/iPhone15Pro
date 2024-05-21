import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export default function AnimationButton({section1, section2, items, children, className, circleWidth, width, height, translateX, display, onClick}) {
    const buttonRef = useRef(null);

    
    useEffect(() => {
      const button = buttonRef.current;

      // Show button when scrolling past 70% of section 1
      ScrollTrigger.create({
        trigger: section1,
        start: "100% 50%",
        onEnter: () => {
          gsap.fromTo(button,
            { width: '0px', height: '0px', autoAlpha: 0, pointerEvents: 'none' },
            { width: circleWidth, height: circleWidth, autoAlpha: 1, pointerEvents: 'all', delay: 0.3, border: display ? "0px solid gray": "10px solid #147CE5", }
          );
          gsap.to(button, {
            position: 'fixed',
            bottom: '50px',
            translateX: 0,
            border: '0px solid #147CE5',
          });
          gsap.to(button, {
            width: width,
            height: height,
            opacity: 1,
            border: "0px solid #147CE5",
            delay: 0.8,
            display: display ? display : '',
            translateX: translateX ? translateX : 0,
          });
          gsap.to(items, {
            delay: 1.2,
            duration: 0.5,
            padding: display ? "10px": "0px",
          });
        },
        onLeaveBack: () => {
          gsap.to(items, {
            display: 'none',
            duration: 0.7
          });
          gsap.to(button, {
            width: circleWidth,
            height: circleWidth,
            translateX: 0,
            delay: 0.7,
          });
          gsap.to(button, {
            width: '0px',
            height: '0px',
            border: "0px solid #147CE5",
            delay: 1.2
          });
        }
      });

      // Hide button when reaching the end of section 2
      ScrollTrigger.create({
        trigger: section2,
        start: "70% 70%",
        onEnter: () => {
          gsap.to(button, {
            position: 'static',
            translateX: 0,
            display: display ? display : '',
            duration: 0.5,
          });
          gsap.to(items, {
            padding: display ? "10px" : "0px",
          })
        },
        onLeaveBack: () => {
          gsap.to(button, {
            position: 'fixed',
            translateX: translateX ? translateX : 0,
            display: display ? display : '',
            bottom: '50px',
          });
        }
      });
      // Hide button when reaching the end of section 2
      ScrollTrigger.create({
        trigger: section2,
        start: "110% 100%",
        onEnter: () => {
          gsap.to(button, {
            position: 'static',
            duration: 0.5,
          });
          gsap.to(button, {
            width: circleWidth,
            height: circleWidth,
            translateX: 0,
            delay: 0.8,
            border: "0px solid #147CE5"
          });
          gsap.to(button, {
            width: '0px',
            height: '0px',
            border: "0px solid #147CE5",
            delay: 1.2
          });
          gsap.to(items, {
            display: "none",
            padding: display ? "10px": "0px",
            delay: 0.3,
            duration: 0.5
          });
        },
        onLeaveBack: () => {
          gsap.fromTo(button,
            { width: '0px', height: '0px', autoAlpha: 0, pointerEvents: 'none' },
            { 
              width: circleWidth, 
              height: circleWidth, 
              autoAlpha: 1, 
              pointerEvents: 'all',
              delay: 0.5,
              border: display ? "0px solid gray" : "10px solid #147CE5"
            }
          );
          gsap.to(button, {
            position: 'static',
            duration: 0.5,
            border: "0px solid #147CE5"
          });
          gsap.to(button, {
            width: width,
            height: height,
            border: "0px solid #147CE5",
            display: display ? display : '',
            delay: 0.7
          });
          gsap.to(items, {
            display: "block",
            padding: display ? "10px": "0px",
            delay: 1.2,
            duration: 0.5
          });
        }
      });

  }, [section1, section2, items]);

  return (
    <div className='flex-center items-center' onClick={onClick}>
      <div ref={buttonRef} className={`flex-center items-center rounded-full ${className}`}>
          {children}
      </div>
    </div> 
  )
}
