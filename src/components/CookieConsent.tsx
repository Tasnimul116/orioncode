"use client"

import { useState, useEffect } from "react"

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-lg border border-gray-300 bg-white p-4 shadow-lg dark:bg-neutral-900 dark:border-neutral-700">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        🍪 We use cookies
      </h3>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        We use cookies to enhance your browsing experience, serve personalized content, and analyze site traffic.
        By clicking “Accept,” you consent to our use of cookies. You can change your preferences anytime.
      </p>

      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={handleReject}
          className="rounded-md border border-gray-300 bg-transparent px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-800"
        >
          Reject
        </button>
        <button
          onClick={handleAccept}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
