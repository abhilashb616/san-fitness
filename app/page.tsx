"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import {
    Accessibility,
    Activity,
    Apple,
    ArrowDownRight,
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    Compass,
    Dumbbell,
    HeartHandshake,
    Menu,
    Phone,
    PersonStanding,
    Scale,
    Sparkles,
    Star,
    Target,
    Users,
    Video,
    X,
} from "lucide-react";

const logo =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-8uxTlcNsibAus1SGaZ7lhWILlOxnQm.jpeg";
const gymLocation = "https://maps.app.goo.gl/jGUCEEdGgGd1iLJs5";
const gymMapEmbed =
    "https://www.google.com/maps?q=8.8933169,76.6289833&z=17&output=embed";
const galleryVideos = [
    {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-11-09%20at%2014.11.35-y1ksj80MPtaiwbuh8vYstdFMzxB8i1.mp4",
        label: "SAN FITNESS training video 1",
    },
    {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-11-09%20at%2014.11.43-jjL2IfLIixHp8BlcJGcAVHsN0Ems5s.mp4",
        label: "SAN FITNESS training video 2",
    },
    {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-11-09%20at%2014.11.50-CUmro8mCsfH13y3Jq9p0x1yC2Rlwew.mp4",
        label: "SAN FITNESS training video 3",
    },
    {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-11-09%20at%2014.12.25-8m7XHsYd5RHuiXu9DnAZiLZFhd9MOi.mp4",
        label: "SAN FITNESS training video 4",
    },
];
const images = {
    hero: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=2000&q=90",
    training:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
    // coach: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85",
    coach: "personal-training.webp",
    // couple: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85",
    couple: "couple-workout.webp",
    detail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85",
    lift: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1200&q=85",
    woman: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85",
    founder:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000000a1882118139bd6c58af8c69-bZ4iIvLHhOwP3Yqrr4cJsrU3VOj7hN.png",
};

type Category = "Standard Package" | "Couple Package" | "Personal Training";
type EnquiryField = "fullName" | "phone" | "email";
type EnquiryErrors = Partial<Record<EnquiryField, string>>;

function getEnquiryFieldError(field: EnquiryField, value: string) {
    const trimmedValue = value.trim();

    if (field === "fullName") {
        if (!trimmedValue) return "Please enter your full name.";
        if (trimmedValue.length < 2) return "Name must be at least 2 characters.";
        if (trimmedValue.length > 100) return "Name must be 100 characters or fewer.";
    }

    if (field === "phone") {
        if (!trimmedValue) return "Please enter your phone number.";
        if (!/^[+\d\s().-]+$/.test(trimmedValue)) {
            return "Use only digits, spaces, +, parentheses, dots, or hyphens.";
        }
        const digitCount = trimmedValue.replace(/\D/g, "").length;
        if (digitCount < 10 || digitCount > 15) {
            return "Enter a valid phone number with 10 to 15 digits.";
        }
    }

    if (field === "email" && trimmedValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        return "Enter a valid email address or leave this field blank.";
    }

    return undefined;
}

const reviews = [
    {
        name: "Sandeep Vijayan",
        quote: "My own fitness journey taught me the power of consistency, and I love helping others achieve their fitness goals.",
        images: [
            {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sandeep%20vijayan-KcLDwOVYCDVyNpKx2a60h88GYvqbiN.webp",
                alt: "Sandeep Vijayan before and after transformation",
                label: "MEMBER TRANSFORMATION",
            },
        ],
    },
    {
        name: "Anu Mohan",
        quote: "The guidance and steady encouragement helped me make meaningful progress and build healthier habits that fit my life.",
        images: [
            {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anu%20mohan-r6zB12B8u51HhnMlEgNqW7u5Q4pm4v.jpg",
                alt: "Anu Mohan before and after transformation",
                label: "MEMBER TRANSFORMATION",
            },
        ],
    },
    {
        name: "Aswin",
        quote: "A clear plan and consistent support made it easier to stay focused and keep working toward my goals.",
        images: [
            {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aswin%20gym-oxX69TkpqWjzWxvDafwdSj9gIlHiib.png",
                alt: "Aswin posture and fitness transformation comparison",
                label: "MEMBER TRANSFORMATION",
            },
        ],
    },
    {
        name: "Vidhya Vijayan",
        quote: "I feel stronger, more confident, and more consistent. The support helped me keep moving forward one step at a time.",
        images: [
            {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vidhya%20vijayan-5bDYm0u5nLHIHnRiU8Jc7xDMinl0vb.jpg",
                alt: "Vidhya Vijayan before and after transformation",
                label: "MEMBER TRANSFORMATION",
            },
        ],
    },
];

