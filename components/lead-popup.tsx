'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzhvWioLuWgxR0_VVCXiIRQX9H_ojQsktLyp5FjCxZR358ebUiU9rcCwkoga-HAQQLjXw/exec'

export default function LeadPopup() {
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState('')
  const [otherProject, setOtherProject] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(true)
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (submitting) return

    setSubmitting(true)

    const finalProjectType =
      projectType === 'Any Other' ? otherProject : projectType

    const formData = {
      firstName: name.trim(),
      lastName: surname.trim(),
      email: email.trim(),
      projectType: finalProjectType.trim(),
      description: description.trim(),
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      })

      setSuccess(true)

      setName('')
      setSurname('')
      setEmail('')
      setProjectType('')
      setOtherProject('')
      setDescription('')

      window.setTimeout(() => {
        setOpen(false)
        setSuccess(false)
      }, 2500)
    } catch (error) {
      console.error('Lead form submission error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 py-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-yellow-600/50 bg-black p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full p-2 text-yellow-400 transition hover:bg-yellow-500/10"
            >
              <X size={24} />
            </button>

            <div className="pr-10">
              <h2 className="text-3xl font-bold text-yellow-400">
                Transform Your Space
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Fill in your details for a free consultation with
                <span className="font-semibold text-yellow-400">
                  {' '}Devkansh Interior.
                </span>
              </p>
            </div>

            {success ? (
              <div className="mt-10 rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-8 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  Thank You!
                </div>

                <p className="mt-3 text-gray-300">
                  Your enquiry has been submitted successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-7">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-yellow-400">
                    First Name
                  </label>

                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full rounded-xl border border-gray-600 bg-[#111111] px-4 py-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-yellow-400">
                    Last Name
                  </label>

                  <input
                    type="text"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Enter your last name"
                    className="w-full rounded-xl border border-gray-600 bg-[#111111] px-4 py-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-yellow-400">
                    Email ID
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email ID"
                    className="w-full rounded-xl border border-gray-600 bg-[#111111] px-4 py-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-yellow-400">
                    Project Type
                  </label>

                  <select
                    required
                    value={projectType}
                    onChange={(e) => {
                      const value = e.target.value
                      setProjectType(value)

                      if (value !== 'Any Other') {
                        setOtherProject('')
                      }
                    }}
                    className="w-full rounded-xl border border-gray-600 bg-[#111111] px-4 py-4 text-sm text-white outline-none transition focus:border-yellow-500"
                  >
                    <option value="">Select project type</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="Villa">Villa</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Shop">Shop</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Any Other">Any Other</option>
                  </select>
                </div>

                {projectType === 'Any Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <label className="mb-2 block text-sm font-semibold text-yellow-400">
                      Please Specify
                    </label>

                    <input
                      type="text"
                      required
                      value={otherProject}
                      onChange={(e) => setOtherProject(e.target.value)}
                      placeholder="Enter project type"
                      className="w-full rounded-xl border border-gray-600 bg-[#111111] px-4 py-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-yellow-500"
                    />
                  </motion.div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-yellow-400">
                    Description
                  </label>

                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your interior work or requirement..."
                    rows={7}
                    className="w-full resize-none rounded-xl border border-gray-600 bg-[#111111] px-4 py-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-yellow-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 px-5 py-4 text-sm font-bold text-black shadow-lg transition hover:from-yellow-500 hover:to-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}