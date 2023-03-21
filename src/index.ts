import { moduleInterop } from '@textlint/module-interop'

const jaTechnicalWritingRules = moduleInterop(require("textlint-rule-preset-ja-technical-writing")).rules;
const jaEngineeringPaperRules = moduleInterop(require("textlint-rule-preset-ja-engineering-paper")).rules;
const jaSpacingRules = moduleInterop(require("textlint-rule-preset-ja-spacing")).rules;

module.exports = {
    rules: {
        "no-synonyms": moduleInterop(require("@textlint-ja/textlint-rule-no-synonyms")),
        "filter-rule-comments": moduleInterop(require("textlint-filter-rule-comments")),
        "no-kangxi-radicals": moduleInterop(require("textlint-rule-no-kangxi-radicals")),
        "kmu-termcheck": moduleInterop(require("@kmuto/textlint-rule-kmu-termcheck")),
        ...jaTechnicalWritingRules,
        ...jaEngineeringPaperRules,
        ...jaSpacingRules
    },
    rulesConfig: {
        "sentence-length": {
            "max": 200 // 行文字数緩和
        },
        "max-comma": false, // カンマ・読点の数の制限なし
        "max-ten": false,
        "max-kanji-continuous-len": false, // 漢字最大長。ひとまず自動検査では不要判断
        "no-mix-dearu-desumasu": {
            "preferInHeader": "",
            "preferInBody": "ですます",
            "preferInList": "である",
            "strict": false
        },
        "ja-no-mixed-period": {
            "allowPeriodMarks": ["〜", "…", "："],
            "allowEmojiAtEnd": true
        },
        "unify-kuten-and-touten": {
            "kuten": "。",
            "touten": "、"
        },
        "no-doubled-joshi": false, // 助詞連続防止は調整困難
        "no-exclamation-question-mark": false, // !,?は許可したい
        "ja-no-redundant-expression": {
           "severity": "warning" // することができる アラート。とはいえwarningにしたい
        },
        "preset-ja-spacing": {
            "ja-space-after-exclation": false, // !後の全角スペース限定やめ。本当は半角限定にしたい
            "ja-space-after-question": false // ?後も同様
        },
        "ja-hiragana-keishikimeishi": {
            "detection_ue": false // うえはむしろ漢字
        },
        "no-synonyms": {
            "allows": [""],
            preferWords: ["ユーザー", "サーバー"],
            allowAlphabet: true,
            allowNumber: false,
            allowLexme: true
        },
        "prh":
        {
            "rulePaths": [__dirname + "/../dict/prh-dic.yml"]
        },
        "kmu-termcheck": {
            "severity": "warning",
            "awsDic": false,
            "hatenaDic": false,
            "googleDic": false
        }
    }
};
