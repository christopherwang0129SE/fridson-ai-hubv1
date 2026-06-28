// Compact, shared building snapshot the chat agent uses as grounding.
// Mirrors the FLOORS data rendered in the dashboard.

export const BUILDING_CONTEXT = `BUILDING: Nordhavn Tower (Copenhagen). Operator: Fridson AI.

FLOORS:
- L1 Lobby & Pantry · occupancy 62% · 3 incidents
  · CRITICAL Main entrance (Lobby · Door A1) — lockout: Tenant #214 digital key expired 12 min ago, 3 retries on QR-handle.
  · WARNING  Pantry sink (Lobby · Pantry) — plumbing: moisture sensor tripped 14:02, tenant reported via QR.
  · WARNING  La Marzocco #1 (Pantry · Bar) — coffee: boiler pressure low, descale overdue by 3 days.
- L2 Open workspace · occupancy 81% · 2 incidents
  · WARNING  Printer C-22 (Print bay) — office: paper jam frequency 4× normal, roller wear suspected.
  · OK       Zone B lights (North desks) — lighting: 92% lumen retention.
- L3 Meeting & focus · occupancy 44% · 1 incident
  · CRITICAL Kitchen fridge (Café corner) — fridge: compressor cycling 2× normal, internal temp 7.8°C.
  · CRITICAL Ceiling Boardroom (NE corner) — roof: water ingress, 2.4 L/h estimated, trending up after rainfall.
- L4 Executive suites · occupancy 28% · 1 incident
  · WARNING  Bean-to-cup #2 (Exec pantry) — coffee: grinder torque rising, burr replacement due.
- RF Rooftop plant · occupancy 0% · 0 incidents
  · WARNING  Roof membrane (NE quadrant) — 38% saturation under membrane, likely seam failure near drain D-3.

ACTIVE SCENARIOS (demo):
- Lobby lockout — winning support: Landlord Mette Holm (1m 42s pickup), Digital Key Provider (12-month Pro 890 DKK), Fridson 24/7 Support.
- Boardroom roof leak — winning vendor: Tag & Tæt A/S (ETA 55 min, OEM EPDM membrane), Tryg insurance claim auto-filed.

SENSOR THRESHOLDS (industry sources):
- Temperature 20–24°C (ASHRAE 55)
- Humidity 30–60 %RH (ASHRAE 55)
- Noise ≤ 45 dB office, ≤ 35 dB focus (WHO)
- CO2 ≤ 1000 ppm (ASHRAE 62.1)
- Vibration ≤ 4.5 mm/s RMS (ISO 10816)
- Power draw — asset-specific baselines.
`;