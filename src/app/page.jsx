"use client";

import Image from 'next/image';
import React from 'react';
import { FaHandshake, FaClipboardList, FaChartLine, FaUser, FaInfoCircle, FaHandPointRight } from 'react-icons/fa';
import { BsTranslate } from "react-icons/bs";
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const NavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-gray-600 font-semibold hover:text-gray-800 transition-colors duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

const Button = ({ children, className }) => (
  <motion.button
    className={`${className} transition-colors duration-300`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

export default function Home() {
  return (
    <div className="h-screen bg-white text-black overflow-hidden">
      <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
      <df-messenger
        chat-icon="https:&#x2F;&#x2F;www.svgrepo.com&#x2F;show&#x2F;533270&#x2F;message-square-lines-alt.svg"
        chat-title="PRAGATI"
        agent-id="6dd23b1f-bf0d-4362-97a0-d56afae84cec"
        language-code="en"
      ></df-messenger>
      <header className="bg-white p-2">
        <nav className="container mx-auto px-4 flex justify-between h-20 items-center">
          <motion.div
            className="text-4xl font-bold text-[#516774]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            PRAGATI
          </motion.div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-10 mr-10">
              <NavLink href="#">ABOUT</NavLink>
              <NavLink href="#">PRIVACY</NavLink>
              <Button className="flex flex-row items-center justify-center font-semibold">
                <BsTranslate className="mr-1" /> ENGLISH
              </Button>
            </div>
            <Button className="text-[#FF5900] border border-[#FF5900] px-4 py-2 rounded-full flex items-center hover:bg-[#FF5900] hover:text-white">
              <FaHandPointRight className="mr-2" /> COMPLAINT
            </Button>
            <Link href="/register" className="bg-[#FF5900] text-white px-8 py-2 rounded-full flex items-center hover:bg-[#FF7A33]">
              <FaUser className="mr-2" /> LOGIN
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <div className="flex items-center justify-around mb-8 mt-8 px-10">
              {['Collaborate', 'Plan', 'Progress'].map((text, index) => (
                <React.Fragment key={text}>
                  <motion.div className="flex flex-col items-center" {...fadeIn} transition={{ delay: index * 0.2 }}>
                    <motion.span
                      className="text-[#FF5900] font-semibold mb-4 text-3xl"
                      whileHover={{ scale: 1.1 }}
                    >
                      {text}
                    </motion.span>
                    <motion.div>
                      {index === 0 && <FaHandshake className="text-black text-5xl" />}
                      {index === 1 && <FaClipboardList className="text-black text-5xl" />}
                      {index === 2 && <FaChartLine className="text-black text-5xl" />}
                    </motion.div>
                  </motion.div>
                  {index < 2 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 100 }}
                      transition={{ duration: 0.8 }}
                      className="h-1 w-20 bg-[#FF5900] rounded-full mt-12" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex space-x-4 mb-8 w-full justify-center">
              <Link href="/register" className="bg-[#FF5900] text-white w-1/3 px-6 py-2 rounded-full text-lg font-semibold flex items-center justify-center hover:bg-[#FF7A33]">
                <FaUser className="mr-2" /> Registration
              </Link>
              <Button className="border border-gray-300 w-1/3 text-gray-700 px-6 py-2 rounded-full text-lg font-semibold flex items-center justify-center hover:bg-gray-100">
                <FaInfoCircle className="mr-2" /> About Pragati
              </Button>
            </motion.div>
            <motion.div
              className="flex justify-center mt-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/construct.svg"
                alt="Construction illustration"
                width={425}
                height={450}
                className="rounded-lg"
                draggable="false"
              />
            </motion.div>
          </div>
          <div className="relative overflow-hidden w-full lg:w-1/2 flex flex-col items-center px-4">
            <motion.div
              className="bg-[#F5D8C3] rounded-[70px] absolute -bottom-10 rotate-6 z-10 h-[550px] w-[600px] p-8"
              animate={{ rotate: [6, 15, 0, 10, 6] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />
            <motion.div
              className='z-20'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image src="/Frame.svg" alt="Construction illustration" draggable="false" width={365} height={100} className="z-20" />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}