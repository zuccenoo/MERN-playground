import TypeWriter from "../components/TypeWriter";
import Particles from "../components/Particles";
import Model3D from "../components/Model3D";
import InteractiveParticles from "../components/InteractiveParticles";
import { motion } from 'framer-motion'
import { useState } from 'react'

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
        'Art': '#art'
    };

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
                        <span className="text-xl font-bold text-green-500">MERN</span>
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

                        <Button
                            variant="outline"
                            className="border-green-700/50 text-green-500 hover:bg-green-700/10 hover:text-green-400 bg-transparent"
                        >
                            Playground
                        </Button>
                    </div>

                    {/* MOBILE */}
                    <div className="md:hidden">
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger className="text-slate-400 hover:text-green-500 p-2 rounded-md hover:bg-green-700/10 transition-colors">
                                <Menu className="w-5 h-5" />
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-[#2d2d3a] border-l border-[#44445a] w-60">
                                <SheetTitle className="text-green-500 font-bold text-lg">MERN</SheetTitle>
                                <Separator className="bg-[#44445a] my-4" />
                                <div className="flex flex-col gap-1">
                                    {['Home', 'About', 'Projects', 'Art'].map((item) => (
                                        <a
                                            key={item}
                                            href={sectionMap[item]}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <Button
                                                variant="ghost"
                                                className="justify-start text-slate-300 hover:text-green-500 hover:bg-green-700/10 w-full"
                                            >
                                                {item}
                                            </Button>
                                        </a>
                                    ))}
                                    <Separator className="bg-[#44445a] my-4" />
                                    <Button
                                        variant="outline"
                                        className="border-green-700/50 text-green-500 hover:bg-green-700/10 hover:text-green-400 bg-transparent"
                                    >
                                        Playground
                                    </Button>
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
                    className="bg-[#4f5f4f] py-20 px-6"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <div className="absolute inset-0 h-full w-full">
                        <Particles />
                    </div>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                            <div className="text-left">
                                <h2 className="text-3xl font-bold mb-6 text-slate-100">
                                    About This Project
                                </h2>
                                <p className="text-slate-200 text-justify text-lg leading-relaxed">
                                    I borderline vibecoded this website to test out MERN, tailwaind, and other playful components like particles, trasitions and this model of a minecraft tree. Feel free to move this tree around or whatever.
                                </p>
                            </div>

                            <div className="h-96 z-0 overflow-hidden rounded-lg bg-[#2d2d3a]">
                                <Model3D />
                            </div>

                        </div>
                    </div>
                </motion.section>

                {/* REVIEWS / PROJECTS */}
                <motion.section
                    className="py-20 px-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold mb-4 text-slate-100 text-center">
                            Client Reviews
                        </h2>
                        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                            What people are saying about my work
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Review Card 1 */}
                            <motion.div
                                className="bg-[#2d2d3a] p-6 rounded-xl border border-[#44445a] hover:border-green-700/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=samuel1"
                                        alt="reviewer"
                                        className="w-12 h-12 rounded-full border border-green-700/50"
                                    />
                                    <div>
                                        <h3 className="text-slate-100 font-semibold">Alex Johnson</h3>
                                        <div className="flex gap-1 text-yellow-400">
                                            {'★'.repeat(5)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    "Amazing work! The portfolio is incredibly well-designed with smooth animations and great attention to detail. Highly recommend!"
                                </p>
                            </motion.div>

                            {/* Review Card 2 */}
                            <motion.div
                                className="bg-[#2d2d3a] p-6 rounded-xl border border-[#44445a] hover:border-green-700/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=samuel2"
                                        alt="reviewer"
                                        className="w-12 h-12 rounded-full border border-green-700/50"
                                    />
                                    <div>
                                        <h3 className="text-slate-100 font-semibold">Sarah Chen</h3>
                                        <div className="flex gap-1 text-yellow-400">
                                            {'★'.repeat(5)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    "Perfect MERN stack implementation. The code is clean, the UI is beautiful, and everything works flawlessly. 10/10!"
                                </p>
                            </motion.div>

                            {/* Review Card 3 */}
                            <motion.div
                                className="bg-[#2d2d3a] p-6 rounded-xl border border-[#44445a] hover:border-green-700/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=samuel3"
                                        alt="reviewer"
                                        className="w-12 h-12 rounded-full border border-green-700/50"
                                    />
                                    <div>
                                        <h3 className="text-slate-100 font-semibold">Michael Park</h3>
                                        <div className="flex gap-1 text-yellow-400">
                                            {'★'.repeat(4)} <span className="text-slate-500">☆</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    "Fantastic developer! Great communication, timely delivery, and exceptional attention to detail. Would work with again."
                                </p>
                            </motion.div>

                            {/* Review Card 4 */}
                            <motion.div
                                className="bg-[#2d2d3a] p-6 rounded-xl border border-[#44445a] hover:border-green-700/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=samuel4"
                                        alt="reviewer"
                                        className="w-12 h-12 rounded-full border border-green-700/50"
                                    />
                                    <div>
                                        <h3 className="text-slate-100 font-semibold">Emma Rodriguez</h3>
                                        <div className="flex gap-1 text-yellow-400">
                                            {'★'.repeat(5)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    "The 3D model integration was creative and the whole site feels modern. Best portfolio I've seen in a while!"
                                </p>
                            </motion.div>

                            {/* Review Card 5 */}
                            <motion.div
                                className="bg-[#2d2d3a] p-6 rounded-xl border border-[#44445a] hover:border-green-700/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=samuel5"
                                        alt="reviewer"
                                        className="w-12 h-12 rounded-full border border-green-700/50"
                                    />
                                    <div>
                                        <h3 className="text-slate-100 font-semibold">David Kumar</h3>
                                        <div className="flex gap-1 text-yellow-400">
                                            {'★'.repeat(5)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    "Impressive use of Framer Motion and Tailwind CSS. The animations are smooth and the design is cohesive throughout."
                                </p>
                            </motion.div>

                            {/* Review Card 6 */}
                            <motion.div
                                className="bg-[#2d2d3a] p-6 rounded-xl border border-[#44445a] hover:border-green-700/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=samuel6"
                                        alt="reviewer"
                                        className="w-12 h-12 rounded-full border border-green-700/50"
                                    />
                                    <div>
                                        <h3 className="text-slate-100 font-semibold">Lisa Wang</h3>
                                        <div className="flex gap-1 text-yellow-400">
                                            {'★'.repeat(1)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    "Tanginamo."
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
                {/* IMPLEMENT DAISY UI LATER SO THAT YOU COULD FIND A PROPER THEME FOR THESE SHIT */}
                {/* STATS */}
                <motion.section
                    id="projects"
                    className="py-20 px-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, amount: 0.2 }}
                >

                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold mb-4 text-slate-100 text-center">
                            BENTO GRID LAYOUT EXAMPLE
                        </h2>
                        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                            Do not mind the filler text
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">

                            <motion.div
                                className="md:col-span-2 bg-[#2d2d3a] p-8 rounded-xl border border-[#44445a] flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <p className="text-slate-200 text-lg font-semibold text-center">
                                    BORN TO DIE
                                </p>
                            </motion.div>

                            <motion.div
                                className="md:col-span- bg-[#2d2d3a] p-8 rounded-xl border border-[#44445a] flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <p className="text-slate-200 text-lg font-semibold text-center">
                                    WORLD IS A FUCK
                                </p>
                            </motion.div>

                            <motion.div
                                className="md:col-span-1 bg-[#2d2d3a] p-8 rounded-xl border border-[#44445a] flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <p className="text-slate-200 text-lg font-semibold text-center">
                                    鬼神 Kill Em All 1989
                                </p>
                            </motion.div>

                            <motion.div
                                className="md:col-span-2 bg-[#2d2d3a] p-8 rounded-xl border border-[#44445a] flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <p className="text-slate-200 text-lg font-semibold text-center">
                                    I am trash man
                                </p>
                            </motion.div>

                            <motion.div
                                className="md:col-span-3 bg-[#2d2d3a] p-8 rounded-xl border border-[#44445a] flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <p className="text-slate-200 text-lg font-semibold text-center">
                                    410,757,864,530 DEAD COPS
                                </p>
                            </motion.div>

                            <motion.div
                                className="md:col-span-2 bg-[#2d2d3a] p-8 rounded-xl border border-[#44445a] flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <p className="text-slate-200 text-lg font-semibold text-center">
                                    BORN TO DIE
                                </p>
                            </motion.div>

                            <motion.div
                                className="md:col-span- bg-[#2d2d3a] p-8 rounded-xl border border-[#44445a] flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <p className="text-slate-200 text-lg font-semibold text-center">
                                    WORLD IS A FUCK
                                </p>
                            </motion.div>

                            <motion.div
                                className="md:col-span-1 bg-[#2d2d3a] p-8 rounded-xl border border-[#44445a] flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <p className="text-slate-200 text-lg font-semibold text-center">
                                    鬼神 Kill Em All 1989
                                </p>
                            </motion.div>

                            <motion.div
                                className="md:col-span-2 bg-[#2d2d3a] p-8 rounded-xl border border-[#44445a] flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <p className="text-slate-200 text-lg font-semibold text-center">
                                    I am trash man
                                </p>
                            </motion.div>

                            <motion.div
                                className="md:col-span-3 bg-[#2d2d3a] p-8 rounded-xl border border-[#44445a] flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <p className="text-slate-200 text-lg font-semibold text-center">
                                    410,757,864,530 DEAD COPS
                                </p>
                            </motion.div>

                        </div>

                    </div>

                </motion.section>

                {/* EXAMPLE SECTION - MARQUEE */}
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

                {/* EXAMPLE SECTION example section 2 transition ruins the responsivenss as wellz2*/}
                <motion.section
                    id="art"
                    className="bg-[#4f5f4f] py-20 px-6"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <div className="absolute inset-0 h-full w-full">
                        <Particles />
                    </div>

                    <div className="max-w-4xl mx-auto text-center relative z-10 pointer-events-auto">

                        <h2 className="text-3xl font-bold mb-6 text-slate-100">
                            EXAMPLE SECTION # 2
                        </h2>

                        <p className="mb-8 text-slate-200 text-lg leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <button className="bg-green-600 text-slate-950 px-6 py-3 rounded-lg hover:bg-green-500">
                            Start Building
                        </button>

                    </div>

                </motion.section>

                {/* EXAMPLE SECTION - EVANGELION TITLE CARD / ART */}
                <section id="art" className="py-20 px-6 overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-left">
                            <h2
                                className="font-black text-slate-100 leading-none tracking-tight w-full"
                                style={{
                                    fontFamily: 'Times New Roman',
                                    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)'
                                }}
                            >
                                SAMUEL<br />
                                SALVADORA<br />
                                <span
                                    className="block"
                                    style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
                                >
                                    PORTFOLIO
                                </span>
                            </h2>

                            <p
                                className="text-slate-100 font-bold mt-6"
                                style={{
                                    fontFamily: 'Georgia, serif',
                                    fontSize: 'clamp(1.25rem, 3vw, 1.875rem)'
                                }}
                            >
                                FINALE:<br />
                                <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                                    Take care of yourself.
                                </span>
                            </p>
                        </div>
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="bg-[#2d2d3a] py-4 text-center border-t border-[#44445a] relative z-10">

                <p className="text-sm text-slate-400">
                    MERN Test
                    Go back to <a href="/" className="text-green-500 hover:underline">
                        Home
                    </a>
                </p>

            </footer>

        </div>
    )
}

export default App