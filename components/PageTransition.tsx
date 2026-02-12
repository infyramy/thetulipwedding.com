import React from 'react';
import { motion } from 'framer-motion';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const transition = { duration: 0.8, ease: [0.76, 0, 0.24, 1] };

    // Logo Component for reuse
    const Logo = () => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
                src="/assets/LOGO THE TULIP AI (1).svg"
                alt="Logo"
                className="w-48 h-auto opacity-100 drop-shadow-md"
            />
        </div>
    );

    return (
        <>
            <div className="w-full relative z-0">{children}</div>

            {/* --- ENTER PHASE (Center -> Right) --- */}

            {/* 3. Black Layer (Bottom) - Last to leave */}
            <motion.div
                className="fixed inset-0 z-[2000] bg-zinc-900 pointer-events-none"
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                exit={{ x: "100%" }}
                transition={{ ...transition, delay: 0.2 }}
            />
            {/* 2. Pink Layer (Middle) */}
            <motion.div
                className="fixed inset-0 z-[2005] bg-rose-300 pointer-events-none"
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                exit={{ x: "100%" }}
                transition={{ ...transition, delay: 0.1 }}
            />
            {/* 1. White Layer (Top) + Logo - First to leave */}
            <motion.div
                className="fixed inset-0 z-[2010] bg-white pointer-events-none"
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                exit={{ x: "100%" }}
                transition={{ ...transition, delay: 0 }}
            >
                <Logo />
            </motion.div>


            {/* --- EXIT PHASE (Left -> Center) --- */}

            {/* 3. Black Layer (Bottom) - First to arrive */}
            <motion.div
                className="fixed inset-0 z-[2000] bg-zinc-900 pointer-events-none"
                initial={{ x: "-100%" }}
                animate={{ x: "-100%" }}
                exit={{ x: "0%" }}
                transition={{ ...transition, delay: 0 }}
            />
            {/* 2. Pink Layer (Middle) */}
            <motion.div
                className="fixed inset-0 z-[2005] bg-rose-300 pointer-events-none"
                initial={{ x: "-100%" }}
                animate={{ x: "-100%" }}
                exit={{ x: "0%" }}
                transition={{ ...transition, delay: 0.1 }}
            />
            {/* 1. White Layer (Top) + Logo - Last to arrive */}
            <motion.div
                className="fixed inset-0 z-[2010] bg-white pointer-events-none"
                initial={{ x: "-100%" }}
                animate={{ x: "-100%" }}
                exit={{ x: "0%" }}
                transition={{ ...transition, delay: 0.2 }}
            >
                <Logo />
            </motion.div>
        </>
    );
};

export default PageTransition;
