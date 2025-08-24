import { useState, useEffect } from "react";
import './B500.css';

const PASSWORD_1 = "U1JJTklWQVMtQ0hBUkFOLTEyMzQ1";

function SideExact() {
  return (
    <div className="app-container">
      <h1>🔑 Srinivas Charan's Protected Side</h1>
      <p>Welcome! You entered the master password 🎉, now you've unlocked the secret area 🚀</p>
    </div>
  );
}

function SideNameBased({ username }) {
  return (
    <div className="app-container">
      <h1>🚀 Hi {username}!</h1>
      <p>You unlocked the app using your name & DOB trick 🎂</p>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", function () {
  (function () {
    const targetId = "B500-progress-text-number";
    const el = document.getElementById(targetId);

    if (!el) return;

    let baseValue = 61;
    let fluctuation = 0;

    setInterval(() => {
      fluctuation += Math.random() * 2;
      if (fluctuation > 10) fluctuation = 0;

      const displayedValue = (baseValue + fluctuation).toFixed(2);
      el.innerText = displayedValue;
    }, 1000);
  })();
});

export default function B500() {
  const [unlockedSide, setUnlockedSide] = useState(null);
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM");

  useEffect(() => {
    // Simulate a longer loading process with multiple status updates
    const timer1 = setTimeout(() => setStatusText("CONNECTING TO SERVER"), 1500);
    const timer2 = setTimeout(() => setStatusText("VALIDATING CREDENTIALS"), 3000);
    // const timer3 = setTimeout(() => setStatusText("LOADING ENCRYPTION MODULES"), 4500);
    const timer4 = setTimeout(() => {
      setLoading(false);
      setStatusText("INITIALIZING SYSTEM");
    }, 6000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      // clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusText("VERIFYING PASSWORD");

    setTimeout(() => {
      const encoded = btoa(input);

      if (encoded === PASSWORD_1) {
        setUnlockedSide("EXACT");
        setSubmitting(false);
        return;
      }

      if (input.toLowerCase().endsWith("-2005")) {
        setUsername("User");
        setUnlockedSide("NAME");
        setSubmitting(false);
        return;
      }

      alert("Invalid password!");
      setInput("");
      setSubmitting(false);
      setStatusText("INITIALIZING SYSTEM");
    }, 3000);
  };

  if (loading)
    return (
      <div className="B500-cyber-loader-container">
        <div className="B500-cyber-loader">
          {/* Main circles */}
          <div className="B500-cyber-circle B500-cyber-circle-1"></div>
          <div className="B500-cyber-circle B500-cyber-circle-2"></div>
          <div className="B500-cyber-circle B500-cyber-circle-3"></div>
          <div className="B500-cyber-circle B500-cyber-circle-4"></div>
          <div className="B500-cyber-circle B500-cyber-circle-5"></div>
          <div className="B500-cyber-circle B500-cyber-circle-6"></div>
          
          {/* Rings */}
          <div className="B500-cyber-ring B500-cyber-ring-1"></div>
          <div className="B500-cyber-ring B500-cyber-ring-2"></div>
          <div className="B500-cyber-ring B500-cyber-ring-3"></div>
          
          {/* Particles */}
          <div className="B500-cyber-particles">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="B500-cyber-particle"></div>
            ))}
          </div>
          
          {/* Core */}
          <div className="B500-cyber-core"></div>
          
          {/* Orbs */}
          <div className="B500-cyber-orb B500-cyber-orb-1"></div>
          <div className="B500-cyber-orb B500-cyber-orb-2"></div>
          <div className="B500-cyber-orb B500-cyber-orb-3"></div>
          <div className="B500-cyber-orb B500-cyber-orb-4"></div>
          
          {/* HUD elements */}
          <div className="B500-cyber-hud">
            <div className="B500-hud-line B500-hud-line-1"></div>
            <div className="B500-hud-line B500-hud-line-2"></div>
            <div className="B500-hud-line B500-hud-line-3"></div>
            <div className="B500-hud-line B500-hud-line-4"></div>
          </div>
          
          {/* Binary rain */}
          <div className="B500-binary-rain">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="B500-binary-digit">{Math.random() > 0.5 ? '1' : '0'}</div>
            ))}
          </div>
          
          {/* Random code strings */}
          <div className="B500-random-codes">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="B500-code-string">
                {generateRandomCode()}
              </div>
            ))}
          </div>
          
          {/* Waves */}
          <div className="B500-wave B500-wave-1"></div>
          <div className="B500-wave B500-wave-2"></div>
          <div className="B500-wave B500-wave-3"></div>
        </div>
        
        <div className="B500-cyber-text">
          <span className="B500-cyber-text-glitch">{statusText}</span>
          <span className="B500-cyber-text-dots">...</span>
        </div>
        
        <div className="B500-progress-container">
          <div className="B500-progress-bar">
            <div className="B500-progress-fill"></div>
          </div>
          <div className="B500-progress-text">LOADING: 87.3%</div>
        </div>
        
        <div className="B500-scrolling-text">
          <div className="B500-scroll-content">
                {/* SYSTEM BOOT SEQUENCE INITIATED >> CONNECTING TO MAINFRAME >> ESTABLISHING ENCRYPTION >> VERIFYING IDENTITY >> ACCESS GRANTED >> WELCOME TO THE SYSTEM */}
          </div>
        </div>
      </div>
    );

  if (submitting)
    return (
      <div className="B500-cyber-loader-container">
        <div className="B500-cyber-loader">
          {/* Main circles */}
          <div className="B500-cyber-circle B500-cyber-circle-1"></div>
          <div className="B500-cyber-circle B500-cyber-circle-2"></div>
          <div className="B500-cyber-circle B500-cyber-circle-3"></div>
          <div className="B500-cyber-circle B500-cyber-circle-4"></div>
          <div className="B500-cyber-circle B500-cyber-circle-5"></div>
          <div className="B500-cyber-circle B500-cyber-circle-6"></div>
          
          {/* Rings */}
          <div className="B500-cyber-ring B500-cyber-ring-1"></div>
          <div className="B500-cyber-ring B500-cyber-ring-2"></div>
          <div className="B500-cyber-ring B500-cyber-ring-3"></div>
          
          {/* Particles */}
          <div className="B500-cyber-particles">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="B500-cyber-particle"></div>
            ))}
          </div>
          
          {/* Core */}
          <div className="B500-cyber-core"></div>
          
          {/* Orbs */}
          <div className="B500-cyber-orb B500-cyber-orb-1"></div>
          <div className="B500-cyber-orb B500-cyber-orb-2"></div>
          <div className="B500-cyber-orb B500-cyber-orb-3"></div>
          <div className="B500-cyber-orb B500-cyber-orb-4"></div>
          
          {/* HUD elements */}
          <div className="B500-cyber-hud">
            <div className="B500-hud-line B500-hud-line-1"></div>
            <div className="B500-hud-line B500-hud-line-2"></div>
            <div className="B500-hud-line B500-hud-line-3"></div>
            <div className="B500-hud-line B500-hud-line-4"></div>
          </div>
          
          {/* Binary rain */}
          <div className="B500-binary-rain">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="B500-binary-digit">{Math.random() > 0.5 ? '1' : '0'}</div>
            ))}
          </div>
          
          {/* Random code strings */}
          <div className="B500-random-codes">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="B500-code-string">
                {generateRandomCode()}
              </div>
            ))}
          </div>
          
          {/* Waves */}
          <div className="B500-wave B500-wave-1"></div>
          <div className="B500-wave B500-wave-2"></div>
          <div className="B500-wave B500-wave-3"></div>
        </div>
        
        <div className="B500-cyber-text">
          <span className="B500-cyber-text-glitch">{statusText}</span>
          <span className="B500-cyber-text-dots">...</span>
        </div>
        
        <div className="B500-progress-container">
          <div className="B500-progress-bar">
            <div className="B500-progress-fill"></div>
          </div>
          <div className="B500-progress-text">VERIFYING.. <span id='B500-progress-text-number'></span></div>
        </div>
        
        <div className="B500-scrolling-text">
          <div className="B500-scroll-content">
                {/* PASSWORD VERIFICATION INITIATED >> CONNECTING TO SECURITY SERVER >> VALIDATING CREDENTIALS >> DECRYPTING ACCESS KEYS >> GRANTING PERMISSIONS >> ACCESS GRANTED */}
          </div>
        </div>
      </div>
    );

  if (unlockedSide === "EXACT") return <SideExact />;
  if (unlockedSide === "NAME") return <SideNameBased username={username} />;

  return (
    <div className="app-container B500-cyber-bg">
      <div className="B500-cyber-grid"></div>
      <div className="B500-cyber-scanline"></div>
      <h2 className="B500-cyber-title">🔒 PROTECTED SYSTEM B500</h2>
      <p className="app-instruction B500-cyber-instruction">
        <small>
        <small>
        <small>
          If you are not aware, try your name and 'the' date representing YYYY of := (name-YYYY).
        </small>
        </small>
        </small>
      </p>
      <form onSubmit={handleSubmit} className="app-form B500-cyber-form">
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER ACCESS CODE"
          className="app-input B500-cyber-input"
        />
        &nbsp;
        <button type="submit" className="app-button B500-cyber-button">UNLOCK SYSTEM</button>
      </form>
    </div>
  );
}

// Helper function to generate random code strings
function generateRandomCode() {
  const chars = '!#$%&*+-/:;<=>?@[\\]^_{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const length = 12 + Math.floor(Math.random() * 10);
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}