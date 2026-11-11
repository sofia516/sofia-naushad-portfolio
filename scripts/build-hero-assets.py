#!/usr/bin/env python3
"""Build centred, seamless hero video assets from the supplied introduction.
Requires ffmpeg/ffprobe, numpy and Pillow. Crop coordinates can be overridden below.
"""
from pathlib import Path
import subprocess, json, wave
import numpy as np
from PIL import Image, ImageOps, ImageEnhance

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'assets' / 'source-intro.mp4'
OUT = ROOT / 'public' / 'hero'
OUT.mkdir(parents=True, exist_ok=True)
# The supplied 1920x1080 frame shows the subject centred; this crop keeps head-to-toe.
CROP = (620, 0, 680, 1080)  # x, y, width, height
DURATION = 10.0
FADE = 0.5

def run(args): subprocess.run(args, check=True)

meta = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(SOURCE)]))
v = next(s for s in meta['streams'] if s['codec_type']=='video')
w,h = int(v['width']), int(v['height'])
x,y,cw,ch = CROP
if x+cw>w or y+ch>h: raise ValueError('Crop exceeds source dimensions; update CROP.')
# Extract a clean portrait still from the clearest supplied frame.
frame = OUT / 'source-frame.png'
run(['ffmpeg','-y','-ss','2.0','-i',str(SOURCE),'-frames:v','1',str(frame),'-loglevel','error'])
im = Image.open(frame).convert('RGB')
# portrait crop: head through shirt, retaining a little breathing room.
portrait = im.crop((max(0,x+80), 20, min(w,x+cw-80), min(h,650)))
portrait = ImageOps.fit(portrait,(480,600),method=Image.Resampling.LANCZOS,centering=(0.5,0.38))
portrait.save(ROOT/'public'/'portrait-bust.webp','WEBP',quality=88,method=6)
# Social preview based on the same still.
canvas = Image.new('RGB',(1200,630),(244,242,238))
thumb = ImageOps.fit(portrait,(430,538),method=Image.Resampling.LANCZOS,centering=(0.5,0.35))
canvas.paste(thumb,(700,46))
from PIL import ImageDraw, ImageFont
d = ImageDraw.Draw(canvas)
try:
    f1=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',62)
    f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',25)
except OSError: f1=f2=None
d.text((70,190),'SOFIA',font=f1,fill=(13,13,13)); d.text((70,270),'NAUSHAD',font=f1,fill=(13,13,13))
d.text((74,380),'PYTHON DEVELOPER',font=f2,fill=(90,90,90))
d.text((74,425),'Backend · Full-Stack · Generative AI',font=f2,fill=(90,90,90))
canvas.save(ROOT/'public'/'og.jpg',quality=90,optimize=True)
# Crop, scale and whiten the background. Keep original timing and frame rate.
raw = OUT/'hero-source.mp4'
filter_v = f"crop={cw}:{ch}:{x}:{y},scale=768:-2:flags=lanczos,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,format=yuv420p"
run(['ffmpeg','-y','-i',str(SOURCE),'-t',str(DURATION),'-vf',filter_v,'-an','-c:v','libx264','-crf','18','-preset','fast',str(raw),'-loglevel','error'])
# Cross-fade the final 0.5 s into the first 0.5 s frame-by-frame.
# This avoids FFmpeg xfade time-base differences across FFmpeg builds.
import tempfile
from PIL import Image
loop = OUT/'hero-video-only.mp4'
with tempfile.TemporaryDirectory() as td:
    td = Path(td)
    frames = td/'frames'; frames.mkdir()
    run(['ffmpeg','-y','-i',str(raw),'-vf','fps=30','-start_number','0',str(frames/'%04d.png'),'-loglevel','error'])
    paths = sorted(frames.glob('*.png'))
    overlap = int(FADE*30)
    if len(paths) < overlap*2: raise RuntimeError('Not enough frames for the requested crossfade')
    # First frames are a smooth blend from the final frames into the opening frames.
    for i in range(overlap):
        tail = Image.open(paths[-overlap+i]).convert('RGB')
        head = Image.open(paths[i]).convert('RGB')
        alpha = (i+1)/(overlap+1)
        Image.blend(tail, head, alpha).save(frames/f'blend-{i:04d}.png')
    sequence = td/'sequence'; sequence.mkdir()
    for i in range(overlap):
        (frames/f'blend-{i:04d}.png').replace(sequence/f'{i:04d}.png')
    for j, src in enumerate(paths[overlap:-overlap], start=overlap):
        import shutil; shutil.copy2(src, sequence/f'{j:04d}.png')
    run(['ffmpeg','-y','-framerate','30','-i',str(sequence/'%04d.png'),'-an','-c:v','libx264','-crf','24','-preset','slow','-pix_fmt','yuv420p',str(loop),'-loglevel','error'])
# Audio loop crossfade in numpy, with equal-power curves and no resampling/retiming.
pcm = OUT/'audio-source.wav'
run(['ffmpeg','-y','-i',str(SOURCE),'-t',str(DURATION),'-vn','-ac','2','-ar','48000','-c:a','pcm_s16le',str(pcm),'-loglevel','error'])
with wave.open(str(pcm),'rb') as wf:
    params=wf.getparams(); samples=np.frombuffer(wf.readframes(wf.getnframes()),dtype=np.int16).reshape(-1,params.nchannels).astype(np.float32)
rate=params.framerate; n=int(FADE*rate)
# Crossfade end into beginning; remove the overlapped beginning to make a seamless period.
t=np.linspace(0,np.pi/2,n,endpoint=False,dtype=np.float32)
blend=samples[-n:]*np.cos(t[:,None])+samples[:n]*np.sin(t[:,None])
joined=np.concatenate([blend,samples[n:-n]],axis=0)
joined=np.clip(joined,-32768,32767).astype(np.int16)
audio=OUT/'hero-audio.wav'
with wave.open(str(audio),'wb') as wf:
    wf.setnchannels(params.nchannels); wf.setsampwidth(2); wf.setframerate(rate); wf.writeframes(joined.tobytes())
# Mux. Audio and video both form a loop with a short overlap at the seam.
run(['ffmpeg','-y','-i',str(loop),'-i',str(audio),'-map','0:v:0','-map','1:a:0','-shortest','-c:v','copy','-c:a','aac','-b:a','96k','-movflags','+faststart',str(OUT/'hero.mp4'),'-loglevel','error'])
run(['ffmpeg','-y','-i',str(OUT/'hero.mp4'),'-c:v','libvpx-vp9','-crf','36','-b:v','0','-c:a','libopus','-b:a','80k',str(OUT/'hero.webm'),'-loglevel','error'])
for temporary in [OUT/'hero-source.mp4', OUT/'hero-video-only.mp4', OUT/'audio-source.wav', OUT/'hero-audio.wav', OUT/'source-frame.png']:
    temporary.unlink(missing_ok=True)
print('Created hero.mp4, hero.webm, portrait-bust.webp and og.jpg')
