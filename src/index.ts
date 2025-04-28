// noinspection JSUnusedGlobalSymbols
/**
 * Generates a unique name by appending " (n)" if needed, where n is the
 * smallest positive integer that makes the name unique among existingNames.
 *
 * If the proposedName already ends with " (x)", x is treated as part of the base
 * name for uniqueness checks (so generateUniqueName("file (1)", ["file", "file (1)"])
 * → "file (2)").
 *
 * @param {string} proposedName
 * @param {string[]} existingNames
 * @returns {string} a unique name not in existingNames
 */
export function generateUniqueName(proposedName: string, existingNames: string[]): string {
    // Escape RegExp-special characters in a string
    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Detect if the proposed name already ends with " (number)"
    const suffixRe = /(.*) \((\d+)\)$/;
    let base = proposedName;
    if (suffixRe.test(proposedName)) {
        base = proposedName.replace(suffixRe, '$1'); // drop the "(n)" for matching
    }

    // Build a regex to match exactly "base" or "base (number)"
    const matcher = new RegExp(`^${escapeRegExp(base)}(?: \\((\\d+)\\))?$`);

    // Collect all used suffix numbers; 0 means the bare base is taken
    const used = new Set();
    for (const name of existingNames) {
        const m = name.match(matcher);
        if (m) {
            // if m[1] is undefined, it's the plain base → mark 0 as used
            used.add(m[1] ? parseInt(m[1], 10) : 0);
        }
    }

    // If the base itself isn't used, return it straightaway (even if the proposedName had "(n)")
    if (!used.has(0)) {
        return base;
    }

    // Otherwise, find the smallest positive integer not in the set
    let counter = 1;
    while (used.has(counter)) {
        counter++;
    }
    return `${base} (${counter})`;
}