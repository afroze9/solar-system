export const colors = [0xf39287, 0xea636f, 0x90c8d4, 0x4e9ab6, 0x90c9d5];
export const companyNames = [
  'QuantumSpectra Innovations',
  'AeroNova Dynamics',
  'NebulaByte Technologies',
  'ZenithWave Solutions',
  'NexusFusion Ventures',
  'SolarFlare Innovations',
  'CyberPulse Dynamics',
  'PinnacleGrove Enterprises',
  'SynthoSphere Systems',
  'TerraVista Innovations',
  'EclipticHorizon Technologies',
  'SynthWave Innovations',
  'StellarSync Ventures',
  'QuantumPulse Dynamics',
  'HyperCrest Enterprises',
  'NovaLink Solutions',
  'AetherRise Technologies',
  'ApexFusion Ventures',
  'QuantumSphere Innovations',
  'BlazeByte Dynamics'
];

export const projectNames = [
  'Project QuantumQuasar',
  'Operation StellarForge',
  'Project NebulaNexus',
  'Initiative TerraSynth',
  'Project ZenithWave',
  'Operation SolarSpectra',
  'Project CyberPulse',
  'Mission PinnacleVista',
  'Project SynthoSphere',
  'Operation EclipticHorizon',
  'Project SynthWaveSync',
  'Initiative StellarLink',
  'Operation QuantumPulse',
  'Project HyperCrest',
  'Mission NovaSync',
  'Project AetherRise',
  'Initiative ApexFusion',
  'Project QuantumSphereX',
  'Operation BlazeByte',
  'Project QuantumForge',
];


export function getSampleProjects(count: number): Project[] {
  let projects: Project[] = [];
  for (let i = 0; i < count; i++) {
    let colorIndex = Math.floor(Math.random() * colors.length);
    projects.push({
      id: i,
      name: projectNames[i % projectNames.length],
      todoCount: 3,
      color: colors[colorIndex]
    });
  }

  return projects;
}