import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { readFileSync } from 'fs';


let bannerContent = `/*!
* namecrement v%VERSION%
* (c) Hichem Taboukouyout
* Released under the MIT License.
* Github: github.com/HichemTab-tech/Namecrement
*/
   `;

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));
bannerContent = bannerContent.replace('%VERSION%', packageJson.version);

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'), // Library entry point
            name: 'Namecrement',
            fileName: (format: string) => `namecrement${format === 'es' ? '' : '.min'}.js`,
            formats: ['es', 'umd'],
        },
        terserOptions: {
            format: {
                comments: false
            }
        }
    },
    plugins: [
        banner(bannerContent),
        dts({
            entryRoot: 'src', // Base folder for type generation
            outDir: 'dist', // Ensures types go into `dist/`
            insertTypesEntry: true, // Adds the `types` field in package.json
            exclude: ['node_modules', 'dist'], // Exclude unnecessary files
        })
    ]
});