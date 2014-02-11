/**
 * Visual Blocks Language
 *
 * Copyright 2012 Massachusetts Institute of Technology. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Text blocks for Blockly, modified for App Inventor
 * @author andrew.f.mckinney@gmail.com (Andrew F. McKinney)
 * @author fraser@google.com (Neil Fraser) Due to the frequency of long strings,
 *         the 80-column wrap rule need not apply to language files.
 */

if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.text = {
  // Text value.
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : Blockly.LANG_TEXT_TEXT_HELPURL,
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.appendDummyInput().appendTitle('\u201C').appendTitle(
        new Blockly.FieldTextBlockInput(''),
        'TEXT').appendTitle('\u201D');
    this.setOutput(true, [Blockly.Language.text.connectionCheck]);
    this.setTooltip(Blockly.LANG_TEXT_TEXT_TOOLTIP);
    this.appendCollapsedInput().appendTitle('', 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_CATEGORY_TEXT }],
  prepareCollapsedText: function(){
    var textToDisplay = this.getTitleValue('TEXT');
    if (textToDisplay.length > 8 ) // 8 is a length of 5 plus 3 dots
        textToDisplay = textToDisplay.substring(0, 5) + '...';
    this.getTitle_('COLLAPSED_TEXT').setText(textToDisplay, 'COLLAPSED_TEXT');
  }
};

Blockly.Language.text.connectionCheck = function(myConnection,otherConnection) {
  var block = myConnection.sourceBlock_;
  var otherTypeArray = otherConnection.check_;
  for(var i=0;i<otherTypeArray.length;i++) {
    if(otherTypeArray[i] == "String") {
      return true;
    } else if(otherTypeArray[i] == "Number" && !isNaN(parseFloat(block.getTitleValue('TEXT')))) {
      return true;
    }
  }
  return false;
};

Blockly.Language.text_join = {
  // Create a string made up of any number of elements of any type.
  // TODO: (Andrew) Make this handle multiple arguments.
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : Blockly.LANG_TEXT_JOIN_HELPURL,
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.OUTPUT));
    this.appendValueInput('ADD0').appendTitle(Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN);
    this.appendValueInput('ADD1');
    this.setTooltip(Blockly.LANG_TEXT_JOIN_TOOLTIP);
    this.setMutator(new Blockly.Mutator(['text_join_item']));
    this.emptyInputName = 'EMPTY';
    this.repeatingInputName = 'ADD';
    this.itemCount_ = 2;
    this.appendCollapsedInput().appendTitle('join', 'COLLAPSED_TEXT');
  },
  mutationToDom: Blockly.mutationToDom,
  domToMutation: Blockly.domToMutation,
  decompose: function(workspace){
    return Blockly.decompose(workspace,'text_join_item',this);
  },
  compose: Blockly.compose,
  saveConnections: Blockly.saveConnections,
  addEmptyInput: function(){
    this.appendDummyInput(this.emptyInputName)
      .appendTitle(Blockly.LANG_TEXT_JOIN_TITLE_JOIN);
  },
  addInput: function(inputNum){
    var input = this.appendValueInput(this.repeatingInputName + inputNum).setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT));
    if(inputNum === 0){
      input.appendTitle(Blockly.LANG_TEXT_JOIN_TITLE_JOIN);
    }
    return input;
  },
  updateContainerBlock: function(containerBlock) {
    containerBlock.inputList[0].titleRow[0].setText(Blockly.LANG_TEXT_JOIN_TITLE_JOIN);
  },
  typeblock: [{ translatedName: Blockly.LANG_TEXT_JOIN_TITLE_JOIN }]

};

Blockly.Language.text_join_item = {
  // Add items.
  init: function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_TEXT_JOIN_ITEM_TITLE_ITEM);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_TEXT_JOIN_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.text_length = {
  // String length.
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : Blockly.LANG_TEXT_LENGTH_HELPURL,
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("number",Blockly.Language.OUTPUT));
    this.appendValueInput('VALUE')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH);
    this.setTooltip(Blockly.LANG_TEXT_LENGTH_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH }]
};

