export function renderCharacter(route) {
    const {
        text = "",
        characterName  = "",
        characterImageUrl = ""
    } = route;

    return `
    <div class="screen screen-video">

      <div class="video-layout">

        <div class="video-center">

          <div class="video-wrapper">
            <img class="video-placeholder-img" src="/assets/img/video-plantilla.png" alt="video-plantilla">
          </div>
            
          <!-- Video player 
          <div class="video-info-drawer">
            <div class="video-info-content">
              ${characterName ? `<h3 class="video-character-name">${characterName}</h3>` : ''}
              ${subtitle      ? `<p  class="video-subtitle">${subtitle}</p>`              : ''}
            </div>
          </div>-->

        </div>

        </div>

    </div>
  `;
}