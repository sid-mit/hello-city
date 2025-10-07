import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const { hasSeenLanding, setHasSeenLanding } = useAppStore();

  useEffect(() => {
    if (hasSeenLanding) {
      navigate('/home');
    }
  }, [hasSeenLanding, navigate]);

  const handleStart = () => {
    setHasSeenLanding(true);
    navigate('/home');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF 0%, #F5F8FF 100%)' }}
    >
      {/* Decorative Cloud SVGs */}
      <motion.svg
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute"
        style={{ left: '291px', top: '343px', width: '445px', height: '226px' }}
        width="445"
        height="227"
        viewBox="0 0 445 227"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M204.812 0C234.87 0 260.607 18.2609 271.258 44.1562C277.11 42.0884 283.419 40.9619 289.995 40.9619C314.923 40.9621 336.002 57.152 342.955 79.4199C348.822 77.4235 355.122 76.3389 361.679 76.3389C393.299 76.3389 418.933 101.556 418.933 132.662C418.933 137.196 418.387 141.604 417.358 145.828C433.479 151.595 445 166.864 445 184.796C445 207.676 426.243 226.224 403.106 226.224C401.212 226.224 399.348 226.096 397.521 225.855V226.224H126.611V224.756C119.698 225.717 112.536 226.224 105.199 226.224C47.0997 226.224 0.00017168 194.546 0 155.471C0 116.395 47.0996 84.7178 105.199 84.7178C115.616 84.7178 125.679 85.7352 135.181 87.6318C133.839 82.2228 133.128 76.5699 133.128 70.7529C133.128 31.6771 165.222 9.76859e-05 204.812 0Z"
          fill="url(#paint0_linear_71_233)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_71_233"
            x1="230"
            y1="45.5"
            x2="198"
            y2="266"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0883009" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.svg
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute"
        style={{ left: '906px', top: '413px', width: '584px', height: '278px' }}
        width="534"
        height="278"
        viewBox="0 0 534 278"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M267 0C209.54 0 161.756 40.8897 151.875 94.8008C114.595 102.13 86.323 131.004 84.1377 166.116C37.1644 167.995 0 192.298 0 222C0 252.928 40.2944 278 90 278C90.6684 278 91.3351 277.993 92 277.984V278H547V277.91C547.826 277.968 548.659 278 549.5 278C568.554 278 584 262.778 584 244C584 225.612 569.188 210.635 550.682 210.021C547.671 181.905 523.666 160 494.5 160C487.607 160 481.003 161.224 474.896 163.464C472.755 122.538 438.251 90 396 90C391.022 90 386.152 90.4526 381.43 91.3164C370.169 39.1376 323.215 0 267 0Z"
          fill="url(#paint0_linear_71_240)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_71_240"
            x1="267"
            y1="71.5"
            x2="307.318"
            y2="287.091"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.svg
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute"
        style={{ left: '-146px', top: '531px', width: '617px', height: '273px' }}
        width="471"
        height="264"
        viewBox="0 0 471 264"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M92.5 0C166.942 0 229.691 42.0472 248.928 99.4102C260.417 92.7903 273.763 89 288 89C329.69 89 363.739 121.497 365.891 162.388C372.036 161.48 378.432 161 385 161C432.496 161 471 186.072 471 217C471 243.908 441.855 266.382 403 271.771V273H-107V272.712C-108.473 272.901 -109.975 273 -111.5 273C-130.554 273 -146 257.778 -146 239C-146 224.627 -136.95 212.336 -124.159 207.361C-125.362 202.436 -126 197.292 -126 192C-126 159.187 -101.499 132.053 -69.6621 127.631C-64.2219 56.3777 6.30093 0 92.5 0Z"
          fill="url(#paint0_linear_80_150)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_80_150"
            x1="139"
            y1="33.5"
            x2="41"
            y2="321"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.8" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Decorative Greeting Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute font-['Outfit'] font-bold"
        style={{
          left: '-63px',
          top: '92px',
          fontSize: '64px',
          color: '#F1F6FF',
        }}
      >
        Kamusta
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute font-['Outfit'] font-bold"
        style={{
          left: '175px',
          top: '289px',
          fontSize: '40px',
          color: '#E1EBFF',
        }}
      >
        Bonjour
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="absolute font-['Outfit'] font-bold"
        style={{
          left: '463px',
          top: '203px',
          fontSize: '24px',
          color: '#EEF4FF',
        }}
      >
        হ্যালো
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute font-['Outfit'] font-bold"
        style={{
          left: '979px',
          top: '112px',
          fontSize: '96px',
          color: '#EDF3FF',
        }}
      >
        Namaste
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute font-['Outfit'] font-bold"
        style={{
          left: '35px',
          top: '505px',
          fontSize: '64px',
          color: '#E0EBFF',
        }}
      >
        你好
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute font-['Outfit'] font-bold"
        style={{
          left: '525px',
          top: '522px',
          fontSize: '24px',
          color: '#E9F1FF',
        }}
      >
        வணக்கம்
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="absolute font-['Outfit'] font-bold"
        style={{
          left: '260px',
          top: '636px',
          fontSize: '32px',
          color: '#E6EEFF',
        }}
      >
        こんにちは
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute font-['Outfit'] font-bold"
        style={{
          left: '956px',
          top: '611px',
          fontSize: '36px',
          color: '#DDE8FF',
        }}
      >
        안녕하세요
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute font-['Outfit'] font-bold"
        style={{
          left: '1226px',
          top: '456px',
          fontSize: '64px',
          color: '#ECF2FF',
        }}
      >
        Hujambo
      </motion.div>

      {/* Center Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute flex flex-col items-center gap-20"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '570px',
        }}
      >
        <div className="flex flex-col items-center gap-6 w-full">
          <h1
            className="font-['Gilroy'] font-bold text-center"
            style={{
              fontSize: '40px',
              color: '#404040',
              letterSpacing: '0.8px',
            }}
          >
            Say Hello to Your Next City
          </h1>
          <p
            className="font-['Gilroy'] font-normal text-center"
            style={{
              fontSize: '16px',
              color: '#404040',
            }}
          >
            Every city has its own rhythm. Start with a simple hello.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(42, 100, 236, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className="font-['Outfit'] font-bold"
          style={{
            padding: '12px 80px',
            borderRadius: '30px',
            background: '#BDD1FF',
            color: '#2A64EC',
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Start
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
