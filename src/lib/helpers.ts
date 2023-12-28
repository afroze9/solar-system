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
	'Project QuantumForge'
];

export const sampleTasks = [
	{
		id: 1,
		name: 'Define Project Scope',
		description: 'Document project goals, deliverables, tasks, costs, and deadlines.'
	},
	{
		id: 2,
		name: 'Conduct Market Research',
		description: 'Research the target market and competitor products.'
	},
	{
		id: 3,
		name: 'Create a Project Plan',
		description: 'Develop a detailed plan outlining project timeline and resource allocation.'
	},
	{
		id: 4,
		name: 'Design User Interface',
		description: "Sketch the initial design of the software's user interface."
	},
	{
		id: 5,
		name: 'Develop Prototype',
		description: 'Build a basic version of the software for demonstration purposes.'
	},
	{
		id: 6,
		name: 'User Testing of Prototype',
		description: 'Conduct user testing sessions to gather feedback.'
	},
	{
		id: 7,
		name: 'Refine Requirements',
		description: 'Update project requirements based on user testing feedback.'
	},
	{
		id: 8,
		name: 'Develop Feature X',
		description: 'Code and implement a specific feature of the software.'
	},
	{
		id: 9,
		name: 'Perform Code Review for Feature X',
		description: 'Review the code for quality and adherence to standards.'
	},
	{
		id: 10,
		name: 'Integrate Third-Party APIs',
		description: 'Incorporate APIs from other services into the software.'
	},
	{
		id: 11,
		name: 'Conduct Internal Testing',
		description: 'Run tests to identify bugs or issues in the software.'
	},
	{
		id: 12,
		name: 'Fix Identified Bugs',
		description: 'Address and resolve any bugs found during testing.'
	},
	{
		id: 13,
		name: 'Prepare Documentation',
		description: 'Write user guides and technical documentation for the software.'
	},
	{
		id: 14,
		name: 'Develop Marketing Strategy',
		description: 'Plan how to market the software to the target audience.'
	},
	{
		id: 15,
		name: 'Create Promotional Materials',
		description: 'Design and produce materials for marketing the software.'
	},
	{
		id: 16,
		name: 'Launch Beta Version',
		description: 'Release a beta version of the software for early adopters.'
	},
	{
		id: 17,
		name: 'Gather Beta User Feedback',
		description: 'Collect and analyze feedback from beta users.'
	},
	{
		id: 18,
		name: 'Finalize Software for Release',
		description: 'Make final adjustments and improvements based on beta feedback.'
	},
	{
		id: 19,
		name: 'Plan Launch Event',
		description: 'Organize an event or campaign to launch the software officially.'
	},
	{
		id: 20,
		name: 'Post-Launch Review',
		description: 'Conduct a review of the launch process and gather lessons learned.'
	}
];

export function getSampleProjects(count: number): Project[] {
	let projects: Project[] = [];
	for (let i = 0; i < count; i++) {
		let colorIndex = Math.floor(Math.random() * colors.length);

		projects.push({
			id: i + 1,
			name: projectNames[i % projectNames.length],
			todoCount: 3,
			color: colors[colorIndex]
		});
	}

	return projects;
}

export function getSampleTodos(count: number): Todo[] {
	let todos: Todo[] = [];
	for (let i = 0; i < count; i++) {
		let colorIndex = Math.floor(Math.random() * colors.length);
		todos.push({
			id: i + 1,
			name: sampleTasks[i].name,
			description: sampleTasks[i].description,
			isComplete: Math.random() > 0.5,
			color: colors[colorIndex]
		});
	}

	return todos;
}
