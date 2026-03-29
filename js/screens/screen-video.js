/**
 * screen-video.js
 * 
 * Video player screen.
 * 16:9 aspect ratio video player (HTML5) with basic controls.
 * Below: character name + subtitle.
 * 
 * Config shape:
 *   {
 *     videoUrl: "https://...",
 *     videoTitle: "Video Title",
 *     characterName: "Nombre del Personaje",
 *     subtitle: "Subtítulo o descripción"
 *   }
 */

import { Screen } from './screen-base.js';

export class VideoScreen extends Screen {
  render() {
    const {
      videoUrl = '',
      videoTitle = 'Reproductor de Video',
      characterName = 'Personaje',
      subtitle = 'Subtítulo'
    } = this.config;

    return `
      <div class="screen screen-video">
        <!-- Video player container (16:9) -->
        <div class="video-container">
          <div class="video-wrapper">
            <video
              class="video-player"
              controls
              controlsList="nodownload"
              poster
            >
              <source src="${videoUrl}" type="video/mp4">
              Tu navegador no soporta video HTML5.
            </video>
          </div>
        </div>

        <!-- Video info: character name + subtitle -->
        <div class="video-info">
          <h3 class="video-character">${characterName}</h3>
          <p class="video-subtitle">${subtitle}</p>
        </div>

        <!-- Optional: Video title -->
        <div class="video-meta">
          <span class="video-title">${videoTitle}</span>
        </div>
      </div>
    `;
  }

  init() {
    // HTML5 video controls are native, no additional setup needed
    const video = this.el.querySelector('.video-player');
    if (video) {
      // Optional: add custom event listeners
      video.addEventListener('play', () => {
        console.log('[video] Playing');
      });
    }
  }
}