const plans: Record<
    Category,
    { duration: string; name: string; price: string; description: string }[]
> = {
    "Standard Package": [
        {
            duration: "1 Month",
            name: "Basic",
            price: "₹2,000",
            description:
                "Short-term access with full facility use, ideal for trial or flexible schedules. No long-term commitment required.",
        },
        {
            duration: "3 Months",
            name: "Smart",
            price: "₹5,400",
            description:
                "Balanced duration with cost efficiency, suitable for building regular training habits. More economical than paying monthly.",
        },
        {
            duration: "6 Months",
            name: "Pro",
            price: "₹10,000",
            description:
                "Mid-term plan with notable savings, designed for steady progress and consistent training.",
        },
        {
            duration: "12 Months",
            name: "Ultra",
            price: "₹18,000",
            description:
                "One month at ₹1,500. Save ₹6,000. Best value for dedicated members. Covers full-year access.",
        },
    ],
    "Couple Package": [
        {
            duration: "1 Month",
            name: "Basic",
            price: "₹3,800",
            description:
                "Access for two individuals. Short-term flexibility for both. Priced for shared use.",
        },
        {
            duration: "3 Months",
            name: "Smart",
            price: "₹10,200",
            description:
                "Save ₹1,200 as a couple. Mid-range duration for partners. Efficient and convenient.",
        },
        {
            duration: "6 Months",
            name: "Pro",
            price: "₹18,000",
            description:
                "Save ₹6,000 in savings. Ideal for committed duos. Long-term shared plan.",
        },
        {
            duration: "12 Months",
            name: "Ultra",
            price: "₹30,000",
            description:
                "Save ₹18,000 annually. Lowest monthly rate per person. Extended membership.",
        },
    ],
    "Personal Training": [
        {
            duration: "1 Month",
            name: "Basic",
            price: "₹5,000",
            description:
                "Individual coaching sessions. Focused and customized training. Introductory duration.",
        },
        {
            duration: "3 Months",
            name: "Smart",
            price: "₹13,000",
            description:
                "Monthly cost ₹4,333. Structured personal attention. Improved value over time.",
        },
        {
            duration: "6 Months",
            name: "Pro",
            price: "₹24,000",
            description:
                "Monthly cost ₹4,000. Goal-oriented long-term support. Ideal for steady development.",
        },
        {
            duration: "12 Months",
            name: "Ultra",
            price: "₹45,000",
            description:
                "Monthly cost ₹3,750. Includes 2 free personal sessions. Comprehensive, year-long plan.",
        },
    ],
};

