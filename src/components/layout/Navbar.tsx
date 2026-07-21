import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav id="navbar" className="fixed top-0 w-full z-50 glass-nav transition-all duration-300">
        <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <a href="#hero" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/50 flex-shrink-0 overflow-hidden transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 bg-white">
              <img 
                src="https://z-cdn-media.chatglm.cn/files/8280211a-3452-44f0-9069-8740a92c4223.png?auth_key=1883977109-8ac82a8404ff460cbee731ecf3c24164-0-a2fa65e9492d015203a3a7906bef0323" 
                alt="Mohamed Said" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[#FAF8F2]">
              <h1 className="font-serif text-lg font-bold tracking-tight leading-none">Mohamed Said</h1>
              <p className="text-[10px] text-[#D4AF37] tracking-[0.3em] uppercase font-bold mt-1">Digital Historical Archive</p>
            </div>
          </a>
          
          <div className="hidden lg:flex items-center space-x-8 text-sm text-[#FAF8F2]/80 font-medium">
            <a href="#graph-preview" className="hover:text-[#D4AF37] transition-colors relative">Mtandao</a>
            <a href="#flip-cards" className="hover:text-[#D4AF37] transition-colors relative">Makala</a>
            <a href="#blog-portal" className="hover:text-[#D4AF37] transition-colors relative flex items-center">
              <i className="fas fa-blog mr-1"></i> Blog
            </a>
            <a href="#youtube-channel" className="hover:text-red-500 transition-colors relative flex items-center">
              <i className="fab fa-youtube mr-1"></i> Chanel
            </a>
            <a href="#premium-archives" className="text-[#D4AF37] font-bold transition-colors relative">Nyaraka</a>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => document.body.classList.toggle('light-mode')} 
              className="text-[#FAF8F2] hover:text-[#D4AF37] transition-colors p-2" 
              title="Badili Muonekano"
            >
              <i className="fas fa-eye text-base"></i>
            </button>
            <button 
              onClick={toggleMobileMenu} 
              className="lg:hidden text-[#FAF8F2] hover:text-[#D4AF37] transition-colors p-2"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Menyu ya Simu */}
      <div className={`fixed top-0 right-0 h-full w-80 glass-nav border-l border-[#D4AF37]/20 z-[80] flex flex-col pt-24 pb-8 px-10 space-y-8 shadow-2xl transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button 
          onClick={toggleMobileMenu} 
          className="absolute top-6 right-6 text-[#FAF8F2] hover:text-[#D4AF37]"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        <a href="#graph-preview" onClick={toggleMobileMenu} className="text-[#FAF8F2] hover:text-[#D4AF37] text-lg font-medium">Mtandao wa Historia</a>
        <a href="#flip-cards" onClick={toggleMobileMenu} className="text-[#FAF8F2] hover:text-[#D4AF37] text-lg font-medium">Makala za Kihistoria</a>
        <a href="#blog-portal" onClick={toggleMobileMenu} className="text-[#FAF8F2] hover:text-[#D4AF37] text-lg font-medium flex items-center">
          <i className="fas fa-blog mr-2"></i> Blog ya Zamani
        </a>
        <a href="#youtube-channel" onClick={toggleMobileMenu} className="text-red-500 font-bold text-lg flex items-center">
          <i className="fab fa-youtube mr-2"></i> Chanel ya YouTube
        </a>
        <a href="#premium-archives" onClick={toggleMobileMenu} className="text-[#D4AF37] font-bold text-lg">Nyaraka za Kulipia</a>
      </div>
    </>
  );
};
