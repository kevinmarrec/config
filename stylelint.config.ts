// The package's own config, applied to this repo's CSS.
//
// Loaded through `extends` rather than re-exported, because stylelint transpiles this file to
// a temporary `.mjs` and hands it to Node, whose ESM resolver does no directory resolution —
// `from './packages/stylelint/src'` fails. The explicit `.ts` path works here only because
// it is a string TypeScript never resolves; as an import it would need
// `allowImportingTsExtensions`.
export default { extends: ['./packages/stylelint/src/index.ts'] }
