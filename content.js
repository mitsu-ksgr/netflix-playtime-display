/*****************************************************************************
 *
 * Netfilx playtime display.
 *
 *****************************************************************************/

const Tag = {
  Player: '[data-uia="player"]',
  Timeline: '[data-uia="timeline"]',
  TimeRemaining: '[data-uia="controls-time-remaining"]',
  VideoTitle: '[data-uia="video-title"]',

  // My elements (ID)
  PlaytimeDisplay: 'MyPlaytimeDisplay',
};


//-----------------------------------------------------------------------------
// Content functions.
//-----------------------------------------------------------------------------
function fmtTime(time_sec) {
  const min = Math.floor(time_sec / 60).toString().padStart(2, '0');
  const sec = Math.floor(time_sec % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function makePlaytimeDisplayDiv(id, text) {
  const span = document.createElement('span');
  span.style.fontSize = '24px';
  span.style.fontWeight = 'bold';
  span.textContent = text;

  const div = document.createElement('div');
  div.id = id;
  div.appendChild(span);
  return div;
}

function updateTimeDisplay() {
  const e_video = document.querySelector('video');
  if (!e_video) {
    return;
  }

  const e_player = document.querySelector(Tag.Player);
  if (!e_player) {
    return;
  }

  // Player is not showing.
  if (!e_player.classList.contains('active')) {
    return;
  }

  // Play time.
  const cur_time = e_video.currentTime;
  const duration = e_video.duration;
  //const remains  = duration - cur_time;
  const text  = `[${fmtTime(cur_time)} / ${fmtTime(duration)}]`;
  //console.log(text);

  const e_display = document.querySelector(`#${Tag.PlaytimeDisplay}`);
  if (e_display) {
    const span = e_display.firstChild.textContent = text;

  } else {
    const e_vtitle = document.querySelector(Tag.VideoTitle);
    if (e_vtitle) {
      e_vtitle.prepend(makePlaytimeDisplayDiv(Tag.PlaytimeDisplay, text));
    }
  }
}



//-----------------------------------------------------------------------------
//  Entrypoint
//-----------------------------------------------------------------------------
function update() {
  updateTimeDisplay();
}

function main() {
  window.setInterval(update, 1000);
}

// Entrypoint
if (document.readyState !== "loading") {
  window.setTimeout(main, 3000);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(main, 1000);
  });
}

