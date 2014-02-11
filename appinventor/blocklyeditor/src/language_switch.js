Blockly.Language.language_switch = {
    // Switch between languages
    switchLanguage: function(language) {
        var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        Blockly.mainWorkspace.clear();
        switch (language) {
            case 'zh_TW':
                Blockly.Language.switch_language_to_chinese_tw.init();
                break;
            case 'de':
                Blockly.Language.switch_language_to_german.init();
                break;
            case 'vi':
                Blockly.Language.switch_language_to_vietnamese.init();
                break;
            case 'en_US':
            default:
                Blockly.Language.switch_language_to_english.init();
                break;
        }
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
};

