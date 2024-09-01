"use client";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { IoVolumeMute, IoVolumeHigh } from 'react-icons/io5';
import Footer from "@/components/navigation/Footer";
import FileInput from "@/components/ui/fileInput";
import mammoth from 'mammoth';
import Head from 'next/head';
import { unstable_setRequestLocale } from 'next-intl/server';


interface ScrollHeaderProps {
  translate: any; // Use the actual type if known; 'any' is a placeholder
}

interface ScrollCardProps {
  rotate: any;
  rotateY: any;
  scale: any;
  translate: any;
}

const SkillsGap = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('HomePage');

  const [file, setFile] = useState<string>('');
  const [filePreview, setFilePreview] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [isCtaActive, setIsCtaActive] = useState<boolean>(false);
  const [pdfjsLib, setPdfjsLib] = useState<typeof import('pdfjs-dist') | null>(null);

  useEffect(() => {
    const loadPdfJs = async () => {
      try {
        const pdfjs = (await import('pdfjs-dist'));
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
        setPdfjsLib(pdfjs);
        console.log('PDF.js library loaded:', pdfjs);
      } catch (error) {
        console.error('Error loading PDF.js library:', error);
      }
    };
  
    loadPdfJs();
  }, []);

  const simulateTyping = (textToType: string) => {
    setIsTyping(true);
    const decodeHTMLEntities = (text: any) => {
      const textArea = document.createElement('textarea');
      textArea.innerHTML = text;
      return textArea.value;
    };

    const words = decodeHTMLEntities(textToType).split(" ");
    let currentIndex = 0;

    const animateTyping = () => {
      if (currentIndex < words.length) {
        const partialText = words.slice(0, currentIndex + 1).join(" ");

        setResponse(
          partialText +
          '<span class="fade-in"></span>' +
          (currentIndex === words.length - 1 ? "" : '<span class="cursorRound ml-1"></span>')
        );

        currentIndex++;
        requestAnimationFrame(animateTyping);
      }
    };

    requestAnimationFrame(animateTyping);
    setIsCtaActive(true);
  };

  // Extract text from PDF using pdf-lib

  async function extractTextFromPdf(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib?.getDocument({ data: arrayBuffer }).promise;
  
    let fullText = '';
  
    if (pdf) {
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += `${pageText} \n`;
      }
    }
  
    return fullText;
  }
  

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Here is the file", file);

    if (file) {
      const fileType = file.type;
      const reader = new FileReader();

      reader.onloadend = async () => {
        let resumeText = "";

        if (fileType === "application/pdf") {
          resumeText = await extractTextFromPdf(file);  // Use the new function
        } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
          const wordData = await mammoth.extractRawText({ arrayBuffer: reader.result as ArrayBuffer });
          resumeText = wordData.value;
        } else if (fileType.startsWith("text/")) {
          resumeText = reader.result as string;
        } else {
          console.error("Unsupported file type");
          return;
        }

        console.log("Extracted Text:", resumeText);
        setFilePreview(reader.result as string);

        // Call handleUpload after text extraction
        handleUpload(resumeText);
      };

      if (fileType === "application/pdf" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    }
  };

  const handleUpload = async (resumeText: string) => {
    const userId = localStorage.getItem('userId');
  
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const chatResponse = data.chatResponse || "";
      simulateTyping(chatResponse);
    } catch (error) {
      console.error('Error in handleUpload:', error);
    }
  };
  
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
          className="div mx-auto text-left mb-12 flex flex-col lg:flex-row lg:gap-12"
        > 
        <div className='w-[60%]'>

        {/* <p>{t('hero.subtitle')}</p> */}
        <h1 className="text-3xl lg:text-5xl fadeOut relative max-w-2xl">
         
        {t('hero.title')}
             {/* <img src={line} className="absolute w-[40%] right-0" loading="lazy" nofollow></img> */}
          </h1>
          <p className="mt-3 mb-2 text-dark-gray font-medium lg:max-w-2xl">{t('hero.description')}</p>

          <div className="mt-2 text-xl gap-2 fadeOut">

          <Button 
            onClick={() => window.open("https://beta.clous.app/")} 
            className="text-white max-w-[12rem]" 
          >{t('hero.cta')}</Button>
 
      </div>
      </div>

      <section className="w-[50%]">
        <FileInput
          onChange={(e) => {
            handleFileInputChange(e);
          }} 
        />
        </section>
  
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

        {!isTyping ? (
          <>
          <main className="mb-12 flex justify-between items-start text-left w-full mx-auto">
          <section className="flex flex-col h-screen">
            <div className="h-[180vh] transform flex items-center justify-center relative ">
              <div
                className="lg:py-24 w-full relative"
                style={{
                  perspective: '1000px',
                }}
              >
                <ScrollHeader translate={translate} />
              </div>
            </div>

          </section>
          </main>
          </>
        ) : (
          <>
          <div dangerouslySetInnerHTML={{ __html: response }}></div>
            {isCtaActive && (
              <div className='mt-6 flex gap-8'>
              <Button 
                onClick={() => window.open("https://beta.clous.app/")} 
                className="text-white max-w-[12rem]" 
              >{t('hero.cta')}</Button>
              <Button 
              variant="secondary"
                onClick={() => window.open("https://beta.clous.app/")} 
                className="text-white max-w-[12rem]" 
              >{t('hero.cta')}</Button>
              </div>
            )}
          </>
        )}
    
  </main>
    <Footer/>
    </>

    );
};

export default SkillsGap;
