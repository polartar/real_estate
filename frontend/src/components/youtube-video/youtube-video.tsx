import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'youtube-video',
  styleUrl: 'youtube-video.scss',
})
export class YoutubeVideo {
  @Prop() videoId!: string;
  @State() played: boolean = false;

  render() {
    const iframeProps = {
      allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: true,
      width: "100%",
      height: "100%",
      src: `https://www.youtube.com/embed/${this.videoId}?autoplay=1`,
      frameborder: "0",
      title: 'Youtube Video'
    };

    return (
      <div class="youtube-video">
        { this.played ?
          <iframe {...iframeProps} />

        :

          <a aria-label="Youtube Video" class="placeholder" onClick={() => { this.played = true }}>
            <img src={`https://i3.ytimg.com/vi/${this.videoId}/hqdefault.jpg`} class="placeholder" />
            <button aria-label="play video" class="reset">
              <ion-icon name="play" />
            </button>
          </a>
        }
      </div>
    )
  }
}
