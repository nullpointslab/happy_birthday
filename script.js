/* ===================================================================
   HAPPY BIRTHDAY AMINA • CLIENT ENGINE
   Passcode: 1527
   Features: 
     - Web Audio Synthesizer (Chimes, Clicks, Puff, Scratch sound)
     - 20-Photo Gallery with Filters & Fullscreen Lightbox
     - Interactive HTML5 Scratch-to-Reveal Voucher
     - Infinite Compliment Jar Generator
     - "Open When..." Interactive Letters
     - Interactive Cake with Blowable Candles
     - Real-Time Live Age & Time Counter (27 Nov 2003)
     - Wax-Sealed Unfolding Vintage Letter
     - Endless Hug & Heart Explosion Generator
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. WEB AUDIO API SYNTHESIZER
  // ==========================================
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playClickSound() {
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  function playErrorSound() {
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
  }

  function playMagicalChime() {
    try {
      initAudio();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.1);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime + index * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + index * 0.1 + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + index * 0.1);
        osc.stop(audioCtx.currentTime + index * 0.1 + 0.5);
      });
    } catch (e) {}
  }

  function playBlowSound() {
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {}
  }

  // ==========================================
  // 2. PASSCODE LOCK SCREEN (Key: 1527)
  // ==========================================
  const SECRET_PASSCODE = '1527';
  let enteredPin = '';

  const lockScreen = document.getElementById('lock-screen');
  const mainContent = document.getElementById('main-content');
  const errorMsg = document.getElementById('error-msg');
  const unlockBtn = document.getElementById('unlock-btn');
  const clearBtn = document.getElementById('clear-btn');
  const backspaceBtn = document.getElementById('backspace-btn');
  const numKeys = document.querySelectorAll('.num-key[data-key]');
  const pinDots = [
    document.getElementById('dot-0'),
    document.getElementById('dot-1'),
    document.getElementById('dot-2'),
    document.getElementById('dot-3')
  ];

  function updatePinDisplay() {
    pinDots.forEach((dot, idx) => {
      if (idx < enteredPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });

    if (errorMsg.classList.contains('show')) {
      errorMsg.classList.remove('show');
    }
  }

  function handleInputDigit(digit) {
    if (enteredPin.length < 4) {
      playClickSound();
      enteredPin += digit;
      updatePinDisplay();

      if (enteredPin.length === 4) {
        setTimeout(verifyPasscode, 200);
      }
    }
  }

  function deleteDigit() {
    if (enteredPin.length > 0) {
      playClickSound();
      enteredPin = enteredPin.slice(0, -1);
      updatePinDisplay();
    }
  }

  function clearDigits() {
    playClickSound();
    enteredPin = '';
    updatePinDisplay();
  }

  // ================= TEASE ENGINE (CLICK ONLY) =================
  let teaseStage = 0;

  const teaseModal = document.getElementById('tease-modal-overlay');
  const teaseBadge = document.getElementById('tease-badge');
  const teaseIcon = document.getElementById('tease-icon');
  const teaseTitle = document.getElementById('tease-title');
  const teaseMsg = document.getElementById('tease-msg');
  const teaseConfirmBtn = document.getElementById('tease-confirm-btn');
  const unlockBtnText = document.getElementById('unlock-btn-text');

  function showTeaseDialog(stage) {
    if (!teaseModal) return;

    if (stage === 1) {
      teaseBadge.textContent = '⚠️ SECURITY ALERT: CUTENESS OVERLOAD';
      teaseIcon.textContent = '🥺💖';
      teaseTitle.textContent = 'ACCESS DENIED!';
      teaseMsg.textContent = 'System report: Aapki cuteness limit cross ho chuki hai! Pehle prove karo ke kya aap sach mein 23 saal ki ho gayi hain ya abhi bhi 5 saal ki ziddi bachchi hain?';
      teaseConfirmBtn.textContent = 'Main 23 ki sensible girl hun! 😤';
    } else if (stage === 2) {
      teaseBadge.textContent = '🔐 FINAL VERIFICATION';
      teaseIcon.textContent = '😂❤️';
      teaseTitle.textContent = 'Haseeb Ki Permission Zaroori Hai!';
      teaseMsg.textContent = 'Yeh portal Haseeb ne bohot mehnat se sirf Amina ke liye banaya hai! Pehle Haseeb ko ek pyari si smile bhejne ka pakka promise karo, tabhi andar entry milegi!';
      teaseConfirmBtn.textContent = 'Promise! Ab surprise kholo na Haseeb! 🎁🥰';
    }

    teaseModal.classList.remove('hidden');
  }

  if (teaseConfirmBtn) {
    teaseConfirmBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playClickSound();
      teaseModal.classList.add('hidden');

      if (teaseStage === 1) {
        teaseStage = 2;
        if (unlockBtnText) unlockBtnText.textContent = 'Ek aakhri sawal baaki hai... 😜';
      } else if (teaseStage === 2) {
        teaseStage = 3;
        if (unlockBtnText) unlockBtnText.textContent = 'Surprise Opening... 💖';
        performUnlock();
      }
    });
  }

  function performUnlock() {
    playMagicalChime();
    triggerGrandConfetti();

    // Start background music
    startBackgroundMusic();

    lockScreen.classList.add('unlocked');
    setTimeout(() => {
      lockScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
      initScratchCard();
    }, 700);
  }

  function verifyPasscode() {
    // 1. MUST enter 4-digit code first!
    if (enteredPin.length < 4) {
      playErrorSound();
      if (errorMsg) {
        errorMsg.querySelector('span').textContent = 'Pehle 4-digit secret code enter karo! 🔑';
        errorMsg.classList.add('show');
      }
      return;
    }

    // 2. Check if code is wrong
    if (enteredPin !== SECRET_PASSCODE && enteredPin !== '2711') {
      playErrorSound();
      if (errorMsg) {
        errorMsg.querySelector('span').textContent = 'Arre ghalat code cutie! Hint: 1527 🙈';
        errorMsg.classList.add('show');
      }
      enteredPin = '';
      setTimeout(updatePinDisplay, 400);
      return;
    }

    // 3. Code is 100% CORRECT (1527)! Now tease before opening!
    if (teaseStage === 0) {
      teaseStage = 1;
      showTeaseDialog(1);
      return;
    } else if (teaseStage === 1) {
      showTeaseDialog(1);
      return;
    } else if (teaseStage === 2) {
      showTeaseDialog(2);
      return;
    }

    performUnlock();
  }

  numKeys.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleInputDigit(btn.getAttribute('data-key'));
    });
  });

  if (clearBtn) clearBtn.addEventListener('click', (e) => { e.stopPropagation(); clearDigits(); });
  if (backspaceBtn) backspaceBtn.addEventListener('click', (e) => { e.stopPropagation(); deleteDigit(); });
  if (unlockBtn) unlockBtn.addEventListener('click', (e) => { e.stopPropagation(); verifyPasscode(); });

  window.addEventListener('keydown', (e) => {
    if (!lockScreen.classList.contains('unlocked')) {
      if (e.key >= '0' && e.key <= '9') {
        handleInputDigit(e.key);
      } else if (e.key === 'Backspace') {
        deleteDigit();
      } else if (e.key === 'Enter') {
        verifyPasscode();
      } else if (e.key === 'Escape') {
        clearDigits();
      }
    }
  });

  // ==========================================
  // 3. BACKGROUND MUSIC & FLOATING PLAYER
  // ==========================================
  const bgAudio = document.getElementById('bg-audio');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicIcon = document.getElementById('music-icon');
  const discSpin = document.getElementById('disc-spin');

  function startBackgroundMusic() {
    if (bgAudio) {
      bgAudio.volume = 0.65;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          updateMusicUI(true);
        }).catch((err) => {
          console.log('Audio autoplay prevented by browser policy:', err);
          updateMusicUI(false);
        });
      }
    }
  }

  function updateMusicUI(isPlaying) {
    if (isPlaying) {
      if (musicIcon) musicIcon.className = 'fa-solid fa-pause';
      if (discSpin) discSpin.classList.remove('paused');
    } else {
      if (musicIcon) musicIcon.className = 'fa-solid fa-play';
      if (discSpin) discSpin.classList.add('paused');
    }
  }

  if (musicToggleBtn && bgAudio) {
    musicToggleBtn.addEventListener('click', () => {
      initAudio();
      if (bgAudio.paused) {
        bgAudio.play().then(() => {
          updateMusicUI(true);
        }).catch(() => {
          updateMusicUI(false);
        });
      } else {
        bgAudio.pause();
        updateMusicUI(false);
      }
    });
  }

  // Global flag to prevent global click listener from restarting bgAudio when voice note is active
  let isVoiceNotePlaying = false;

  // Backup: First user click on document kicks off music ONLY on initial entrance if not yet playing
  let initialClickMusicStarted = false;
  document.addEventListener('click', () => {
    if (!initialClickMusicStarted && lockScreen.classList.contains('unlocked') && bgAudio && bgAudio.paused && !isVoiceNotePlaying) {
      initialClickMusicStarted = true;
      bgAudio.play().then(() => updateMusicUI(true)).catch(() => {});
    }
  });

  // ==========================================
  // 4. CONFETTI CELEBRATIONS
  // ==========================================
  function triggerGrandConfetti() {
    if (typeof confetti === 'function') {
      const count = 220;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff758c', '#ffd166', '#ffffff'] });
      fire(0.2, { spread: 60, colors: ['#b197fc', '#ff7eb3'] });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#ffe066', '#ff4757'] });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  }

  // ==========================================
  // 5. INTERACTIVE CAKE & CANDLE BLOW (DIM, FIREWORKS, BALLOONS, KNIFE & WISH BOX)
  // ==========================================
  const flames = [
    document.getElementById('flame-1'),
    document.getElementById('flame-2'),
    document.getElementById('flame-3')
  ];
  const wishSuccessBox = document.getElementById('wish-success-box');
  const candlePrompt = document.getElementById('candle-prompt');
  const cakeBoxContainer = document.getElementById('cake-box-container');
  const interactiveCake = document.getElementById('interactive-cake');
  const cakeKnifeWrap = document.getElementById('cake-knife-wrap');
  const cakeCutKnifeBtn = document.getElementById('cake-cut-knife-btn');
  const cakeCutSlice = document.getElementById('cake-cut-slice');
  const secretWishCard = document.getElementById('secret-wish-card');
  const aminaSecretWishInput = document.getElementById('amina-secret-wish-input');
  const lockWishBtn = document.getElementById('lock-wish-btn');
  const wishConfirmedText = document.getElementById('wish-confirmed-text');
  const mascotItems = document.querySelectorAll('.mascot-item');
  let blownCount = 0;

  function launchRisingBalloons() {
    const emojis = ['🎈', '🎈', '💖', '🎈', '✨', '🎂', '🎈', '🌸'];
    for (let i = 0; i < 22; i++) {
      setTimeout(() => {
        const b = document.createElement('div');
        b.className = 'candle-rising-balloon';
        b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        b.style.left = `${Math.random() * 92}%`;
        const drift = (Math.random() - 0.5) * 180;
        const rot = (Math.random() - 0.5) * 60;
        b.style.setProperty('--drift', `${drift}px`);
        b.style.setProperty('--rot', `${rot}deg`);
        b.style.animationDuration = `${Math.random() * 2 + 3.5}s`;
        document.body.appendChild(b);
        setTimeout(() => b.remove(), 5500);
      }, i * 140);
    }
  }

  function launchStarFireworks() {
    const colors = ['🎆', '✨', '🎇', '⭐', '🌟', '💥', '💖'];
    const bursts = [
      { x: window.innerWidth * 0.25, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.75, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.2 },
      { x: window.innerWidth * 0.35, y: window.innerHeight * 0.45 },
      { x: window.innerWidth * 0.65, y: window.innerHeight * 0.45 }
    ];

    bursts.forEach((bPos, idx) => {
      setTimeout(() => {
        playMagicalChime();
        for (let i = 0; i < 12; i++) {
          const spark = document.createElement('div');
          spark.className = 'star-firework-particle';
          spark.textContent = colors[Math.floor(Math.random() * colors.length)];
          spark.style.left = `${bPos.x}px`;
          spark.style.top = `${bPos.y}px`;
          const angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5) * 0.3;
          const dist = 70 + Math.random() * 100;
          spark.style.setProperty('--fx', `${Math.cos(angle) * dist}px`);
          spark.style.setProperty('--fy', `${Math.sin(angle) * dist}px`);
          spark.style.setProperty('--frot', `${(Math.random() - 0.5) * 120}deg`);
          document.body.appendChild(spark);
          setTimeout(() => spark.remove(), 1900);
        }
      }, idx * 350);
    });
  }

  function celebrateCakeBlow() {
    playMagicalChime();
    triggerGrandConfetti();
    if (candlePrompt) candlePrompt.style.display = 'none';
    if (cakeBoxContainer) cakeBoxContainer.classList.add('celebrating');

    // 1. Gentle Cake Glow
    if (interactiveCake) interactiveCake.classList.add('spotlight-active');

    // 2. Launch gentle rising balloons
    launchRisingBalloons();

    // 3. Reveal Drag-to-Cut Knife Stage & Slicing Guide
    const cakeCuttingGuide = document.getElementById('cake-cutting-guide');
    if (cakeCuttingGuide) cakeCuttingGuide.classList.remove('hidden');
    if (cakeKnifeWrap) {
      cakeKnifeWrap.classList.remove('hidden');
    }

    // Heart particles
    for (let i = 0; i < 15; i++) {
      setTimeout(createHeartParticle, i * 80);
    }
  }

  // Knife Slice Sound Generator
  function playKnifeSliceSound() {
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(950, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.22);

      const chimeOsc = audioCtx.createOscillator();
      const chimeGain = audioCtx.createGain();
      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(1046.5, audioCtx.currentTime + 0.05);
      chimeOsc.frequency.exponentialRampToValueAtTime(2093, audioCtx.currentTime + 0.35);
      chimeGain.gain.setValueAtTime(0.15, audioCtx.currentTime + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      chimeOsc.connect(chimeGain);
      chimeGain.connect(audioCtx.destination);
      chimeOsc.start(audioCtx.currentTime + 0.05);
      chimeOsc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {}
  }

  // Handle Cut Cake Action (Interactive Drag Knife + Fallback Click)
  const draggableKnife = document.getElementById('draggable-cake-knife');
  const cakeCuttingGuide = document.getElementById('cake-cutting-guide');
  const cakeCutSeam = document.getElementById('cake-cut-seam');
  const cakeKnifeInstruction = document.getElementById('cake-knife-instruction');
  let hasCutCake = false;

  function executeCakeCut() {
    if (hasCutCake) return;
    hasCutCake = true;

    playKnifeSliceSound();
    playMagicalChime();
    triggerGrandConfetti();

    if (cakeCuttingGuide) {
      cakeCuttingGuide.classList.add('fade-out');
      setTimeout(() => cakeCuttingGuide.classList.add('hidden'), 400);
    }

    if (cakeCutSeam) cakeCutSeam.classList.add('active');
    if (cakeCutSlice) cakeCutSlice.classList.add('cut-out');
    if (interactiveCake) interactiveCake.classList.add('cake-is-sliced');

    if (draggableKnife) {
      draggableKnife.classList.remove('is-dragging');
      draggableKnife.classList.add('knife-sliced-finish');
      draggableKnife.style.transform = '';
    }

    if (cakeKnifeInstruction) {
      cakeKnifeInstruction.innerHTML = '🎉 <strong>YAY! Cake Cut Successfully!</strong> First sweet slice for Amina! 🍰🥰';
      cakeKnifeInstruction.classList.add('success-glow');
    }

    if (cakeCutKnifeBtn) {
      cakeCutKnifeBtn.style.opacity = '0.4';
      cakeCutKnifeBtn.style.pointerEvents = 'none';
    }

    // Sparkle burst around cut
    for (let i = 0; i < 18; i++) {
      setTimeout(createHeartParticle, i * 50);
    }

    // Reveal Secret Wish Box right below cake
    setTimeout(() => {
      if (secretWishCard) {
        secretWishCard.classList.remove('hidden');
        secretWishCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1100);
  }

  if (draggableKnife) {
    let isDraggingKnife = false;
    let startX = 0, startY = 0;
    let currDeltaX = 0, currDeltaY = 0;

    draggableKnife.addEventListener('pointerdown', (e) => {
      if (hasCutCake) return;
      isDraggingKnife = true;
      startX = e.clientX;
      startY = e.clientY;
      currDeltaX = 0;
      currDeltaY = 0;
      draggableKnife.classList.add('is-dragging');
      try {
        draggableKnife.setPointerCapture(e.pointerId);
      } catch (err) {}
    });

    draggableKnife.addEventListener('pointermove', (e) => {
      if (!isDraggingKnife || hasCutCake) return;
      currDeltaX = e.clientX - startX;
      currDeltaY = e.clientY - startY;

      // Follow cursor with angled slicing rotation
      draggableKnife.style.transform = `translate(${currDeltaX}px, ${currDeltaY}px) rotate(-35deg) scale(1.12)`;

      // Sliced when dragged down by 40px or diagonally by 55px
      const dist = Math.hypot(currDeltaX, currDeltaY);
      if (currDeltaY > 40 || dist > 55) {
        isDraggingKnife = false;
        try { draggableKnife.releasePointerCapture(e.pointerId); } catch (err) {}
        executeCakeCut();
      }
    });

    const handlePointerEnd = (e) => {
      if (!isDraggingKnife || hasCutCake) return;
      isDraggingKnife = false;
      draggableKnife.classList.remove('is-dragging');
      try { draggableKnife.releasePointerCapture(e.pointerId); } catch (err) {}

      // If clicked/tapped with minimal movement (< 15px), still trigger cut!
      const dist = Math.hypot(currDeltaX, currDeltaY);
      if (dist < 15) {
        executeCakeCut();
      } else {
        draggableKnife.style.transform = '';
      }
    };

    draggableKnife.addEventListener('pointerup', handlePointerEnd);
    draggableKnife.addEventListener('pointercancel', handlePointerEnd);
  }

  if (cakeCutKnifeBtn) {
    cakeCutKnifeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      executeCakeCut();
    });
  }

  // Handle Wish Lock Submission
  if (lockWishBtn) {
    lockWishBtn.addEventListener('click', () => {
      playMagicalChime();
      triggerGrandConfetti();

      const userWish = aminaSecretWishInput ? aminaSecretWishInput.value.trim() : '';
      if (userWish) {
        try {
          localStorage.setItem('amina_23rd_birthday_wish', userWish);
        } catch(e) {}
        if (wishConfirmedText) {
          wishConfirmedText.innerHTML = `<strong>Amina's Wish:</strong> "${userWish}" 🪄<br>Meri dua hai ke yeh wish aur tumhari har khwahish poori ho! ❤️`;
        }
      }

      if (secretWishCard) secretWishCard.classList.add('hidden');
      if (wishSuccessBox) wishSuccessBox.classList.remove('hidden');
    });
  }

  // Mascot interactive click: backflip + chime
  mascotItems.forEach(item => {
    item.addEventListener('click', () => {
      playClickSound();
      playMagicalChime();
      item.classList.add('spin-jump');
      setTimeout(() => {
        item.classList.remove('spin-jump');
      }, 700);
    });
  });

  flames.forEach(flame => {
    if (flame) {
      flame.addEventListener('click', () => {
        if (!flame.classList.contains('extinguished')) {
          flame.classList.add('extinguished');
          playBlowSound();
          blownCount++;

          if (blownCount === flames.length) {
            celebrateCakeBlow();
          }
        }
      });
    }
  });

  if (interactiveCake) {
    interactiveCake.addEventListener('click', (e) => {
      if (blownCount < flames.length && !e.target.classList.contains('candle-flame')) {
        flames.forEach(flame => {
          if (flame && !flame.classList.contains('extinguished')) {
            flame.classList.add('extinguished');
          }
        });
        blownCount = flames.length;
        playBlowSound();
        celebrateCakeBlow();
      }
    });
  }

  // ==========================================
  // 6. LIVE MILESTONE & TIME COUNTER (23 YEARS)
  // ==========================================
  const countYears = document.getElementById('count-years');
  const countDays = document.getElementById('count-days');
  const countHours = document.getElementById('count-hours');
  const countMinutes = document.getElementById('count-minutes');
  const countSeconds = document.getElementById('count-seconds');

  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');

  const birthDate = new Date('2003-11-27T00:00:00');

  function updateLiveCounter() {
    const now = new Date();
    const diffMs = now - birthDate;

    if (diffMs > 0) {
      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalSeconds / 3600);
      const totalDays = Math.floor(totalHours / 24);

      // On 27 Nov 2026, Amina completes 23 years
      let years = now.getFullYear() - birthDate.getFullYear();
      const monthDiff = now.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
        // If before 27 Nov in 2026, she is celebrating turning 23 this birthday!
        years = 23;
      }

      if (countYears) countYears.textContent = '23';
      if (countDays) countDays.textContent = totalDays.toLocaleString();
      if (countHours) countHours.textContent = totalHours.toLocaleString();
      if (countMinutes) countMinutes.textContent = totalMinutes.toLocaleString();
      if (countSeconds) countSeconds.textContent = totalSeconds.toLocaleString();
    }

    // Live Countdown to 27th November
    let targetYear = now.getFullYear();
    let targetBday = new Date(`${targetYear}-11-27T00:00:00`);
    if (now > targetBday && now.getDate() !== 27) {
      targetBday = new Date(`${targetYear + 1}-11-27T00:00:00`);
    }

    const countdownMs = targetBday - now;
    if (countdownMs > 0) {
      const cSecs = Math.floor((countdownMs / 1000) % 60);
      const cMins = Math.floor((countdownMs / (1000 * 60)) % 60);
      const cHours = Math.floor((countdownMs / (1000 * 60 * 60)) % 24);
      const cDays = Math.floor(countdownMs / (1000 * 60 * 60 * 24));

      if (cdDays) cdDays.textContent = String(cDays).padStart(2, '0');
      if (cdHours) cdHours.textContent = String(cHours).padStart(2, '0');
      if (cdMins) cdMins.textContent = String(cMins).padStart(2, '0');
      if (cdSecs) cdSecs.textContent = String(cSecs).padStart(2, '0');
    } else {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMins) cdMins.textContent = '00';
      if (cdSecs) cdSecs.textContent = '00';
    }
  }

  updateLiveCounter();
  setInterval(updateLiveCounter, 1000);

  // ==========================================
  // 7. 20-PHOTO GALLERY: FILTERS & LIGHTBOX
  // ==========================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const memoryCards = document.querySelectorAll('.memory-card-wrap');

  // Filter Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playClickSound();
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');
      memoryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let activePhotoIndex = 0;
  const photoList = [];

  memoryCards.forEach((card, idx) => {
    const imgEl = card.querySelector('img');
    const caption = card.getAttribute('data-caption') || 'Special Memory ✨';
    const date = card.getAttribute('data-date') || `Moment #${idx + 1}`;
    
    photoList.push({
      src: imgEl ? imgEl.src : '',
      caption: caption,
      date: date
    });

    card.addEventListener('click', () => {
      playClickSound();
      openLightbox(idx);
    });
  });

  function openLightbox(idx) {
    activePhotoIndex = idx;
    updateLightboxUI();
    lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
  }

  function updateLightboxUI() {
    const item = photoList[activePhotoIndex];
    if (item) {
      lightboxImg.src = item.src;
      lightboxTag.textContent = `${item.date} • Photo ${activePhotoIndex + 1} of 20`;
      lightboxCaption.textContent = item.caption;
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      playClickSound();
      activePhotoIndex = (activePhotoIndex + 1) % photoList.length;
      updateLightboxUI();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      playClickSound();
      activePhotoIndex = (activePhotoIndex - 1 + photoList.length) % photoList.length;
      updateLightboxUI();
    });
  }

  // ==========================================
  // 7.5. INTERACTIVE BIOMETRIC HEART MONITOR
  // ==========================================
  const interactiveHeartBtn = document.getElementById('interactive-heart-btn');
  const liveBpmValue = document.getElementById('live-bpm-value');
  const heartParticlesArea = document.getElementById('heart-particles-area');
  const ecgLine = document.getElementById('ecg-line');
  const ecgGlowLine = document.getElementById('ecg-glow-line');
  const ecgStatusText = document.getElementById('ecg-status-text');
  const bpmCards = document.querySelectorAll('.bpm-card');

  let currentBpm = 76;
  let targetBpm = 76;
  let bpmInterval = null;

  function updateHeartVisuals(bpm, statusLabel) {
    if (liveBpmValue) liveBpmValue.textContent = bpm;
    if (ecgStatusText && statusLabel) ecgStatusText.textContent = statusLabel;

    // Adjust ECG animation speed based on BPM
    const animDuration = Math.max(0.4, (60 / bpm) * 2.2);
    if (ecgLine) ecgLine.style.animationDuration = `${animDuration}s`;
    if (ecgGlowLine) ecgGlowLine.style.animationDuration = `${animDuration}s`;
  }

  function spawnHeartBurst(x, y) {
    if (!heartParticlesArea) return;
    const emojis = ['💖', '💕', '💓', '💗', '✨', '❤️', '🥰'];
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('span');
      p.className = 'heart-flying-emoji';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.5;
      const dist = 50 + Math.random() * 60;
      p.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--ty', `${Math.sin(angle) * dist - 30}px`);
      heartParticlesArea.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }

  if (interactiveHeartBtn) {
    interactiveHeartBtn.addEventListener('click', (e) => {
      playMagicalChime();
      spawnHeartBurst(e.clientX, e.clientY);

      // Temporary BPM spike
      targetBpm = Math.min(220, targetBpm + 25);
      updateHeartVisuals(targetBpm, 'Status: Rapid Spike! Amina Overload ❤️');

      if (bpmInterval) clearTimeout(bpmInterval);
      bpmInterval = setTimeout(() => {
        targetBpm = 76;
        updateHeartVisuals(targetBpm, 'Status: Normal & Calm');
      }, 3500);
    });
  }

  bpmCards.forEach(card => {
    card.addEventListener('click', () => {
      playClickSound();
      bpmCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const mode = card.getAttribute('data-mode');
      const bpm = parseInt(card.getAttribute('data-bpm'), 10) || 76;
      targetBpm = bpm;

      let statusMsg = 'Status: Normal & Calm';
      if (mode === 'smile') {
        statusMsg = 'Status: Amina is smiling! Butterflies fluttering ✨';
        triggerGrandConfetti();
      } else if (mode === 'overload') {
        statusMsg = 'Status: CRITICAL LOVE OVERLOAD! Heart Rate 200+ BPM 🔥';
        triggerGrandConfetti();
        playMagicalChime();
      }

      updateHeartVisuals(bpm, statusMsg);
      spawnHeartBurst(0, 0);
    });
  });

  // Keyboard Navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'ArrowRight') {
        activePhotoIndex = (activePhotoIndex + 1) % photoList.length;
        updateLightboxUI();
      } else if (e.key === 'ArrowLeft') {
        activePhotoIndex = (activePhotoIndex - 1 + photoList.length) % photoList.length;
        updateLightboxUI();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    }
  });

  // ==========================================
  // 8. INTERACTIVE SCRATCH CARD ENGINE
  // ==========================================
  let scratchInitialized = false;

function initScratchCard() {
  if (scratchInitialized) return;
  const canvases = document.querySelectorAll('.scratch-canvas');
  if (!canvases.length) return;

  scratchInitialized = true;

  canvases.forEach((canvas, index) => {
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    // Use container dimensions or default
    canvas.width = container.offsetWidth || 300;
    canvas.height = container.offsetHeight || 190;

    // Draw luxurious metallic shimmer foil
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (index === 0) {
      grad.addColorStop(0, '#c0c0c0');
      grad.addColorStop(0.3, '#f5f6fa');
      grad.addColorStop(0.7, '#95a5a6');
      grad.addColorStop(1, '#dfe4ea');
    } else if (index === 1) {
      grad.addColorStop(0, '#e5c07b');
      grad.addColorStop(0.3, '#fff4cc');
      grad.addColorStop(0.7, '#d4af37');
      grad.addColorStop(1, '#ffd700');
    } else {
      grad.addColorStop(0, '#f8a5c2');
      grad.addColorStop(0.3, '#ffe4ec');
      grad.addColorStop(0.7, '#f78fb3');
      grad.addColorStop(1, '#f8a5c2');
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle pattern sparkle dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Overlay Scratch Text
    ctx.font = 'bold 15px "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch Here With Love ✨', canvas.width / 2, canvas.height / 2 - 8);

    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#576574';
    ctx.fillText('Drag to reveal secret reward 🎁', canvas.width / 2, canvas.height / 2 + 16);

    let isScratching = false;
    let scratchedPixels = 0;
    const totalPixels = canvas.width * canvas.height;
    let completed = false;

    function scratch(e) {
      if (!isScratching || completed) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (!clientX || !clientY) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2, false);
      ctx.fill();

      scratchedPixels += 500;
      if (scratchedPixels > totalPixels * 0.38 && !completed) {
        completed = true;
        canvas.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        setTimeout(() => canvas.remove(), 600);
        playMagicalChime();
        triggerGrandConfetti();
      }
    }

    canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
    window.addEventListener('mouseup', () => { isScratching = false; });
    canvas.addEventListener('mousemove', scratch);

    canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); }, { passive: true });
    window.addEventListener('touchend', () => { isScratching = false; });
    canvas.addEventListener('touchmove', scratch, { passive: true });
  });
}

  // ==========================================
  // 9. INFINITE COMPLIMENT JAR GENERATOR
  // ==========================================
  const complimentBtn = document.getElementById('generate-compliment-btn');
  const complimentDisplay = document.getElementById('compliment-display');

  const sweetCompliments = [
    "Amina, you are only mine, and I am your everything ❤️",
    "You belong with me, today, tomorrow, and forever 💍",
    "My whole world begins and ends with you, Amina 💖",
    "Your smile has the superpower to instantly fix anyone's terrible day 🌸",
    "You have this quiet elegance and warmth that is impossible to replicate ✨",
    "The way your eyes crinkle when you laugh genuinely is my favorite view 💖",
    "You are so much stronger and wiser than you ever give yourself credit for 💪",
    "Your laugh is pure, unfiltered sunshine ☀️",
    "You make everyone around you feel safe, heard, and important 🤍",
    "God really took extra time when crafting you on 27th Nov 2003 👑",
    "You are effortlessly funny even when you don't realize you're being funny 😂",
    "Out of 8 billion people, there is genuinely nobody like Amina 💎",
    "Your heart is made of 100% pure gold. Never let the world change that 🌷",
    "You look gorgeous even on your laziest, zero-effort pajama days 🧸",
    "Being around you feels like drinking warm hot chocolate on a rainy day ☕",
    "I am endlessly proud of everything you have overcome and achieved 🌟",
    "Your energy is pure poetry and peace 🕊️"
  ];

  let lastComplimentIdx = -1;

  if (complimentBtn && complimentDisplay) {
    complimentBtn.addEventListener('click', () => {
      playClickSound();
      let randomIdx;
      do {
        randomIdx = Math.floor(Math.random() * sweetCompliments.length);
      } while (randomIdx === lastComplimentIdx);

      lastComplimentIdx = randomIdx;
      complimentDisplay.innerHTML = `<p class="compliment-text" style="animation: popIn 0.3s ease;">"${sweetCompliments[randomIdx]}"</p>`;
    });
  }

  // ==========================================
  // 10. "OPEN WHEN..." ENVELOPES & MODAL
  // ==========================================
  const owCards = document.querySelectorAll('.open-when-card');
  const owModal = document.getElementById('ow-modal');
  const owBackdrop = document.getElementById('ow-backdrop');
  const owCloseBtn = document.getElementById('ow-close-btn');
  const owHeading = document.getElementById('ow-modal-heading');
  const owBody = document.getElementById('ow-modal-body');

  const owLetters = {
    sad: {
      title: "Open When You're Sad 🌧️",
      text: `
        <p>Meri pyari Amina,</p>
        <p>Agar aaj ka din bhaari lag raha hai aur dil udaas hai, toh bas ek gehra saans lo. It is okay to not be okay all the time.</p>
        <p>Yaad rakho ke tumne pehle bhi mushkil waqt guzaara hai aur tum har baar aur mazboot hokar nikli ho. Koi bhi bura din tumhari chamak ko hamesha ke liye nahi chheen sakta.</p>
        <p>Chahe kuch bhi ho jaye, main hamesha yahan hoon tumhari baat sunne ke liye. Yeh waqt bhi guzar jayega, I promise! 🤍</p>
      `
    },
    miss: {
      title: "Open When You Miss Me 🌙",
      text: `
        <p>Amina,</p>
        <p>Agar tum yeh padh rahi ho aur mera intezaar kar rahi ho, toh jaan lo ke chahe kitni bhi doori ho, tum hamesha mere zehan aur dil mein ho.</p>
        <p>Hamari purani silly videos dekh lo, ya un memes ko yaad karo jinpe hum dono bewajah haste thay. Aur jab bhi dil chahe, bas ek text ya call kar dena—main hamesha tumhare liye available hoon! 📱✨</p>
      `
    },
    doubt: {
      title: "Open When You Doubt Yourself 👑",
      text: `
        <p>Listen to me carefully, Amina:</p>
        <p>Kabhi bhi apne aap ko kamzor mat samajhna. Tum ek aisi ladki ho jisme be-hisaab talent, samajhdari aur khoobsurti hai. Apne aap par shak karna band karo!</p>
        <p>Tumhara 23rd year tumhare sapnon ko poora karne ka saal hai. Tum jo chaho haasil kar sakti ho, aur main hamesha tumhare peechay khada hokar taaliyaan bajata rahoonga! 🌟</p>
      `
    },
    happy: {
      title: "Open When You Want to Smile 🥳",
      text: `
        <p>Amina!</p>
        <p>Bas yeh socho ke hum dono jab milte hain toh kitna pagalpan karte hain! Hamari late night baatein, bina baat ke hasna, aur ek doosre ko roast karna 😂</p>
        <p>Tumhari hasi meri favourite cheez hai. Hamesha aise hi khilkhilati raho, kyunki tum hasti hui bohot pyari lagti ho! 🥰</p>
      `
    }
  };

  owCards.forEach(card => {
    card.addEventListener('click', () => {
      const mood = card.getAttribute('data-mood');
      const letterData = owLetters[mood];
      if (letterData) {
        playMagicalChime();
        owHeading.textContent = letterData.title;
        owBody.innerHTML = letterData.text;
        owModal.classList.add('active');
      }
    });
  });

  function closeOwModal() {
    owModal.classList.remove('active');
  }

  if (owCloseBtn) owCloseBtn.addEventListener('click', closeOwModal);
  if (owBackdrop) owBackdrop.addEventListener('click', closeOwModal);

  // ==========================================
  // 11. STORY CAROUSEL
  // ==========================================
  const slides = document.querySelectorAll('.story-slide');
  const dots = document.querySelectorAll('#story-dots .dot');
  const prevBtn = document.getElementById('story-prev-btn');
  const nextBtn = document.getElementById('story-next-btn');
  let currentSlide = 0;

  function showSlide(index) {
    if (slides.length === 0) return;
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      playClickSound();
      showSlide(currentSlide + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      playClickSound();
      showSlide(currentSlide - 1);
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      playClickSound();
      showSlide(idx);
    });
  });

  // ==========================================
  // 12. WAX-SEALED VINTAGE LETTER (FULLSCREEN POPUP + MAGICAL WORD WRITING)
  // ==========================================
  const envelope = document.getElementById('vintage-envelope');
  const waxSeal = document.getElementById('wax-heart-seal');
  const letterModal = document.getElementById('letter-modal-backdrop');
  const letterCloseBtn = document.getElementById('letter-modal-close');
  const letterBody = document.getElementById('letter-animated-body');
  const signOff = document.getElementById('parchment-sign-off');

  const letterLetterParagraphs = [
    "Meri Pyaari Amina,",
    "Aaj 27 November ko jab main yeh likh raha hoon, mere paas sach mein lafz kam pad rahe hain yeh bayaan karne ke liye ke tum meri zindagi mein kitni ahem aur kitni khaas ho.",
    "Tumhari hasi, tumhara bachpana, tumhari samajhdari, aur jis tarah tum har cheez ko apne andaaz se khubsurat bana deti ho—yeh sab kuch ek ne'mat se kam nahi. Jab tum khush hoti ho, toh lagta hai ke sab theek hai.",
    "Tumhari 23rd birthday par meri dua hai ke Allah pak tumhari jholi ko itni khushiyon, kamiyabiyon aur sukoon se bhar de ke tumhari ankhon mein hamesha noor chamakta rahe. Tum jo chaho, tumhe us se behtar mile. Apni chamak kabhi kam mat hone dena!",
    "Aur Amina, ek baat apne dil mein hamesha ke liye mehfooz kar lo: tum sirf aur sirf meri ho, aur main tumhara sab kuch hoon. Is poori duniya mein tumhara hath thaamne ka, tumhe be-panah chaahne ka aur har mod par tumhara dhaal ban kar khade hone ka haq sirf mera hai. Tum meri kainaat ho, meri jaan ho, aur hamesha rahogi.",
    "Chahe waqt kaisa bhi ho, tum mujhe hamesha apne sath khada paogi—tumhe sunne ke liye, tumhare sath hasne ke liye, aur hamesha tumhara saath dene ke liye."
  ];

  let isTypingLetter = false;
  let letterTimeouts = [];

  function clearLetterTyping() {
    letterTimeouts.forEach(t => clearTimeout(t));
    letterTimeouts = [];
    isTypingLetter = false;
  }

  function startMagicalLetterWriting() {
    if (!letterBody) return;
    letterBody.innerHTML = '';
    if (signOff) signOff.style.opacity = '0';
    clearLetterTyping();
    isTypingLetter = true;

    let globalDelay = 150; // ms

    letterLetterParagraphs.forEach((para, pIdx) => {
      const isHeading = (pIdx === 0);
      const isHighlight = (pIdx === 4);

      const pElem = document.createElement(isHeading ? 'h3' : 'p');
      pElem.className = isHighlight ? 'parchment-para letter-highlight-phrase' : (isHeading ? 'parchment-dear' : 'parchment-para');
      letterBody.appendChild(pElem);

      const words = para.split(' ');
      words.forEach((word) => {
        const span = document.createElement('span');
        span.className = 'letter-word-span';
        span.innerHTML = word + '&nbsp;';

        const t = setTimeout(() => {
          pElem.appendChild(span);
          if (Math.random() < 0.12) {
            try {
              if (audioCtx) {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(800 + Math.random() * 400, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.08);
              }
            } catch(e) {}
          }
        }, globalDelay);

        letterTimeouts.push(t);
        globalDelay += 85;
      });

      globalDelay += 180;
    });

    const signTimeout = setTimeout(() => {
      if (signOff) signOff.style.opacity = '1';
      isTypingLetter = false;
    }, globalDelay + 200);
    letterTimeouts.push(signTimeout);
  }

  function openLetterModal() {
    playMagicalChime();
    triggerGrandConfetti();

    if (envelope) envelope.classList.add('open');
    if (letterModal) {
      letterModal.classList.remove('hidden');
      startMagicalLetterWriting();
    }
  }

  function closeLetterModal() {
    if (letterModal) letterModal.classList.add('hidden');
    clearLetterTyping();
  }

  if (waxSeal) waxSeal.addEventListener('click', (e) => { e.stopPropagation(); openLetterModal(); });
  if (envelope) envelope.addEventListener('click', (e) => { e.stopPropagation(); openLetterModal(); });
  if (letterCloseBtn) letterCloseBtn.addEventListener('click', (e) => { e.stopPropagation(); closeLetterModal(); });

  if (letterModal) {
    letterModal.addEventListener('click', (e) => {
      if (e.target === letterModal) closeLetterModal();
    });
  }

  // ==========================================
  // 13. ENDLESS VIRTUAL HUG & LOVE EXPLOSION (5-SECOND LOVE SPAM TAKEOVER)
  // ==========================================
  const loveExplosionBtn = document.getElementById('love-explosion-btn');

  function triggerScreenLoveSpam() {
    playMagicalChime();
    triggerGrandConfetti();

    // Sound effect chimes loop
    let chimeCount = 0;
    const chimeTimer = setInterval(() => {
      playMagicalChime();
      chimeCount++;
      if (chimeCount >= 4) clearInterval(chimeTimer);
    }, 1100);

    // Full screen container
    const spamContainer = document.createElement('div');
    spamContainer.className = 'screen-love-spam-container';
    spamContainer.id = 'active-love-spam-overlay';

    // Ambient glow backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'love-spam-backdrop';
    spamContainer.appendChild(backdrop);

    // Centerpiece Pop Banner
    const centerBanner = document.createElement('div');
    centerBanner.className = 'love-spam-banner-center';
    centerBanner.innerHTML = `
      <div class="love-spam-huge-text">I LOVE YOU AMINA! ❤️</div>
      <div class="love-spam-sub-text">Happy 23rd Birthday My Whole World 💖✨</div>
    `;
    spamContainer.appendChild(centerBanner);

    document.body.appendChild(spamContainer);

    // Content arrays for spam burst
    const textSpamList = [
      'I LOVE YOU ❤️',
      'HAPPY BIRTHDAY AMINA 🎂',
      'MY WHOLE WORLD 🌎',
      'FOREVER & ALWAYS 💍',
      'MINE FOREVER 🔒💖',
      'MY CUTEST ANGEL 👼',
      '23 & FLAWLESS ✨',
      'YOU MEAN EVERYTHING TO ME 🥺',
      'MY QUEEN 👑',
      'I LOVE YOU SO MUCH 💕',
      'BEST GIRL IN THE UNIVERSE 🌌',
      'JAAN AMINA ❤️',
      'MERE DIL KI DHADKAN 💓'
    ];

    const hugKissEmojiList = [
      '🫂', '🫂', '💋', '💋', '😘', '😚', '🥰', '💖', '❤️', '💕', 
      '🤗', '🥺', '🌸', '✨', '🤍', '💑', '👩‍❤️‍👨', '💓', '💗', '💞'
    ];

    const textStyles = ['style-1', 'style-2', 'style-3', 'style-4'];

    const startTime = Date.now();
    const duration = 5000; // 5 seconds of active spawning

    // Spawner interval: fast bursts across the entire screen
    const spamInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        clearInterval(spamInterval);
        return;
      }

      // Spawn 2-3 items every tick
      const count = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        item.className = 'love-spam-item';

        const isText = Math.random() < 0.45;
        if (isText) {
          const textEl = document.createElement('span');
          const styleClass = textStyles[Math.floor(Math.random() * textStyles.length)];
          textEl.className = `love-spam-text ${styleClass}`;
          textEl.textContent = textSpamList[Math.floor(Math.random() * textSpamList.length)];
          item.appendChild(textEl);
        } else {
          const emojiEl = document.createElement('span');
          emojiEl.className = 'love-spam-emoji';
          emojiEl.textContent = hugKissEmojiList[Math.floor(Math.random() * hugKissEmojiList.length)];
          emojiEl.style.fontSize = `${Math.floor(Math.random() * 45) + 32}px`;
          item.appendChild(emojiEl);
        }

        // Random positions covering full viewport
        const px = Math.random() * (window.innerWidth - 80);
        const py = Math.random() * (window.innerHeight - 80);
        item.style.left = `${px}px`;
        item.style.top = `${py}px`;

        // Movement trajectory
        const vx = (Math.random() - 0.5) * 160;
        const vy = -40 - Math.random() * 120;
        item.style.setProperty('--vx', `${vx}px`);
        item.style.setProperty('--vy', `${vy}px`);
        item.style.setProperty('--rot0', `${(Math.random() - 0.5) * 40}deg`);
        item.style.setProperty('--rot1', `${(Math.random() - 0.5) * 20}deg`);
        item.style.setProperty('--rot2', `${(Math.random() - 0.5) * 15}deg`);
        item.style.setProperty('--rot3', `${(Math.random() - 0.5) * 15}deg`);
        item.style.setProperty('--rot4', `${(Math.random() - 0.5) * 30}deg`);

        spamContainer.appendChild(item);

        // Remove item after animation
        setTimeout(() => {
          item.remove();
        }, 3800);
      }
    }, 70);

    // Keep gentle upward heart floaters concurrently
    for (let i = 0; i < 40; i++) {
      setTimeout(createHeartParticle, i * 110);
    }

    // Clean up entire container smoothly after 5.8s
    setTimeout(() => {
      spamContainer.style.transition = 'opacity 0.8s ease-out';
      spamContainer.style.opacity = '0';
      setTimeout(() => {
        spamContainer.remove();
      }, 850);
    }, 5200);
  }

  function createHeartParticle() {
    const hearts = ['💖', '❤️', '💕', '✨', '🌸', '🤍', '🥰', '🌷', '🫂', '💋'];
    const heart = document.createElement('div');
    heart.className = 'floating-heart-particle';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight - 50;

    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;
    heart.style.fontSize = `${Math.random() * 26 + 22}px`;

    const tx = (Math.random() - 0.5) * 350;
    const rot = (Math.random() - 0.5) * 120;
    heart.style.setProperty('--tx', `${tx}px`);
    heart.style.setProperty('--rot', `${rot}deg`);

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 3500);
  }

  if (loveExplosionBtn) {
    loveExplosionBtn.addEventListener('click', () => {
      triggerScreenLoveSpam();
    });
  }

  // ==========================================
  // 14. SPAWN BACKGROUND HERO BALLOONS
  // ==========================================
  const balloonStage = document.getElementById('balloons-stage');
  if (balloonStage) {
    const balloonColors = [
      'linear-gradient(135deg, #ff758c, #ff7eb3)',
      'linear-gradient(135deg, #b197fc, #7928ca)',
      'linear-gradient(135deg, #ffe066, #fcc419)',
      'linear-gradient(135deg, #ff9ff3, #f368e0)',
      'linear-gradient(135deg, #70a1ff, #1e90ff)'
    ];

    for (let i = 0; i < 14; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'css-balloon';
      balloon.style.left = `${Math.random() * 95}%`;
      balloon.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
      balloon.style.animationDelay = `${Math.random() * 12}s`;
      balloon.style.animationDuration = `${Math.random() * 6 + 12}s`;
      balloon.style.transform = `scale(${Math.random() * 0.4 + 0.8})`;
      balloonStage.appendChild(balloon);
    }
  }

  // ==========================================
  // 15. LOCK SCREEN FLOATING ROSES & BALLOONS
  // ==========================================
  const lockPetals = document.getElementById('lock-petals');
  const lockBalloons = document.getElementById('lock-balloons');

  if (lockPetals) {
    const roses = ['🌹', '🌸', '🥀', '💖', '🌺'];
    for (let i = 0; i < 22; i++) {
      const petal = document.createElement('div');
      petal.className = 'rose-petal-fall';
      petal.textContent = roses[Math.floor(Math.random() * roses.length)];
      petal.style.left = `${Math.random() * 96}%`;
      petal.style.animationDelay = `${Math.random() * 8}s`;
      petal.style.animationDuration = `${Math.random() * 5 + 6}s`;
      petal.style.setProperty('--drift', `${(Math.random() - 0.5) * 150}px`);
      lockPetals.appendChild(petal);
    }
  }

  if (lockBalloons) {
    const lockColors = [
      'linear-gradient(135deg, rgba(255,117,140,0.6), rgba(255,126,179,0.4))',
      'linear-gradient(135deg, rgba(177,151,252,0.6), rgba(121,40,202,0.4))',
      'linear-gradient(135deg, rgba(255,224,102,0.6), rgba(252,196,25,0.4))'
    ];
    for (let i = 0; i < 8; i++) {
      const b = document.createElement('div');
      b.className = 'lock-balloon-item';
      b.style.left = `${Math.random() * 90}%`;
      b.style.background = lockColors[Math.floor(Math.random() * lockColors.length)];
      b.style.animationDelay = `${Math.random() * 10}s`;
      b.style.animationDuration = `${Math.random() * 6 + 10}s`;
      lockBalloons.appendChild(b);
    }
  }

  // ==========================================
  // 16. "DO YOU LOVE ME?" LOVE GAME ENGINE
  // ==========================================
  const gameYesBtn = document.getElementById('game-yes-btn');
  const gameNoBtn = document.getElementById('game-no-btn');
  const funnyNoHint = document.getElementById('funny-no-hint');
  const loveWinModal = document.getElementById('love-win-modal');
  const loveWinClose = document.getElementById('love-win-close');
  const loveWinBackdrop = document.getElementById('love-win-backdrop');

  const funnyNoLines = [
    "Aise kaise No? 😂 Yes bolna padega!",
    "No ka option to system mein hi nahi hai! 🙈",
    "Try again cutie, No chance! 😜",
    "No dabaane par 1000 rupees fine hai! 💸",
    "Sirf Yes allowed hai, tum sirf meri ho! ❤️",
    "Bach ke kahan jaogi? Yes par click karo! 🌹",
    "No button disable kar diya gaya hai! 🚫"
  ];

  let noClickAttempts = 0;
  let yesScale = 1;

  function handleNoAttempt() {
    playErrorSound();
    const randomMsg = funnyNoLines[noClickAttempts % funnyNoLines.length];
    if (funnyNoHint) {
      funnyNoHint.textContent = randomMsg;
    }
    noClickAttempts++;

    // Make Yes button bigger and No button smaller
    yesScale += 0.15;
    if (gameYesBtn) {
      gameYesBtn.style.transform = `scale(${yesScale})`;
    }

    if (gameNoBtn) {
      // Move slightly randomly
      const offsetX = (Math.random() - 0.5) * 120;
      const offsetY = (Math.random() - 0.5) * 60;
      gameNoBtn.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.9)`;
    }
  }

  if (gameNoBtn) {
    gameNoBtn.addEventListener('click', handleNoAttempt);
    gameNoBtn.addEventListener('mouseenter', () => {
      if (noClickAttempts > 1) {
        handleNoAttempt();
      }
    });
  }

  if (gameYesBtn) {
    gameYesBtn.addEventListener('click', () => {
      playMagicalChime();
      triggerGrandConfetti();
      if (loveWinModal) loveWinModal.classList.add('active');

      // Launch floating hearts explosion
      for (let i = 0; i < 40; i++) {
        setTimeout(createHeartParticle, i * 50);
      }
    });
  }

  function closeLoveWinModal() {
    if (loveWinModal) loveWinModal.classList.remove('active');
  }

  if (loveWinClose) loveWinClose.addEventListener('click', closeLoveWinModal);
  if (loveWinBackdrop) loveWinBackdrop.addEventListener('click', closeLoveWinModal);

  // ==========================================
  // 17. 100 REASONS WHY I LOVE YOU, AMINA
  // ==========================================
  const hundredReasons = [
    "Because your smile is pure medicine for my soul.",
    "The cute way you say 'Suno na' when you want attention.",
    "How you remember the smallest things I told you months ago.",
    "Because you look effortlessly gorgeous in eastern clothes.",
    "The funny angry faces you make when you are hungry.",
    "Because you are only mine, and nobody else has a claim on you.",
    "How you always listen patiently to my random late-night rants.",
    "Because your eyes reflect 100% pure kindness.",
    "How you pretend to be tough, but you have the softest heart.",
    "The silly inside jokes that only you and I understand.",
    "The way your laugh makes me laugh even when I am in a bad mood.",
    "Because you never fake your personality for anyone.",
    "How you get excited about little things like good food and pretty skies.",
    "Because talking to you at the end of a long day feels like coming home.",
    "How you look at me like I am the only person in the room.",
    "The dramatic way you tell stories with your hands moving everywhere.",
    "Because you make ordinary tea/coffee talks feel like pure magic.",
    "How caring and protective you are of the people you love.",
    "Because you are my biggest cheerleader in life.",
    "The way you look without any makeup—just raw, natural, and gorgeous.",
    "Because having you in my life makes every future dream look brighter.",
    "How you send me random memes that instantly make my day.",
    "The cute habit you have of overthinking silly little things.",
    "Because you are the first person I want to tell good news to.",
    "And also the first person I run to when things go wrong.",
    "How you understand my silence when I don't feel like talking.",
    "Because your hugs feel like the safest place in the entire world.",
    "The sweet way you scold me when I don't take care of my health.",
    "Because you have the prettiest handwriting and aesthetic taste.",
    "How proud I feel whenever I introduce you or talk about you.",
    "Because you are born on 27th November—the best day in history.",
    "The way you get sleepy and your voice gets all soft and cute.",
    "Because you are my best friend and my favorite person all in one.",
    "How we can talk for 4 hours without getting bored for a single second.",
    "The cute stubbornness you show when you want your way.",
    "Because you make me want to be the best version of myself every single day.",
    "How you notice when my mood changes without me even saying a word.",
    "Because you are effortlessly graceful in everything you do.",
    "The way you get shy whenever I genuinely compliment you.",
    "Because your presence alone brings peace to my restless mind.",
    "How you defend me even when I am not in the room.",
    "Because you have a heart that forgives easily and loves deeply.",
    "The adorable way you fix your hair when you look in a mirror.",
    "Because you never judge my flaws or mistakes.",
    "How you make me laugh until my stomach literally hurts.",
    "Because you are my permanent 2 AM thought.",
    "The gentle warmth of your hands when I hold them.",
    "Because out of 8 billion people, nobody has your exact vibe.",
    "How you remember our special dates and anniversaries.",
    "Because you are officially turning 23 and glowing brighter than ever.",
    "The way you support my ambitions and believe in my dreams.",
    "How you look in candid photos when you don't even know I'm capturing you.",
    "Because your happiness is literally my top priority in life.",
    "The way you tease me and laugh at your own jokes.",
    "Because you are my favorite notification on my phone.",
    "How you care for stray animals and small innocent things.",
    "Because you make every car ride and road trip 100x more fun.",
    "The sweet way you say goodbye before sleeping.",
    "Because you are honest, loyal, and completely genuine.",
    "How you can turn the most boring situation into an adventure.",
    "Because loving you is the easiest and most natural thing I have ever done.",
    "The way your eyes sparkle when you are genuinely happy.",
    "Because you are my favorite person to share food with.",
    "How you always give the best and most thoughtful advice.",
    "Because you never let our arguments last longer than a few minutes.",
    "The way you get excited like a child on your birthday.",
    "Because you are my peace in a loud and chaotic world.",
    "How comfortable we are with each other—zero awkwardness ever.",
    "Because you have the most beautiful soul I have ever met.",
    "The way you say my name with that special sweetness.",
    "Because you are my biggest blessing from Allah.",
    "How you inspire everyone around you to be kinder and softer.",
    "Because you are strong enough to handle whatever life throws at you.",
    "The way you celebrate my small wins like they are huge victories.",
    "Because you are the queen of my heart, with zero competition.",
    "How you send voice notes that I secretly listen to more than once.",
    "Because you have a sense of humor that matches mine perfectly.",
    "The cute way you pucker your lips when you are annoyed.",
    "Because you make me feel valued, respected, and deeply loved.",
    "How you look at the stars with that quiet wonder in your eyes.",
    "Because with you, I can be 100% my true silly self.",
    "The way you smell—always soft, sweet, and comforting.",
    "Because you are my favorite travel partner for life.",
    "How you never let me feel alone in any situation.",
    "Because you make every single festival and holiday feel special.",
    "The way you remember what food I like and don't like.",
    "Because your loyalty is unbreakable and pure.",
    "How you look when you wake up in the morning—pure angel.",
    "Because you have taught me what true emotional connection feels like.",
    "The way you look forward to our future together.",
    "Because you are the person I want to grow old and gray with.",
    "How you give the warmest, most genuine smiles to people.",
    "Because you never leave my side, no matter what happens.",
    "The cute way you get jealous (which secretly makes me smile).",
    "Because you are my favorite melody, my favorite book, my favorite everything.",
    "How you always manage to surprise me in the best ways.",
    "Because you make life feel like a beautiful romantic movie.",
    "The fact that you chose me, out of everyone in the world.",
    "Because you are my today, my tomorrow, and all my future dreams.",
    "And Reason #100: Simply because you are AMINA, and you are only MINE forever! ❤️"
  ];

  let currentReasonIndex = 0;
  const reasonNumBadge = document.getElementById('reason-num-badge');
  const currentReasonText = document.getElementById('current-reason-text');
  const reasonPrevBtn = document.getElementById('reason-prev-btn');
  const reasonNextBtn = document.getElementById('reason-next-btn');
  const reasonRandomBtn = document.getElementById('reason-random-btn');

  const openAllReasonsBtn = document.getElementById('open-all-reasons-btn');
  const allReasonsModal = document.getElementById('all-reasons-modal');
  const allReasonsClose = document.getElementById('all-reasons-close');
  const allReasonsBackdrop = document.getElementById('all-reasons-backdrop');
  const allReasonsGridList = document.getElementById('all-reasons-grid-list');

  function displayReason(idx) {
    if (idx < 0) currentReasonIndex = hundredReasons.length - 1;
    else if (idx >= hundredReasons.length) currentReasonIndex = 0;
    else currentReasonIndex = idx;

    if (reasonNumBadge) {
      reasonNumBadge.textContent = `Reason #${currentReasonIndex + 1} of 100`;
    }
    if (currentReasonText) {
      currentReasonText.style.opacity = '0';
      setTimeout(() => {
        currentReasonText.textContent = `"${hundredReasons[currentReasonIndex]}"`;
        currentReasonText.style.opacity = '1';
      }, 150);
    }
  }

  if (reasonNextBtn) {
    reasonNextBtn.addEventListener('click', () => {
      playClickSound();
      displayReason(currentReasonIndex + 1);
    });
  }

  if (reasonPrevBtn) {
    reasonPrevBtn.addEventListener('click', () => {
      playClickSound();
      displayReason(currentReasonIndex - 1);
    });
  }

  if (reasonRandomBtn) {
    reasonRandomBtn.addEventListener('click', () => {
      playClickSound();
      const randomIdx = Math.floor(Math.random() * hundredReasons.length);
      displayReason(randomIdx);
    });
  }

  // Populate All 100 Reasons Modal
  if (allReasonsGridList) {
    hundredReasons.forEach((reason, i) => {
      const card = document.createElement('div');
      card.className = 'reason-mini-card';
      card.innerHTML = `
        <span class="reason-mini-badge">#${i + 1}</span>
        <p class="reason-mini-text">"${reason}"</p>
      `;
      allReasonsGridList.appendChild(card);
    });
  }

  if (openAllReasonsBtn) {
    openAllReasonsBtn.addEventListener('click', () => {
      playMagicalChime();
      if (allReasonsModal) allReasonsModal.classList.add('active');
    });
  }

  function closeAllReasonsModal() {
    if (allReasonsModal) allReasonsModal.classList.remove('active');
  }

  if (allReasonsClose) allReasonsClose.addEventListener('click', closeAllReasonsModal);
  if (allReasonsBackdrop) allReasonsBackdrop.addEventListener('click', closeAllReasonsModal);

  // ==========================================
  // 18. WHATSAPP VOICE NOTE PLAYER
  // ==========================================
  const waPlayBtn = document.getElementById('wa-play-btn');
  const waPlayIcon = document.getElementById('wa-play-icon');
  const waBubble = document.querySelector('.wa-bubble');
  const waAudio = document.getElementById('wa-audio-element');
  const waTimeDisplay = document.getElementById('wa-time-display');
  const waNoteHint = document.getElementById('wa-note-hint');

  let bgMusicWasPlayingBeforeVoice = false;

  function stopBackgroundMusicForVoice() {
    isVoiceNotePlaying = true;
    if (bgAudio) {
      if (!bgAudio.paused) {
        bgMusicWasPlayingBeforeVoice = true;
      }
      bgAudio.pause();
      updateMusicUI(false);
    }
  }

  function restartBackgroundMusicAfterVoice() {
    isVoiceNotePlaying = false;
    if (bgAudio && bgMusicWasPlayingBeforeVoice) {
      bgAudio.play().then(() => {
        updateMusicUI(true);
      }).catch(() => {});
      bgMusicWasPlayingBeforeVoice = false;
    }
  }

  if (waPlayBtn && waAudio) {
    waPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent document click listener from firing
      initAudio();

      if (waAudio.paused) {
        // 1. Force STOP background music completely & set flag
        stopBackgroundMusicForVoice();

        // 2. Play Voice Note
        waAudio.play().then(() => {
          if (waPlayIcon) waPlayIcon.className = 'fa-solid fa-pause';
          if (waBubble) waBubble.classList.add('playing');
          if (waNoteHint) waNoteHint.innerHTML = '<i class="fa-solid fa-headphones"></i> Put on your headphones and listen to my voice!';
        }).catch((err) => {
          console.log('Voice play blocked:', err);
        });
      } else {
        // Paused by user
        waAudio.pause();
        if (waPlayIcon) waPlayIcon.className = 'fa-solid fa-play';
        if (waBubble) waBubble.classList.remove('playing');
        restartBackgroundMusicAfterVoice();
      }
    });

    waAudio.addEventListener('timeupdate', () => {
      const cur = Math.floor(waAudio.currentTime);
      const mins = Math.floor(cur / 60);
      const secs = String(cur % 60).padStart(2, '0');
      if (waTimeDisplay) waTimeDisplay.textContent = `${mins}:${secs}`;
    });

    // When Voice note ends -> Restart background music from where it stopped
    waAudio.addEventListener('ended', () => {
      if (waPlayIcon) waPlayIcon.className = 'fa-solid fa-play';
      if (waBubble) waBubble.classList.remove('playing');
      if (waTimeDisplay) waTimeDisplay.textContent = '1:26';
      restartBackgroundMusicAfterVoice();
    });

    waAudio.addEventListener('pause', () => {
      if (waAudio.currentTime < waAudio.duration) {
        restartBackgroundMusicAfterVoice();
      }
    });
  }

  // ==========================================
  // 19. 3D UNWRAPPABLE GIFT BOXES
  // ==========================================
  const giftBoxes = document.querySelectorAll('.gift-box-item');
  const giftModal = document.getElementById('gift-modal');
  const giftCloseBtn = document.getElementById('gift-close-btn');
  const giftBackdrop = document.getElementById('gift-backdrop');
  const giftModalIcon = document.getElementById('gift-modal-icon');
  const giftModalTitle = document.getElementById('gift-modal-title');
  const giftModalDesc = document.getElementById('gift-modal-desc');

  const giftPrizes = {
    '1': {
      icon: '🌸 🫂',
      title: 'Unlimited Forehead Kisses & Long Hugs',
      desc: 'This voucher guarantees unlimited warm hugs whenever you feel low, forehead kisses whenever you are being cute, and my arms as your permanent safe zone!'
    },
    '2': {
      icon: '☕ 🍦',
      title: 'Midnight Chai & Ice Cream For Life',
      desc: 'Valid for: 2 AM chai runs, unlimited ice cream cravings, and whatever food you demand when you are in a drama mood! Zero arguments allowed.'
    },
    '3': {
      icon: '💍 👑',
      title: 'The Forever Oath & Promise Ring',
      desc: 'A permanent vow that through every single phase of life, you will never have to face anything alone. You are only mine, and I am yours forever & always.'
    }
  };

  giftBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const giftId = box.getAttribute('data-gift');
      const prize = giftPrizes[giftId];
      if (prize) {
        playMagicalChime();
        triggerGrandConfetti();
        if (giftModalIcon) giftModalIcon.textContent = prize.icon;
        if (giftModalTitle) giftModalTitle.textContent = prize.title;
        if (giftModalDesc) giftModalDesc.textContent = prize.desc;
        if (giftModal) giftModal.classList.add('active');
      }
    });
  });

  function closeGiftModal() {
    if (giftModal) giftModal.classList.remove('active');
  }

  if (giftCloseBtn) giftCloseBtn.addEventListener('click', closeGiftModal);
  if (giftBackdrop) giftBackdrop.addEventListener('click', closeGiftModal);

  // ==========================================
  // 20. POLAROID PHOTOBOOTH STUDIO
  // ==========================================
  const boothMainImg = document.getElementById('booth-main-img');
  const boothStickerOverlay = document.getElementById('booth-sticker-overlay');
  const boothPhotoBtns = document.querySelectorAll('.booth-photo-btn');
  const boothStickerBtns = document.querySelectorAll('.booth-sticker-btn');
  const boothPosBtns = document.querySelectorAll('.booth-pos-btn');
  const boothCaptionInput = document.getElementById('booth-caption-input');
  const boothDownloadBtn = document.getElementById('booth-download-btn');

  let currentStickerPos = 'pos-top-right';

  boothPhotoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      boothPhotoBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const src = btn.getAttribute('data-src');
      if (boothMainImg && src) boothMainImg.src = src;
    });
  });

  boothStickerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      boothStickerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sticker = btn.getAttribute('data-sticker');
      if (boothStickerOverlay && sticker) {
        boothStickerOverlay.textContent = sticker;
      }
    });
  });

  boothPosBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      boothPosBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pos = btn.getAttribute('data-pos');
      if (boothStickerOverlay && pos) {
        boothStickerOverlay.className = `booth-sticker-overlay pos-${pos}`;
        currentStickerPos = `pos-${pos}`;
      }
    });
  });

  if (boothDownloadBtn) {
    boothDownloadBtn.addEventListener('click', () => {
      playMagicalChime();
      triggerGrandConfetti();

      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 760;
      const ctx = canvas.getContext('2d');

      function drawAndDownload(imgEl) {
        // Polaroid white background with rounded shadow feel
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Soft pastel border inlay
        ctx.fillStyle = '#fff0f5';
        ctx.fillRect(16, 16, canvas.width - 32, canvas.height - 32);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(26, 26, canvas.width - 52, canvas.height - 52);

        // Photo Square (520x520)
        if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
          try {
            // Center crop the source into 520x520
            const sw = imgEl.naturalWidth;
            const sh = imgEl.naturalHeight;
            const size = Math.min(sw, sh);
            const sx = (sw - size) / 2;
            const sy = (sh - size) / 2;
            ctx.drawImage(imgEl, sx, sy, size, size, 40, 40, 520, 520);
          } catch(e) {
            drawFallbackPhoto();
          }
        } else {
          drawFallbackPhoto();
        }

        function drawFallbackPhoto() {
          const grad = ctx.createLinearGradient(40, 40, 560, 560);
          grad.addColorStop(0, '#ff758c');
          grad.addColorStop(1, '#b197fc');
          ctx.fillStyle = grad;
          ctx.fillRect(40, 40, 520, 520);
        }

        // Sticker placement based on selected position
        const stickerChar = boothStickerOverlay ? (boothStickerOverlay.textContent || '👑') : '👑';
        ctx.font = '72px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let stX = 500, stY = 100;
        if (currentStickerPos === 'pos-top-left') { stX = 100; stY = 100; }
        else if (currentStickerPos === 'pos-top-right') { stX = 500; stY = 100; }
        else if (currentStickerPos === 'pos-bottom-left') { stX = 100; stY = 500; }
        else if (currentStickerPos === 'pos-bottom-right') { stX = 500; stY = 500; }
        else if (currentStickerPos === 'pos-center') { stX = 300; stY = 300; }

        ctx.fillText(stickerChar, stX, stY);

        // Caption text
        const captionText = boothCaptionInput && boothCaptionInput.value.trim() 
          ? boothCaptionInput.value.trim() 
          : 'Happy 23rd Birthday Amina ✨';

        ctx.fillStyle = '#1e1b29';
        ctx.font = 'bold 30px "Dancing Script", "Caveat", cursive, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(captionText, canvas.width / 2, 630);

        ctx.fillStyle = '#8f8f9d';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('27.11.2003 • Forever Queen 💖', canvas.width / 2, 672);

        // Small decorative signature
        ctx.font = '22px sans-serif';
        ctx.fillText('✨ 💕 ✨', canvas.width / 2, 715);

        try {
          const link = document.createElement('a');
          link.download = `Amina-Birthday-Polaroid-${Date.now()}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          showBoothToast('💖 Polaroid saved! Check your Downloads folder!');
        } catch(e) {
          showBoothToast('📸 Polaroid ready! Long-press or right click to save!');
        }
      }

      function showBoothToast(msg) {
        let toast = document.getElementById('booth-toast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'booth-toast';
          toast.style.cssText = `position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#ff758c,#b197fc);color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:1rem;z-index:999999;box-shadow:0 10px 30px rgba(0,0,0,0.5);transition:opacity 0.5s;`;
          document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.opacity = '0'; }, 3500);
      }

      const img = new Image();
      img.onload = () => drawAndDownload(img);
      img.onerror = () => drawAndDownload(null);
      img.src = boothMainImg ? boothMainImg.src : 'images/pic1.jpg';
    });
  }

  // ==========================================
  // 21. THE AMINA GALAXY CONSTELLATION MAP
  // ==========================================
  const celestialStars = document.querySelectorAll('.celestial-star');
  const cStarBadge = document.getElementById('c-star-badge');
  const cStarTitle = document.getElementById('c-star-title');
  const cStarDesc = document.getElementById('c-star-desc');

  const starStories = {
    '1': {
      badge: 'STAR #1 • THE FIRST CHAPTER',
      title: 'The Day We First Spoke ✨',
      desc: '"I had no idea back then that a simple conversation would turn you into the center of my entire universe."'
    },
    '2': {
      badge: 'STAR #2 • UNCONTROLLABLE LAUGHTER',
      title: 'The Day We Laughed for Hours 😂',
      desc: '"Laughing with you until our stomachs ached and tears came to our eyes. That was when I realized how special you are."'
    },
    '3': {
      badge: 'STAR #3 • SOUL CONTRACT',
      title: 'The Day I Realized You Are Only Mine 💍',
      desc: '"A silent moment where my heart whispered: I never want to let this girl go. She belongs with me forever."'
    },
    '4': {
      badge: 'STAR #4 • MIDNIGHT HAVEN',
      title: 'Late Night 2 AM Talks 🌙',
      desc: '"When the rest of the world was asleep, we were building our own private universe with our secrets and dreams."'
    },
    '5': {
      badge: 'STAR #5 • FOREVER PROMISE',
      title: 'My Oath for Chapter 23 & Beyond 💖',
      desc: '"No matter how many years pass, my love and loyalty to you will only grow stronger every single day."'
    }
  };

  celestialStars.forEach(star => {
    star.addEventListener('click', () => {
      playClickSound();
      playMagicalChime();
      celestialStars.forEach(s => s.classList.remove('active'));
      star.classList.add('active');

      const starId = star.getAttribute('data-star');
      const story = starStories[starId];
      if (story) {
        if (cStarBadge) cStarBadge.textContent = story.badge;
        if (cStarTitle) cStarTitle.textContent = story.title;
        if (cStarDesc) cStarDesc.textContent = story.desc;
      }
    });
  });


  // ==========================================
  // 22. AMINA'S EXCLUSIVE VIDEO REELS ENGINE
  // ==========================================
  const reelsTrack = document.getElementById('video-reels-track');
  const reelsPrevBtn = document.getElementById('reels-prev-btn');
  const reelsNextBtn = document.getElementById('reels-next-btn');
  const reelCards = document.querySelectorAll('.video-reel-card');

  let activePlayingVideo = null;
  let bgMusicWasPlayingBeforeReel = false;

  if (reelsPrevBtn && reelsTrack) {
    reelsPrevBtn.addEventListener('click', () => {
      reelsTrack.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }

  if (reelsNextBtn && reelsTrack) {
    reelsNextBtn.addEventListener('click', () => {
      reelsTrack.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }

  function pauseBackgroundForVideo() {
    if (bgAudio && !bgAudio.paused) {
      bgMusicWasPlayingBeforeReel = true;
      bgAudio.pause();
      if (typeof updateMusicUI === 'function') updateMusicUI(false);
    }
  }

  function resumeBackgroundAfterVideo() {
    // Only resume if no other video is currently playing
    const anyPlaying = Array.from(document.querySelectorAll('.reel-video-player')).some(v => !v.paused);
    if (!anyPlaying && bgMusicWasPlayingBeforeReel && bgAudio && bgAudio.paused) {
      bgAudio.play().then(() => {
        if (typeof updateMusicUI === 'function') updateMusicUI(true);
      }).catch(() => {});
      bgMusicWasPlayingBeforeReel = false;
    }
  }

  reelCards.forEach((card) => {
    const video = card.querySelector('.reel-video-player');
    const playOverlay = card.querySelector('.video-play-overlay');
    const playToggleBtn = card.querySelector('.play-toggle-btn');
    const fullscreenBtn = card.querySelector('.fullscreen-btn');
    const durationPill = card.querySelector('.video-duration-pill');

    if (!video) return;

    // Display duration once loaded
    video.addEventListener('loadedmetadata', () => {
      const mins = Math.floor(video.duration / 60);
      const secs = Math.floor(video.duration % 60);
      if (durationPill) {
        durationPill.innerHTML = `<i class="fa-solid fa-play"></i> ${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }
    });

    function togglePlay() {
      // Pause any other video that was playing
      if (activePlayingVideo && activePlayingVideo !== video) {
        activePlayingVideo.pause();
        const otherCard = activePlayingVideo.closest('.video-reel-card');
        if (otherCard) {
          otherCard.classList.remove('is-playing');
          const btn = otherCard.querySelector('.play-toggle-btn span');
          const icon = otherCard.querySelector('.play-toggle-btn i');
          if (btn) btn.textContent = 'Play';
          if (icon) { icon.className = 'fa-solid fa-play'; }
        }
      }

      if (video.paused) {
        pauseBackgroundForVideo();
        video.play().then(() => {
          card.classList.add('is-playing');
          activePlayingVideo = video;
          if (playToggleBtn) {
            playToggleBtn.querySelector('span').textContent = 'Pause';
            playToggleBtn.querySelector('i').className = 'fa-solid fa-pause';
          }
        }).catch(err => {
          console.warn('Video play blocked', err);
        });
      } else {
        video.pause();
        card.classList.remove('is-playing');
        if (playToggleBtn) {
          playToggleBtn.querySelector('span').textContent = 'Play';
          playToggleBtn.querySelector('i').className = 'fa-solid fa-play';
        }
        resumeBackgroundAfterVideo();
      }
    }

    if (playOverlay) {
      playOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
      });
    }

    if (video) {
      video.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
      });

      video.addEventListener('ended', () => {
        card.classList.remove('is-playing');
        if (playToggleBtn) {
          playToggleBtn.querySelector('span').textContent = 'Replay';
          playToggleBtn.querySelector('i').className = 'fa-solid fa-rotate-right';
        }
        resumeBackgroundAfterVideo();
      });
    }

    if (playToggleBtn) {
      playToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      });
    }
  });

});

