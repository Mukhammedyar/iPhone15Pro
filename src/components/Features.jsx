import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { animateWithGsap } from '../utils/animations'
import { explore1Img, explore2Img, exploreVideo } from '../utils'
import gsap from 'gsap'

const Features = () => {
  const videoRef = useRef()

  useGSAP(() => {
    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: "play pause reverce restart",
        start: "-10% bottom",
      },
      onComplete: () => { 
        videoRef.current.play();
      }
    });
    animateWithGsap('#features_title', { y: 0, opacity: 1 })
    animateWithGsap(".g_grow", {
      scale: 1, 
      opacity: 1, 
      ease: "power1"
    }, { scrub: 5.5 })
    animateWithGsap('.g_text', {
      y: 0, 
      opacity: 1, 
      ease: 'power2.inOut',
      duration: 0.7,
      stagger: 0.25
    })
  }, [])

  return (
    <section id='fatures' className='w-full common-padding bg-zinc relative overflo-hidden'>
        <div className="screen-max-width">
          <div className="mb-12 w-full">
            <h1 id='features_title' className='section-heading'>Explore the full story.</h1>
          </div>
          <div className="flex flex-col justify-center items-center overflow-hidden">
            <div className="mt-32 mb-24 px-24">
              <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone.</h2>
              <h2 className='text-5xl lg:text-7xl font-semibold'>Forged in titanium.</h2>
            </div>
          </div>
          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video 
                playsInline 
                id='exploreVideo' 
                className='w-full h-full object-cover object-center' 
                preload='none' 
                muted 
                autoPlay ref={videoRef}>
              <source src={exploreVideo} type='video/mp4'/>
              </video>
            </div>
            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore1Img} alt="titanium" className='feature-video g_grow'/>
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore2Img} alt="titanium" className='feature-video g_grow'/>
                </div>
              </div>
              <div className="flex-1 flex-col gap-5 sm:flex-row flex-center pt-10">
                <p className="feature-text g_text">
                  iPhone 15 Pro is {' '}
                  <span className='text-white'>the firt iPhone to featue an aeorosapace-grade titanium design, </span>
                  using the same alloy that spacecraft use for missions to Mars.
              </p>
              <p className="feature-text g_text">
                  Titanium has one of the best strength-to-weight ratios of any metal, raking these our {' '}
                  <span className='text-white'>lightest Pro models ever.</span>
                  You'll notice the difference the moment you pick one up.
                </p>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Features