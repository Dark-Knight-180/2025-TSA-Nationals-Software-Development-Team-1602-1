
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Info, Map, Layers, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';

export function FloatingNav() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('login');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const location = useLocation();
  const { user } = useAuth();
  
  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Solutions', href: '/solutions', icon: Layers },
    { name: 'Map Tool', href: '/map-tool', icon: Map },
    { name: 'Account', href: '/account', icon: User, authRequired: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleAccountClick = (e: React.MouseEvent, authRequired: boolean | undefined) => {
    if (authRequired && !user) {
      e.preventDefault();
      setAuthModalView('login');
      setShowAuthModal(true);
    }
  };

  return (
    <>
<motion.div 
  className="fixed top-6 transform -translate-x-1/2 z-50 w-full flex justify-center"
  initial={{ y: -100, opacity: 0 }}
  animate={{ 
    y: isVisible ? 0 : -100, 
    opacity: isVisible ? 1 : 0 
  }}
  transition={{ duration: 0.3 }}
>
        <nav className="flex items-center gap-1 bg-background/20 backdrop-blur-md border border-border/30 rounded-full p-1.5 shadow-lg w-auto min-w-[900px]">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => handleAccountClick(e, item.authRequired)}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-2 rounded-full transition-colors relative flex-1",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium mt-1">{item.name}</span>
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    layoutId="activeNavBackground"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </motion.div>

      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
        defaultView={authModalView}
      />
    </>
  );
}
