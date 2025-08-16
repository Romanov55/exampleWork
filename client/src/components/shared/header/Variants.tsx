"use client"

import { Topic } from "@/types"
import type { Variants } from "motion/react"
import * as motion from "motion/react-client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function Variants({topics}: {topics: Topic[]}) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { height } = useDimensions(containerRef)

    return (
            <div className={`mobile ${isOpen ? 'active' : ''}`} style={container}>
                <motion.nav
                    className="mobile__nav"
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef}
                >
                    <motion.div className="mobile__back" variants={sidebarVariants} />
                    <Navigation topics={topics} />
                    <MenuToggle toggle={() => setIsOpen(!isOpen)} />
                </motion.nav>
            </div>
    )
}

const navVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
}

const Navigation = ({topics}: {topics: Topic[]}) => (
    <motion.ul style={list} variants={navVariants}>
        {topics.map((topic) => (
            <div key={topic.id}>
                <MenuItem topic={topic}  />
            </div>
        ))}

    </motion.ul>
)

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
}

const MenuItem = ({ topic }: { topic: Topic }) => {
    return (
        <motion.li
            style={listItem}
            variants={itemVariants}
        >
            <Link href={`/${topic.slug}`} className="mobile__title">{topic.title}</Link>
        </motion.li>
    )
}

const sidebarVariants: Variants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(26px at calc(100vw - 40px) 40px)", 
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
}

interface PathProps {
    d?: string
    variants: Variants
    transition?: { duration: number }
}

const Path = (props: PathProps) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
)

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
    <button style={toggleContainer} onClick={toggle}>
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                }}
            />
        </svg>
    </button>
)

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    top: 0,
    right: 0,
    position: "absolute",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flex: 1,
    backgroundColor: "var(--accent)",
    overflow: "hidden",
    zIndex: 1,
}

const toggleContainer: React.CSSProperties = {
    outline: "none",
    border: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    cursor: "pointer",
    position: "absolute",
    top: 18,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: "transparent",
    pointerEvents: 'all'
}

const list: React.CSSProperties = {
    listStyle: "none",
    padding: 50,
    margin: 0,
    position: "absolute",
    top: 50,
    width: 'auto',
}

const listItem: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    listStyle: "none",
    marginBottom: 20,
    cursor: "pointer",
}

/**
 * ==============   Utils   ================
 */

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
    const dimensions = useRef({ width: 0, height: 0 })

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offsetWidth
            dimensions.current.height = ref.current.offsetHeight
        }
    }, [ref])

    return dimensions.current
}
