import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/sveltkitcrashcourse/_app/start-c7eca833.js",
			css: ["/sveltkitcrashcourse/_app/assets/start-8077b9bf.css"],
			js: ["/sveltkitcrashcourse/_app/start-c7eca833.js","/sveltkitcrashcourse/_app/chunks/vendor-2572ab99.js","/sveltkitcrashcourse/_app/chunks/paths-45dac81d.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/sveltkitcrashcourse/_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: error => {
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"favicon.png","size":1571,"type":"image/png"}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/pokemon\/([^/]+?)\/?$/,
						params: (m) => ({ id: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/pokemon/[id].svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/about\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/about.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request))
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("..\\..\\src\\routes\\__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components\\error.svelte"),"src/routes/index.svelte": () => import("..\\..\\src\\routes\\index.svelte"),"src/routes/pokemon/[id].svelte": () => import("..\\..\\src\\routes\\pokemon\\[id].svelte"),"src/routes/about.svelte": () => import("..\\..\\src\\routes\\about.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"/sveltkitcrashcourse/_app/pages/__layout.svelte-24d13d19.js","css":["/sveltkitcrashcourse/_app/assets/pages/__layout.svelte-d50fcb6b.css"],"js":["/sveltkitcrashcourse/_app/pages/__layout.svelte-24d13d19.js","/sveltkitcrashcourse/_app/chunks/vendor-2572ab99.js","/sveltkitcrashcourse/_app/chunks/paths-45dac81d.js"],"styles":null},".svelte-kit/build/components/error.svelte":{"entry":"/sveltkitcrashcourse/_app/error.svelte-7e0ae520.js","css":[],"js":["/sveltkitcrashcourse/_app/error.svelte-7e0ae520.js","/sveltkitcrashcourse/_app/chunks/vendor-2572ab99.js"],"styles":null},"src/routes/index.svelte":{"entry":"/sveltkitcrashcourse/_app/pages/index.svelte-b7eff14e.js","css":["/sveltkitcrashcourse/_app/assets/pages/index.svelte-e2408159.css"],"js":["/sveltkitcrashcourse/_app/pages/index.svelte-b7eff14e.js","/sveltkitcrashcourse/_app/chunks/vendor-2572ab99.js"],"styles":null},"src/routes/pokemon/[id].svelte":{"entry":"/sveltkitcrashcourse/_app/pages/pokemon/[id].svelte-8d00ec56.js","css":[],"js":["/sveltkitcrashcourse/_app/pages/pokemon/[id].svelte-8d00ec56.js","/sveltkitcrashcourse/_app/chunks/vendor-2572ab99.js"],"styles":null},"src/routes/about.svelte":{"entry":"/sveltkitcrashcourse/_app/pages/about.svelte-ef7a8672.js","css":[],"js":["/sveltkitcrashcourse/_app/pages/about.svelte-ef7a8672.js","/sveltkitcrashcourse/_app/chunks/vendor-2572ab99.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

init({ paths: {"base":"/sveltkitcrashcourse","assets":"/sveltkitcrashcourse"} });

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}