Blockly.Language.text_isEmpty = {
  // Is the string null?
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : Blockly.LANG_TEXT_ISEMPTY_HELPURL,
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("boolean",Blockly.Language.OUTPUT));
    this.appendValueInput('VALUE').setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
        .appendTitle(Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY);
    this.setTooltip(Blockly.LANG_TEXT_ISEMPTY_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY }]
};

Blockly.Language.text_compare = {
  // Compare two texts
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : Blockly.LANG_TEXT_COMPARE_HELPURL,
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("boolean",Blockly.Language.OUTPUT));
    this.appendValueInput('TEXT1').setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT)).appendTitle(Blockly.LANG_TEXT_COMPARE_INPUT_COMPARE);
    this.appendValueInput('TEXT2').setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT)).appendTitle(
        new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.text_compare.TOOLTIPS[mode];
    });
    this.appendCollapsedInput().appendTitle(Blockly.LANG_TEXT_COMPARE_INPUT_COMPARE, 'COLLAPSED_TEXT');
  },
  typeblock: [{
    translatedName: Blockly.LANG_TEXT_COMPARE_INPUT_COMPARE + ' <',
    dropDown: {
      titleName: 'OP',
      value: 'LT'
    }
  },{
    translatedName: Blockly.LANG_TEXT_COMPARE_INPUT_COMPARE  + ' =',
    dropDown: {
      titleName: 'OP',
      value: 'EQUAL'
    }
  },{
    translatedName: Blockly.LANG_TEXT_COMPARE_INPUT_COMPARE + ' >',
    dropDown: {
      titleName: 'OP',
      value: 'GT'
    }
  }]
};

Blockly.Language.text_compare.OPERATORS = [ [ '<', 'LT' ], [ '=', 'EQUAL' ], [ '>', 'GT' ] ];

Blockly.Language.text_compare.TOOLTIPS = {
  LT : Blockly.LANG_TEXT_COMPARE_TOOLTIP_LT,
  EQUAL : Blockly.LANG_TEXT_COMPARE_TOOLTIP_EQUAL,
  GT : Blockly.LANG_TEXT_COMPARE_TOOLTIP_GT
};

Blockly.Language.text_trim = {
  // trim string
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : Blockly.LANG_TEXT_TRIM_HELPURL,
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.OUTPUT));
    this.appendValueInput('TEXT')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_TEXT_TRIM_TITLE_TRIM);
    this.setTooltip(Blockly.LANG_TEXT_TRIM_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_TEXT_TRIM_TITLE_TRIM, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_TEXT_TRIM_TITLE_TRIM }]
};

Blockly.Language.text_changeCase = {
  // Change capitalization.
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl: function() {
      var mode = this.getTitleValue('OP');
      return Blockly.Language.text_changeCase.HELPURLS[mode];
    },
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.OUTPUT));
    this.appendValueInput('TEXT')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
      .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.text_changeCase.TOOLTIPS[mode];
    });
    this.appendCollapsedInput().appendTitle(this.getTitleValue('OP'), 'COLLAPSED_TEXT');
  },
  typeblock: [{
    translatedName: Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE,
    dropDown: {
      titleName: 'OP',
      value: 'UPCASE'
    }
  },{
    translatedName: Blockly.LANG_TEXT_CHANGECASE_OPERATOR_DOWNCASE,
    dropDown: {
      titleName: 'OP',
      value: 'DOWNCASE'
    }
  }],
  prepareCollapsedText: function(){
    var titleFromOperator = Blockly.FieldDropdown.lookupOperator(this.OPERATORS, this.getTitleValue('OP'));
    this.getTitle_('COLLAPSED_TEXT').setText(titleFromOperator, 'COLLAPSED_TEXT');
  }
};

Blockly.Language.text_changeCase.OPERATORS =
        [ [ Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE, 'UPCASE' ],
        [ Blockly.LANG_TEXT_CHANGECASE_OPERATOR_DOWNCASE, 'DOWNCASE' ] ];

Blockly.Language.text_changeCase.TOOLTIPS = {
  UPCASE : Blockly.LANG_TEXT_CHANGECASE_TOOLTIP_UPPERCASE,
  DOWNCASE : Blockly.LANG_TEXT_CHANGECASE_TOOLTIP_DOWNCASE
};

