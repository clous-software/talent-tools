"use client";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { IoVolumeMute, IoVolumeHigh, IoArrowForwardOutline } from 'react-icons/io5';
import Footer from "@/components/navigation/Footer";
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { unstable_setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return ['en', 'es'].map((locale) => ({ locale }));
}

interface ScrollHeaderProps {
  translate: any;
}

interface ScrollCardProps {
  rotate: any;
  rotateY: any;
  scale: any;
  translate: any;
}

const Home = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('HomePage');

  const { scrollYProgress } = useScroll();

    const sectionHeight = 0.05;
    const rotate = useTransform(scrollYProgress, [0, sectionHeight], [20, 0]);
    const rotateY = useTransform(scrollYProgress, [0, sectionHeight], [-10, 0]);
    const scale = useTransform(scrollYProgress, [0, sectionHeight], [1.05, 1]);
    const translate = useTransform(scrollYProgress, [0, sectionHeight], [0, -100]);
    const ScrollHeader: React.FC<ScrollHeaderProps> = ({ translate }) => {
      return (
        <motion.div
          style={{
            translateY: translate,
          }}
          className="div mx-auto text-left mb-24 flex flex-col lg:flex-row lg:gap-12"
        > 
        <div className='w-[50%]'>

        {/* <p>{t('hero.subtitle')}</p> */}
        <h1 className="text-3xl lg:text-5xl fadeOut relative max-w-2xl">
         
        {t('hero.title')}
             {/* <img src={line} className="absolute w-[40%] right-0" loading="lazy" nofollow></img> */}
          </h1>
          <p className="mt-3 mb-2 text-dark-gray font-medium lg:max-w-2xl">{t('hero.description')}</p>

          <div className="flex items-center justify-between mt-2 text-xl gap-2 fadeOut">

          <Button 
            onClick={() => window.open("https://beta.clous.app/")} 
            className="text-white max-w-[12rem]" 
          >{t('hero.cta')}</Button> 
      </div>
      </div>

      <section className="grid lg:grid-cols-2 grid-cols-1 gap-3 mt-3 w-[50%]">
      <Link href="https://talent.clous.app/resume-roast" className="bg-[#FAFAFA] group relative overflow-hidden h-32 flex flex-col justify-between border rounded-2xl p-4 cursor-pointer hover:shadow-sm hover:-translate-y-0.5 transtion-all duration-200 delay-100">
          <h3 className="font-medium text-lg mr-8">Roast my resume</h3>
          <p className="text-sm text-gray-700">Learn about how to use Clous most effectively to achieve in your hiring goals.</p>
          <IoArrowForwardOutline className="w-6 h-6 -rotate-45 absolute -top-6 -right-6 group-hover:top-5 group-hover:right-5 transtion-all duration-300 delay-150"/>
        </Link>
        <Link href="https://talent.clous.app/resume-roast" className="bg-[#FAFAFA] group relative overflow-hidden h-32 flex flex-col justify-between border rounded-2xl p-4 cursor-pointer hover:shadow-sm hover:-translate-y-0.5 transtion-all duration-200 delay-100">
          <h3 className="font-medium text-lg mr-8">Why should I quit?</h3>
          <p className="text-sm text-gray-700">Learn about how to use Clous most effectively to achieve in your hiring goals.</p>
          <IoArrowForwardOutline className="w-6 h-6 -rotate-45 absolute -top-6 -right-6 group-hover:top-5 group-hover:right-5 transtion-all duration-300 delay-150"/>
        </Link>
        <Link href="https://talent.clous.app/resume-roast" className="bg-[#FAFAFA] group relative overflow-hidden h-32 flex flex-col justify-between border rounded-2xl p-4 cursor-pointer hover:shadow-sm hover:-translate-y-0.5 transtion-all duration-200 delay-100">
          <h3 className="font-medium text-lg mr-8">Resume battles</h3>
          <p className="text-sm text-gray-700">Learn about how to use Clous most effectively to achieve in your hiring goals.</p>
          <IoArrowForwardOutline className="w-6 h-6 -rotate-45 absolute -top-6 -right-6 group-hover:top-5 group-hover:right-5 transtion-all duration-300 delay-150"/>
        </Link>
        <Link href="https://talent.clous.app/resume-roast" className="bg-[#FAFAFA] group relative overflow-hidden h-32 flex flex-col justify-between border rounded-2xl p-4 cursor-pointer hover:shadow-sm hover:-translate-y-0.5 transtion-all duration-200 delay-100">
          <h3 className="font-medium text-lg mr-8">My skills gap</h3>
          <p className="text-sm text-gray-700">Learn about how to use Clous most effectively to achieve in your hiring goals.</p>
          <IoArrowForwardOutline className="w-6 h-6 -rotate-45 absolute -top-6 -right-6 group-hover:top-5 group-hover:right-5 transtion-all duration-300 delay-150"/>
        </Link>
        </section>
  
        </motion.div>
      );
    };
    const ScrollCard: React.FC<ScrollCardProps> = ({
      rotate,
      rotateY,
      scale,
      translate,
    } ) => {
  
      const [isMuted, setIsMuted] = useState(true);
      const videoRef = useRef<HTMLVideoElement>(null);
    
      const toggleMute = () => {
        if (videoRef.current) {
          videoRef.current.muted = !isMuted;
          setIsMuted(!isMuted);
        }
      };
  
      return (
        <motion.div
          style={{
            rotateX: rotate,
            rotateY: rotateY,
            translateY: translate,
            scale,
          }}
          className="flex max-w-5xl -mt-12 mx-auto lg:h-auto w-full rounded-[30px] shadow-2xl"
        >
          <div className="relative min-w-[60rem] w-full h-full bg-white rounded-3xl">
              {/* Video de Demo de ClousH */}
              <video
                ref={videoRef}
                className="lg:w-full lg:h-full rounded-3xl"
                src="https://clous.s3.eu-west-3.amazonaws.com/Clous+Demo+Video.mp4"
                title="ClousH Alpha Launch Video"
                autoPlay
                muted={isMuted}
                loop
                controls={false} // Optional: to hide video controls
              ></video>
              <button
                className="absolute bottom-4 right-4 text-white rounded-full p-2"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <IoVolumeMute className="text-gray-700 w-6 h-6" />
                ) : (
                  <IoVolumeHigh className="text-gray-700 w-6 h-6" />
                )}
              </button>
             </div>
        </motion.div>
      );
    };

    const [textColor, setTextColor] = useState('gray');
    const [activeTab, setActiveTab] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const smallSectionRef = useRef<HTMLElement>(null);
    const tabsRef = useRef<(HTMLDivElement | null)[]>([]);

    const imageSources = [
      'https://clous.s3.eu-west-3.amazonaws.com/images/Hiring_Data_Drive_Workflows_by_Clous.webp',
      'https://clous.s3.eu-west-3.amazonaws.com/images/Hiring_Experience_for_Hiring_Teams_by_Clous.webp',
      'https://clous.s3.eu-west-3.amazonaws.com/images/Hiring_Processes_Automate_Text-Heavy_Tasks_By_Clous.webp',
    ];
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const handleScroll = () => {
      const section = sectionRef.current;
      const textSpans = section?.querySelectorAll('span');
      if (section && textSpans) {
        const rect = section.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const offsetTop = section.offsetTop;
        const sectionHeight = rect.height;
        const completeBlackPoint = offsetTop + sectionHeight + 240;
  
        if (scrollTop + window.innerHeight >= offsetTop && scrollTop <= completeBlackPoint) {
          const scrollPercent = (scrollTop + window.innerHeight - offsetTop) / (completeBlackPoint - offsetTop);
          textSpans.forEach((span: any, index: any) => {
            const charScrollThreshold = index / textSpans.length;
            span.style.color = scrollPercent > charScrollThreshold ? 'rgb(0, 0, 0)' : 'rgb(169, 169, 169)';
          });
  
          // Update active tab based on scroll position
          const tabIndex = Math.floor(scrollPercent * 3);
          setActiveTab(Math.min(tabIndex, 2));
        } else if (scrollTop > completeBlackPoint) {
          textSpans.forEach((span: any) => {
            span.style.color = 'rgb(0, 0, 0)';
          });
          setActiveTab(2);
        } else {
          textSpans.forEach((span: any) => {
            span.style.color = 'rgb(169, 169, 169)';
          });
          setActiveTab(0);
        }
      }
    };
  
    const showTab = (index: any) => {
      setActiveTab(index);
    };
  
    const text = t('sectionSentence.title');
    const panelText = t('sectionPanel.sentence');
  

    return (
      <>
      <Head>
      <title>{t('SEO.title')}</title>
        <meta name="description" content={t('SEO.description')} />
        <meta name="robots" content={t('SEO.robots')} />
        <meta name='image' content={t('SEO.image')} />
        <meta property="og:url" content={t('SEO.openGraph.url')} />
        <meta property="og:type" content={t('SEO.openGraph.type')} />
        <meta property="og:title" content={t('SEO.openGraph.title')} />
        <meta property="og:description" content={t('SEO.openGraph.description')} />
        <meta name="twitter:card" content={t('SEO.twitter.card')} />
        <meta name="twitter:title" content={t('SEO.twitter.title')} />
        <meta name="twitter:description" content={t('SEO.description')} />
        <meta name="twitter:image" content={t('SEO.image')} />
      </Head>
    
      <main className="bg-[#FAFAFA] bg-pattern bg-gradient-to-br from-gray-50 to-gray-100 px-24">
      <p className="absolute left-24 top-8 text-primary text-lg font-medium">Made by Clous</p>

      <main className="mb-12 flex justify-between items-start text-left w-full mx-auto">
    <section className="flex flex-col h-screen">
      <div className="h-[210vh] transform flex items-center justify-center relative ">
        <div
          className="lg:py-24 w-full relative"
          style={{
            perspective: '1000px',
          }}
        >
          <ScrollHeader translate={translate} />
          <ScrollCard rotate={rotate} rotateY={rotateY} translate={translate} scale={scale} />
        </div>
      </div>

    </section>
    </main>
    <section id="scroll-section" ref={sectionRef} style={{ height: '140vh' }} className="px-2 mt-48">
      <main className="sticky top-24 text-4xl font-medium" style={{ color: textColor, transition: 'color 0.3s ease' }}>
        {text.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </main>
      <div className="sticky top-72 bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-300 mt-24">
        <div className="flex gap-4 items-center px-3 pt-2 border-b border-gray-300">
          <div className="flex space-x-2">
            <div className="w-3.5 h-3.5 bg-red-500 rounded-full"></div>
            <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full"></div>
            <div className="w-3.5 h-3.5 bg-green-500 rounded-full"></div>
          </div>
          <div className="tabs flex">
          {['Roast my resume', 'Why should I quit?', 'Resume battles', 'My skills gap'].map((tabName, index) => (
              <div
                key={index}
                ref={(el) => { tabsRef.current[index] = el; }}
                className={`border rounded-t-xl tab p-2 cursor-pointer transition-all duration-200 delay-100 ${
                  activeTab === index ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                onClick={() => showTab(index)}
              >
                <p className="font-medium text-dark-gray text-base">{tabName}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="tab-content bg-gray-50">
          {imageSources.map((src, index) => (
          <div key={index} className={`tab-panel ${activeTab === index ? '' : 'hidden'}`}>
            <img src={src} alt={`Image ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
        </div>
      </div>
    </section>
    
  </main>
    <Footer/>
    </>

    );
};

export default Home;
