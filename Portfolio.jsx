import { useState, useEffect } from 'react';
import { Moon, Sun, Mail, Github, Linkedin, ExternalLink, ArrowUp, Menu, X } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('about');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [visibleSections, setVisibleSections] = useState(new Set());

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark';
    setTheme(savedTheme);
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(newTheme);
  };

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      // Show scroll to top button
      setShowScrollTop(window.scrollY > 400);

      // Update active section
      const sections = ['about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // run once to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => {
              const next = new Set(prev);
              next.add(entry.target.id);
              return next;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Thank you for your message! This is a demo form.');
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({ name: '', email: '', message: '' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const skills = [
    { name: 'HTML5', level: 95 },
    { name: 'CSS3', level: 92 },
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 88 },
    { name: 'Node.js', level: 85 },
    { name: 'TypeScript', level: 87 },
    { name: 'Git', level: 90 },
    { name: 'MongoDB', level: 82 },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory management and payment integration.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#',
    },
    {
      title: 'AI Chat Application',
      description: 'Real-time chat application with AI-powered responses and sentiment analysis.',
      tech: ['React', 'Socket.io', 'OpenAI', 'Express'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Task Management System',
      description: 'Collaborative project management tool with drag-and-drop interface and team features.',
      tech: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather forecast application with real-time data and beautiful visualizations.',
      tech: ['React', 'OpenWeather API', 'Charts.js'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Portfolio CMS',
      description: 'Content management system for portfolio websites with drag-and-drop page builder.',
      tech: ['Next.js', 'Prisma', 'PostgreSQL', 'tRPC'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Fitness Tracker',
      description: 'Mobile-first fitness tracking app with workout plans and progress analytics.',
      tech: ['React Native', 'Redux', 'Node.js', 'MySQL'],
      github: '#',
      demo: '#',
    },
  ];

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      {/* Starfield Background */}
      <div className="starfield"></div>

      {/* Main Content */}
      <div className="relative z-10 space-gradient min-h-screen">
        {/* Navigation */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-[20px] tracking-wider">
                <span style={{ color: 'var(--primary-color)' }}>{'<'}</span>
                <span style={{ color: 'var(--text-light)' }}>RK</span>
                <span style={{ color: 'var(--primary-color)' }}>{' />'}</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {['about', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="relative px-3 py-2 transition-all duration-300 capitalize hover:opacity-80"
                    style={{
                      color: activeSection === section ? 'var(--primary-color)' : 'var(--text-muted)',
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '1.05rem',
                    }}
                  >
                    {section}
                    {activeSection === section && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                      ></span>
                    )}
                  </button>
                ))}

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg transition-all duration-300 hover:opacity-80"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                    color: 'var(--primary-color)',
                    border: '1px solid var(--border-color)',
                  }}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ color: 'var(--neon-cyan)' }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 space-y-2">
                {['about', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left px-4 py-2 rounded capitalize transition-all duration-300"
                    style={{
                      color: activeSection === section ? 'var(--neon-cyan)' : 'var(--text-muted)',
                      backgroundColor: activeSection === section ? 'rgba(0, 217, 255, 0.1)' : 'transparent',
                    }}
                  >
                    {section}
                  </button>
                ))}
                <button onClick={toggleTheme} className="w-full flex items-center gap-2 px-4 py-2" style={{ color: 'var(--neon-cyan)' }}>
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* About Section */}
        <section
          id="about"
          className={`min-h-screen flex items-center justify-center px-4 pt-20 transition-all duration-1000 ${
            visibleSections.has('about') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-5xl w-full">
            <div
              className={`transition-all duration-1000 delay-200 ${visibleSections.has('about') ? 'animate-fade-in-up' : ''}`}
            >
              {/* Greeting Badge */}
              <div className="flex justify-center mb-8">
                <div
                  className="px-6 py-2 rounded-full inline-flex items-center gap-2"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                    border: '1px solid var(--primary-color)',
                    color: 'var(--primary-color)',
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: 'var(--primary-color)' }}
                    ></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--primary-color)' }}></span>
                  </span>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif" }}>Available for Opportunities</span>
                </div>
              </div>

              {/* Name & Title */}
              <div className="text-center mb-10">
                <h1
                  className="mb-8 tracking-wide leading-tight"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: 'var(--text-light)',
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  }}
                >
                  Ramakrishna
                </h1>

                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px w-16 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                  <div className="h-px w-16 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                </div>

                <h2
                  className="mb-10 tracking-wide"
                  style={{
                    color: 'var(--primary-color)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                >
                  Software Developer
                </h2>

                <p
                  className="max-w-3xl mx-auto mb-12 leading-relaxed"
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                    lineHeight: '1.8',
                  }}
                >
                  Results-driven software developer with expertise in building scalable, high-performance web applications. Specializing in modern development practices, clean architecture, and delivering innovative solutions that drive business value. Committed to writing maintainable code and staying current with emerging technologies.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 rounded-lg transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '1.05rem',
                  }}
                >
                  Get In Touch
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3 rounded-lg transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                    color: 'var(--primary-color)',
                    border: '2px solid var(--primary-color)',
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '1.05rem',
                  }}
                >
                  View Projects
                </button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                <a
                  href="#"
                  className="p-3 rounded-lg transition-all duration-300 hover:opacity-80 border"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                    color: 'var(--primary-color)',
                    borderColor: 'var(--border-color)',
                  }}
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-lg transition-all duration-300 hover:opacity-80 border"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                    color: 'var(--primary-color)',
                    borderColor: 'var(--border-color)',
                  }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-lg transition-all duration-300 hover:opacity-80 border"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                    color: 'var(--primary-color)',
                    borderColor: 'var(--border-color)',
                  }}
                  aria-label="Email"
                >
                  <Mail size={22} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className={`min-h-screen flex items-center justify-center px-4 py-20 transition-all duration-1000 ${
            visibleSections.has('skills') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-6xl w-full">
            <div className="text-center mb-16">
              <h2
                className="mb-4 tracking-wider"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: 'var(--text-light)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                }}
              >
                <span className="neon-text">Technical</span> Skills
              </h2>
              <div className="h-1 w-24 mx-auto rounded-full animate-pulse-glow" style={{ backgroundColor: 'var(--neon-cyan)' }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`section-card p-6 rounded-xl transition-all duration-500 hover:scale-105 ${
                    visibleSections.has('skills') ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex justify-between mb-3">
                    <span
                      style={{
                        color: 'var(--text-light)',
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: '1.05rem',
                      }}
                    >
                      {skill.name}
                    </span>
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontFamily: "'Rajdhani', sans-serif",
                      }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: visibleSections.has('skills') ? `${skill.level}%` : '0%',
                        backgroundColor: 'var(--primary-color)',
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`min-h-screen flex items-center justify-center px-4 py-20 transition-all duration-1000 ${
            visibleSections.has('projects') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2
                className="mb-4 tracking-wider"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: 'var(--text-light)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                }}
              >
                Featured <span className="neon-text">Projects</span>
              </h2>
              <div className="h-1 w-24 mx-auto rounded-full animate-pulse-glow" style={{ backgroundColor: 'var(--neon-cyan)' }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className={`section-card p-8 rounded-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                    visibleSections.has('projects') ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="mb-4">
                    <h3
                      className="tracking-wide"
                      style={{
                        color: 'var(--text-light)',
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: '1.3rem',
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                          color: 'var(--primary-color)',
                          fontSize: '0.85rem',
                          fontFamily: "'Rajdhani', sans-serif",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex-1 py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-80 border"
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--text-muted)',
                        borderColor: 'var(--border-color)',
                        fontFamily: "'Rajdhani', sans-serif",
                      }}
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex-1 py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-90"
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        fontFamily: "'Rajdhani', sans-serif",
                      }}
                    >
                      <ExternalLink size={18} />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`min-h-screen flex items-center justify-center px-4 py-20 transition-all duration-1000 ${
            visibleSections.has('contact') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-2xl w-full">
            <div className="text-center mb-16">
              <h2
                className="mb-4 tracking-wider"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: 'var(--text-light)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                }}
              >
                Get in <span className="neon-text">Touch</span>
              </h2>
              <div className="h-1 w-24 mx-auto rounded-full animate-pulse-glow" style={{ backgroundColor: 'var(--neon-cyan)' }}></div>
              <p className="mt-4" style={{ color: 'var(--text-muted)' }}>
                Have a project in mind? Let's work together!
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`section-card p-10 rounded-xl transition-all duration-1000 ${visibleSections.has('contact') ? 'animate-fade-in-up' : 'opacity-0'}`}
            >
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2" style={{ color: 'var(--text-light)' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
                    color: 'var(--text-light)',
                    border: formErrors.name ? '1px solid #ef4444' : '1px solid var(--border-color)',
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                  placeholder="Your Name"
                />
                {formErrors.name && (
                  <p className="mt-2" style={{ color: '#ff0055', fontSize: '0.875rem' }}>
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block mb-2" style={{ color: 'var(--text-light)' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
                    color: 'var(--text-light)',
                    border: formErrors.email ? '1px solid #ef4444' : '1px solid var(--border-color)',
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                  placeholder="your.email@example.com"
                />
                {formErrors.email && (
                  <p className="mt-2" style={{ color: '#ff0055', fontSize: '0.875rem' }}>
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2" style={{ color: 'var(--text-light)' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 resize-none"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
                    color: 'var(--text-light)',
                    border: formErrors.message ? '1px solid #ef4444' : '1px solid var(--border-color)',
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                  placeholder="Your message here..."
                ></textarea>
                {formErrors.message && (
                  <p className="mt-2" style={{ color: '#ff0055', fontSize: '0.875rem' }}>
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '1.05rem',
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-12 text-center border-t"
          style={{
            borderColor: 'var(--border-color)',
            color: 'var(--text-muted)',
          }}
        >
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem' }}>© 2025 Ramakrishna. All rights reserved.</p>
          <p className="mt-2" style={{ fontSize: '0.9rem' }}>
            Built with React & Tailwind CSS
          </p>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 rounded-full transition-all duration-300 hover:opacity-90 z-50"
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={22} />
          </button>
        )}
      </div>
    </div>
  );
}