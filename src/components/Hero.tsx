import React, { useState, useEffect } from 'react';
import { Github, Mail, Linkedin, X, Link, Download, ExternalLink, Menu } from 'lucide-react';
const Hero = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleExploreClick = () => {
    setShowPortfolio(!showPortfolio);
  };
  
  // === ANIMATION MODIFICATION START ===
  // 1. Changed the text to the full phrase.
  // 2. Reduced the interval from 150ms to 70ms for a smoother, faster effect.
  // === ANIMATION MODIFICATION END ===

  const projects = [
    { title: "My Portfolio", desc: "The interactive portfolio you are currently viewing. Built from scratch to showcase my skills in front-end development and design.", link: "https://0xnotes.lol", tags: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'] },
    { title: "OptimumStar", desc: "A quiz app designed to teach the Optimum whitepaper — the world’s first high-performance memory infrastructure for any blockchain.", link: "https://optimumstar.quest/", tags: ['React', 'TypeScript', 'PostgreSQL', 'Vite'] },
    { title: "SuccinctStar", desc: "A quiz app designed to teach the Succinct whitepaper — a zero-knowledge infrastructure network powering verifiable computation at scale.", link: "https://succinctstar.club/", tags: ['React', 'TypeScript', 'PostgreSQL', 'Vite'] },
    { title: "Saros SDK Docs", desc: "A developer documentation project for Saros SDKs, featuring guides and examples that cut friction and fast-track builders from zero to shipping.", link: "https://sarodocs.hashnode.space/default-guide/introduction/welcome-to-saros-sdks", tags: ['React', 'TypeScript', 'Rust', 'Technical Writing'] },
    { title: "Learnable AI", desc: "A next-gen study app for universities, built with AI-first workflows. Features quiz systems, CGPA calculation, and exam prep.", link: "https://learnable.fun", tags: ['React', 'Vite', 'TypeScript', 'SQL'] },
    { title: "CodeBox", desc: "A polished, high-speed developer toolkit made with AI-assisted development. Export-ready tools with blazing-fast UI.", link: "https://codebox.help", tags: ['React', 'Vite', 'TypeScript'] },
    { title: "Community Building", desc: "Founded a thriving Web3 community of 1,000+ members sharing airdrop strategies and DeFi insights.", links: [{ name: "Telegram", url: "https://t.me/+Ma4xal22__g3OTgx" }, { name: "WhatsApp", url: "https://www.whatsapp.com/channel/0029VaAs0DMH5JLwrAD3wM1U" }], tags: ['Community Management', 'DeFi'] },
    { title: "Blog & Writing", desc: "Technical writing and thought leadership on DeFi, Web3, and AI development.", link: "https://jadeofwallstreet.hashnode.dev/", tags: ['Technical Writing', 'Web3', 'AI'] }
  ];

  // Function to handle menu link clicks
  const handleMenuLinkClick = (sectionId: string) => {
    if (!showPortfolio) {
      setShowPortfolio(true); // Ensure the content is visible if it's hidden
    }
    setIsMenuOpen(false);   // Close the menu
    // Use a timeout to allow the content to render before scrolling
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return <div className="min-h-screen text-foreground flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold text-foreground">
              JadeofWallstreet
            </h1>
          </div>
          <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-md border border-border hover:bg-muted transition-all duration-300">
            <Menu size={20} className="text-foreground" />
          </button>
        </div>
      </header>

      {/* Full-screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center animate-fade-in">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 p-2 rounded-md hover:bg-muted transition-colors">
            <X size={24} className="text-foreground" />
          </button>
          <nav>
            <ul className="flex flex-col items-center gap-8 text-center">
              <li>
                <a onClick={() => handleMenuLinkClick('projects')} className="text-4xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Projects
                </a>
              </li>
              <li>
                <a onClick={() => handleMenuLinkClick('contact')} className="text-4xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Contact
                </a>
              </li>
              {/* === "Resume" LINK REMOVED FROM HERE === */}
            </ul>
          </nav>
        </div>
      )}

      {/* Main Profile Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 pt-24">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card border-2 border-border flex items-center justify-center mb-6 animate-fade-in">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xl md:text-2xl font-bold text-foreground">J</span>
          </div>
        </div>

        {/* === ANIMATION MODIFICATION START === */}
        {/* The h1 element now displays the full, smoother animation */}
               <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3">
          <span className="typewriter">Hello! I'm Samuel</span>
        </h1>
        {/* === ANIMATION MODIFICATION END === */}
        
        <div className="inline-block text-xs sm:text-sm text-muted-foreground border border-border px-3 py-1.5 rounded-full my-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          AI-Native Full-Stack Developer
        </div>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed animate-fade-in text-sm sm:text-base px-4" style={{ animationDelay: '0.6s' }}>
          I'm a <strong className="text-foreground">Software Engineer</strong> with passion for problem-solving, strong foundation in computer science principles and proven track record of delivering high-quality and scalable code.
        </p>
        <button onClick={handleExploreClick} className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-md bg-foreground text-background hover:bg-foreground/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-muted-foreground/30 animate-fade-in text-sm sm:text-base" style={{ animationDelay: '0.8s' }}>
          {showPortfolio ? 'Hide Details' : 'Explore'} 
          <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
        <div className="my-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/samuelchimmy" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <Github size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="https://x.com/MetisCharter" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
              <X size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="https://www.linkedin.com/in/samuelchimmy1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="https://link3.to/jadeofwallstreet" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="More Links">
              <Link size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        {/* Portfolio Quick Links */}
        {showPortfolio && <div className="w-full max-w-4xl animate-fade-in space-y-8">
            <div id="contact" className="bg-card rounded-lg p-6 border border-border scroll-mt-20">
              <h3 className="text-xl font-bold text-foreground mb-4">Interested in Working Together?</h3>
              <p className="text-muted-foreground mb-6">
                I specialize in bringing ideas to life, from concept to deployment. If you have a project in mind or are looking for a dedicated engineer to join your team, I'd be delighted to connect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:EdozieSammy101@gmail.com" className="flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/80 transition-all duration-300 text-center justify-center">
                  <Mail size={18} />
                  Work With Me
                </a>
              </div>
            </div>

            <div id="projects" className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-20">
              {projects.map((item) => (
                <div key={item.title} className="bg-card rounded-lg p-6 border border-border flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground mb-4 text-sm">{item.desc}</p>
                  </div>
                  <div>
                    {item.tags && (
                      <div className="flex flex-wrap gap-2 mt-auto mb-4">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-foreground hover:text-muted-foreground transition-colors text-sm font-medium">
                        {item.title.includes("Blog") || item.title.includes("Docs") ? "Read More" : "Visit Site"} <ExternalLink size={14} />
                      </a>
                    )}
                    {item.links && (
                      <div className="flex gap-4">
                        {item.links.map(link => (
                          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-foreground hover:text-muted-foreground transition-colors text-sm font-medium">
                            {link.name} <ExternalLink size={14} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>}
      </div>
    </div>;
};
export default Hero;
