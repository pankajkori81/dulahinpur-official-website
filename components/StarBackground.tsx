"use client";
import React from "react";

const StarBackground = () => {
  return (
    <>
      {/* 🚀 FIXED Global Background - पूरी वेबसाइट के पीछे रहेगा */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{ background: "radial-gradient(ellipse at bottom, #1f0707 0%, #000000 100%)" }}
      >
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
      </div>

      <style>{`
        /* 🚀 FIX: border-radius: 50% से सारे तारे एकदम गोल (Perfectly Round) हो जाएंगे */
        #stars, #stars2, #stars3 {
          position: absolute;
          background: transparent;
          border-radius: 50%; 
          will-change: transform;
        }

        #stars:after, #stars2:after, #stars3:after {
          content: " "; 
          position: absolute; 
          top: 2000px; 
          background: transparent; 
          box-shadow: inherit;
          border-radius: 50%; /* डुप्लीकेट तारों को भी गोल रखने के लिए */
        }
        
        /* 🌟 Small Stars (ज़्यादा संख्या में) */
        #stars { 
          width: 1.5px; /* साइज़ थोड़ा सा बढ़ाया गया है ताकि गोलाई अच्छे से दिखे */
          height: 1.5px; 
          box-shadow: 501px 811px #fff, 1450px 1324px #fff, 1093px 1780px #fff, 1469px 678px #fff, 904px 741px #fff, 1160px 781px #fff, 1841px 1962px #fff, 1630px 1667px #fff, 1788px 676px #fff, 367px 1734px #fff, 1343px 156px #fff, 1283px 1142px #fff, 1062px 378px #fff, 1395px 467px #fff, 1017px 1891px #fff, 137px 1114px #fff, 1767px 1403px #fff, 1543px 11px #fff, 1078px 181px #fff, 1189px 1574px #fff, 1697px 1551px #fff, 439px 472px #fff, 1491px 677px #fff, 1364px 599px #fff, 34px 382px #fff, 1221px 1584px #fff, 1266px 1499px #fff, 169px 1907px #fff, 1219px 1125px #fff, 659px 18px #fff, 1731px 1959px #fff, 332px 1216px #fff, 1913px 788px #fff, 80px 712px #fff, 326px 1605px #fff, 574px 1502px #fff, 473px 1653px #fff, 404px 975px #fff, 322px 1797px #fff, 425px 1321px #fff, 1121px 1797px #fff, 731px 647px #fff, 891px 1584px #fff, 1523px 109px #fff, 1379px 244px #fff, 865px 1064px #fff, 493px 956px #fff, 624px 1380px #fff, 440px 619px #fff, 1630px 767px #fff, 955px 1196px #fff, 62px 729px #fff, 126px 946px #fff, 1256px 896px #fff, 1444px 256px #fff, 661px 1628px #fff, 1078px 1716px #fff, 300px 737px #fff, 1734px 413px #fff, 1296px 129px #fff, 1771px 1678px #fff, 977px 1764px #fff, 1879px 549px #fff, 665px 1531px #fff, 89px 701px #fff, 1084px 1183px #fff, 1597px 1576px #fff, 1354px 1774px #fff, 554px 1471px #fff, 1469px 287px #fff, 887px 106px #fff, 1962px 766px #fff, 638px 805px #fff, 1651px 741px #fff, 1517px 1826px #fff, 24px 1152px #fff, 507px 558px #fff, 1262px 652px #fff, 246px 1048px #fff, 1077px 421px #fff; 
          animation: animStar 50s linear infinite; 
        }
        #stars:after { width: 1.5px; height: 1.5px; }
        
        /* 🌟 Medium Stars */
        #stars2 { 
          width: 2.5px; 
          height: 2.5px; 
          box-shadow: 1925px 1320px #fff, 693px 1778px #fff, 1016px 711px #fff, 1171px 563px #fff, 661px 1919px #fff, 1610px 44px #fff, 1275px 140px #fff, 1208px 1802px #fff, 1473px 1587px #fff, 11px 1117px #fff, 853px 1757px #fff, 1149px 937px #fff, 1353px 428px #fff, 270px 279px #fff, 258px 1404px #fff, 417px 1188px #fff, 286px 561px #fff, 393px 1765px #fff, 147px 881px #fff, 666px 1097px #fff, 1425px 1278px #fff, 806px 156px #fff, 1252px 561px #fff, 218px 52px #fff, 1371px 1980px #fff, 171px 745px #fff, 1424px 89px #fff, 137px 244px #fff, 939px 1922px #fff, 137px 1080px #fff, 1757px 50px #fff, 904px 536px #fff, 1938px 1001px #fff, 1172px 440px #fff, 72px 1475px #fff, 102px 121px #fff, 804px 1671px #fff, 1314px 270px #fff, 440px 1341px #fff, 1216px 511px #fff, 1061px 1523px #fff, 97px 274px #fff, 704px 1318px #fff, 52px 1872px #fff, 1962px 296px #fff, 111px 289px #fff, 1157px 1236px #fff, 1347px 1451px #fff, 820px 286px #fff, 1389px 1169px #fff, 644px 841px #fff; 
          animation: animStar 100s linear infinite; 
        }
        #stars2:after { width: 2.5px; height: 2.5px; }
        
        /* 🌟 Large Stars */
        #stars3 { 
          width: 3.5px; 
          height: 3.5px; 
          box-shadow: 200px 981px #fff, 1731px 521px #fff, 132px 1039px #fff, 1888px 1547px #fff, 899px 1226px #fff, 1887px 580px #fff, 1548px 1092px #fff, 1626px 689px #fff, 254px 1072px #fff, 1684px 1211px #fff, 672px 1267px #fff, 939px 668px #fff, 1969px 645px #fff, 1126px 983px #fff, 457px 568px #fff, 476px 876px #fff, 829px 1896px #fff, 1364px 1846px #fff, 1507px 1120px #fff, 936px 1948px #fff, 1833px 832px #fff, 1424px 285px #fff, 1377px 1596px #fff, 432px 153px #fff, 1348px 1410px #fff, 1529px 954px #fff, 1102px 387px #fff, 264px 297px #fff, 811px 977px #fff, 1931px 673px #fff; 
          animation: animStar 150s linear infinite; 
        }
        #stars3:after { width: 3.5px; height: 3.5px; }
        
        @keyframes animStar {
          from { transform: translateY(0px) translateZ(0); }
          to { transform: translateY(-2000px) translateZ(0); }
        }

        /* 🚀 FIX: मोबाइल पर एनिमेशन बंद करने वाला कोड हटा दिया गया है। 
           अब मोबाइल हो या डेस्कटॉप, एनिमेशन हर जगह चलेगा। */
      `}</style>
    </>
  );
};

export default StarBackground;