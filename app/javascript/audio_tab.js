document.addEventListener("turbo:load", () => {
  const audio = document.getElementById("audio");
  if (!audio) return;

  // 既存のイベントリスナーを削除（多重登録を防止）
  audio.onloadeddata = null;

  // DOM要素
  const playBtn = document.getElementById("playBtn");
  const rewind3 = document.getElementById("rewind3");
  const forward3 = document.getElementById("forward3");
  const loopBtn = document.getElementById("loopBtn");
  const speedControl = document.getElementById("speedControl");
  const progress = document.getElementById("progress");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");

  // 再生 / 一時停止
  playBtn.onclick = () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      playBtn.textContent = "❚❚";
    } else {
      audio.pause();
      playBtn.textContent = "▶︎";
    }
  };

  rewind3.onclick = () => audio.currentTime = Math.max(0, audio.currentTime - 3);
  forward3.onclick = () => audio.currentTime = Math.min(audio.duration, audio.currentTime + 3);

  loopBtn.onclick = () => {
    audio.loop = !audio.loop;
    loopBtn.classList.toggle("active", audio.loop);
  };

  speedControl.onchange = () => {
    audio.playbackRate = parseFloat(speedControl.value);
  };

  audio.ontimeupdate = () => {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progress.value = percent;
      currentTime.textContent = Math.floor(audio.currentTime / 60) + ":" + String(Math.floor(audio.currentTime % 60)).padStart(2, "0");
      duration.textContent = Math.floor(audio.duration / 60) + ":" + String(Math.floor(audio.duration % 60)).padStart(2, "0");
    }
  };

  progress.oninput = () => {
    if (audio.duration) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  };

  // --- カードクリック（重複登録を防ぎつつ安全に再生） ---
  document.querySelectorAll(".card[data-audio-url]").forEach(card => {
    card.onclick = () => {
      const url = card.getAttribute("data-audio-url");
      if (!url) return;

      audio.pause();
      audio.currentTime = 0;

      audio.src = url;
      audio.load();

      // loadeddata を “必ず1つ” にする
      audio.onloadeddata = () => {
        audio.play().catch(() => {});
        playBtn.textContent = "❚❚";
      };

      document.querySelectorAll(".card[data-audio-url]").forEach(c =>
        c.classList.remove("bg-dark", "text-white")
      );
      card.classList.add("bg-dark", "text-white");
    };
  });
});
