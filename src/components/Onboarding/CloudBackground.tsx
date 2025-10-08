import { motion } from 'framer-motion';

export const CloudBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Cloud 1 - Bottom Left */}
      <motion.svg
        className="absolute"
        style={{ left: '2%', bottom: '5%', width: 'min(48vw, 520px)' }}
        animate={{ x: [0, -10, 0], y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        viewBox="0 0 445 227"
        fill="none"
      >
        <defs>
          <linearGradient id="paint0_linear_84_100" x1="230" y1="45.5" x2="198" y2="266" gradientUnits="userSpaceOnUse">
            <stop offset="0.0883009" stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M204.812 0C234.87 0 260.607 18.2609 271.258 44.1562C277.11 42.0884 283.419 40.9619 289.995 40.9619C314.923 40.9621 336.002 57.152 342.955 79.4199C348.822 77.4235 355.122 76.3389 361.679 76.3389C393.299 76.3389 418.933 101.556 418.933 132.662C418.933 137.196 418.387 141.604 417.358 145.828C433.479 151.595 445 166.864 445 184.796C445 207.676 426.243 226.224 403.106 226.224C401.212 226.224 399.348 226.096 397.521 225.855V226.224H126.611V224.756C119.698 225.717 112.536 226.224 105.199 226.224C47.0997 226.224 0.00017168 194.546 0 155.471C0 116.395 47.0996 84.7178 105.199 84.7178C115.616 84.7178 125.679 85.7352 135.181 87.6318C133.839 82.2228 133.128 76.5699 133.128 70.7529C133.128 31.6771 165.222 9.76859e-05 204.812 0Z" fill="url(#paint0_linear_84_100)"/>
      </motion.svg>

      {/* Cloud 2 - Middle Right */}
      <motion.svg
        className="absolute"
        style={{ right: '2%', top: '58%', width: 'min(48vw, 526px)' }}
        animate={{ x: [0, 15, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        viewBox="0 0 584 278"
        fill="none"
      >
        <defs>
          <linearGradient id="paint0_linear_84_107" x1="267" y1="71.5" x2="307.318" y2="287.091" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M267 0C209.54 0 161.756 40.8897 151.875 94.8008C114.595 102.13 86.323 131.004 84.1377 166.116C37.1644 167.995 0 192.298 0 222C0 252.928 40.2944 278 90 278C90.6684 278 91.3351 277.993 92 277.984V278H547V277.91C547.826 277.968 548.659 278 549.5 278C568.554 278 584 262.778 584 244C584 225.612 569.188 210.635 550.682 210.021C547.671 181.905 523.666 160 494.5 160C487.607 160 481.003 161.224 474.896 163.464C472.755 122.538 438.251 90 396 90C391.022 90 386.152 90.4526 381.43 91.3164C370.169 39.1376 323.215 0 267 0Z" fill="url(#paint0_linear_84_107)"/>
      </motion.svg>

      {/* Cloud 3 - Middle Center */}
      <motion.svg
        className="absolute"
        style={{ left: '30%', top: '58%', width: 'min(36vw, 400px)' }}
        animate={{ x: [0, -12, 0], y: [0, 18, 0] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        viewBox="0 0 617 273"
        fill="none"
      >
        <defs>
          <linearGradient id="paint0_linear_84_117" x1="285" y1="33.5" x2="187" y2="321" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.8"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M238.5 0C312.942 0 375.691 42.0472 394.928 99.4102C406.417 92.7903 419.763 89 434 89C475.69 89 509.739 121.497 511.891 162.388C518.036 161.48 524.432 161 531 161C578.496 161 617 186.072 617 217C617 243.908 587.855 266.382 549 271.771V273H39V272.712C37.5271 272.901 36.0252 273 34.5 273C15.4462 273 0 257.778 0 239C0 224.627 9.04998 212.336 21.8408 207.361C20.6382 202.436 20 197.292 20 192C20 159.187 44.5007 132.053 76.3379 127.631C81.7781 56.3777 152.301 0 238.5 0Z" fill="url(#paint0_linear_84_117)"/>
      </motion.svg>
    </div>
  );
};
