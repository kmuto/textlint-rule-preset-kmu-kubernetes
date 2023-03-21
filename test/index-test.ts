import { TextLintCore } from "textlint";
import { TextlintMessage } from "@textlint/types";
import assert from "assert";
const moduleset = require("../src/index");

const defaultOptions = Object.freeze({
    rules: [],
    disabledRules: [],
    rulesConfig: {},
    filterRules: [],
    disabledFilterRules: [],
    filterRulesConfig: {},
    presets: [],
    plugins: [],
    pluginsConfig: [],
    rulesBaseDirectory: undefined,
    configFile: undefined,
    rulePaths: [],
    formatterName: undefined,
    quiet: false,
    color: true,
    textlintrc: true,
    cache: false,
    cacheLocation: undefined,
    ignoreFile: undefined
});

const buildTextlint = () => {
    const options = Object.assign({}, defaultOptions, moduleset);
    const textlint = new TextLintCore(options);
    textlint.setupRules(options.rules, options.rulesConfig);
    return textlint;
};

const testUnit = (name: string, text: string, assertion: (messages: TextlintMessage[], message: string) => void) => {
    it(name, async () => {
        const textlint = buildTextlint();
        const { messages } = await textlint.lintText(text);
        const message = messages.map((obj) => obj.message).join(" ");
        assertion(messages, message);
    });
}

describe("textlint-rule-preset-kmu-kubernetes", () => {
    context("valid", () => {
        testUnit("テンマル句読点・和欧スペースなし", "こんにちは、世界。Kubernetesへようこそ。", (_, message) => {
            assert.equal(message, "");
        });
        testUnit("カッコ半角", "これら(PodとService)が重要です。", (_, message) => {
            assert.equal(message, "");
        });
        testUnit("コロン半角", "ここで:を使います。", (_, message) => {
            assert.equal(message, "");
        });
    });
    context("invalid", () => {
        testUnit("カンマピリオドは禁止", "こんにちは，世界．Kubernetesへようこそ．", (_, message) => {
            assert.match(message, /句読点には「、」と.+文末が"。"で/);
        });
        /* うまく効いていない
        testUnit("常体は基本使わない", "これが常体である。", (_, message) => {
            assert.match(message, "");
        });*/
        testUnit("和欧間スペースは入れない", "Kubernetes へ ようこそ、Pod と Service を使ってみましょう。", (_, message) => {
            assert.match(message, /スペースを入れません/);
        });
        testUnit("カッコ全角は禁止", "これら（PodとService）が重要です。", (_, message) => {
            assert.match(message, /カッコは半角/);
        });
        testUnit("コロン全角は禁止", "ここで：を使います。", (_, message) => {
            assert.match(message, /コロンは半角/);
        });
        testUnit("カナ表記されていない", "add-onのbinaryをaggregation Layerに入れたarchitectureです。", (_, message) => {
            assert.match(message, /カナ表現推奨/);
        });
        testUnit("不適切なカナ化", "ギットハブにイシューを送ってプルリクエスト。", (_, message) => {
            assert.match(message, /英語表記/);
        });
    });
});