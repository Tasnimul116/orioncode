"use client"

import * as React from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"

type MenuItem = {
  key: string
  label: string
  href: string
  hasDropdown?: boolean
  megaMenu?: {
    featured: {
      title: string
      description: string
      href: string
    }
    columns: {
      title: string
      links: { label: string; href: string }[]
    }[]
  }
}

const HOVER_DELAY = 300 // milliseconds

export default function Navbar() {
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true) // 👈 Controls visibility on scroll
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeMobileSubmenu, setActiveMobileSubmenu] = React.useState<string | null>(null)
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null)
  const lastScrollY = React.useRef(0) // 👈 Track last scroll position

  const menuItems: MenuItem[] = [
    { key: "home", label: "Home", href: "/" },
    { key: "about", label: "About Us", href: "/about-us" },
    {
      key: "solutions",
      label: "Solutions",
      href: "/solutions",
      hasDropdown: true,
      megaMenu: {
        featured: {
          title: "Success Stories",
          description: "Explore how we’ve helped companies achieve their goals.",
          href: "#",
        },
        columns: [
          {
            title: "Function",
            links: [
              { label: "Supply Chain", href: "#" },
              { label: "IT", href: "#" },
              { label: "Finance", href: "#" },
            ],
          },
          {
            title: "Initiative",
            links: [{ label: "AI & Automation", href: "#" }],
          },
          {
            title: "Industry",
            links: [
              { label: "Banking", href: "#" },
              { label: "Healthcare", href: "#" },
              { label: "Management", href: "#" },
            ],
          },
        ],
      },
    },
    { key: "insights", label: "Insights", href: "#" },
    { key: "contact", label: "Contact", href: "/contact" },
  ]

  const solutionsItem = menuItems.find(item => item.key === "solutions")

  const isActive = (href: string) => pathname === href

  // 🔁 Scroll direction + background effect
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Background blur after 200px
      setIsScrolled(currentScrollY > 200)

      // Only hide/show if user has scrolled past a small threshold (e.g. 100px)
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling DOWN → hide
          setIsNavbarVisible(false)
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling UP → show
          setIsNavbarVisible(true)
        }
      } else {
        // Always show navbar near the top
        setIsNavbarVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveMobileSubmenu(null)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current)
    }
  }, [])

  const openMenu = (menuKey: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
    setActiveMenu(menuKey)
  }

  const closeMenuWithDelay = () => {
    if (closeTimeout.current) return
    closeTimeout.current = setTimeout(() => {
      setActiveMenu(null)
      closeTimeout.current = null
    }, HOVER_DELAY)
  }

  const toggleMobileSubmenu = (key: string) => {
    setActiveMobileSubmenu(activeMobileSubmenu === key ? null : key)
  }

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isNavbarVisible ? 0 : -100 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className={cn(
          "sticky top-0 z-50 w-full text-foreground backdrop-blur-xl  text-sm",
          isScrolled ? "bg-primary/90" : "bg-primary"
        )}
      >
        <div className="container mx-auto flex h-16 lg:h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/" className=" tracking-tight">
              <img src="/logo.png" alt="orion code logo" className="h-16 " />
            </Link>
          </motion.div>

          {/* Desktop Navigation Items */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center gap-8 xl:gap-10  text-sm text-white"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="relative"
                onMouseEnter={() => item.hasDropdown && openMenu(item.key)}
                onMouseLeave={() => item.hasDropdown && closeMenuWithDelay()}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 font-medium transition-colors relative group",
                    isActive(item.href) || activeMenu === item.key ? "text-white" : "text-white/80",
                    "hover:text-white"
                  )}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <motion.div animate={{ rotate: activeMenu === item.key ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="h-4 w-4 xl:h-5 xl:w-5" />
                    </motion.div>
                  )}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 lg:gap-6"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-50 relative"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Desktop Mega Menu */}
        <AnimatePresence>
          {activeMenu === "solutions" && solutionsItem?.megaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block absolute left-0 top-16 w-full border border-white/10 bg-primary/90 shadow-lg"
              onMouseEnter={() => openMenu("solutions")}
              onMouseLeave={() => closeMenuWithDelay()}
            >
              <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-4 gap-8 text-foreground">
                  {/* Featured */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="col-span-1"
                  >
                    <Link
                      href={solutionsItem.megaMenu.featured.href}
                      className="group relative block h-full overflow-hidden rounded-lg bg-black p-6 text-white transition-transform hover:scale-[1.02]"
                    >
                      <div className="flex h-full flex-col justify-between">
                        <h3 className="text-sm font-semibold">{solutionsItem.megaMenu.featured.title}</h3>
                        <p className="mt-2 text-sm opacity-80">{solutionsItem.megaMenu.featured.description}</p>
                      </div>
                    </Link>
                  </motion.div>

                  {/* Columns */}
                  {solutionsItem.megaMenu.columns.map((column, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                      className="col-span-1"
                    >
                      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                        {column.title}
                      </h4>
                      <ul className="space-y-2">
                        {column.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              className="text-xs  text-white transition-colors hover:text-white/90 inline-flex items-center group"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  )
}