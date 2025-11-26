document.addEventListener("turbo:load", () => {
  const audio = document.getElementById("audio");
  if (!audio) return; // audioタグがないページでは処理しない

  // DOM要素
  const playBtn = document.getElementById("playBtn");
  const rewind3 = document.getElementById("rewind3");
  const forward3 = document.getElementById("forward3");
  const loopBtn = document.getElementById("loopBtn");
  const speedControl = document.getElementById("speedControl");
  const progress = document.getElementById("progress");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");

  // ヘルパー関数：時間表示をフォーマット
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  // 再生 / 一時停止
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "❚❚";
    } else {
      audio.pause();
      playBtn.textContent = "▶︎";
    }
  });

  // 3秒戻る
  rewind3.addEventListener("click", () => {
    audio.currentTime = Math.max(0, audio.currentTime - 3);
  });

  // 3秒進む
  forward3.addEventListener("click", () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 3);
  });

  // ループ切り替え
  loopBtn.addEventListener("click", () => {
    audio.loop = !audio.loop;
    loopBtn.classList.toggle("active", audio.loop);
  });

  // 再生速度変更
  speedControl.addEventListener("change", () => {
    audio.playbackRate = parseFloat(speedControl.value);
  });

  // 進捗バー更新
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progress.value = percent;
      currentTime.textContent = formatTime(audio.currentTime);
      duration.textContent = formatTime(audio.duration);
    }
  });

  // シークバー操作
  progress.addEventListener("input", () => {
    if (audio.duration) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });

  // --- カードクリックで下部プレーヤー連動 ---
  document.querySelectorAll(".card[data-audio-url]").forEach(card => {
    card.addEventListener("click", () => {
      const url = card.getAttribute("data-audio-url");
      if (!url) return;

      // 下部プレーヤーの音源を切替
      audio.src = url;
      audio.play();
      playBtn.textContent = "❚❚"; // 再生中表示に更新

      // カードのハイライト更新
      document.querySelectorAll(".card[data-audio-url]").forEach(c => c.classList.remove("bg-dark", "text-white"));
      card.classList.add("bg-dark", "text-white");
    });
  });
});
