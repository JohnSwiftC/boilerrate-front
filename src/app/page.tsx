"use client"
import { useState, useEffect } from 'react';
import { useAuth, User } from '../../contexts/AuthContext'
import Particles from '../../components/Particles';
import Header from '../../components/Header';
import Blog from '../../components/Blog';

const Root = () => {
  const [oauthURL, setOauthURL] = useState<string>()
  const { user, get_oauth } = useAuth();
  const [userIsConn, setUserIsConn] = useState<boolean>(true);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
 
  useEffect(() => {
    if (user) {
      if (user.conn === true) {
        setUserIsConn(true)
      } else {
        setUserIsConn(false)
      }
    }
  }, [user])
 
  const do_oauth = async () => {
    const url = await get_oauth()
    window.location.href = url
  }
 
  const getEmail = (user: User | null): string => {
    if (user) {
      if (user.email) {
        return user.email
      }
    }
    return "None"
  }
 
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-sky-100 to-sky-300">
        <div className="m-7">
          <Header></Header>
        </div>
        {/* Mountain Layers - Improved Version */}
  <svg className="absolute bottom-0 w-full z-0" viewBox="0 0 1440 600" preserveAspectRatio="none">
  {/* Gradient Definitions */}
  <defs>
    {/* Mountain gradients for depth */}
    <linearGradient id="mountain1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{ stopColor: '#cbd5e1', stopOpacity: 0.4 }} />
      <stop offset="100%" style={{ stopColor: '#94a3b8', stopOpacity: 0.6 }} />
    </linearGradient>
    
    <linearGradient id="mountain2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{ stopColor: '#94a3b8', stopOpacity: 0.5 }} />
      <stop offset="100%" style={{ stopColor: '#64748b', stopOpacity: 0.7 }} />
    </linearGradient>
    
    <linearGradient id="mountain3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 0.7 }} />
      <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.9 }} />
    </linearGradient>

    {/* Snow gradient */}
    <linearGradient id="snow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
      <stop offset="70%" style={{ stopColor: '#f0f9ff', stopOpacity: 0.9 }} />
      <stop offset="100%" style={{ stopColor: '#e0f2fe', stopOpacity: 0 }} />
    </linearGradient>

    {/* Shadow for depth */}
    <filter id="shadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="0" dy="2" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge> 
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/> 
      </feMerge>
    </filter>
  </defs>

  {/* Back mountain range - furthest */}
  <g opacity="0.4">
    <path
      d="M0,380 C100,340 150,220 240,200 C330,180 380,280 480,320 C580,360 650,200 720,180 C790,160 870,240 960,280 C1050,320 1130,180 1200,150 C1270,120 1370,260 1440,300 L1440,600 L0,600 Z"
      fill="url(#mountain1)"
    />
    {/* Snow caps for back mountains */}
    <path d="M240,200 L200,260 L280,260 Z" fill="url(#snow)" />
    <path d="M720,180 L680,240 L760,240 Z" fill="url(#snow)" />
    <path d="M1200,150 L1160,210 L1240,210 Z" fill="url(#snow)" />
  </g>

  {/* Middle mountain range */}
  <g opacity="0.6" filter="url(#shadow)">
    <path
      d="M0,420 C80,380 140,260 220,250 C300,240 340,300 420,340 C500,380 560,260 640,220 C720,180 800,280 880,320 C960,360 1040,240 1120,200 C1200,160 1280,300 1360,350 C1400,375 1420,380 1440,380 L1440,600 L0,600 Z"
      fill="url(#mountain2)"
    />
    {/* More detailed snow caps */}
    <path d="M220,250 L170,330 L270,330 Z" fill="url(#snow)" />
    <path d="M640,220 L590,300 L690,300 Z" fill="url(#snow)" />
    <path d="M1120,200 L1070,280 L1170,280 Z" fill="url(#snow)" />
    {/* Snow ridges */}
    <path d="M220,250 L240,280 L260,270 L270,290 L270,330 L170,330 Z" fill="url(#snow)" opacity="0.6" />
    <path d="M640,220 L660,250 L680,240 L690,260 L690,300 L590,300 Z" fill="url(#snow)" opacity="0.6" />
  </g>

  {/* Front mountain range - closest */}
  <g opacity="0.85" filter="url(#shadow)">
    <path
      d="M0,460 C60,440 120,360 180,350 C240,340 300,400 360,420 C420,440 480,340 540,300 C600,260 660,320 720,360 C780,400 840,320 900,300 C960,280 1020,340 1080,380 C1140,420 1200,340 1260,320 C1320,300 1380,380 1440,420 L1440,600 L0,600 Z"
      fill="url(#mountain3)"
    />
    {/* Detailed snow with ridges */}
    <path d="M180,350 L120,440 L240,440 Z" fill="url(#snow)" />
    <path d="M540,300 L480,390 L600,390 Z" fill="url(#snow)" />
    <path d="M900,300 L840,390 L960,390 Z" fill="url(#snow)" />
    {/* Snow texture details */}
    <path d="M180,350 L200,380 L220,370 L235,395 L240,440 L120,440 Z" fill="url(#snow)" opacity="0.7" />
    <path d="M540,300 L560,330 L580,320 L595,345 L600,390 L480,390 Z" fill="url(#snow)" opacity="0.7" />
    {/* Small snow patches */}
    <circle cx="250" cy="380" r="8" fill="white" opacity="0.3" />
    <circle cx="610" cy="330" r="6" fill="white" opacity="0.3" />
    <circle cx="970" cy="330" r="7" fill="white" opacity="0.3" />
  </g>

  {/* Foreground details - rocks and texture */}
  <g opacity="0.3">
    <path d="M0,520 L50,510 L100,515 L150,508 L200,512 L250,506 L300,510 L350,505 L400,509 L450,504 L500,508 L550,503 L600,507 L650,502 L700,506 L750,501 L800,505 L850,500 L900,504 L950,499 L1000,503 L1050,498 L1100,502 L1150,497 L1200,501 L1250,496 L1300,500 L1350,495 L1400,499 L1440,494 L1440,600 L0,600 Z"
      fill="#334155"
    />
  </g>

  {/* Mist effect at the base */}
  <rect x="0" y="500" width="1440" height="100" fill="url(#mist)" />
  <defs>
    <linearGradient id="mist" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.2 }} />
      <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
    </linearGradient>
  </defs>
    </svg>

        {/* Particles */}
        <div className="absolute w-full h-full z-5">
          <Particles
            particleColors={['#ffffffff', '#ffffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
       
        {/* Text overlay */}

        <Blog></Blog>
  
      </div>

    </>
  )
}

export default Root;