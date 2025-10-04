"use client";

import { motion } from "motion/react";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-full w-full  ">
      <div className="h-full w-full border-[2rem] border-primary-foreground bg-primary-foreground rounded-2xl">
        <div className="h-full w-full border min-h-screen p-4  rounded-2xl">
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-4 text-center ">
              <h1 className="text-7xl font-bold text-[#C90B03]">404</h1>
              <h2 className="text-2xl font-semibold text-[#C90B03]">
                Page Not Found
              </h2>
              <p className="text-[#C90B03] font-medium">
                We couldn&apos;t find the page you&apos;re looking for.
                Let&apos;s get you back on track.
              </p>

            
               <Link href= "/">
      <motion.button
        className="group relative inline-flex items-center gap-2 px-3 md:px-6 py-2 md:py-3 overflow-hidden bg-gradient-to-b from-[#155473] to-[#1A6180] rounded-full  text-white font-medium cursor-pointer"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 transition-transform duration-600 group-hover:translate-x-1">
          <MoveLeft
            size={18}
            className="text-white  z-10 -ml-1"
          />
        </span>
        <span className="relative z-10  font-medium text-sm 2xl:text-base duration-600 transition-transform  group-hover:translate-x-1">
          Back to Home
        </span>
      
      </motion.button>
    </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
