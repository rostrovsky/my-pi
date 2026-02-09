/**
 * Path Color Extension - highlights @ prefixed paths using the theme accent color
 *
 * Usage: pi --extension ./examples/path-color-extension.ts
 *
 * This extension colors any path that starts with @ character using the same
 * accent color used for paths in tool output.
 */

import { CustomEditor, type ExtensionAPI } from "@mariozechner/pi-coding-agent";

// Regex to match @ prefixed paths
// Matches @ followed by word characters, dots, slashes, tildes, and hyphens
const PATH_REGEX = /@[\w./~\-]+/g;

class PathColorEditor extends CustomEditor {
	constructor(
		tui: ConstructorParameters<typeof CustomEditor>[0],
		theme: ConstructorParameters<typeof CustomEditor>[1],
		keybindings: ConstructorParameters<typeof CustomEditor>[2],
		private readonly colorPath: (path: string) => string,
	) {
		super(tui, theme, keybindings);
	}

	render(width: number): string[] {
		const lines = super.render(width);

		// Keep autocomplete rendering untouched to avoid breaking fuzzy match UI.
		if (this.isShowingAutocomplete()) {
			return lines;
		}

		// Without autocomplete, editor structure is always:
		// [0] top border, [1..n-2] content, [n-1] bottom border
		return lines.map((line, index) => {
			if (index === 0 || index === lines.length - 1) return line;
			return line.replace(PATH_REGEX, (match) => this.colorPath(match));
		});
	}
}

export default function (pi: ExtensionAPI) {
	pi.on("session_start", (_event, ctx) => {
		ctx.ui.setEditorComponent((tui, theme, kb) => {
			return new PathColorEditor(tui, theme, kb, (path) => ctx.ui.theme.fg("accent", path));
		});
	});
}
