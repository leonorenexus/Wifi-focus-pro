import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WifiFocusPro = () => {
  const canvasRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusActive, setFocusActive] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showFocusAnimation, setShowFocusAnimation] = useState(false);

  // Network data simulation
  const [networkData, setNetworkData] = useState({
    ssid: 'PremiumNet-5GHz',
    vendor: 'TP-Link',
    model: 'Archer AX6000',
    routerIP: '192.168.0.1',
    status: 'Connected',
    signal: 85,
    quality: 'Excellent',
    ping: 18,
    jitter: 2,
    packetLoss: 0.1,
    download: 542,
    upload: 287,
    deviceCount: 12,
    frequency: '5GHz',
    channel: 149,
    security: 'WPA3',
    gateway: '192.168.0.1',
    macAddress: '00:1A:2B:3C:4D:5E',
    publicIP: '203.45.67.89',
    dns: '1.1.1.1, 8.8.8.8',
  });

  const [devices, setDevices] = useState([
    { name: 'iPhone 15', type: 'Mobile', ip: '192.168.0.105', mac: '00:1A:2B:3C:4D:5F', vendor: 'Apple', online: true },
    { name: 'MacBook Pro', type: 'Laptop', ip: '192.168.0.106', mac: '00:1A:2B:3C:4D:60', vendor: 'Apple', online: true },
    { name: 'iPad', type: 'Tablet', ip: '192.168.0.107', mac: '00:1A:2B:3C:4D:61', vendor: 'Apple', online: true },
    { name: 'Samsung TV', type: 'Smart TV', ip: '192.168.0.108', mac: '00:1A:2B:3C:4D:62', vendor: 'Samsung', online: true },
    { name: 'Alexa Device', type: 'IoT', ip: '192.168.0.109', mac: '00:1A:2B:3C:4D:63', vendor: 'Amazon', online: false },
    { name: 'Gaming PC', type: 'Desktop', ip: '192.168.0.110', mac: '00:1A:2B:3C:4D:64', vendor: 'ASUS', online: true },
  ]);

  // Initialize 3D Nebula
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 100;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 30 + 50}%)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        if (this.z < 0) this.z = 100;
        if (this.z > 100) this.z = 0;
      }

      draw() {
        const scale = this.z / 100;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = scale * 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 15, 35, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Simulate network updates (only when logged in)
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      setNetworkData(prev => ({
        ...prev,
        ping: Math.max(10, prev.ping + (Math.random() - 0.5) * 5),
        jitter: Math.max(0, prev.jitter + (Math.random() - 0.5) * 1),
        packetLoss: Math.max(0, Math.min(1, prev.packetLoss + (Math.random() - 0.5) * 0.1)),
        download: Math.max(100, prev.download + (Math.random() - 0.5) * 50),
        upload: Math.max(50, prev.upload + (Math.random() - 0.5) * 30),
        signal: Math.max(20, Math.min(100, prev.signal + (Math.random() - 0.5) * 8)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (username && password) {
        setIsLoggedIn(true);
        setCurrentPage('dashboard');
      }
      setIsLoading(false);
    }, 1500);
  };

  // Focus mode handler
  const activateFocusMode = () => {
    setShowFocusAnimation(true);
    setFocusActive(!focusActive);
    setTimeout(() => setShowFocusAnimation(false), 2000);
  };

  // Glass card component (memoized to prevent unnecessary re-renders)
  const GlassCard = React.memo(({ children, className = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 
        border border-white/20 rounded-2xl p-6
        hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  ));
  GlassCard.displayName = 'GlassCard';

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen overflow-hidden ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none"
        />

        <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 pointer-events-none" />

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="mb-8"
          >
            <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text filter drop-shadow-xl">
              WiFi Focus Pro
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="w-full max-w-md">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">🌐</div>
                  <p className="text-cyan-400 text-sm font-mono">Enter your credentials</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/70 text-xs font-mono mb-2 block">USERNAME</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition-all font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-white/70 text-xs font-mono mb-2 block">PASSWORD</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition-all font-mono text-sm"
                    />
                  </div>
                </div>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-white/50 text-xs">Remember me</span>
                </label>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 disabled:opacity-70 relative overflow-hidden"
                >
                  {isLoading ? (
                    <motion.div className="flex items-center justify-center space-x-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      <span>AUTHENTICATING...</span>
                    </motion.div>
                  ) : (
                    'LOGIN'
                  )}
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-6 text-center text-white/40 text-xs font-mono"
          >
            <p>© 2024 WiFi Focus Pro | Leonore#4Tos</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Navigation
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'devices', label: 'Devices', icon: '📱' },
    { id: 'network', label: 'Network Map', icon: '🌐' },
    { id: 'tools', label: 'Tools', icon: '🔧' },
    { id: 'stats', label: 'Statistics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
  ];

  // Dashboard Page
  const DashboardPage = () => (
    <div className="space-y-6">
      {/* Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlassCard>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-white/50 text-xs font-mono uppercase">WiFi Name</p>
              <p className="text-2xl font-bold text-cyan-400">{networkData.ssid}</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/50 text-xs font-mono uppercase">Router Vendor</p>
              <p className="text-2xl font-bold text-blue-400">{networkData.vendor}</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/50 text-xs font-mono uppercase">Model</p>
              <p className="text-2xl font-bold text-purple-400">{networkData.model}</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/50 text-xs font-mono uppercase">Router IP</p>
              <p className="text-2xl font-bold text-pink-400">{networkData.routerIP}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-white/50 text-xs font-mono uppercase mb-2">Status</p>
              <div className="flex items-center space-x-2">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-white font-mono">{networkData.status}</span>
              </div>
            </div>
            <div>
              <p className="text-white/50 text-xs font-mono uppercase mb-2">Signal</p>
              <p className="text-3xl font-bold text-green-400">{Math.round(networkData.signal)}%</p>
            </div>
            <div>
              <p className="text-white/50 text-xs font-mono uppercase mb-2">Quality</p>
              <p className="text-xl font-bold text-emerald-400">{networkData.quality}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs font-mono uppercase mb-2">Connected</p>
              <p className="text-3xl font-bold text-cyan-400">{networkData.deviceCount}</p>
              <p className="text-xs text-white/40">devices</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Focus Mode Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="relative">
          {showFocusAnimation && (
            <motion.div
              animate={{ scale: [1, 2, 3], opacity: [1, 0.5, 0] }}
              transition={{ duration: 2 }}
              className="absolute inset-0 border-2 border-cyan-500 rounded-2xl"
            />
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={activateFocusMode}
            className={`
              px-12 py-4 text-2xl font-bold rounded-2xl font-mono uppercase
              transition-all duration-300
              ${focusActive
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/80'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80'
              }
              border border-white/20
            `}
          >
            {focusActive ? '🎮 FOCUS ACTIVE' : '🚀 FOCUS MY DEVICE'}
          </motion.button>
        </div>
      </motion.div>

      {/* Real-time Network Analyzer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <GlassCard>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <span>📡</span>
            <span>Real-Time Network Analyzer</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-white/50 text-xs font-mono mb-2">PING</p>
              <p className="text-4xl font-bold text-cyan-400">{Math.round(networkData.ping)}</p>
              <p className="text-xs text-white/40 mt-1">ms</p>
            </div>

            <div className="bg-white/5 border border-blue-500/30 rounded-lg p-4">
              <p className="text-white/50 text-xs font-mono mb-2">JITTER</p>
              <p className="text-4xl font-bold text-blue-400">{Math.round(networkData.jitter * 10) / 10}</p>
              <p className="text-xs text-white/40 mt-1">ms</p>
            </div>

            <div className="bg-white/5 border border-purple-500/30 rounded-lg p-4">
              <p className="text-white/50 text-xs font-mono mb-2">PACKET LOSS</p>
              <p className="text-4xl font-bold text-purple-400">{Math.round(networkData.packetLoss * 100) / 100}</p>
              <p className="text-xs text-white/40 mt-1">%</p>
            </div>

            <div className="bg-white/5 border border-pink-500/30 rounded-lg p-4">
              <p className="text-white/50 text-xs font-mono mb-2">SIGNAL</p>
              <p className="text-4xl font-bold text-pink-400">{Math.round(networkData.signal)}</p>
              <p className="text-xs text-white/40 mt-1">%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/5 border border-green-500/30 rounded-lg p-4">
              <p className="text-white/50 text-xs font-mono mb-2">DOWNLOAD</p>
              <p className="text-4xl font-bold text-green-400">{Math.round(networkData.download)}</p>
              <p className="text-xs text-white/40 mt-1">Mbps</p>
            </div>

            <div className="bg-white/5 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-white/50 text-xs font-mono mb-2">UPLOAD</p>
              <p className="text-4xl font-bold text-emerald-400">{Math.round(networkData.upload)}</p>
              <p className="text-xs text-white/40 mt-1">Mbps</p>
            </div>

            <div className="bg-white/5 border border-indigo-500/30 rounded-lg p-4">
              <p className="text-white/50 text-xs font-mono mb-2">FREQUENCY</p>
              <p className="text-4xl font-bold text-indigo-400">{networkData.frequency}</p>
              <p className="text-xs text-white/40 mt-1">Band</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Router Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <GlassCard>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <span>🖥️</span>
            <span>Router Information</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-white/50 text-xs font-mono mb-1">GATEWAY</p>
              <p className="text-white font-mono">{networkData.gateway}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs font-mono mb-1">MAC ADDRESS</p>
              <p className="text-white font-mono">{networkData.macAddress}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs font-mono mb-1">WIFI CHANNEL</p>
              <p className="text-white font-mono">{networkData.channel}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs font-mono mb-1">SECURITY TYPE</p>
              <p className="text-white font-mono">{networkData.security}</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );

  // Devices Page
  const DevicesPage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <span>📱</span>
          <span>Connected Devices ({devices.length})</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-cyan-400 font-mono text-xs">Device Name</th>
                <th className="text-left py-3 px-4 text-blue-400 font-mono text-xs">Type</th>
                <th className="text-left py-3 px-4 text-purple-400 font-mono text-xs">Local IP</th>
                <th className="text-left py-3 px-4 text-pink-400 font-mono text-xs">MAC Address</th>
                <th className="text-left py-3 px-4 text-green-400 font-mono text-xs">Vendor</th>
                <th className="text-left py-3 px-4 text-emerald-400 font-mono text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >
                  <td className="py-3 px-4 text-white font-mono">{device.name}</td>
                  <td className="py-3 px-4 text-white/70">{device.type}</td>
                  <td className="py-3 px-4 text-cyan-400 font-mono">{device.ip}</td>
                  <td className="py-3 px-4 text-white/70 font-mono text-xs">{device.mac}</td>
                  <td className="py-3 px-4 text-white/70">{device.vendor}</td>
                  <td className="py-3 px-4">
                    <motion.div
                      animate={device.online ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`w-3 h-3 rounded-full ${device.online ? 'bg-green-500' : 'bg-red-500'}`}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </motion.div>
  );

  // Network Map Page
  const NetworkMapPage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <span>🌐</span>
          <span>Network Topology</span>
        </h3>

        <div className="flex flex-col items-center justify-center py-12 space-y-8">
          {/* Router */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="relative"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50 border border-cyan-400">
              <span className="text-4xl">🖥️</span>
            </div>
            <p className="text-white font-mono text-xs mt-2 text-center">Router</p>
          </motion.div>

          {/* Connection Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ duration: 1 }}
            className="w-1 bg-gradient-to-b from-cyan-500 to-blue-600"
          />

          {/* Devices Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {devices.slice(0, 6).map((device, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30 border border-purple-400"
                >
                  <span className="text-2xl">📱</span>
                </motion.div>
                <p className="text-white font-mono text-xs mt-2 text-center line-clamp-2">{device.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  // Tools Page
  const ToolsPage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <span>🔧</span>
          <span>Advanced Tools</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-cyan-500/30 rounded-lg p-4">
            <p className="text-cyan-400 font-mono text-sm mb-2">DNS Information</p>
            <p className="text-white font-mono text-xs break-all">{networkData.dns}</p>
          </div>

          <div className="bg-white/5 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 font-mono text-sm mb-2">Gateway Information</p>
            <p className="text-white font-mono text-xs">{networkData.gateway}</p>
          </div>

          <div className="bg-white/5 border border-purple-500/30 rounded-lg p-4">
            <p className="text-purple-400 font-mono text-sm mb-2">Public IP Address</p>
            <p className="text-white font-mono text-xs">{networkData.publicIP}</p>
          </div>

          <div className="bg-white/5 border border-pink-500/30 rounded-lg p-4">
            <p className="text-pink-400 font-mono text-sm mb-2">Local IP Address</p>
            <p className="text-white font-mono text-xs">{networkData.routerIP}</p>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-400 font-mono text-sm mb-2">WiFi Frequency</p>
            <p className="text-white font-mono text-xs">{networkData.frequency}</p>
          </div>

          <div className="bg-white/5 border border-emerald-500/30 rounded-lg p-4">
            <p className="text-emerald-400 font-mono text-sm mb-2">WiFi Channel</p>
            <p className="text-white font-mono text-xs">{networkData.channel}</p>
          </div>

          <div className="bg-white/5 border border-indigo-500/30 rounded-lg p-4">
            <p className="text-indigo-400 font-mono text-sm mb-2">Security Type</p>
            <p className="text-white font-mono text-xs">{networkData.security}</p>
          </div>

          <div className="bg-white/5 border border-orange-500/30 rounded-lg p-4">
            <p className="text-orange-400 font-mono text-sm mb-2">Signal Analyzer</p>
            <p className="text-white font-mono text-xs">{Math.round(networkData.signal)}% - {networkData.quality}</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  // Statistics Page
  const StatsPage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <span>📈</span>
          <span>Network Statistics</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-cyan-500/30 rounded-lg p-4">
            <p className="text-cyan-400 font-mono text-sm mb-4">Ping History</p>
            <div className="h-24 flex items-end justify-around space-x-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${30 + Math.random() * 40}px` }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-sm opacity-70"
                />
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 font-mono text-sm mb-4">Signal History</p>
            <div className="h-24 flex items-end justify-around space-x-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${40 + Math.random() * 50}px` }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-sm opacity-70"
                />
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-purple-500/30 rounded-lg p-4">
            <p className="text-purple-400 font-mono text-sm mb-4">Speed History</p>
            <div className="h-24 flex items-end justify-around space-x-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${20 + Math.random() * 60}px` }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-purple-500 to-purple-300 rounded-sm opacity-70"
                />
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-pink-500/30 rounded-lg p-4">
            <p className="text-pink-400 font-mono text-sm mb-4">Network Stability</p>
            <div className="h-24 flex items-end justify-around space-x-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${50 + Math.random() * 30}px` }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-pink-500 to-pink-300 rounded-sm opacity-70"
                />
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  // Settings Page
  const SettingsPage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <GlassCard>
        <h3 className="text-2xl font-bold text-white mb-6">Display Settings</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <p className="text-white font-mono">Theme</p>
              <p className="text-white/50 text-xs mt-1">Dark Mode / Light Mode</p>
            </div>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setTheme('dark')}
                className={`px-4 py-2 rounded-lg font-mono text-xs transition-all ${
                  theme === 'dark' ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/50'
                }`}
              >
                Dark
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setTheme('light')}
                className={`px-4 py-2 rounded-lg font-mono text-xs transition-all ${
                  theme === 'light' ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/50'
                }`}
              >
                Light
              </motion.button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <p className="text-white font-mono">Notifications</p>
              <p className="text-white/50 text-xs mt-1">Enable real-time alerts</p>
            </div>
            <div className="w-12 h-6 bg-cyan-500 rounded-full relative cursor-pointer">
              <motion.div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <p className="text-white font-mono">Refresh Interval</p>
              <p className="text-white/50 text-xs mt-1">Update frequency</p>
            </div>
            <select className="px-3 py-2 bg-white/10 border border-cyan-500/30 rounded-lg text-white font-mono text-xs">
              <option>2s</option>
              <option>5s</option>
              <option>10s</option>
              <option>30s</option>
            </select>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-2xl font-bold text-white mb-6">Accent Colors</h3>
        <div className="grid grid-cols-6 gap-4">
          {['cyan', 'blue', 'purple', 'pink', 'green', 'orange'].map(color => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.1 }}
              className={`w-full aspect-square rounded-lg bg-${color}-500/50 border-2 border-${color}-400 hover:shadow-lg hover:shadow-${color}-500/50`}
            />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );

  // About Page
  const AboutPage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard>
        <div className="text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20 }}
            className="text-7xl"
          >
            🌐
          </motion.div>

          <div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">
              WiFi Focus Pro
            </h2>
            <p className="text-xl text-white/70">v1.0.0 - Premium Edition</p>
          </div>

          <p className="text-white/70 max-w-md mx-auto leading-relaxed">
            WiFi Focus Pro is an intelligent WiFi monitoring dashboard that automatically detects router vendors, analyzes network quality, monitors connected devices, displays connection statistics, and provides advanced WiFi insights through a futuristic cyber-themed interface.
          </p>

          <div className="pt-6 border-t border-white/10">
            <p className="text-white/50 text-sm font-mono">
              © 2024 WiFi Focus Pro | Leonore#4Tos
            </p>
            <p className="text-white/30 text-xs mt-2 font-mono">
              Advanced Network Intelligence Platform
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  // Page Router
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'devices': return <DevicesPage />;
      case 'network': return <NetworkMapPage />;
      case 'tools': return <ToolsPage />;
      case 'stats': return <StatsPage />;
      case 'settings': return <SettingsPage />;
      case 'about': return <AboutPage />;
      default: return <DashboardPage />;
    }
  };

  // Main App
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30 pointer-events-none z-1" />

      {/* Sidebar Navigation */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-950/80 to-slate-950/60 backdrop-blur-xl border-r border-white/10 z-20 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
            WiFi Focus
          </h1>
          <p className="text-cyan-400/50 text-xs font-mono mt-1">Pro Edition</p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <motion.button
              key={item.id}
              whileHover={{ x: 5 }}
              onClick={() => setCurrentPage(item.id)}
              className={`
                w-full text-left px-4 py-3 rounded-lg transition-all font-mono text-sm
                ${currentPage === item.id
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                }
              `}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsLoggedIn(false);
              setUsername('');
              setPassword('');
            }}
            className="w-full py-2 px-4 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all font-mono text-xs"
          >
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen p-6 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-white/40 text-xs font-mono border-t border-white/10 pt-6"
        >
          <p>© 2024 WiFi Focus Pro | Leonore#4Tos</p>
          <p className="mt-1">Advanced Network Intelligence Platform</p>
        </motion.div>
      </div>

      {/* Responsive mobile menu button */}
      <motion.button
        className="fixed top-6 right-6 z-30 md:hidden p-3 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400"
        whileHover={{ scale: 1.1 }}
      >
        ☰
      </motion.button>
    </div>
  );
};

export default WifiFocusPro;