Blockly.Language.text_changeCase.HELPURLS = {
  UPCASE : Blockly.LANG_TEXT_CHANGECASE_HELPURL_UPPERCASE,
  DOWNCASE : Blockly.LANG_TEXT_CHANGECASE_HELPURL_DOWNCASE
};

Blockly.Language.text_starts_at = {
  // return index of first occurrence.
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : Blockly.LANG_TEXT_STARTS_AT_HELPURL,
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("number",Blockly.Language.OUTPUT));
    this.appendValueInput('TEXT')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_TEXT_STARTS_AT_INPUT_STARTS_AT)
      .appendTitle(Blockly.LANG_TEXT_STARTS_AT_INPUT_TEXT);
    this.appendValueInput('PIECE').setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_TEXT_STARTS_AT_INPUT_PIECE)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setTooltip(Blockly.LANG_TEXT_STARTS_AT_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_TEXT_STARTS_AT_INPUT_STARTS_AT, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_TEXT_STARTS_AT_INPUT_STARTS_AT }]
};

Blockly.Language.text_contains = {
  // Is text contained in
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : Blockly.LANG_TEXT_CONTAINS_HELPURL,
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("boolean",Blockly.Language.OUTPUT));
    this.appendValueInput('TEXT').setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
        .appendTitle(Blockly.LANG_TEXT_CONTAINS_INPUT_CONTAINS)
                .appendTitle(Blockly.LANG_TEXT_COMTAINS_INPUT_TEXT);
    this.appendValueInput('PIECE').setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT)).appendTitle(Blockly.LANG_TEXT_CONTAINS_INPUT_PIECE)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setTooltip(Blockly.LANG_TEXT_CONTAINS_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_TEXT_COMTAINS_INPUT_TEXT, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_TEXT_CONTAINS_INPUT_CONTAINS }]
};

Blockly.Language.text_split = {
  // Splits at first
  // TODO: (Hal) Make this handle type change for the dropdown.
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : function() {
      var mode = this.getTitleValue('OP');
      return Blockly.Language.text_split.HELPURLS[mode];
    },
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.OUTPUT));
    this.appendValueInput('TEXT')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS,Blockly.Language.text_split.dropdown_onchange), 'OP')
        .appendTitle(Blockly.LANG_TEXT_SPLIT_INPUT_TEXT);
    this.appendValueInput('AT')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_TEXT_SPLIT_INPUT_AT)
      .setAlign(Blockly.ALIGN_RIGHT);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.text_split.TOOLTIPS[mode];
    });
    this.appendCollapsedInput().appendTitle(this.getTitleValue('OP'), 'COLLAPSED_TEXT');
  },
  typeblock: [{
    translatedName: Blockly.LANG_TEXT_SPLIT_OPERATOR_SPLIT_AT_FIRST,
    dropDown: {
      titleName: 'OP',
      value: 'SPLITATFIRST'
    }
  },{
    translatedName: Blockly.LANG_TEXT_SPLIT_OPERATOR_SPLIT_AT_FIRST_OF_ANY,
    dropDown: {
      titleName: 'OP',
      value: 'SPLITATFIRSTOFANY'
    }
  },{
    translatedName: Blockly.LANG_TEXT_SPLIT_OPERATOR_SPLIT,
    dropDown: {
      titleName: 'OP',
      value: 'SPLIT'
    }
  },{
    translatedName: Blockly.LANG_TEXT_SPLIT_OPERATOR_SPLIT_AT_ANY,
    dropDown: {
      titleName: 'OP',
      value: 'SPLITATANY'
    }
  }],
  prepareCollapsedText: function(){
    var titleFromOperator = Blockly.FieldDropdown.lookupOperator(this.OPERATORS, this.getTitleValue('OP'));
    this.getTitle_('COLLAPSED_TEXT').setText(titleFromOperator, 'COLLAPSED_TEXT');
  }
};

Blockly.Language.text_split.dropdown_onchange = function(value) {

  if(value == 'SPLITATFIRST' || value == 'SPLIT') {
    this.sourceBlock_.getInput("AT").setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT));
  } else if(value == 'SPLITATFIRSTOFANY' || value == 'SPLITATANY') {
    this.sourceBlock_.getInput("AT").setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT));
  }
};

