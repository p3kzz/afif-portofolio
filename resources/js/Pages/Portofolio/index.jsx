import React, { useState, useEffect, useRef } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';

import Preloader from './Components/Preloader';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About';
import Stats from './Components/Stats';
import TechStack from './Components/TechStack';
import Projects from './Components/Projects';
import Experience from './Components/Experience';
import Certifications from './Components/Certifications';
import Journey from './Components/Journey';
import Blog from './Components/Blog';
import Services from './Components/Services';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import CaseStudyModal from './Components/CaseStudyModal';
import BlogJournalModal from './Components/BlogJournalModal';
import Footer from './Components/Footer';

export default function Index({
    profile,
    statistics,
    aboutCards,
    skillCategories,
    projects,
    experiences,
    educations,
    certifications,
    blogs,
    testimonials,
    approvedComments,
    auth_user
}) {

    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [skillsVisible, setSkillsVisible] = useState(false);
    const [animatedStats, setAnimatedStats] = useState({});
    const ambientCanvasRef = useRef(null);
    const navIndicatorRef = useRef(null);
    const navContainerRef = useRef(null);
    const [loading, setLoading] = useState(true);


    const [certIdx, setCertIdx] = useState(0);
    const [testiIdx, setTestiIdx] = useState(0);


    const [typedText, setTypedText] = useState('');
    const [stringIdx, setStringIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);


    const { data, setData, post, reset, processing, errors } = useForm({
        name: auth_user ? auth_user.name : '',
        comment: '',
        rating: 5
    });

    const typingEffects = profile?.typing_effects || ["Fullstack Developer", "Product Thinker"];

    const handleGlowMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
    };

    const handleMagneticMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const resetMagnetic = (e) => {
        e.currentTarget.style.transform = 'translate(0px, 0px)';
    };


    useEffect(() => {
        const handleLoad = () => {
            setLoading(false);
        };
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            const timer = setTimeout(handleLoad, 800);
            return () => {
                window.removeEventListener('load', handleLoad);
                clearTimeout(timer);
            };
        }
    }, []);


    useEffect(() => {
        const handleResize = () => {
            const activeEl = navContainerRef.current?.querySelector(`a[href="#${activeSection}"]`);
            if (activeEl && navIndicatorRef.current) {
                navIndicatorRef.current.style.width = `${activeEl.offsetWidth}px`;
                navIndicatorRef.current.style.left = `${activeEl.offsetLeft}px`;
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeSection]);


    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);


    useEffect(() => {
        let timer;
        const currentStr = typingEffects[stringIdx];

        if (isDeleting) {
            if (charIdx > 0) {
                timer = setTimeout(() => {
                    setTypedText(currentStr.substring(0, charIdx - 1));
                    setCharIdx(prev => prev - 1);
                }, 40);
            } else {
                timer = setTimeout(() => {
                    setIsDeleting(false);
                    setStringIdx((prev) => (prev + 1) % typingEffects.length);
                }, 400);
            }
        } else {
            if (charIdx < currentStr.length) {
                timer = setTimeout(() => {
                    setTypedText(currentStr.substring(0, charIdx + 1));
                    setCharIdx(prev => prev + 1);
                }, 100);
            } else {
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, 1500);
            }
        }

        return () => clearTimeout(timer);
    }, [charIdx, isDeleting, stringIdx, typingEffects]);


    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'stats', 'skills', 'projects', 'experience', 'certifications', 'journey', 'blog', 'services', 'resume', 'contact'];
            const scrollPos = window.scrollY + 160;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    });

    useEffect(() => {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setSkillsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.15 });

        observer.observe(skillsSection);
        return () => observer.disconnect();
    }, [skillCategories]);

    useEffect(() => {
        const statsSection = document.getElementById('stats');
        if (!statsSection || statistics.length === 0) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;

            statistics.forEach((stat) => {
                const target = Number.parseInt(stat.value, 10) || 0;
                let current = 0;
                const increment = Math.max(target / 30, 1);
                const timer = window.setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        setAnimatedStats(prev => ({ ...prev, [stat.id]: target }));
                        window.clearInterval(timer);
                    } else {
                        setAnimatedStats(prev => ({ ...prev, [stat.id]: Math.ceil(current) }));
                    }
                }, 25);
            });

            observer.disconnect();
        }, { threshold: 0.4 });

        observer.observe(statsSection);
        return () => observer.disconnect();
    }, [statistics]);

    useEffect(() => {
        const canvas = ambientCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrame;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = Array.from({ length: 35 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.5 + 0.1,
            }));
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const color = getComputedStyle(document.documentElement).getPropertyValue('--sf-primary').trim() || '#007AFF';

            particles.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.save();
                ctx.globalAlpha = particle.alpha;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.restore();
            });

            animationFrame = window.requestAnimationFrame(render);
        };

        resizeCanvas();
        render();
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);


    const submitComment = (e) => {
        e.preventDefault();
        post(route('portfolio.comment.store'), {
            onSuccess: () => {
                reset('comment');
                alert('Feedback submitted successfully! Waiting for admin approval.');
            }
        });
    };


    const nextCert = () => {
        if (certIdx < certifications.length - 1) setCertIdx(prev => prev + 1);
    };
    const prevCert = () => {
        if (certIdx > 0) setCertIdx(prev => prev - 1);
    };

    const nextTesti = () => {
        setTestiIdx(prev => (prev + 1) % testimonials.length);
    };
    const prevTesti = () => {
        setTestiIdx(prev => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="bg-white dark:bg-[#0A0A0A] text-[#1D1D1F] dark:text-[#F5F5F7] antialiased transition-colors duration-500 font-sans min-h-screen selection:bg-[#007AFF] selection:text-white [--sf-primary:#007AFF]">
            {loading && <Preloader />}

            <Head title={`${profile?.name || 'Afif'} - Portofolio`} />

            <div className="fixed top-0 left-0 z-[2000] h-[3px] w-full">
                <div
                    className="h-full bg-gradient-to-r from-[#007AFF] to-[#30d158] transition-[width] duration-150 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            <canvas ref={ambientCanvasRef} className="ambient-canvas" />

            <Navbar
                profile={profile}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                activeSection={activeSection}
                navContainerRef={navContainerRef}
                navIndicatorRef={navIndicatorRef}
            />

            <Hero
                profile={profile}
                typedText={typedText}
                handleMagneticMove={handleMagneticMove}
                resetMagnetic={resetMagnetic}
            />

            <About
                profile={profile}
                aboutCards={aboutCards}
                handleGlowMove={handleGlowMove}
            />

            <Stats
                statistics={statistics}
                animatedStats={animatedStats}
            />

            <TechStack
                skillCategories={skillCategories}
            />

            <Projects
                projects={projects}
                handleGlowMove={handleGlowMove}
                setSelectedProject={setSelectedProject}
                handleMagneticMove={handleMagneticMove}
                resetMagnetic={resetMagnetic}
            />

            <Experience
                experiences={experiences}
            />

            <Certifications
                certifications={certifications}
                certIdx={certIdx}
                prevCert={prevCert}
                nextCert={nextCert}
                handleGlowMove={handleGlowMove}
            />

            <Journey educations={educations} />

            <Blog
                blogs={blogs}
                handleGlowMove={handleGlowMove}
                setSelectedBlog={setSelectedBlog}
            />

            <Services
                handleGlowMove={handleGlowMove}
            />

            <Resume
                profile={profile}
                handleGlowMove={handleGlowMove}
            />

            <Contact
                profile={profile}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submitComment={submitComment}
                approvedComments={approvedComments}
                handleGlowMove={handleGlowMove}
            />

            <Footer profile={profile} />

            <CaseStudyModal
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
            />
            <BlogJournalModal
                selectedBlog={selectedBlog}
                setSelectedBlog={setSelectedBlog}
            />
        </div>
    );
}
