import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export default function AnimationButton({ item1, item2, section, circleWidth,circleHeight,longWidth, width, height, innerItem, children, className}) {
    
    useEffect(() => {

      // Show button when scrolling past 70% of section 1
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: 'top 5%',
        onEnter: () => {
          gsap.fromTo(item1,
            { width: '0px', height: '0px', autoAlpha: 0, pointerEvents: 'none', display: 'none' },
            { 
              width: circleWidth, 
              height: circleHeight, 
              autoAlpha: 1, 
              pointerEvents: 'all', 
              delay: 0.2, 
              border: "10px solid #147CE5", 
              display: "flex",
              translateX: 0
            }
          );
          gsap.fromTo(item2,
            { width: '0px', height: '0px', autoAlpha: 0, pointerEvents: 'none', translateX: '-65px', delay: 0.7, display: 'none' },
            { 
              width: longWidth, 
              height: circleHeight, 
              autoAlpha: 1, 
              pointerEvents: 'all', 
              delay: 0.7,
              display: "flex",
              translateX: 0
            }
          );
          gsap.to('.box', {
            position: 'fixed',
            bottom: '50px',
            border: '0px solid #147CE5',
          });
          gsap.to(item1, {
            width: width,
            height: height,
            border: "0px solid #147CE5",
            delay: 0.5,
          });
          gsap.to(innerItem, {
            display: 'flex',
            delay: 0.7,
            duration: 0.5,
          });
        },
        onLeaveBack: () => {
          gsap.to('.box', {
            position: 'fixed',
            bottom: '50px',
            border: '0px solid #147CE5',
          });
          gsap.to(innerItem, {
            display: 'none',
            delay: 0.2
          });
          gsap.to(item1, {
            width: circleWidth,
            height: circleWidth,
            translateX: 0,
            delay: 0.7,
          });
          gsap.to(item1, {
            width: '0px',
            height: '0px',
            border: "0px solid #147CE5",
            delay: 1.1, 
            translateX: 0
          });
          gsap.to(item2, {
            width: "60px",
            height: "60px",
            delay: 0.2,
            opacity: 0.3,
            ease: 'power2.in',
            translateX: '-65px',
            display: 'none'
          });
          gsap.to(item2, {
            width: '0px',
            height: '0px',
            border: "0px solid #147CE5",
            delay: 0.9, 
            translateX: '-25px'
          });
        }
      });

  //     // Hide button when reaching the end of section 2
      ScrollTrigger.create({
        trigger: section,
        start: "70% 70%",
        onEnter: () => {
          gsap.to('.box', {
            position: 'static',
            duration: 0.5,
          });
          gsap.to(item1, {
            width: width,
            height: height,
            border: "0px solid #147CE5",
            delay: 0.5,
          });
        },
        onLeaveBack: () => {
          gsap.to('.box', {
            position: 'fixed',
            bottom: '50px',
          });
        }
      });
  //     // Hide button when reaching the end of section 2
      ScrollTrigger.create({
        trigger: section,
        start: "110% 100%",
        onEnter: () => {
          gsap.to('.box', {
            position: 'static',
            duration: 0.5,
          });
          gsap.to(innerItem, {
            display: 'none',
            delay: 0.2
          });
          gsap.to(item1, {
            width: circleWidth,
            height: circleWidth,
            translateX: 0,
            delay: 0.7,
          });
          gsap.to(item1, {
            width: '0px',
            height: '0px',
            border: "0px solid #147CE5",
            delay: 1.1, 
            translateX: 0
          });
          gsap.to(item2, {
            width: "60px",
            height: "60px",
            delay: 0.2,
            opacity: 0.3,
            ease: 'power2.in',
            translateX: '-65px'
          });
          gsap.to(item2, {
            width: '0px',
            height: '0px',
            border: "0px solid #147CE5",
            delay: 0.9,
            display: "none",
            translateX: '-25px'
          });
        },
        onLeaveBack: () => {
          gsap.fromTo(item1,
            { width: '0px', height: '0px', autoAlpha: 0, pointerEvents: 'none' },
            { 
              width: circleWidth, 
              height: circleWidth, 
              autoAlpha: 1, 
              pointerEvents: 'all', 
              delay: 0.2, 
              border: "10px solid #147CE5", 
              display: "flex",
              translateX: 0
            }
          );
          gsap.fromTo(item2,
            { width: '0px', height: '0px', autoAlpha: 0, pointerEvents: 'none', translateX: '-65px', delay: 0.7 },
            { 
              width: longWidth, 
              height: circleHeight, 
              autoAlpha: 1, 
              pointerEvents: 'all', 
              delay: 0.7,
              display: "flex",
              translateX: 0
            }
          );
          gsap.to('.box', {
            position: 'static',
            bottom: '50px',
            border: '0px solid #147CE5',
          });
          gsap.to(item1, {
            width: width,
            height: height,
            border: "0px solid #147CE5",
            delay: 0.5,
          });
          gsap.to(innerItem, {
            display: 'flex',
            delay: 0.7,
            duration: 0.5,
          });
        }
      });

  }, [section, item1, item2]);

  return (
    <div className={`box ${className}`}>
      {children}
    </div>
  )
}
