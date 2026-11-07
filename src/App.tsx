import { useMemo, useState } from 'react';
import {
  ChevronRight,
  ListMusic,
  Moon,
  Pause,
  Play,
  Radio,
  SkipBack,
  SkipForward,
  Sparkles,
  Waves,
  Wind,
  X,
} from 'lucide-react';

const tracks = [
  { title: 'Midnight Study', genre: 'Lo-Fi', bpm: '78 bpm', length: '3:42', color: 'coral' },
  { title: 'Neon Window', genre: 'Chillhop', bpm: '82 bpm', length: '4:08', color: 'blue' },
  { title: 'Afterglow Avenue', genre: 'Dreams', bpm: '74 bpm', length: '3:26', color: 'gold' },
  { title: 'Rain on Tape', genre: 'Ambient', bpm: '68 bpm', length: '5:11', color: 'violet' },
];

const moods = [
  { label: 'Rain', icon: Waves },
  { label: 'Waves', icon: Wind },
  { label: 'Fire', icon: Sparkles },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [volume, setVolume] = useState(62);
  const [progress, setProgress] = useState(38);
  const [activeMood, setActiveMood] = useState('Rain');
  const activeTrack = tracks[activeIndex];
  const progressLabel = useMemo(() => {
    const seconds = Math.round((progress / 100) * 222);
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  }, [progress]);

  function changeTrack(direction: number) {
    setActiveIndex((current) => (current + direction + tracks.length) % tracks.length);
    setProgress(0);
    setIsPlaying(true);
  }

  return (
    <main className="app-shell">
      <div className="scene" aria-hidden="true" />
      <div className="scene-shade" aria-hidden="true" />
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark"><Radio size={22} /></div>
          <div><div className="brand-name">MelaTune<span>.fm</span></div><div className="brand-caption">late night radio</div></div>
        </div>
        <nav className="station-switcher" aria-label="Station selection">
          <button className="station active">Lo-Fi</button><button className="station">DnB</button><button className="station">Synthwave</button>
        </nav>
        <div className="live-indicator"><span className="live-dot" /> LIVE <strong>19:16</strong></div>
      </header>

      <section className="center-stage">
        <div className="on-air"><span className="on-air-line" /> ON AIR <span className="on-air-line" /></div>
      </section>

      <div className="console-wrap">
        {isPlaylistOpen && <div className="playlist-popover"><div className="popover-head"><div><span>YOUR EVENING MIX</span><strong>Playlist</strong></div><button onClick={() => setIsPlaylistOpen(false)} aria-label="Close playlist"><X size={17} /></button></div>{tracks.map((track, index) => <button className={`playlist-track ${index === activeIndex ? 'selected' : ''}`} key={track.title} onClick={() => { setActiveIndex(index); setProgress(0); setIsPlaying(true); setIsPlaylistOpen(false); }}><span className="track-number">{String(index + 1).padStart(2, '0')}</span><span className={`mini-art ${track.color}`}><Moon size={14} /></span><span className="list-track-copy"><strong>{track.title}</strong><small>{track.genre} · {track.bpm}</small></span><span className="list-duration">{track.length}</span><ChevronRight className="list-arrow" size={15} /></button>)}</div>}
        <section className="console">
          <div className="transport"><button className="transport-button main" onClick={() => setIsPlaying((playing) => !playing)} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}</button><button className="transport-button" onClick={() => changeTrack(1)} aria-label="Next track"><SkipForward size={20} fill="currentColor" /></button><button className="transport-button" onClick={() => changeTrack(-1)} aria-label="Previous track"><SkipBack size={19} fill="currentColor" /></button></div>
          <div className="music-control"><div className="control-label"><span>Music</span><strong>{progressLabel} / {activeTrack.length}</strong></div><input aria-label="Music progress" className="range" type="range" min="0" max="100" value={progress} onChange={(event) => setProgress(Number(event.target.value))} /></div>
          <div className="current-song"><div><span>{activeTrack.genre}</span><strong>{activeTrack.title}</strong></div></div>
          <div className="atmosphere-control"><div className="control-label"><span>Atmosphere</span><strong>{volume}%</strong></div><input aria-label="Atmosphere volume" className="range" type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></div>
          <div className="mood-buttons">{moods.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActiveMood(label)} className={`mood-button ${activeMood === label ? 'selected' : ''}`} aria-label={`${label} ambience`}><Icon size={21} /></button>)}</div>
          <button className="playlist-button" onClick={() => setIsPlaylistOpen((open) => !open)} aria-label="Open playlist"><ListMusic size={21} /></button>
        </section>
      </div>
    </main>
  );
}

export default App;
