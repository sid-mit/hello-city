import { motion } from 'framer-motion';

export const CloudBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Cloud 1 - Bottom Left */}
      <motion.svg
        className="absolute"
        style={{ left: '8%', bottom: '8%', width: '578px', height: '273px' }}
        animate={{ x: [0, -10, 0], y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        viewBox="0 0 578 273"
        fill="none"
      >
        <defs>
          <linearGradient id="cloud1-gradient" x1="0%" y1="0%" x2="0%" y2="100%" gradientTransform="rotate(173)">
            <stop offset="0%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M92.5 0C166.942 0 229.691 42.047 248.928 99.41C260.417 92.79 273.763 89 288 89C329.69 89 363.739 121.497 365.891 162.388C372.036 161.48 378.432 161 385 161C432.496 161 471 186.072 471 217C471 243.908 441.855 266.382 403 271.771V273H-107V272.712C-108.473 272.901 -109.975 273 -111.5 273C-130.554 273 -146 257.778 -146 239C-146 224.627 -136.95 212.336 -124.159 207.361C-125.362 202.436 -126 197.292 -126 192C-126 159.187 -101.499 132.053 -69.6621 127.631C-64.2219 56.378 6.30093 0 92.5 0Z" fill="url(#cloud1-gradient)"/>
      </motion.svg>

      {/* Cloud 2 - Middle Right */}
      <motion.svg
        className="absolute"
        style={{ right: '8%', top: '45%', width: '584px', height: '278px' }}
        animate={{ x: [0, 15, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        viewBox="0 0 584 278"
        fill="none"
      >
        <defs>
          <linearGradient id="cloud2-gradient" x1="0%" y1="0%" x2="0%" y2="100%" gradientTransform="rotate(173)">
            <stop offset="0%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M267 0C209.54 0 161.76 40.89 151.88 94.801C114.59 102.13 86.323 131.004 84.138 166.116C37.164 167.995 0 192.298 0 222C0 252.928 40.294 278 90 278C90.668 278 91.335 277.993 92 277.984V278H547V277.91C547.83 277.968 548.66 278 549.5 278C568.55 278 584 262.778 584 244C584 225.612 569.19 210.635 550.68 210.021C547.67 181.905 523.67 160 494.5 160C487.61 160 481 161.224 474.9 163.464C472.76 122.538 438.25 90 396 90C391.02 90 386.15 90.453 381.43 91.316C370.17 39.138 323.22 0 267 0Z" fill="url(#cloud2-gradient)"/>
      </motion.svg>

      {/* Cloud 3 - Middle Center */}
      <motion.svg
        className="absolute"
        style={{ left: '30%', top: '55%', width: '445px', height: '238px' }}
        animate={{ x: [0, -12, 0], y: [0, 18, 0] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        viewBox="0 0 445 238"
        fill="none"
      >
        <defs>
          <linearGradient id="cloud3-gradient" x1="0%" y1="0%" x2="0%" y2="100%" gradientTransform="rotate(173)">
            <stop offset="0%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M204.812 0C234.87 0 260.607 18.261 271.258 44.156C277.11 42.088 283.419 40.962 289.995 40.962C314.923 40.962 336.003 57.152 342.955 79.42C348.822 77.424 355.122 76.339 361.679 76.339C393.299 76.339 418.933 101.556 418.933 132.662C418.933 137.196 418.387 141.604 417.358 145.828C433.479 151.595 445 166.864 445 184.796C445 207.676 426.243 226.224 403.106 226.224C401.212 226.224 399.348 226.096 397.521 225.855V226.224H126.611V224.756C119.698 225.717 112.536 226.224 105.199 226.224C47.1 226.224 0 194.546 0 155.471C0 116.395 47.1 84.718 105.199 84.718C115.616 84.718 125.679 85.735 135.181 87.632C133.839 82.223 133.128 76.57 133.128 70.753C133.128 31.677 165.222 0 204.812 0Z" fill="url(#cloud3-gradient)"/>
      </motion.svg>
    </div>
  );
};
