import React, { useState, useEffect } from 'react';
import { Github, Mail, Linkedin, X, Link, Download, ExternalLink, Menu } from 'lucide-react';

// === BUG FIX: A new, more robust typing animation hook ===
const useTypingEffect = (textToType: string, interKeyStrokeDurationInMs: number) => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    setCurrentText(''); // Reset text when the component mounts or textToType changes
    
    // Use timeouts for each character, which is more robust than a single interval
    const timeouts = textToType.split('').map((char, index) => {
      return setTimeout(() => {
        setCurrentText((prev) => prev + char);
      }, interKeyStrokeDurationInMs * (index + 1));
    });

    // This is the cleanup function. It runs if the component unmounts.
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [textToType, interKeyStrokeDurationInMs]);

  return currentText;
};


const Hero = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const handleExploreClick = () => {
    setShowPortfolio(!showPortfolio);
  };
  
  // This will now work correctly
  const typedName = useTypingEffect("Samuel", 150);

  return <div className="min-h-screen text-foreground flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold text-foreground">
              JadeofWallstreet
            </h1>
          </div>
          <button className="p-2 rounded-md border border-border hover:bg-muted transition-all duration-300">
            <Menu size={20} className="text-foreground" />
          </button>
        </div>
      </header>

      {/* Main Profile Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 pt-24">
        {/* Profile Image - Updated to a simple grey border */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card border-2 border-border flex items-center justify-center mb-6 animate-fade-in">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-muted flex items-center justify-center">
            {/* Letter 'J' is now solid black */}
            <span className="text-xl md:text-2xl font-bold text-foreground">J</span>
          </div>
        </div>

        {/* Main Heading - The name will now type correctly */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 animate-fade-in whitespace-nowrap" style={{
        animationDelay: '0.2s'
      }}>
          Hello! I'm <span className="text-foreground font-bold">{typedName}</span>
          <span className="blinking-cursor">|</span>
        </h1>

        {/* Role Badge - Updated to grey border and text */}
        <div className="inline-block text-xs sm:text-sm text-muted-foreground border border-border px-3 py-1.5 rounded-full my-4 animate-fade-in" style={{
        animationDelay: '0.4s'
      }}>AI-Native Full-Stack Developer</div>

        {/* Description */}
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed animate-fade-in text-sm sm:text-base px-4" style={{
        animationDelay: '0.6s'
      }}>
          I'm a <strong className="text-foreground">Software Engineer</strong> with passion for problem-solving, strong foundation in computer science principles and proven track record of delivering high-quality and scalable code.
        </p>

        {/* Main CTA Button - Updated to black & white style */}
        <button onClick={handleExploreClick} className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-md bg-foreground text-background hover:bg-foreground/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-muted-foreground/30 mb-8 animate-fade-in text-sm sm:text-base" style={{
        animationDelay: '0.8s'
      }}>
          {showPortfolio ? 'Hide Details' : 'Explore'} 
          <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>

        {/* Portfolio Quick Links - Updated to a light grey card style */}
        {showPortfolio && <div className="w-full max-w-4xl animate-fade-in space-y-8">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">Ready to collaborate?</h3>
              <p className="text-muted-foreground mb-6">
                Got a product idea and want to ship it fast with AI? Let's turn your concept into a live, responsive web app with vibes and velocity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:EdozieSammy101@gmail.com" className="flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/80 transition-all duration-300 text-center justify-center">
                  <Mail size={18} />
                  Work With Me
                </a>
                <a href="https://flowcv.com/resume/d5baa23saiuu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-foreground hover:bg-muted transition-all duration-300 text-center justify-center">
                  <Download size={18} />
                  Download Resume
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Learnable AI", desc: "A next-gen study app for Nigerian universities...", link: "https://learnable.fun" },
                { title: "CodeBox", desc: "A polished, high-speed developer toolkit made with AI-assisted development.", link: "https://codebox.help" },
                { title: "0xfarmer Community", desc: "Founded a thriving Web3 community of 1,000+ members...", links: [{ name: "Telegram", url: "https://t.me/+Ma4xal22__g3OTgx" }, { name: "WhatsApp", url: "https://www.whatsapp.com/channel/0029VaAs0DMH5JLwrAD3wM1U" }] },
                { title: "Blog & Writing", desc: "Technical writing and thought leadership on DeFi, Web3, and AI development.", link: "https://jadeofwallstreet.hashnode.dev/" }
              ].map((item, index) => (
                <div key={index} className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground mb-4 text-sm">{item.desc}</p>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-foreground hover:text-muted-foreground transition-colors text-sm font-medium">
                      {item.title.includes("Blog") ? "Read Articles" : "Visit Site"} <ExternalLink size={14} />
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
              ))}
            </div>
          </div>}
      </div>

      {/* Social Links Footer - Updated to grey icons with black hover effect */}
      <div className="py-6 px-4">
        <div className="flex justify-center space-x-6 animate-fade-in" style={{
        animationDelay: '1s'
      }}>
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
    </div>;
};
export default Hero;