function Reveal({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

export default function Page() {
    const [menu, setMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [category, setCategory] = useState<Category>("Standard Package");
    const [selected, setSelected] = useState<
        (typeof plans)[Category][number] | null
    >(null);
    const [reviewIndex, setReviewIndex] = useState(0);
    const [enquiryStatus, setEnquiryStatus] = useState<
        "idle" | "sending" | "sent" | "error"
    >("idle");
    const [enquiryErrors, setEnquiryErrors] = useState<EnquiryErrors>({});
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 800], [0, 120]);
    const currentPlans = useMemo(() => plans[category], [category]);
    const currentReview = reviews[reviewIndex];
    const handleEnquirySubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const errors: EnquiryErrors = {
            fullName: getEnquiryFieldError("fullName", String(formData.get("fullName") ?? "")),
            phone: getEnquiryFieldError("phone", String(formData.get("phone") ?? "")),
            email: getEnquiryFieldError("email", String(formData.get("email") ?? "")),
        };
        setEnquiryErrors(errors);

        const firstInvalidField = (Object.keys(errors) as EnquiryField[]).find(
            (field) => errors[field],
        );
        if (firstInvalidField) {
            form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
            setEnquiryStatus("idle");
            return;
        }

        const values = Object.fromEntries(
            Array.from(formData.entries(), ([key, value]) => [
                key,
                typeof value === "string" ? value.trim() : value,
            ]),
        );
        setEnquiryStatus("sending");

        try {
            const response = await fetch(
                "https://formsubmit.co/ajax/sanfitness11169@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        ...values,
                        _subject: `SAN FITNESS enquiry from ${values.fullName}`,
                        _template: "table",
                    }),
                },
            );
            const result = await response.json();

            if (
                !response.ok ||
                result.success === false ||
                result.success === "false"
            ) {
                throw new Error("Form submission failed");
            }

            form.reset();
            setEnquiryStatus("sent");
        } catch {
            setEnquiryStatus("error");
        }
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useEffect(() => {
        document.body.style.overflow = selected || menu ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [selected, menu]);

    return (
        <main className="site-shell">
            <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
                <a href="#home" className="brand">
                    <img src={logo} alt="SAN FITNESS" />
                    <span>
                        SAN
                        <br />
                        <small>FITNESS</small>
                    </span>
                </a>
                <nav className="desktop-nav">
                    {[
                        "About",
                        "Founder",
                        "Services",
                        "Special Classes",
                        "Training",
                        "Membership Plans",
                        "Reviews",
                        "Contact",
                    ].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                        >
                            {item}
                        </a>
                    ))}
                </nav>
                <a className="nav-cta desktop-nav" href="#membership-plans">
                    Join Now <ArrowUpRight />
                </a>
                <button
                    className="menu-button"
                    aria-label="Toggle menu"
                    onClick={() => setMenu(!menu)}
                >
                    {menu ? <X /> : <Menu />}
                </button>
            </header>
            <AnimatePresence>
                {menu && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                    >
                        <img src={logo} alt="SAN FITNESS" />
                        {[
                            "About",
                            "Founder",
                            "Services",
                            "Special Classes",
                            "Training",
                            "Membership Plans",
                            "Reviews",
                            "Contact",
                        ].map((item) => (
                            <a
                                key={item}
                                onClick={() => setMenu(false)}
                                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                            >
                                {item}
                                <ArrowRight />
                            </a>
                        ))}
                        <a
                            className="nav-cta"
                            onClick={() => setMenu(false)}
                            href="#membership-plans"
                        >
                            Join Now <ArrowUpRight />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            <section id="home" className="hero">
                <motion.div
                    className="hero-photo"
                    style={{ y: heroY, backgroundImage: `url(${images.hero})` }}
                />
                <div className="hero-overlay" />
                <div className="hero-geometry geometry-one" />
                <div className="hero-geometry geometry-two" />
                <div className="hero-content">
                    <Reveal>
                        <p className="eyebrow">YOUR STRENGTH. YOUR LEGACY.</p>
                        <h1>
                            BUILT BY
                            <br />
                            <em>DISCIPLINE.</em>
                        </h1>
                        <p className="hero-copy">
                            Your journey to a stronger, fitter, more confident
                            you starts here. Train with purpose. Progress with
                            consistency. Become your strongest self.
                        </p>
                        <div className="hero-actions">
                            <a
                                className="button button-primary"
                                href="#membership-plans"
                            >
                                Explore Memberships <ArrowDownRight />
                            </a>
                            <a className="text-link" href="#about">
                                Discover SAN FITNESS <ArrowRight />
                            </a>
                        </div>
                    </Reveal>
                </div>
                <div className="hero-meta">
                    <span>EST. 2024</span>
                    <span className="scroll-line" />
                    <span>SCROLL TO EXPLORE</span>
                </div>
            </section>

            <section id="about" className="intro section">
                <div className="section-number">01 / 09</div>
                <div className="about-heading">
                    <Reveal>
                        <p className="eyebrow purple">THE SAN STANDARD</p>
                        <h2>
                            WHY SAN
                            <br />
                            <span>FITNESS?</span>
                        </h2>
                        <p className="about-lede">
                            More than a gym. A focused environment for building
                            strength, developing consistency, and becoming your
                            strongest self.
                        </p>
                    </Reveal>
                </div>
                <div className="about-philosophy">
                    <span>01</span>
                    <p>
                        Every rep has a purpose. Every session is a step
                        forward. We keep the work clear, intentional, and
                        centered on the person you want to become.
                    </p>
                </div>
                <div className="about-grid">
                    <Reveal className="about-card">
                        <span className="about-icon">
                            <Dumbbell />
                        </span>
                        <h3>Purposeful training</h3>
                        <p>
                            Training built around disciplined work, steady
                            progress, and a stronger foundation.
                        </p>
                    </Reveal>
                    <Reveal className="about-card">
                        <span className="about-icon">
                            <Target />
                        </span>
                        <h3>Goal-led progress</h3>
                        <p>
                            Keep your goals in view and bring consistency to
                            every session.
                        </p>
                    </Reveal>
                    <Reveal className="about-card">
                        <span className="about-icon">
                            <Users />
                        </span>
                        <h3>Personal attention</h3>
                        <p>
                            A more considered approach to your goals, movement,
                            and training rhythm.
                        </p>
                    </Reveal>
                    <Reveal className="about-card">
                        <span className="about-icon">
                            <Compass />
                        </span>
                        <h3>Find your edge</h3>
                        <p>
                            Build the confidence to challenge yourself and keep
                            moving forward.
                        </p>
                    </Reveal>
                    <Reveal className="about-card">
                        <span className="about-icon">
                            <HeartHandshake />
                        </span>
                        <h3>Stronger together</h3>
                        <p>
                            Shared commitment creates momentum. Show up, do the
                            work, and grow.
                        </p>
                    </Reveal>
                    <Reveal className="about-card">
                        <span className="about-icon">
                            <Sparkles />
                        </span>
                        <h3>A higher standard</h3>
                        <p>
                            A training mindset rooted in purpose, discipline,
                            and long-term change.
                        </p>
                    </Reveal>
                </div>
                <div className="about-footer">
                    <Reveal className="intro-image">
                        <img
                            src={images.detail}
                            alt="Athlete training with weights"
                        />
                        <span className="image-tag">THE WORK IS YOURS</span>
                    </Reveal>
                    <a className="text-link" href="#training">
                        Explore our approach <ArrowRight />
                    </a>
                </div>
            </section>

            <section id="founder" className="founder section">
                <div className="section-number">02 / 09</div>
                <div className="founder-grid">
                    <Reveal className="founder-portrait">
                        <img
                            src={images.founder}
                            alt="SAN FITNESS founder in a suit"
                        />
                    </Reveal>
                    <Reveal className="founder-copy">
                        <p className="eyebrow purple">THE FOUNDER</p>
                        <h2>
                            SANDEEP
                            <br />
                            <span>VIJAYAN.</span>
                        </h2>
                        <p>
                            The standard starts at the top. SAN FITNESS is led
                            by a coach committed to disciplined training,
                            responsible practice, and helping every member move
                            with purpose.
                        </p>
                        <div
                            className="certification-grid"
                            aria-label="Sandeep Vijayan certifications"
                        >
                            <span className="certification-badge">
                                USA CERTIFIED FITNESS EXPERT
                            </span>
                            <span className="certification-badge">
                                REPS INDIA LEVEL-4
                            </span>
                            <span className="certification-badge">
                                UAE REPS LEVEL 3
                            </span>
                            <span className="certification-badge">
                                PD-APPROVAL
                            </span>
                            <span className="certification-badge">
                                IACET USA
                            </span>
                            <span className="certification-badge">
                                SPFL LEVEL 4
                            </span>
                            <span className="certification-badge">
                                Trauma Certification
                            </span>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section id="services" className="services section">
                <div className="section-number">03 / 09</div>
                <Reveal className="services-heading">
                    <p className="eyebrow purple">COMPREHENSIVE FITNESS</p>
                    <h2>
                        OUR <span>SERVICES.</span>
                    </h2>
                    <p className="section-intro">
                        Focused disciplines designed to support your strength,
                        conditioning, movement, and long-term consistency.
                    </p>
                </Reveal>
                <div className="services-grid">
                    <Reveal className="service-card">
                        <span className="service-number">01</span>
                        <span className="service-icon">
                            <HeartHandshake />
                        </span>
                        <h3>Cardio Workout</h3>
                        <p>
                            Structured conditioning designed to build
                            cardiovascular capacity, improve endurance, and keep
                            your training varied.
                        </p>
                        <strong>INDOOR &amp; OUTDOOR</strong>
                    </Reveal>
                    <Reveal className="service-card">
                        <span className="service-number">02</span>
                        <span className="service-icon">
                            <Dumbbell />
                        </span>
                        <h3>Weight Training</h3>
                        <p>
                            Progressive strength work using focused resistance
                            training to build a stronger, more capable
                            foundation.
                        </p>
                        <strong>STRENGTH &amp; HYPERTROPHY</strong>
                    </Reveal>
                    <Reveal className="service-card">
                        <span className="service-number">03</span>
                        <span className="service-icon">
                            <Scale />
                        </span>
                        <h3>Weight Loss &amp; Gain Programs</h3>
                        <p>
                            Goal-led training support for body composition
                            changes, built around consistency and a sustainable
                            approach.
                        </p>
                        <strong>BODY RECOMPOSITION</strong>
                    </Reveal>
                    <Reveal className="service-card">
                        <span className="service-number">04</span>
                        <span className="service-icon">
                            <Users />
                        </span>
                        <h3>Aerobic &amp; Group Training</h3>
                        <p>
                            High-energy group sessions that bring structure,
                            movement, and shared momentum to your week.
                        </p>
                        <strong>HIGH-ENERGY TRAINING</strong>
                    </Reveal>
                    <Reveal className="service-card">
                        <span className="service-number">05</span>
                        <span className="service-icon">
                            <PersonStanding />
                        </span>
                        <h3>Floor Exercise &amp; Core</h3>
                        <p>
                            Dedicated movement work for core stability, control,
                            mobility, and a more resilient midsection.
                        </p>
                        <strong>CORE &amp; MOVEMENT</strong>
                    </Reveal>
                    <Reveal className="service-card">
                        <span className="service-number">06</span>
                        <span className="service-icon">
                            <Target />
                        </span>
                        <h3>Personal Training</h3>
                        <p>
                            One-to-one guidance with focused attention,
                            considered programming, and accountability for your
                            goals.
                        </p>
                        <strong>1-ON-1 MENTORSHIP</strong>
                    </Reveal>
                    <Reveal className="service-card service-card-wide">
                        <span className="service-number">07</span>
                        <span className="service-icon">
                            <Apple />
                        </span>
                        <h3>Diet Plan &amp; Lifestyle Guidance</h3>
                        <p>
                            Practical nutrition and lifestyle guidance to help
                            you fuel training, build better habits, and stay
                            consistent.
                        </p>
                        <strong>MACRO &amp; LIFESTYLE SUPPORT</strong>
                    </Reveal>
                </div>
            </section>

            <section id="special-classes" className="special-classes section">
                <div className="section-number">04 / 09</div>
                <Reveal className="special-heading">
                    <p className="eyebrow purple">DYNAMIC DISCIPLINES</p>
                    <h2>
                        SPECIAL TRAINING
                        <br />
                        <span>CLASSES.</span>
                    </h2>
                    <p className="section-intro">
                        Break through standard routines with focused movement
                        styles designed for agility, power, balance, and
                        control.
                    </p>
                </Reveal>
                <div className="classes-grid">
                    <Reveal className="class-card">
                        <span className="class-pill">GROUND-BASED</span>
                        <span className="class-icon">
                            <Activity />
                        </span>
                        <h3>Animal Flow</h3>
                        <p>
                            A ground-based movement system designed to develop
                            mobility, coordination, joint stability, and raw
                            bodyweight control.
                        </p>
                        <div className="class-meta">
                            <span>45 MINS</span>
                            <span>MOBILITY</span>
                        </div>
                    </Reveal>
                    <Reveal className="class-card class-card-featured">
                        <span className="class-pill">ATHLETIC PEAK</span>
                        <span className="class-icon">
                            <Dumbbell />
                        </span>
                        <h3>Strength &amp; Conditioning</h3>
                        <p>
                            Compound training with power, conditioning, and
                            athletic movement to build usable strength and
                            muscular endurance.
                        </p>
                        <div className="class-meta">
                            <span>60 MINS</span>
                            <span>EXPLOSIVE</span>
                        </div>
                    </Reveal>
                    <Reveal className="class-card">
                        <span className="class-pill">REAL-WORLD READY</span>
                        <span className="class-icon">
                            <Accessibility />
                        </span>
                        <h3>Functional Training</h3>
                        <p>
                            Practical movement patterns using carries, hinges,
                            squats, and pulls to make everyday movement more
                            capable.
                        </p>
                        <div className="class-meta">
                            <span>45 MINS</span>
                            <span>AGILITY</span>
                        </div>
                    </Reveal>
                    <Reveal className="class-card">
                        <span className="class-pill">INJURY PREVENTION</span>
                        <span className="class-icon">
                            <Compass />
                        </span>
                        <h3>Stability &amp; Mobility</h3>
                        <p>
                            Mobility drills, controlled holds, and stretching
                            protocols that support range of motion, recovery,
                            and resilience.
                        </p>
                        <div className="class-meta">
                            <span>45 MINS</span>
                            <span>RECOVERY</span>
                        </div>
                    </Reveal>
                    <Reveal className="class-card class-card-wide">
                        <span className="class-pill class-pill-online">
                            <Video /> REMOTE ACCESS
                        </span>
                        <span className="class-icon">
                            <Video />
                        </span>
                        <h3>Online Training Sessions Available</h3>
                        <p>
                            Train with SAN FITNESS from wherever you are through
                            structured online sessions, coach guidance, and a
                            plan built around your routine.
                        </p>
                        <div className="class-meta">
                            <span>ANYWHERE ACCESS</span>
                            <span>1-ON-1 &amp; BATCHES</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section id="training" className="training section">
                <div className="section-number">05 / 09</div>
                <Reveal>
                    <p className="eyebrow purple">TRAIN WITH PURPOSE</p>
                    <h2>
                        FIND YOUR
                        <br />
                        <span>EDGE.</span>
                    </h2>
                </Reveal>
                <div className="training-list">
                    {[
                        [
                            images.training,
                            "01",
                            "Strength & Fitness",
                            "Build a foundation that lasts.",
                        ],
                        [
                            images.coach,
                            "02",
                            "Personal Training",
                            "Individual attention. Goal-oriented work.",
                        ],
                        [
                            images.couple,
                            "03",
                            "Couple Membership",
                            "Shared commitment. Stronger together.",
                        ],
                    ].map(([image, no, title, copy]) => (
                        <Reveal key={title}>
                            <a
                                className="training-item"
                                href="#membership-plans"
                            >
                                <div className="training-image">
                                    <img src={image} alt={title} />
                                </div>
                                <div className="training-info">
                                    <span>{no}</span>
                                    <div>
                                        <h3>{title}</h3>
                                        <p>{copy}</p>
                                    </div>
                                    <ArrowUpRight />
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section id="membership-plans" className="pricing section">
                <div className="section-number">06 / 09</div>
                <Reveal>
                    <p className="eyebrow purple">MEMBERSHIP PLANS</p>
                    <h2>
                        CHOOSE YOUR
                        <br />
                        <span>COMMITMENT.</span>
                    </h2>
                    <p className="section-intro">
                        A plan for where you are now, and where you are going
                        next.
                    </p>
                </Reveal>
                <div className="tabs" role="tablist">
                    {Object.keys(plans).map((item) => (
                        <button
                            key={item}
                            className={category === item ? "active" : ""}
                            onClick={() => setCategory(item as Category)}
                        >
                            {item.replace(" Package", "")}
                        </button>
                    ))}
                </div>
                <motion.div
                    className="plan-grid"
                    key={category}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    {currentPlans.map((plan, index) => (
                        <article
                            className={`plan-card ${index === 3 ? "featured" : ""}`}
                            key={plan.duration}
                        >
                            <div className="plan-top">
                                <span>0{index + 1}</span>
                                {index === 3 && <b>BEST VALUE</b>}
                            </div>
                            <p className="plan-duration">{plan.duration}</p>
                            <h3>{plan.name}</h3>
                            <div className="price">{plan.price}</div>
                            <p className="plan-description">
                                {plan.description}
                            </p>
                            <button
                                className="plan-cta"
                                onClick={() => setSelected(plan)}
                            >
                                Enquire About This Plan <ArrowRight />
                            </button>
                        </article>
                    ))}
                </motion.div>
                <p className="fine-print">
                    Personal training prices vary based on individual goals,
                    body condition and program needs.
                </p>
            </section>

            <section className="statement">
                <div
                    className="statement-bg"
                    style={{ backgroundImage: `url(${images.lift})` }}
                />
                <div className="statement-overlay" />
                <Reveal>
                    <p className="eyebrow">THE MINDSET</p>
                    <h2>
                        YOUR GOALS.
                        <br />
                        YOUR WORK.
                        <br />
                        <em>
                            YOUR
                            <br />
                            TRANSFORMATION.
                        </em>
                    </h2>
                </Reveal>
            </section>

            <section id="reviews" className="reviews section">
                <div className="section-number">07 / 09</div>
                <Reveal className="reviews-heading">
                    <p className="eyebrow purple">MEMBER STORIES</p>
                    <h2>
                        THE WORK
                        <br />
                        <span>SHOWS.</span>
                    </h2>
                    <p className="section-intro">
                        Progress, commitment, and transformations from the SAN
                        FITNESS community.
                    </p>
                </Reveal>
                <div className="review-layout">
                    <Reveal className="review-quote">
                        <span className="review-label">
                            <Star /> MEMBER REVIEW
                        </span>
                        <blockquote>“{currentReview.quote}”</blockquote>
                        <div className="review-author">
                            <strong>{currentReview.name}</strong>
                            <span>Member transformation</span>
                        </div>
                        <div className="review-controls">
                            <button
                                onClick={() =>
                                    setReviewIndex(
                                        (reviewIndex - 1 + reviews.length) %
                                            reviews.length,
                                    )
                                }
                                aria-label="Previous review"
                            >
                                <ChevronLeft />
                            </button>
                            <span>
                                0{reviewIndex + 1} / 0{reviews.length}
                            </span>
                            <button
                                onClick={() =>
                                    setReviewIndex(
                                        (reviewIndex + 1) % reviews.length,
                                    )
                                }
                                aria-label="Next review"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </Reveal>
                    <Reveal className="transformation">
                        <div
                            className={`transformation-images ${currentReview.images.length === 1 ? "transformation-images-single" : ""}`}
                        >
                            {currentReview.images.map((image) => (
                                <figure
                                    className="transformation-figure"
                                    key={image.src}
                                >
                                    <img src={image.src} alt={image.alt} />
                                    <figcaption>{image.label}</figcaption>
                                </figure>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            <section id="gallery" className="gallery section">
                <div className="section-number">08 / 09</div>
                <Reveal>
                    <p className="eyebrow purple">INSIDE SAN</p>
                    <h2>
                        THE ROOM
                        <br />
                        <span>WHERE IT HAPPENS.</span>
                    </h2>
                </Reveal>
                <div className="gallery-grid">
                    {galleryVideos.map((video, i) => (
                        <div
                            className={`gallery-tile tile-${i}`}
                            key={video.src}
                        >
                            <video
                                controls
                                playsInline
                                preload="none"
                                aria-label={video.label}
                            >
                                <source src={video.src} type="video/mp4" />
                                Your browser does not support embedded videos.
                            </video>
                        </div>
                    ))}
                </div>
            </section>

            <section id="contact" className="enquiry section">
                <div className="enquiry-copy">
                    <div className="section-number">09 / 09</div>
                    <p className="eyebrow purple">START TODAY</p>
                    <h2>
                        READY TO
                        <br />
                        <span>LEVEL UP?</span>
                    </h2>
                    <p>
                        Choose your plan and take the first step toward your
                        fitness goals.
                    </p>
                    <div className="contact-note">
                        <span>CONTACT</span>
                        <strong>Enquiries welcome</strong>
                        <small>
                            Use the form and our team will get back to you.
                        </small>
                    </div>
                    <div className="location-card">
                        <div className="location-card-heading">
                            <span>FIND SAN FITNESS</span>
                            <a
                                href={gymLocation}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Get directions <ArrowRight />
                            </a>
                        </div>
                        <iframe
                            src={gymMapEmbed}
                            title="SAN FITNESS location map"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
                <form
                    className="enquiry-form"
                    onSubmit={handleEnquirySubmit}
                    noValidate
                >
                    <label>
                        Full name
                        <input
                            required
                            name="fullName"
                            autoComplete="name"
                            placeholder="Your name"
                            maxLength={100}
                            aria-invalid={Boolean(enquiryErrors.fullName)}
                            aria-describedby={enquiryErrors.fullName ? "fullName-error" : undefined}
                            onBlur={(event) => {
                                const error = getEnquiryFieldError("fullName", event.currentTarget.value);
                                setEnquiryErrors((current) => ({ ...current, fullName: error }));
                            }}
                            onChange={(event) => {
                                if (enquiryErrors.fullName) {
                                    const error = getEnquiryFieldError("fullName", event.currentTarget.value);
                                    setEnquiryErrors((current) => ({ ...current, fullName: error }));
                                }
                            }}
                        />
                        {enquiryErrors.fullName && (
                            <span className="field-error" id="fullName-error" role="alert">
                                {enquiryErrors.fullName}
                            </span>
                        )}
                    </label>
                    <label>
                        Phone number
                        <input
                            required
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="+91 00000 00000"
                            maxLength={24}
                            aria-invalid={Boolean(enquiryErrors.phone)}
                            aria-describedby={enquiryErrors.phone ? "phone-error" : undefined}
                            onBlur={(event) => {
                                const error = getEnquiryFieldError("phone", event.currentTarget.value);
                                setEnquiryErrors((current) => ({ ...current, phone: error }));
                            }}
                            onChange={(event) => {
                                if (enquiryErrors.phone) {
                                    const error = getEnquiryFieldError("phone", event.currentTarget.value);
                                    setEnquiryErrors((current) => ({ ...current, phone: error }));
                                }
                            }}
                        />
                        {enquiryErrors.phone && (
                            <span className="field-error" id="phone-error" role="alert">
                                {enquiryErrors.phone}
                            </span>
                        )}
                    </label>
                    <label>
                        Email <small>(optional)</small>
                        <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            maxLength={254}
                            aria-invalid={Boolean(enquiryErrors.email)}
                            aria-describedby={enquiryErrors.email ? "email-error" : undefined}
                            onBlur={(event) => {
                                const error = getEnquiryFieldError("email", event.currentTarget.value);
                                setEnquiryErrors((current) => ({ ...current, email: error }));
                            }}
                            onChange={(event) => {
                                if (enquiryErrors.email) {
                                    const error = getEnquiryFieldError("email", event.currentTarget.value);
                                    setEnquiryErrors((current) => ({ ...current, email: error }));
                                }
                            }}
                        />
                        {enquiryErrors.email && (
                            <span className="field-error" id="email-error" role="alert">
                                {enquiryErrors.email}
                            </span>
                        )}
                    </label>
                    <label>
                        Membership category
                        <select
                            name="membership"
                            required
                            defaultValue={category}
                            onChange={(e) =>
                                setCategory(e.target.value as Category)
                            }
                        >
                            {Object.keys(plans).map((p) => (
                                <option key={p}>{p}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Message <small>(optional)</small>
                        <textarea
                            name="message"
                            rows={4}
                            placeholder="Tell us a little about your goals"
                        />
                    </label>
                    <button
                        className="button button-primary"
                        type="submit"
                        disabled={enquiryStatus === "sending"}
                    >
                        {enquiryStatus === "sending" ? "Sending…" : "Send Enquiry"}
                        {enquiryStatus !== "sending" && <ArrowRight />}
                    </button>
                    <p
                        className={`form-note${enquiryStatus === "error" ? " form-note-error" : ""}`}
                        role="status"
                        aria-live="polite"
                    >
                        {enquiryStatus === "sent"
                            ? "Thanks! Your enquiry has been sent to SAN FITNESS."
                            : enquiryStatus === "error"
                              ? "Your enquiry could not be sent. Please try again or contact us by phone or WhatsApp."
                              : enquiryStatus === "sending"
                                ? "Sending your enquiry…"
                                : "Your details will be sent directly to SAN FITNESS."}
                    </p>
                </form>
            </section>

            <footer>
                <div className="footer-brand">
                    <img src={logo} alt="SAN FITNESS" />
                    <p>
                        Train with purpose.
                        <br />
                        Become your strongest self.
                    </p>
                </div>
                <div className="footer-links">
                    <div>
                        <span>EXPLORE</span>
                        <a href="#about">About</a>
                        <a href="#services">Services</a>
                        <a href="#special-classes">Special Classes</a>
                        <a href="#training">Training</a>
                        <a href="#membership-plans">Memberships</a>
                        <a href="#reviews">Reviews</a>
                    </div>
                    <div>
                        <span>CONNECT</span>
                        <a href="#contact">Contact</a>
                        <a href="#gallery">Gallery</a>
                        <a href="#home">Back to top ↑</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} SAN FITNESS</span>
                    <span>BUILT BY DISCIPLINE.</span>
                </div>
            </footer>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            className="enquiry-modal"
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.94, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close"
                                onClick={() => setSelected(null)}
                                aria-label="Close"
                            >
                                <X />
                            </button>
                            <p className="eyebrow purple">YOUR NEXT STEP</p>
                            <h2>
                                {selected.duration}
                                <br />
                                <span>{selected.name.toUpperCase()}</span>
                            </h2>
                            <div className="modal-price">{selected.price}</div>
                            <p>{selected.description}</p>
                            <a
                                className="button button-primary"
                                href="#contact"
                                onClick={() => setSelected(null)}
                            >
                                Continue to Enquiry <ArrowRight />
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <a
                className="call-float"
                href="tel:+919074347366"
                aria-label="Call SAN FITNESS at +91 90743 47366"
                title="Call SAN FITNESS"
            >
                <Phone aria-hidden="true" width={25} height={25} />
                <span className="sr-only">Call SAN FITNESS</span>
            </a>
            <a
                className="whatsapp-float"
                href="https://wa.me/919074347366"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact SAN FITNESS on WhatsApp at +91 90743 47366"
                title="Chat with SAN FITNESS on WhatsApp"
            >
                <img
                    src="https://thesvg.org/icons/whatsapp/default.svg"
                    alt=""
                    width="28"
                    height="28"
                />
                <span className="sr-only">Chat on WhatsApp</span>
            </a>
        </main>
    );
}

function ArrowUpRight() {
    return <ArrowDownRight className="up-right" />;
}