Blockly.Language.text_split.OPERATORS =
        [ [ Blockly.LANG_TEXT_SPLIT_OPERATOR_SPLIT_AT_FIRST, 'SPLITATFIRST' ],
    [ Blockly.LANG_TEXT_SPLIT_OPERATOR_SPLIT_AT_FIRST_OF_ANY, 'SPLITATFIRSTOFANY' ],
        [ Blockly.LANG_TEXT_SPLIT_OPERATOR_SPLIT, 'SPLIT' ],
    [ Blockly.LANG_TEXT_SPLIT_OPERATOR_SPLIT_AT_ANY, 'SPLITATANY' ] ];

Blockly.Language.text_split.TOOLTIPS = {
  SPLITATFIRST : Blockly.LANG_TEXT_SPLIT_TOOLTIP_SPLIT_AT_FIRST,
  SPLITATFIRSTOFANY : Blockly.LANG_TEXT_SPLIT_TOOLTIP_SPLIT_AT_FIRST_OF_ANY ,
  SPLIT : Blockly.LANG_TEXT_SPLIT_TOOLTIP_SPLIT,
  SPLITATANY : Blockly.LANG_TEXT_SPLIT_TOOLTIP_SPLIT_AT_ANY
};

Blockly.Language.text_split.HELPURLS = {
  SPLITATFIRST : Blockly.LANG_TEXT_SPLIT_HELPURL_SPLIT_AT_FIRST,
  SPLITATFIRSTOFANY : Blockly.LANG_TEXT_SPLIT_HELPURL_SPLIT_AT_FIRST_OF_ANY ,
  SPLIT : Blockly.LANG_TEXT_SPLIT_HELPURL_SPLIT,
  SPLITATANY : Blockly.LANG_TEXT_SPLIT_HELPURL_SPLIT_AT_ANY
};

Blockly.Language.text_split_at_spaces = {
  // Split at spaces
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : Blockly.LANG_TEXT_SPLIT_AT_SPACES_HELPURL,
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.OUTPUT));
    this.appendValueInput('TEXT').setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT)).appendTitle(Blockly.LANG_TEXT_SPLIT_AT_SPACES_TITLE);
    this.setTooltip(Blockly.LANG_TEXT_SPLIT_AT_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_TEXT_SPLIT_AT_SPACES_TITLE, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_TEXT_SPLIT_AT_SPACES_TITLE }]
};

Blockly.Language.text_segment = {
  // Create text segment
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : Blockly.LANG_TEXT_SEGMENT_HELPURL,
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.OUTPUT));
    this.appendValueInput('TEXT')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_TEXT_SEGMENT_TITLE_SEGMENT)
      .appendTitle(Blockly.LANG_TEXT_SEGMENT_INPUT_TEXT);
    this.appendValueInput('START')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("number",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_TEXT_SEGMENT_INPUT_START)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('LENGTH')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("number",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_TEXT_SEGMENT_INPUT_LENGTH)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setTooltip(Blockly.LANG_TEXT_SEGMENT_AT_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_TEXT_SEGMENT_INPUT_LENGTH, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_TEXT_SEGMENT_TITLE_SEGMENT }]
};

Blockly.Language.text_replace_all = {
  // Replace all occurrences of text
  category : Blockly.LANG_CATEGORY_TEXT,
  helpUrl : Blockly.LANG_TEXT_REPLACE_ALL_HELPURL,
  init : function() {
    this.setColour(Blockly.TEXT_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.OUTPUT));
    this.appendValueInput('TEXT')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_TEXT_REPLACE_ALL_TITLE_REPLACE_ALL)
      .appendTitle(Blockly.LANG_TEXT_REPLACE_ALL_INPUT_TEXT);
    this.appendValueInput('SEGMENT')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_TEXT_REPLACE_ALL_INPUT_SEGMENT)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('REPLACEMENT')
      .setCheck(Blockly.Language.YailTypeToBlocklyType("text",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_TEXT_REPLACE_ALL_INPUT_REPLACEMENT)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setTooltip(Blockly.LANG_TEXT_REPLACE_ALL_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_TEXT_REPLACE_ALL_INPUT_REPLACEMENT, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_TEXT_REPLACE_ALL_TITLE_REPLACE_ALL }]
};
