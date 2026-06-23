# Mars v2 Hero Video Candidates

Generated locally from the indexed `media/drone/2026` catalog; no API or new
vision pass was used. Snippets are muted H.264 MP4 previews at 1920x1080,
24 fps, 18 seconds each, with matching JPG posters.

## Ranked Candidates

### 1. `2026_chiba_orbit_solar_mural_dji0029_02m12.mp4`

- Poster: `2026_chiba_orbit_solar_mural_dji0029_02m12.jpg`
- Source: `/Users/gene/Mars/media/drone/2026/DJI_0029.MP4`
- Cut: `00:02:12-00:02:30`
- Why it might work: strongest hero candidate. Clear Chiba/campus read, solar
  panels, mural facade, trailers, mountains, and smooth aerial orbit from a 4K
  original.
- Caveats: midday light is less cinematic than the dusk shots.

### 2. `2026_chiba_sunset_wide_orbit_dji0021_02m10.mp4`

- Poster: `2026_chiba_sunset_wide_orbit_dji0021_02m10.jpg`
- Source: `/Users/gene/Mars/media/drone/2026/DJI_0021.MP4`
- Cut: `00:02:10-00:02:28`
- Why it might work: best emotional/epic feel. Dusk light, mountains, broad
  campus layout, Chiba in frame, and slow movement that should sit well behind
  hero text.
- Caveats: 1080p source and slightly darker exposure than the 4K orbit.

### 3. `2026_chiba_close_orbit_build_dji0029_01m10.mp4`

- Poster: `2026_chiba_close_orbit_build_dji0029_01m10.jpg`
- Source: `/Users/gene/Mars/media/drone/2026/DJI_0029.MP4`
- Cut: `00:01:10-00:01:28`
- Why it might work: strong Chiba identity with close orbit movement around the
  built environment and nearby structures.
- Caveats: same source as rank 1; rank 1 has a more complete campus/mountain
  composition.

### 4. `2026_chiba_build_flyover_dji0039_01m30.mp4`

- Poster: `2026_chiba_build_flyover_dji0039_01m30.jpg`
- Source: `/Users/gene/Mars/media/drone/2026/DJI_0039.MP4`
- Cut: `00:01:30-00:01:48`
- Why it might work: active build energy, colorful Chiba walls, exposed frame,
  trailers, and Salton Sea/desert context.
- Caveats: more documentary/construction than polished campus beauty; cloudy
  light is flatter.

### 5. `2026_campus_wide_trailer_ring_dji0036_04m10.mp4`

- Poster: `2026_campus_wide_trailer_ring_dji0036_04m10.jpg`
- Source: `/Users/gene/Mars/media/drone/2026/DJI_0036.MP4`
- Cut: `00:04:10-00:04:28`
- Why it might work: clean wide read of the trailer ring, Chiba, surrounding
  desert, and scale of the temporary settlement.
- Caveats: less dramatic than ranks 1-2; more overview than hero flourish.

### 6. `2026_campus_topdown_sunset_pallet_racks_dji0041_09m25.mp4`

- Poster: `2026_campus_topdown_sunset_pallet_racks_dji0041_09m25.jpg`
- Source: `/Users/gene/Mars/media/drone/2026/DJI_0041.MP4`
- Cut: `00:09:25-00:09:43`
- Why it might work: graphic top-down composition, long sunset shadows, trailer
  arc, and pallet-rack geometry.
- Caveats: more abstract; campus identity is weaker without context.

### 7. `2026_desert_sunset_approach_dji0042_01m55.mp4`

- Poster: `2026_desert_sunset_approach_dji0042_01m55.jpg`
- Source: `/Users/gene/Mars/media/drone/2026/DJI_0042.MP4`
- Cut: `00:01:55-00:02:13`
- Why it might work: gorgeous desert sunset movement and strong atmosphere.
- Caveats: campus is not visible in this cut, so it works better as mood/B-roll
  than as the main identity hero.

## Notes

- Current reference mentioned in handoff:
  `/Users/gene/Mars/media/drone/2021/flythrough_2.16.2021-74D4C.mp4`.
- Search path: `docs/media/STATUS.md`, `docs/media/COVERAGE.md`, local
  `build_media_index.py search`, SQLite catalog metadata, existing dense vision
  sidecars, and local ffmpeg frame/contact-sheet checks.
- The best immediate web hero pick is rank 1 if clarity matters most, or rank 2
  if cinematic dusk mood matters most.
