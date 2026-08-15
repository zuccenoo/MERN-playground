import TypeWriter from "../components/TypeWriter";
import Particles from "../components/Particles";
import Model3D from "../components/Model3D";
import InteractiveParticles from "../components/InteractiveParticles";
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Shadcn UI imports
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { Menu, } from 'lucide-react'


function App() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const sectionMap = {
        'Home': '#home',
        'About': '#about',
        'Projects': '#projects',
        'Art': '#art',
        'Contact': '#contact'
    };

    // reddit api to fetch art posts
    const [artworks, setArtworks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchArt = async () => {
            try {
                const REDDIT_URL = 'https://www.reddit.com/user/zuccenoo/submitted.json?limit=10'
                const url = `https://api.allorigins.win/get?url=${encodeURIComponent(REDDIT_URL)}`

                const res = await fetch(url)
                const json = await res.json()
                const data = JSON.parse(json.contents) // allorigins wraps response in .contents

                if (!data?.data?.children) {
                    console.error('Unexpected Reddit response:', data)
                    return
                }

                const posts = data.data.children
                    .filter(post =>
                        post.data.is_gallery ||
                        post.data.post_hint === 'image'
                    )
                    .map(post => {
                        // gallery posts — grab first image from media_metadata
                        if (post.data.is_gallery && post.data.media_metadata) {
                            const firstKey = Object.keys(post.data.media_metadata)[0]
                            const meta = post.data.media_metadata[firstKey]
                            // decode HTML entities in URL, grab largest preview
                            const url = meta.p?.[meta.p.length - 1]?.u?.replace(/&amp;/g, '&')
                            return {
                                title: post.data.title,
                                img: url,
                                subreddit: post.data.subreddit,
                                url: `https://reddit.com${post.data.permalink}`,
                            }
                        }
                        // single image posts
                        return {
                            title: post.data.title,
                            img: post.data.url,
                            subreddit: post.data.subreddit,
                            url: `https://reddit.com${post.data.permalink}`,
                        }
                    })
                    .filter(p => p.img) // drop any without images

                setArtworks(posts)
            } catch (err) {
                console.error('Reddit fetch failed:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchArt()
    }, [])

    return (
        <div className="min-h-screen flex flex-col text-slate-200 relative" style={{ scrollBehavior: 'smooth' }}>
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#0a0b0f] via-[#0f2018] to-[#020302]" />
            <div className="fixed inset-0 z-0">
                <InteractiveParticles />
            </div>

            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-[#2d2d3a]/60 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

                    {/* LOGO */}
                    <div className="flex items-center gap-3">
                        <img src="../logo.png" alt="logo" className="w-8 h-8" />
                        <span className="text-xl font-bold text-green-500">SAM SALVADORA</span>
                    </div>

                    {/* DESKTOP */}
                    <div className="hidden md:flex items-center gap-2">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {['Home', 'About', 'Projects', 'Art'].map((item) => (
                                    <NavigationMenuItem key={item}>
                                        <NavigationMenuLink
                                            href={sectionMap[item]}
                                            className={`${navigationMenuTriggerStyle()}
                                            relative
                                            text-slate-400
                                            hover:bg-transparent
                                            hover:text-white
                                            after:absolute
                                            after:bottom-0
                                            after:left-1/2
                                            after:h-0.5
                                            after:w-0
                                            after:-translate-x-1/2
                                            after:bg-green-500
                                            after:transition-all
                                            hover:after:w-3/4`}
                                        >
                                            {item}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                        <Separator orientation="vertical" className=" bg-[#44445a] mx-2" />

                        <a href="#contact">
                            <Button
                                className="bg-green-700 text-slate-300 hover:bg-green-700/10 hover:text-green-400"
                            >
                                Contact
                            </Button>
                        </a>
                    </div>

                    {/* MOBILE */}
                    <div className="md:hidden">
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger className="text-slate-400 hover:text-green-500 p-2 rounded-md hover:bg-green-700/10 transition-colors">
                                <Menu className="w-5 h-5" />
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-[#2d2d3a]/95 backdrop-blur-md border-l border-white/5 w-64 p-0">

                                {/* DRAWER HEADER */}
                                <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3">
                                    <img src="../logo.png" alt="logo" className="w-7 h-7" />
                                    <SheetTitle className="text-sm font-semibold tracking-widest text-slate-200 uppercase">
                                        Sam<span className="text-green-500">.</span>
                                    </SheetTitle>
                                </div>

                                {/* DRAWER LINKS */}
                                <div className="px-3 py-4 flex flex-col gap-1">
                                    {['Home', 'About', 'Projects', 'Art'].map((item) => (
                                        <a
                                            key={item}
                                            href={sectionMap[item]}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center px-3 py-2.5 rounded-md text-xs text-slate-400 hover:text-green-400 hover:bg-white/5 transition-all duration-200 tracking-widest uppercase font-medium"
                                        >
                                            {item}
                                        </a>
                                    ))}

                                    <Separator className="bg-white/5 my-3" />

                                    <a
                                        href="#contact"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full"
                                    >
                                        <Button
                                            className="w-full bg-green-700 text-slate-200 hover:bg-green-600 text-xs tracking-widest uppercase font-medium"
                                        >
                                            Contact
                                        </Button>
                                    </a>
                                </div>

                                {/* DRAWER FOOTER */}
                                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-white/5">
                                    <p className="text-xs text-slate-600 tracking-wider">© 2025 Samuel Salvadora</p>
                                </div>

                            </SheetContent>
                        </Sheet>
                    </div>

                </div>
            </nav>

            <main className="flex-grow relative z-10">
                {/* HERO */}
                <section id="home"
                    className="relative text-center px-6 py-24 overflow-hidden h-screen flex flex-col items-center justify-center ">

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6 text-center md:text-left">
                        <img src="../logo.png" alt="logo" className="w-14 md:w-20" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
                            SAMUEL SALVADORA PORTFOLIO
                        </h2>
                    </div>

                    <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-8 text-justify leading-relaxed">
                        <TypeWriter text="Boomshakalaka I made this portfolio testing a MERN stack, mainly frontend. Watch this text type in like one of those programmer portfolios you always see." speed={50} />
                    </p>
                </section>

                {/* ABOUT */}
                <motion.section
                    id="about"
                    className="relative bg-[#4f5f4f] py-24 px-6 overflow-hidden"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <div className="absolute inset-0 h-full w-full">
                        <Particles />
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                            {/* TEXT */}
                            <div className="text-left">
                                <p className="text-xs text-green-400 tracking-[0.3em] uppercase mb-3 font-medium">
                                    Who I Am
                                </p>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-100 leading-tight mb-6">
                                    About Me &<br />This Site
                                </h2>

                                <p className="text-slate-200 text-lg leading-relaxed mb-6">
                                    I'm an entry-level software developer with a foundation in web development —
                                    having built projects across the full stack using PHP, Laravel, and the MERN stack
                                    through academic and internship work.
                                </p>

                                <p className="text-slate-300 text-base leading-relaxed mb-8">
                                    While web dev is where I started, I'm actively looking to grow beyond it —
                                    exploring other areas of software development as I look for opportunities
                                    to contribute, learn, and build things that matter.
                                </p>

                                <div className="relative overflow-hidden">
                                    <p className="text-slate-400 bg-black/10 text-sm leading-relaxed mb-10 border-l-2 border-green-500/40 pl-4">
                                        This site itself is a playground — built to test out MERN, Tailwind,
                                        Framer Motion, Three.js, and a canvas particle system. The 3D tree
                                        on the right? Feel free to drag it around.
                                    </p>
                                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#4f5f4f] to-transparent pointer-events-none" />
                                </div>
                            </div>

                            {/* 3D MODEL */}
                            <div className="h-96 z-0 overflow-hidden rounded-xl bg-[#2d2d3a] border border-white/5">
                                <Model3D />
                            </div>

                        </div>
                    </div>
                </motion.section>

                {/* PROJECTS */}
                <motion.section
                    id="projects"
                    className="py-20 px-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <div className="max-w-6xl mx-auto">

                        {/* HEADER */}
                        <div className="mb-14 text-left">
                            <p className="text-xs text-green-500 tracking-[0.3em] uppercase mb-3 font-medium">
                                Work
                            </p>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-100 leading-tight mb-4">
                                Projects
                            </h2>
                            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                                A mix of capstone, internship, and personal work.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            {/* CDMS — featured, large */}
                            <motion.div
                                className="md:col-span-2 bg-[#1a1a24] border border-white/5 hover:border-green-700/30 rounded-xl p-6 flex flex-col justify-between gap-6 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-green-400 tracking-widest uppercase font-medium">Capstone</span>
                                        <span className="text-xs text-slate-600">2024</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-100 mb-2">
                                        CDMS — Hotel & Event Management (Co-developed)
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        A full hotel and event management system built as a capstone project. Handles reservations, event scheduling, guest management, and reporting.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-wrap gap-2">
                                        {['HTML', 'CSS', 'JavaScript', 'PHP', 'jQuery', 'Bootstrap'].map((tag) => (
                                            <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <Button size="sm" variant="outline" className="border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-transparent text-xs">
                                            GitHub ↗
                                        </Button>
                                        <Button
                                            href="http://casadaisy.online/"
                                            size="sm" variant="outline"
                                            className="border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-transparent text-xs"
                                        >
                                            Live ↗
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* HR PORTAL */}
                            <motion.div
                                className="md:col-span-1 bg-[#1a1a24] border border-white/5 hover:border-green-700/30 rounded-xl p-6 flex flex-col justify-between gap-6 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-blue-400 tracking-widest uppercase font-medium">Internship</span>
                                        <span className="text-xs text-slate-600">2025</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-100 mb-2">
                                        SDO HR Portal
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        HR management portal built for a Schools Division Office. Handles employee records, document management, and file uploads.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-wrap gap-2">
                                        {['Laravel', 'AdminLTE v4', 'Bootstrap', 'jQuery', 'Docker'].map((tag) => (
                                            <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <Button size="sm" variant="outline" className="border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-transparent text-xs">
                                            GitHub ↗
                                        </Button>
                                        <Button size="sm" variant="outline" className="border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-transparent text-xs">
                                            Live ↗
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* EXPENSE TRACKER */}
                            <motion.div
                                className="md:col-span-1 bg-[#1a1a24] border border-white/5 hover:border-green-700/30 rounded-xl p-6 flex flex-col justify-between gap-6 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-green-400 tracking-widest uppercase font-medium">Personal</span>
                                        <span className="text-xs text-slate-600">2025</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-100 mb-2">
                                        Expense Tracker
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Full-stack MERN expense tracker built to practice REST API design. Supports income and expense CRUD, category tagging, and a dashboard summary.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-wrap gap-2">
                                        {['MongoDB', 'Express', 'React', 'Node', 'Tailwind', 'shadcn'].map((tag) => (
                                            <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <Button size="sm" variant="outline" className="border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-transparent text-xs">
                                            GitHub ↗
                                        </Button>
                                        <Button size="sm" variant="outline" className="border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-transparent text-xs">
                                            Live ↗
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* FILLER — This Portfolio */}
                            <motion.div
                                className="md:col-span-2 bg-[#1a1a24] border border-white/5 hover:border-green-700/30 rounded-xl p-6 flex flex-col justify-between gap-6 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-purple-400 tracking-widest uppercase font-medium">Personal</span>
                                        <span className="text-xs text-slate-600">2025</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-100 mb-2">
                                        This Portfolio
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        One-page portfolio built to test out MERN, Framer Motion, Three.js, and canvas particle systems. The page you're currently looking at.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'Vite', 'Tailwind', 'Framer Motion', 'Three.js', 'shadcn', 'Canvas API'].map((tag) => (
                                            <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <Button size="sm" variant="outline" className="border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-transparent text-xs">
                                            GitHub ↗
                                        </Button>
                                        <Button size="sm" variant="outline" className="border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-transparent text-xs">
                                            You're here ↗
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* FILLER — Coming Soon */}
                            <motion.div
                                className="md:col-span-3 bg-[#1a1a24] border border-dashed border-white/10 rounded-xl p-6 flex items-center justify-center min-h-24 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <p className="text-slate-600 text-sm tracking-widest uppercase">
                                    More coming soon —
                                </p>
                            </motion.div>

                        </div>
                    </div>
                </motion.section>

                {/* EXAMPLE SECTION - MARQUEE 
                <motion.section
                    className="py-20 px-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.2 }}
                >

                    <div className="max-w-6xl mx-auto">

                        <motion.h2
                            className="text-4xl font-bold mb-4 text-slate-100 text-center overflow-hidden"
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            Featured Example
                        </motion.h2>

                        <motion.div
                            className="relative w-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <motion.p
                                className="text-slate-400 text-lg font-semibold whitespace-nowrap"
                                animate={{ x: ["100%", "-100%"] }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.              </motion.p>
                        </motion.div>

                        <motion.div
                            className="p-8 md:p-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >

                            <h3 className="text-2xl font-bold text-green-500 mb-6">
                                The Journey Begins
                            </h3>

                            <p className="text-slate-200 text-justify text-lg leading-relaxed mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>

                        </motion.div>

                    </div>

                </motion.section>
                */}

                {/* ART */}
                <motion.section
                    id="art"
                    className="relative py-24 px-6 overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <div className="relative z-10 max-w-6xl mx-auto">

                        {/* HEADER */}
                        <div className="mb-14 text-left">
                            <p className="text-xs text-green-500 tracking-[0.3em] uppercase mb-3 font-medium">
                                Creative Work
                            </p>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-100 leading-tight mb-4">
                                Digital Art &<br />Illustrations
                            </h2>
                            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                                I also do freelance digital art mainly for personal projects, including
                                character design, concept art, and illustrations.
                            </p>
                        </div>

                        {loading ? (
                            // LOADING STATE
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-xl bg-[#1a2420] border border-white/5 animate-pulse ${i === 0 ? 'col-span-2 md:col-span-4 h-64 md:h-80' : 'aspect-square'}`}
                                    />
                                ))}
                            </div>
                        ) : (
                            <>
                                {/* FEATURED — first post, full width */}
                                {artworks[0] && (
                                    <motion.a
                                        href={artworks[0].url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group overflow-hidden rounded-xl bg-[#1a2420] border border-white/5 w-full h-64 md:h-80 mb-4 block"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <img
                                            src={artworks[0].img}
                                            alt={artworks[0].title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                                            <div>
                                                <span className="text-xs text-green-400 tracking-widest uppercase">Featured</span>
                                                <p className="text-slate-100 font-semibold text-xl mt-1 line-clamp-1">{artworks[0].title}</p>
                                                <p className="text-slate-500 text-xs">r/{artworks[0].subreddit}</p>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-all duration-300" />
                                    </motion.a>
                                )}

                                {/* SMALLER PIECES — remaining posts */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
                                    {artworks.slice(1, 5).map((piece, i) => (
                                        <motion.a
                                            key={piece.url}
                                            href={piece.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative group overflow-hidden rounded-xl bg-[#1a2420] border border-white/5 aspect-square block"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                                            viewport={{ once: true }}
                                        >
                                            <img
                                                src={piece.img}
                                                alt={piece.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-3">
                                                <div>
                                                    <p className="text-slate-200 font-medium text-sm line-clamp-2">{piece.title}</p>
                                                    <p className="text-slate-500 text-xs">r/{piece.subreddit}</p>
                                                </div>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* FOOTER ROW */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <p className="text-slate-500 text-sm">
                                Available for commissions and collaborations.
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-transparent text-sm"
                                    onClick={() => window.open('https://www.reddit.com/user/zuccenoo', '_blank')}
                                >
                                    View on Reddit ↗
                                </Button>
                                <Button
                                    className="bg-green-600 hover:bg-green-500 text-slate-950 text-sm font-semibold"
                                    onClick={() => window.open('https://vgen.co/zuccenoo', '_blank')}
                                >
                                    Visit my VGen ↗
                                </Button>
                            </div>
                        </div>

                    </div>
                </motion.section>

                {/* THOUGHTS */}
                <motion.section
                    id="thoughts"
                    className="py-20 px-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <div className="max-w-6xl mx-auto">

                        {/* HEADER */}
                        <div className="mb-14 text-left">
                            <p className="text-xs text-green-500 tracking-[0.3em] uppercase mb-3 font-medium">
                                Guestbook
                            </p>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-100 leading-tight mb-4">
                                Drop a Thought
                            </h2>
                            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                                Leave a message typa section, note that these are sample thoughts and profanity may or may not be involved
                            </p>
                        </div>

                        {/* THOUGHT CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { seed: 'samuel1', name: 'Alex Johnson', stars: 5, text: 'Amazing work! The portfolio is incredibly well-designed with smooth animations and great attention to detail.' },
                                { seed: 'samuel2', name: 'Sarah Chen', stars: 5, text: 'Perfect MERN stack implementation. The code is clean, the UI is beautiful, and everything works flawlessly.' },
                                { seed: 'samuel3', name: 'Michael Park', stars: 4, text: 'Fantastic developer! Great communication, timely delivery, and exceptional attention to detail. Would work with again.' },
                                { seed: 'samuel4', name: 'Emma Rodriguez', stars: 5, text: 'The 3D model integration was creative and the whole site feels modern. Best portfolio I\'ve seen in a while!' },
                                { seed: 'samuel5', name: 'David Kumar', stars: 5, text: 'Impressive use of Framer Motion and Tailwind CSS. The animations are smooth and the design is cohesive throughout.' },
                                { seed: 'samuel6', name: 'Lisa Wang', stars: 1, text: 'Tanginamo.' },
                            ].map((entry, i) => (
                                <motion.div
                                    key={entry.seed}
                                    className="bg-[#1a1a24] p-6 rounded-xl border border-white/5 hover:border-green-700/30 transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.08 * i }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    {/* card header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.seed}`}
                                            alt={entry.name}
                                            className="w-10 h-10 rounded-full border border-white/10"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-slate-100 font-semibold text-sm truncate">{entry.name}</h3>
                                            <div className="flex gap-0.5 text-yellow-400 text-xs mt-0.5">
                                                {'★'.repeat(entry.stars)}
                                                {entry.stars < 5 && <span className="text-slate-600">{'★'.repeat(5 - entry.stars)}</span>}
                                            </div>
                                        </div>
                                        <span className="text-slate-600 text-xs shrink-0">just now</span>
                                    </div>

                                    {/* card body */}
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {entry.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* POST INPUT — no function yet */}
                        <div className="bg-[#1a1a24] border border-white/5 rounded-xl p-5 mt-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                    <span className="text-green-400 text-xs font-bold">?</span>
                                </div>
                                <span className="text-slate-500 text-sm">Anonymous</span>
                            </div>
                            <textarea
                                className="w-full bg-transparent text-slate-200 placeholder:text-slate-600 text-sm resize-none outline-none leading-relaxed min-h-[80px]"
                                placeholder="Write something..."
                                disabled
                            />

                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                                <span className="text-slate-600 text-xs">doesnt work yet sonion</span>
                                <Button
                                    disabled
                                    className="bg-green-600 text-slate-950 text-xs font-semibold opacity-40 cursor-not-allowed"
                                >
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </main>

            {/* FOOTER */}
            <footer id="contact" className="bg-[#2d2d3a] border-t border-white/5 relative z-10">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                        <div className="col-span-1">
                            <h2
                                className="font-black text-slate-100 leading-none tracking-tight mb-3"
                                style={{
                                    fontFamily: 'Times New Roman',
                                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)'
                                }}
                            >
                                SAMUEL<br />
                                SALVADORA<br />
                                <span style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)' }}>
                                    PORTFOLIO
                                </span>
                            </h2>
                            <p
                                className="text-white font-bold mb-3"
                                style={{
                                    fontFamily: 'Georgia, serif',
                                    fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)'
                                }}
                            >
                                FINALE:<br />
                                <span className="text-white font-normal">Take care of yourself.</span>
                            </p>

                        </div>

                        <div className="col-span-1">
                            <p className="text-xs text-slate-500 tracking-[0.2em] uppercase mb-4">Navigate</p>
                            <div className="flex flex-col gap-2">
                                {[
                                    { label: 'Back to Home', href: '#home' },
                                    { label: 'About', href: '#about' },
                                    { label: 'Projects', href: '#projects' },
                                    { label: 'Art', href: '#art' },
                                    { label: 'Thoughts', href: '#thoughts' },
                                ].map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 w-fit"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-1">
                            <p className="text-xs text-slate-500 tracking-[0.2em] uppercase mb-4">Contact</p>
                            <div className="flex flex-col gap-2">
                                <a href="mailto:samueljoshuabusiness@gmail.com" className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 w-fit">
                                    samueljoshuabusiness@gmail.com
                                </a>
                                <a href="https://github.com/zuccenoo" className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 w-fit">
                                    GitHub ↗
                                </a>
                                <a href="https://www.linkedin.com/in/samuel-joshua-salvadora-577b9539a/" className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 w-fit">
                                    LinkedIn ↗
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-6 text-right gap-2">
                        <p className="text-xs text-slate-400">
                            {new Date().getFullYear()} Samuel Salvadora. This is a personal website and not a professional portfolio.
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default App