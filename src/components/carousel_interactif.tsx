"use client"
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// 1. Définition des types TypeScript
interface MediaItem {
  id: number;
  src: string;
  alt: string;
}

// 2. Les données (Images style Natalia Blauth / Aventure)
// https://i.pinimg.com/1200x/6e/ac/7b/6eac7b031b124f642620e6d34480ed6e.jpg
const mediaItems: MediaItem[] = [
  { id: 1, src: "https://i.pinimg.com/1200x/e7/07/b0/e707b01cd08fd9c3e90680181351db13.jpg", alt: "Cycliste sur chemin forestier" },
  { id: 2, src: "https://i.pinimg.com/1200x/a3/32/26/a33226616eb007fb63bc50e98e56d1b4.jpg", alt: "Grandes montagnes et brume" },
  { id: 3, src: "https://i.pinimg.com/1200x/e6/25/62/e62562ed14f28910d507cebfdb42b787.jpg", alt: "Portrait de profil" },
  { id: 4, src: "https://i.pinimg.com/1200x/f5/af/2e/f5af2e6ea34045ba8e0f017d5559d932.jpg", alt: "Manteau élégant à l'extérieur" },
  { id: 5, src: "https://i.pinimg.com/1200x/d4/e4/52/d4e452c2740ad8abf4e2b890a4ff0ce5.jpg", alt: "Fleur bleue en gros plan" },
  { id: 6, src: "https://i.pinimg.com/1200x/48/d5/68/48d56897cca222fe37b411e17b82f625.jpg", alt: "Voiture de sport classique" },
  { id: 7, src: "https://i.pinimg.com/1200x/fa/bf/26/fabf26d94646ced131ce0d39f3824bc1.jpg", alt: "Détails mécaniques et techniques" },
  { id: 8, src: "https://i.pinimg.com/1200x/fb/47/b5/fb47b5e13d945e43e8d026d9a7480501.jpg", alt: "Coureur de trail en montagne" },
  { id: 9, src: "https://i.pinimg.com/1200x/89/9d/f8/899df869a89a8b7ce03a8cd592ff1a90.jpg", alt: "beast and peace" }
];

export default function Carousel() {
  const [activeId, setActiveId] = useState<number>(mediaItems[0].id);
  const trackRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Préchargement des images pour une expérience fluide
  useEffect(() => {
    mediaItems.forEach(item => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Gestion du défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = mediaItems.findIndex(item => item.id === currentId);
        const nextIndex = (currentIndex + 1) % mediaItems.length;
        return mediaItems[nextIndex].id;
      });
    }, 3000);

    // Nettoyage de l'intervalle si le composant est démonté
    return () => clearInterval(interval);
  }, []);

  // Défilement (scroll) automatique de la piste pour centrer l'élément actif
  useEffect(() => {
    const activeIndex = mediaItems.findIndex(item => item.id === activeId);
    const activeBtn = buttonRefs.current[activeIndex];
    const track = trackRef.current;
    
    if (activeBtn && track) {
      // Calcul manuel pour centrer le bouton exactement dans la piste
      // Cela évite le bug de "scrollIntoView" qui décale tout le fond d'écran
      const btnLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      const trackWidth = track.offsetWidth;
      
      const scrollPosition = btnLeft - (trackWidth / 2) + (btnWidth / 2);
      
      track.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeId]);

  // Récupère l'image actuellement active
  const activeItem = mediaItems.find(item => item.id === activeId) || mediaItems[0];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black m-0 p-0">
      
      {/* Injection des styles globaux pour masquer la scrollbar native */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Arrière-plan géré par AnimatePresence pour les fondus croisés */}
      <div className="absolute inset-0  bg-neutral-950">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeItem.id}
            src={activeItem.src}
            alt={activeItem.alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 size-full  object-cover pointer-events-none"
            style={{ willChange: "transform, opacity" }} // Évite les sauts de rendu (glitch)
          />
        </AnimatePresence>
        {/* <div className="absolute z-20 bottom-[10%] md:bottom-[5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference">
          <h1 className="font-normal text-center text-xl md:text-4xl uppercase font-pixel-circle tracking-[-0.07em] ">tegra studio  kmd</h1>
        </div> */}
      </div>

      {/* Conteneur global du carrousel de navigation */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 w-full max-w-[96vw] md:max-w-max flex justify-center z-10">
        
        {/* Track / Container principal */}
        <div 
          ref={trackRef}
          className="relative flex items-center gap-3 p-1.5 rounded-[12px] bg-black/15 backdrop-blur-xl border border-white/5 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        >
          {mediaItems.map((item, index) => {
            const isActive = item.id === activeId;
            
            return (
              <button
                key={item.id}
                ref={(el) => { buttonRefs.current[index] = el; }}
                onClick={() => setActiveId(item.id)}
                className={`relative shrink-0 size-[60px] snap-center outline-none cursor-pointer transition-opacity duration-300 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {/* L'image de la miniature */}
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="size-full object-cover rounded-[8px] pointer-events-none" 
                />
                {/* Indicateur blanc fluide (Magie de Framer Motion avec layoutId) */}
                {isActive && (
                  <motion.div
                    layoutId="sliding-indicator"
                    className="absolute -inset-1 border border-white rounded-[12px] pointer-events-none z-20"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 1
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}