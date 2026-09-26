#!/bin/sh
# Gera assets/peeps/*.svg a partir de cast.json (Open Peeps, CC0) — rode da raiz do projeto
set -e
D=$(dirname "$0")
node "$D/gen-imports.mjs"
npx esbuild "$D/.compose-entry.jsx" --bundle --platform=node --format=cjs --outfile="$D/.compose.cjs" --log-level=warning --loader:.js=jsx
node "$D/.compose.cjs" "$D/cast.json" assets/peeps
