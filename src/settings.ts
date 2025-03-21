export const profile = {
	fullName: 'Rodrigo Nicolau Almeida',
	title: 'PhD student',
	institute: 'Institute for Logic, Language and Computation of the University of Amsterdam',
	author_name: 'Rodrigo Nicolau Almeida', // Author name to be highlighted in the papers section
	research_areas: [
		// { title: 'Physics', description: 'Brief description of the research interest', field: 'physics' },
	],
}

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {
	email: 'r.dacruzsilvapinadealmeida@uva.nl',
	linkedin: '',
	x: '',
	github: '',
	gitlab: '',
	scholar: '',
	inspire: '',
	arxiv: 'https://arxiv.org/search/math?searchtype=author&query=Almeida,+R+N',
	orcid: 'https://orcid.org/0000-0002-1326-502X'
}

export const template = {
	website_url: 'https://rodrigonalmeida.github.io/', // Astro needs to know your site’s deployed URL to generate a sitemap. It must start with http:// or https://
	menu_left: false,
	transitions: true,
	lightTheme: '', // Select one of the Daisy UI Themes or create your own
	darkTheme: '', // Select one of the Daisy UI Themes or create your own
	excerptLength: 200,
	postPerPage: 5,
    base: '' // Repository name starting with /
}

export const seo = {
	default_title: 'Rodrigo Nicolau Almeida',
	default_description: 'Personal portfolio website of Rodrigo Nicolau Almeida',
	default_image: '/images/astro-academia.png',
}
