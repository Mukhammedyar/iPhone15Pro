import gsap from "gsap";
import {useGSAP} from '@gsap/react'
import { hightlightsSlides } from "../constants";
import {useRef, useState, useEffect} from 'react'
import { pauseImg, playImg, replayImg } from "../utils";
import AnimationButton from "./AnimationButton";

export default function VideoCarousel() {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])
    const [video, setVideo] = useState({
        isEnd: false, 
        startPlay: false, 
        videoId: 0, 
        isLastVideo: false,
        isPlaying: false,
    })
    const [loadedData, setLoadedData] = useState([])

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video

    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })
        gsap.to('#video', {
            scrollTrigger: {
                trigger: "#video", 
                toggleActions: "restart none none none"
            },
            onComplete: () => { 
                setVideo((pre) => ({
                    ...pre, startPlay: true, 
                    isPlaying: true, 
                }))
            }
         })
     }, [isEnd, videoId])   
    
    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) { 
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    const handleLoadedMetaData = (i, e) => setLoadedData((pre)=> [...pre, e])

    useEffect(() => {
        let currentProgress = 0;
        let span = ''
        span = videoSpanRef.current

        if (span[videoId]) {
            let anim = gsap.to(videoId, {
                onUpdate: () => { 
                    const progress = Math.ceil(anim.progress() * 100)
                    
                    if (progress != currentProgress) { 
                        currentProgress = progress

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 
                                ? '0vw'
                                : window.innerWidth < 1200 
                                    ? '0vw' 
                                    : '4vw'
                        })
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: "white"
                        })
                            
                    }
                }, 
                onComplete: () => { 
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        })
                    }
                }
            })

            if (videoId === 0) {
                anim.restart()
            }

            const animUpdate = () => { 
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration  )
            }

            if (isPlaying) {
                gsap.ticker.add(animUpdate)
            } else {
                gsap.ticker.remove(animUpdate)
            }

        }

    }, [startPlay, videoId])

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo((pre)=> ({...pre, isEnd: true, videoId: i+1}))
                break;
            case 'video-last':
                setVideo((pre)=> ({...pre, isLastVideo: true}))
                break;
            case 'video-reset':
                setVideo((pre)=> ({...pre, isLastVideo: false, videoId: 0}))
                break;
            case 'play':
                setVideo((pre)=> ({...pre, isPlaying: !pre.isPlaying}))
                break;
            case 'pause':
                setVideo((pre)=> ({...pre, isPlaying: !pre.isPlaying}))
                break;
            default:
                video;
        }
    }
    
  return (
    <>
        <div id="highlights" className="flex items-center">
            {hightlightsSlides.map((list, i)=> (
                <div key={list.id} id="slider" className="sm:pr-20 pr-10 sm:ml-5 md:ml-11">
                    <div className={`video-carousel_container`}>
                    <div className="flex-center rounded-3xl overflow-hidden bg-black w-full h-full">
                        <video 
                            autoPlay 
                            id="video" 
                            playsInline={true} 
                            preload="auto" 
                            className={`${list.id === 2 && 'translate-x-44'} pointer-events-none`}
                            ref={(el) => (videoRef.current[i] = el)}
                            onPlay={() => setVideo((prevVideo) => (
                                {...prevVideo, isPlayong : true}
                            ))}
                            onEnded={()=> {
                                i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last')
                            }}
                            onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                            muted>
                            <source src={list.video} type="video/mp4"/>
                        </video>
                    </div>
                    <div className="absolute top-12 left-[5%] z-10">
                        {list.textLists.map(text => (
                            <p key={text} className="md:text-2xl text-xl font-medium">
                                {text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            ))}
        </div>
        <div className="flex-center relative mt-10">
            <AnimationButton
                className={"flex-center"}
                item1={".item1"} 
                item2={".control-btn"} 
                section={"#highlights"}
                circleWidth={'60px'}
                longWidth={"60px"}
                circleHeight={"60px"}
                innerItem={'.item'}
                width={"200px"}
                height={"60px"}
                >
                    <div className="flex-center item1 hidden w-0 h-0 bg-gray-300 backdrop-blur rounded-full">
                        {videoRef.current.map((_, i)=> (
                            <span key={i} ref={(el) => (videoDivRef.current[i] = el)} className="item mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer">
                                <span ref={(el) => (videoSpanRef.current[i] = el)} className="absolute item h-full w-full rounded-full" />
                            </span>
                        ))}
                    </div>
                    <button
                        className="control-btn"
                        onClick={isLastVideo 
                            ? ()=> handleProcess('video-reset')
                            : !isPlaying 
                                ? ()=> handleProcess('play')
                                : ()=> handleProcess('pause')
                        
                        }>
                        <img className="play-img item" src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg } alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"} />
                    </button>
            </AnimationButton>
              
        </div>
    </>
  )
}
