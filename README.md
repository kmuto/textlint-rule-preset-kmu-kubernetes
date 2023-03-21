# @kmuto/textlint-rule-preset-kmu-kubernetes

textlint rule for Kubernetes translation in Japanese

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @kmuto/textlint-rule-preset-kmu-kubernetes

## Usage

Via `.textlintrc.json`(Recommended)

```json
{
    "rules": {
        "@kmuto/preset-kmu-kubernetes": true
    }
}
```

Via CLI

```
textlint --rule @kmuto/preset-kmu-kubernetes README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

MIT © Kenshi Muto
