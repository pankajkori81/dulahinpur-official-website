

import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import InvitationCard from "@/components/Celebration";
import Celebration from "@/components/Celebration";
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";


const App = () => {
  return (
    <div className="bg-[#FFF9F0] w-full min-h-screen font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION (Imported from components) --- */}
    
        <Hero />
     

    


      {/* 🚀 NEON RUNNING DIVIDER (Hero और About के बीच) */}
      <div className="w-full h-2 flex items-center justify-center relative overflow-hidden  mt-0 mb-0 z-20"
       style={{ background: "radial-gradient(ellipse at bottom, #0f141b 0%, #050505 100%)" }} >
      
        {/* बेस की पतली डार्क लाइन */}
        <div className="absolute w-full h-[4px] z-0"  style={{ background: "radial-gradient(ellipse at bottom, #090c10 0%, #050505 100%)" }} ></div>

        {/* 🚀 CSS for Continuous Running Light */}
        <style>{`
          .running-light {
            position: absolute;
            width: 100%; /* लाइट की लंबाई */
            height: 2px;
            /* पर्पल, पिंक और सोने का खूबसूरत ब्लेंड */
            background: linear-gradient(90deg, transparent, #402fb5, #cf30aa, #FFD700, #cf30aa, #402fb5, transparent);
            box-shadow: 0 0 20px #cf30aa, 0 0 10px #402fb5;
            animation: run-light 3s linear infinite;
            z-index: 1;
          }
          @keyframes run-light {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>
        
        {/* दौड़ने वाली लाइट */}
        <div className="running-light"></div>

      
      </div>


      {/* --- About page --- */}
    
        <About/>
     


        {/* 🚀 NEON RUNNING DIVIDER (Hero और About के बीच) */}
      <div className="w-full h-2 flex items-center justify-center relative overflow-hidden  mt-0 mb-0 z-20"
       style={{ background: "radial-gradient(ellipse at bottom, #0f141b 0%, #050505 100%)" }} >
      
        {/* बेस की पतली डार्क लाइन */}
        <div className="absolute w-full h-[4px] z-0"  style={{ background: "radial-gradient(ellipse at bottom, #090c10 0%, #050505 100%)" }} ></div>

        {/* 🚀 CSS for Continuous Running Light */}
        <style>{`
          .running-light-two {
            position: absolute;
            width: 100%; /* लाइट की लंबाई */
            height: 2px;
            /* पर्पल, पिंक और सोने का खूबसूरत ब्लेंड */
            background: linear-gradient(90deg, transparent, #402fb5, #cf30aa, #FFD700, #cf30aa, #402fb5, transparent);
            box-shadow: 0 0 20px #cf30aa, 0 0 10px #402fb5;
            animation: run-light 3s linear infinite;
            z-index: 1;
          }
          @keyframes run-light {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>
        
        {/* दौड़ने वाली लाइट */}
        <div className="running-light-two"></div>


        </div>




      {/* Celebration */}
     
     <Celebration/>
      


      {/* venue */}
   
     <Venue/>
      

         {/* 🚀 ROYAL GOLD RUNNING DIVIDER (About और Celebration के बीच) */}
    <div 
        /* 🚀 FIX: ऊँचाई 'h-16' कर दी गई है ताकि दोनों रंग आपस में स्मूथली मिल सकें */
        className="w-full h-2 flex items-center justify-center relative overflow-hidden mt-0 mb-0 z-20"   
        /* 🚀 FIX: ऊपर के काले (#050505) रंग से नीचे के मरून (#140000) रंग का पर्फेक्ट ग्रेडिएंट ब्लेंड */
        style={{ background: "linear-gradient(to bottom, #050505 0%, #140000 100%)" }}   
      >
        {/* हल्की सी डार्क बेस लाइन (ताकि लाइट का रास्ता दिखे) */}
        <div className="absolute w-full h-[2px] z-0" style={{ background: "linear-gradient(to bottom, #050505 0%, #140000 100%)" }}  ></div>

        {/* 🚀 CSS for Golden Continuous Running Light */}
        <style>{`
          .running-gold-light {
            position: absolute;
            width: 100%; /* लाइट की लंबाई */
            height: 2px;
            /* 🚀 FIX: आमंत्रण कार्ड से मैच करता हुआ मरून (Maroon) और सोने (Gold) का ब्लेंड */
            background: linear-gradient(90deg, transparent, #7B0A14, #F5A623, #FFD700, #F5A623, #7B0A14, transparent);
            box-shadow: 0 0 15px #F5A623, 0 0 8px #7B0A14;
            animation: run-gold-light 3s linear infinite;
            z-index: 1;
          }
          @keyframes run-gold-light {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>
        
        {/* दौड़ने वाली लाइट */}
        <div className="running-gold-light"></div>
        
      </div>


      {/* Gallery */}

        <Gallery/>    

           {/* 🚀 ROYAL GOLD RUNNING DIVIDER (About और Celebration के बीच) */}
    <div 
        /* 🚀 FIX: ऊँचाई 'h-16' कर दी गई है ताकि दोनों रंग आपस में स्मूथली मिल सकें */
        className="w-full h-2 flex items-center justify-center relative overflow-hidden mt-0 mb-0 z-20"   
        /* 🚀 FIX: ऊपर के काले (#050505) रंग से नीचे के मरून (#140000) रंग का पर्फेक्ट ग्रेडिएंट ब्लेंड */
        style={{ background: "linear-gradient(to bottom, #050505 0%, #1b0000 100%)" }}   
      >
        {/* हल्की सी डार्क बेस लाइन (ताकि लाइट का रास्ता दिखे) */}
        <div className="absolute w-full h-[2px] z-0" style={{ background: "linear-gradient(to bottom, #050505 0%, #1b0000 100%)" }}  ></div>

        {/* 🚀 CSS for Golden Continuous Running Light */}
        <style>{`
          .running-gold-end {
            position: absolute;
            width: 100%; /* लाइट की लंबाई */
            height: 2px;
            /* 🚀 FIX: आमंत्रण कार्ड से मैच करता हुआ मरून (Maroon) और सोने (Gold) का ब्लेंड */
            background: linear-gradient(90deg, transparent, #7B0A14, #F5A623, #FFD700, #F5A623, #7B0A14, transparent);
            box-shadow: 0 0 15px #F5A623, 0 0 8px #7B0A14;
            animation: run-gold-light 3s linear infinite;
            z-index: 1;
          }
          @keyframes run-gold-light {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>
        
        {/* दौड़ने वाली लाइट */}
        <div className="running-gold-end"></div>
        
      </div>  


        {/* FeebackSection */}

        <FeedbackSection/>

       {/* Footer */}

       <Footer/>


    </div>
  );
};

export default App;



