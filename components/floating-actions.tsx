"use client"

import { useState, useEffect } from "react"
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhoneAlt } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
          {/* WhatsApp Button */}
          <motion.a
            href="https://wa.me/919372944217"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ duration: 0.3, delay: 0.01 }}
            whileHover={{ scale: 1.06 }}
            className="flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
          >
            <FaWhatsapp className="size-7" />
          </motion.a>

          {/* Facebook Button */}
          <motion.a
            href="https://www.facebook.com/share/1EruawyraA/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ duration: 0.3, delay: 0.02 }}
            whileHover={{ scale: 1.06 }}
            className="flex size-13 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg"
          >
            <FaFacebookF className="size-6" />
          </motion.a>

          {/* Instagram Button */}
          <motion.a
            href="https://www.instagram.com/devkanshinterior_mumbai?igsh=enRmYjV5dWo4ajFv"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ duration: 0.3, delay: 0.03 }}
            whileHover={{ scale: 1.06 }}
            className="flex size-13 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white shadow-lg"
          >
            <FaInstagram className="size-6" />
          </motion.a>

          {/* Phone Call Button */}
          <motion.a
            href="tel:+919372944217"
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ duration: 0.3, delay: 0.04 }}
            whileHover={{ scale: 1.06 }}
            className="flex size-13 items-center justify-center rounded-full bg-[#EAB308] text-black shadow-lg"
          >
            <FaPhoneAlt className="size-5" />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  )
}