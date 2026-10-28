'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { Apple, ArrowDownRight, ArrowRight, Check, ChevronLeft, ChevronRight, Compass, Dumbbell, HeartHandshake, Menu, PersonStanding, Scale, Sparkles, Target, Users, X } from 'lucide-react'

const logo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-8uxTlcNsibAus1SGaZ7lhWILlOxnQm.jpeg'
const images = {
  hero: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=2000&q=90',
  training: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
  coach: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85',
  couple: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85',
  detail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85',
  lift: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1200&q=85',
  woman: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85',
  founder: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000000a1882118139bd6c58af8c69-bZ4iIvLHhOwP3Yqrr4cJsrU3VOj7hN.png',
}

type Category = 'Standard Package' | 'Couple Package' | 'Personal Training'
const plans: Record<Category, { duration: string; name: string; price: string; description: string }[]> = {
  'Standard Package': [
    { duration: '1 Month', name: 'Basic', price: '₹2,000', description: 'Short-term access with full facility use, ideal for trial or flexible schedules. No long-term commitment required.' },
    { duration: '3 Months', name: 'Smart', price: '₹5,400', description: 'Balanced duration with cost efficiency, suitable for building regular training habits. More economical than paying monthly.' },
    { duration: '6 Months', name: 'Pro', price: '₹10,000', description: 'Mid-term plan with notable savings, designed for steady progress and consistent training.' },
    { duration: '12 Months', name: 'Ultra', price: '₹18,000', description: 'One month at ₹1,500. Save ₹6,000. Best value for dedicated members. Covers full-year access.' },
  ],
  'Couple Package': [
    { duration: '1 Month', name: 'Basic', price: '₹3,800', description: 'Access for two individuals. Short-term flexibility for both. Priced for shared use.' },
    { duration: '3 Months', name: 'Smart', price: '₹10,200', description: 'Save ₹1,200 as a couple. Mid-range duration for partners. Efficient and convenient.' },
    { duration: '6 Months', name: 'Pro', price: '₹18,000', description: 'Save ₹6,000 in savings. Ideal for committed duos. Long-term shared plan.' },
    { duration: '12 Months', name: 'Ultra', price: '₹30,000', description: 'Save ₹18,000 annually. Lowest monthly rate per person. Extended membership.' },
  ],
  'Personal Training': [
    { duration: '1 Month', name: 'Basic', price: '₹5,000', description: 'Individual coaching sessions. Focused and customized training. Introductory duration.' },
    { duration: '3 Months', name: 'Smart', price: '₹13,000', description: 'Monthly cost ₹4,333. Structured personal attention. Improved value over time.' },
    { duration: '6 Months', name: 'Pro', price: '₹24,000', description: 'Monthly cost ₹4,000. Goal-oriented long-term support. Ideal for steady development.' },
    { duration: '12 Months', name: 'Ultra', price: '₹45,000', description: 'Monthly cost ₹3,750. Includes 2 free personal sessions. Comprehensive, year-long plan.' },
  ],
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
}

