import MuxPlayer from '@mux/mux-player-react';

interface MuxVideoPlayerProps {
  playbackId: string;
  className?: string;
}

export const MuxVideoPlayer = ({ playbackId, className = "" }: MuxVideoPlayerProps) => {
  return (
    <MuxPlayer
      playbackId={playbackId}
      metadata={{
        video_title: "Chapter Video",
      }}
      className={className}
      style={{
        height: '100%',
        width: '100%',
      }}
      streamType="on-demand"
      autoPlay={false}
      muted={false}
      preload="metadata"
    />
  );
};