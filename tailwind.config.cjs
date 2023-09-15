/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	presets: [
    // Kompas Base Color
    require('@kompasid/colors')
  ],
	plugins: [],
}