export default function Page() {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [category, setCategory] = useState<Category>('Standard Package')
  const [selected, setSelected] = useState<(typeof plans)[Category][number] | null>(null)
  const [gallery, setGallery] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 800], [0, 120])
  const currentPlans = useMemo(() => plans[category], [category])

  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 32); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => { document.body.style.overflow = selected || gallery || menu ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [selected, gallery, menu])

  return <main className="site-shell">
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <a href="#home" className="brand"><img src={logo} alt="SAN FITNESS" /><span>SAN<br /><small>FITNESS</small></span></a>
      <nav className="desktop-nav">{['About', 'Founder', 'Services', 'Training', 'Membership Plans', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}</nav>
      <a className="nav-cta desktop-nav" href="#membership-plans">Join Now <ArrowUpRight /></a>
      <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>{menu && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}><img src={logo} alt="SAN FITNESS" />{['About', 'Founder', 'Services', 'Training', 'Membership Plans', 'Contact'].map((item) => <a key={item} onClick={() => setMenu(false)} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}<ArrowRight /></a>)}<a className="nav-cta" onClick={() => setMenu(false)} href="#membership-plans">Join Now <ArrowUpRight /></a></motion.div>}</AnimatePresence>

    <section id="home" className="hero">
      <motion.div className="hero-photo" style={{ y: heroY, backgroundImage: `url(${images.hero})` }} />
      <div className="hero-overlay" /><div className="hero-geometry geometry-one" /><div className="hero-geometry geometry-two" />
      <div className="hero-content"><Reveal><p className="eyebrow">YOUR STRENGTH. YOUR LEGACY.</p><h1>BUILT BY<br /><em>DISCIPLINE.</em></h1><p className="hero-copy">Your journey to a stronger, fitter, more confident you starts here. Train with purpose. Progress with consistency. Become your strongest self.</p><div className="hero-actions"><a className="button button-primary" href="#membership-plans">Explore Memberships <ArrowDownRight /></a><a className="text-link" href="#about">Discover SAN FITNESS <ArrowRight /></a></div></Reveal></div>
      <div className="hero-meta"><span>EST. 2024</span><span className="scroll-line" /><span>SCROLL TO EXPLORE</span></div>
    </section>

    <section id="about" className="intro section"><div className="section-number">01 / 07</div><div className="about-heading"><Reveal><p className="eyebrow purple">THE SAN STANDARD</p><h2>WHY SAN<br /><span>FITNESS?</span></h2><p className="about-lede">More than a gym. A focused environment for building strength, developing consistency, and becoming your strongest self.</p></Reveal></div><div className="about-philosophy"><span>01</span><p>Every rep has a purpose. Every session is a step forward. We keep the work clear, intentional, and centered on the person you want to become.</p></div><div className="about-grid"><Reveal className="about-card"><span className="about-icon"><Dumbbell /></span><h3>Purposeful training</h3><p>Training built around disciplined work, steady progress, and a stronger foundation.</p></Reveal><Reveal className="about-card"><span className="about-icon"><Target /></span><h3>Goal-led progress</h3><p>Keep your goals in view and bring consistency to every session.</p></Reveal><Reveal className="about-card"><span className="about-icon"><Users /></span><h3>Personal attention</h3><p>A more considered approach to your goals, movement, and training rhythm.</p></Reveal><Reveal className="about-card"><span className="about-icon"><Compass /></span><h3>Find your edge</h3><p>Build the confidence to challenge yourself and keep moving forward.</p></Reveal><Reveal className="about-card"><span className="about-icon"><HeartHandshake /></span><h3>Stronger together</h3><p>Shared commitment creates momentum. Show up, do the work, and grow.</p></Reveal><Reveal className="about-card"><span className="about-icon"><Sparkles /></span><h3>A higher standard</h3><p>A training mindset rooted in purpose, discipline, and long-term change.</p></Reveal></div><div className="about-footer"><Reveal className="intro-image"><img src={images.detail} alt="Athlete training with weights" /><span className="image-tag">THE WORK IS YOURS</span></Reveal><a className="text-link" href="#training">Explore our approach <ArrowRight /></a></div></section>

    <section id="founder" className="founder section"><div className="section-number">02 / 07</div><div className="founder-grid"><Reveal className="founder-portrait"><img src={images.founder} alt="SAN FITNESS founder in a suit" /></Reveal><Reveal className="founder-copy"><p className="eyebrow purple">THE FOUNDER</p><h2>SANDEEP<br /><span>LEADS.</span></h2><p>The standard starts at the top. SAN FITNESS is led by a coach committed to disciplined training, responsible practice, and helping every member move with purpose.</p><div className="qualifications" aria-label="Founder qualifications"><div className="qualification"><span className="qualification-mark">01</span><span>🇺🇸 ᴜꜱᴀ ᴄᴇʀᴛɪꜰɪᴇᴅ ꜰɪᴛɴᴇꜱꜱ ᴇxᴘᴇʀᴛ</span></div><div className="qualification"><span className="qualification-mark">02</span><span>🇦🇪🇮🇳 ʀᴇᴘꜱ ɪɴᴅɪᴀ ʟᴇᴠᴇʟ-4</span></div><div className="qualification"><span className="qualification-mark">03</span><span>ᴘᴅ-ᴀᴘᴘʀᴏᴠᴀʟ · ɪᴀᴄᴇᴛ ᴜꜱᴀ · ꜱᴘꜰʟ · Trauma Certification</span></div></div></Reveal></div></section>

    <section id="services" className="services section"><div className="section-number">03 / 07</div><Reveal className="services-heading"><p className="eyebrow purple">COMPREHENSIVE FITNESS</p><h2>OUR <span>SERVICES.</span></h2><p className="section-intro">Focused disciplines designed to support your strength, conditioning, movement, and long-term consistency.</p></Reveal><div className="services-grid"><Reveal className="service-card"><span className="service-number">01</span><span className="service-icon"><HeartHandshake /></span><h3>Cardio Workout</h3><p>Structured conditioning designed to build cardiovascular capacity, improve endurance, and keep your training varied.</p><strong>INDOOR &amp; OUTDOOR</strong></Reveal><Reveal className="service-card"><span className="service-number">02</span><span className="service-icon"><Dumbbell /></span><h3>Weight Training</h3><p>Progressive strength work using focused resistance training to build a stronger, more capable foundation.</p><strong>STRENGTH &amp; HYPERTROPHY</strong></Reveal><Reveal className="service-card"><span className="service-number">03</span><span className="service-icon"><Scale /></span><h3>Weight Loss &amp; Gain Programs</h3><p>Goal-led training support for body composition changes, built around consistency and a sustainable approach.</p><strong>BODY RECOMPOSITION</strong></Reveal><Reveal className="service-card"><span className="service-number">04</span><span className="service-icon"><Users /></span><h3>Aerobic &amp; Group Training</h3><p>High-energy group sessions that bring structure, movement, and shared momentum to your week.</p><strong>HIGH-ENERGY TRAINING</strong></Reveal><Reveal className="service-card"><span className="service-number">05</span><span className="service-icon"><PersonStanding /></span><h3>Floor Exercise &amp; Core</h3><p>Dedicated movement work for core stability, control, mobility, and a more resilient midsection.</p><strong>CORE &amp; MOVEMENT</strong></Reveal><Reveal className="service-card"><span className="service-number">06</span><span className="service-icon"><Target /></span><h3>Personal Training</h3><p>One-to-one guidance with focused attention, considered programming, and accountability for your goals.</p><strong>1-ON-1 MENTORSHIP</strong></Reveal><Reveal className="service-card service-card-wide"><span className="service-number">07</span><span className="service-icon"><Apple /></span><h3>Diet Plan &amp; Lifestyle Guidance</h3><p>Practical nutrition and lifestyle guidance to help you fuel training, build better habits, and stay consistent.</p><strong>MACRO &amp; LIFESTYLE SUPPORT</strong></Reveal></div></section>

    <section id="training" className="training section"><div className="section-number">04 / 07</div><Reveal><p className="eyebrow purple">TRAIN WITH PURPOSE</p><h2>FIND YOUR<br /><span>EDGE.</span></h2></Reveal><div className="training-list">{[[images.training, '01', 'Strength & Fitness', 'Build a foundation that lasts.'], [images.coach, '02', 'Personal Training', 'Individual attention. Goal-oriented work.'], [images.couple, '03', 'Couple Membership', 'Shared commitment. Stronger together.']].map(([image, no, title, copy]) => <Reveal key={title}><a className="training-item" href="#membership-plans"><div className="training-image"><img src={image} alt={title} /></div><div className="training-info"><span>{no}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight /></div></a></Reveal>)}</div></section>

    <section id="membership-plans" className="pricing section"><div className="section-number">05 / 07</div><Reveal><p className="eyebrow purple">MEMBERSHIP PLANS</p><h2>CHOOSE YOUR<br /><span>COMMITMENT.</span></h2><p className="section-intro">A plan for where you are now, and where you are going next.</p></Reveal><div className="tabs" role="tablist">{Object.keys(plans).map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item as Category)}>{item.replace(' Package', '')}</button>)}</div><motion.div className="plan-grid" key={category} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>{currentPlans.map((plan, index) => <article className={`plan-card ${index === 3 ? 'featured' : ''}`} key={plan.duration}><div className="plan-top"><span>0{index + 1}</span>{index === 3 && <b>BEST VALUE</b>}</div><p className="plan-duration">{plan.duration}</p><h3>{plan.name}</h3><div className="price">{plan.price}</div><p className="plan-description">{plan.description}</p><button className="plan-cta" onClick={() => setSelected(plan)}>Enquire About This Plan <ArrowRight /></button></article>)}</motion.div><p className="fine-print">Personal training prices vary based on individual goals, body condition and program needs.</p></section>

    <section className="statement"><div className="statement-bg" style={{ backgroundImage: `url(${images.lift})` }} /><div className="statement-overlay" /><Reveal><p className="eyebrow">THE MINDSET</p><h2>YOUR GOALS.<br />YOUR WORK.<br /><em>YOUR TRANSFORMATION.</em></h2></Reveal></section>

    <section id="gallery" className="gallery section"><div className="section-number">06 / 07</div><Reveal><p className="eyebrow purple">INSIDE SAN</p><h2>THE ROOM<br /><span>WHERE IT HAPPENS.</span></h2></Reveal><div className="gallery-grid">{[images.woman, images.training, images.detail, images.couple, images.coach].map((src, i) => <button className={`gallery-tile tile-${i}`} key={`${src}-${i}`} onClick={() => setGallery(src)}><img src={src} alt="SAN FITNESS training environment" /></button>)}</div></section>

    <section id="contact" className="enquiry section"><div className="enquiry-copy"><div className="section-number">07 / 07</div><p className="eyebrow purple">START TODAY</p><h2>READY TO<br /><span>LEVEL UP?</span></h2><p>Choose your plan and take the first step toward your fitness goals.</p><div className="contact-note"><span>CONTACT</span><strong>Enquiries welcome</strong><small>Use the form and our team will get back to you.</small></div></div><form className="enquiry-form" onSubmit={(e) => e.preventDefault()}><label>Full name<input required placeholder="Your name" /></label><label>Phone number<input required type="tel" placeholder="+91 00000 00000" /></label><label>Email <small>(optional)</small><input type="email" placeholder="you@example.com" /></label><label>Membership category<select defaultValue={category} onChange={(e) => setCategory(e.target.value as Category)}>{Object.keys(plans).map((p) => <option key={p}>{p}</option>)}</select></label><label>Message <small>(optional)</small><textarea rows={4} placeholder="Tell us a little about your goals" /></label><button className="button button-primary" type="submit">Send Enquiry <ArrowRight /></button><p className="form-note">This form is ready to connect to your enquiry handler.</p></form></section>

    <footer><div className="footer-brand"><img src={logo} alt="SAN FITNESS" /><p>Train with purpose.<br />Become your strongest self.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#about">About</a><a href="#services">Services</a><a href="#training">Training</a><a href="#membership-plans">Memberships</a></div><div><span>CONNECT</span><a href="#contact">Contact</a><a href="#gallery">Gallery</a><a href="#home">Back to top ↑</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SAN FITNESS</span><span>BUILT BY DISCIPLINE.</span></div></footer>

    <AnimatePresence>{selected && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><motion.div className="enquiry-modal" initial={{ scale: .94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .94, opacity: 0 }} onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><X /></button><p className="eyebrow purple">YOUR NEXT STEP</p><h2>{selected.duration}<br /><span>{selected.name.toUpperCase()}</span></h2><div className="modal-price">{selected.price}</div><p>{selected.description}</p><a className="button button-primary" href="#contact" onClick={() => setSelected(null)}>Continue to Enquiry <ArrowRight /></a></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{gallery && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setGallery(null)}><button onClick={() => setGallery(null)} aria-label="Close gallery"><X /></button><img src={gallery} alt="SAN FITNESS gallery" onClick={(e) => e.stopPropagation()} /></motion.div>}</AnimatePresence>
  </main>
}

function ArrowUpRight() { return <ArrowDownRight className="up-right" /> }
