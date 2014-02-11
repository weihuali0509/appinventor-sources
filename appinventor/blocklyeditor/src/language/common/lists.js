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
 * @fileoverview List blocks for Blockly, modified for App Inventor
 * @author fraser@google.com (Neil Fraser)
 * @author andrew.f.mckinney@gmail.com (Andrew F. McKinney)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.lists_create_with = {
  // Create a list with any number of elements of any type.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_CREATE_WITH_EMPTY_HELPURL,
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('ADD0')
      .appendTitle(Blockly.LANG_LISTS_CREATE_WITH_TITLE_MAKE_LIST);
    this.appendValueInput('ADD1');
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.OUTPUT));
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip(Blockly.LANG_LISTS_CREATE_WITH_TOOLTIP);
    this.itemCount_ = 2;
    this.emptyInputName = 'EMPTY';
    this.repeatingInputName = 'ADD';
    this.appendCollapsedInput().appendTitle('make a list', 'COLLAPSED_TEXT');
  },
  mutationToDom: Blockly.mutationToDom,
  domToMutation: Blockly.domToMutation,
  decompose: function(workspace){
    return Blockly.decompose(workspace,'lists_create_with_item',this);
  },
  compose: Blockly.compose,
  saveConnections: Blockly.saveConnections,
  addEmptyInput: function(){
    this.appendDummyInput(this.emptyInputName)
      .appendTitle(Blockly.LANG_LISTS_CREATE_EMPTY_TITLE);
  },
  addInput: function(inputNum){
    var input = this.appendValueInput(this.repeatingInputName + inputNum);
    if(inputNum === 0){
      input.appendTitle(Blockly.LANG_LISTS_CREATE_WITH_TITLE_MAKE_LIST);
    }
    return input;
  },
  updateContainerBlock: function(containerBlock) {
    containerBlock.setTitleValue(Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD,"CONTAINER_TEXT");
  },
  // create type blocks for both make a list (two items) and create empty list
  typeblock: [
      { translatedName: Blockly.LANG_LISTS_CREATE_WITH_TITLE_MAKE_LIST },
      { translatedName: Blockly.LANG_LISTS_CREATE_EMPTY_TITLE,
        mutatorAttributes: { items: 0 } }]

};

Blockly.Language.lists_create_with_item = {
  // Add items.
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.lists_add_items = {
  // Create a list with any number of elements of any type.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_ADD_ITEMS_HELPURL,
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT))
                .appendTitle(Blockly.LANG_LISTS_ADD_ITEMS_TITLE_ADD).appendTitle(' list');
    this.appendValueInput('ITEM0')
                .appendTitle(Blockly.LANG_LISTS_ADD_ITEMS_INPUT_ITEM).setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_ADD_ITEMS_TOOLTIP);
    this.setMutator(new Blockly.Mutator(['lists_add_items_item']));
    this.itemCount_ = 1;
    this.emptyInputName = null;
    this.repeatingInputName = 'ITEM';
    this.appendCollapsedInput().appendTitle('add items list', 'COLLAPSED_TEXT');
  },
  mutationToDom: Blockly.mutationToDom,
  domToMutation: Blockly.domToMutation,
  decompose: function(workspace){
    return Blockly.decompose(workspace,'lists_add_items_item',this);
  },
  compose: Blockly.compose,
  saveConnections: Blockly.saveConnections,
  addEmptyInput: function(){},
  addInput: function(inputNum){
    var input = this.appendValueInput(this.repeatingInputName + inputNum);
    input.appendTitle(Blockly.LANG_LISTS_ADD_ITEMS_INPUT_ITEM).setAlign(Blockly.ALIGN_RIGHT);
    return input;
  },
  updateContainerBlock: function(containerBlock) {
    containerBlock.setTitleValue(Blockly.LANG_LISTS_ADD_ITEMS_CONTAINER_TITLE_ADD,"CONTAINER_TEXT");
    containerBlock.setTooltip(Blockly.LANG_LISTS_ADD_ITEMS_CONTAINER_TOOLTIP);
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_ADD_ITEMS_TITLE_ADD }]

};

Blockly.Language.lists_add_items_item = {
  // Add items.
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LISTS_ADD_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_LISTS_ADD_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.lists_is_in = {
  // Is in list?.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_IS_IN_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("boolean",Blockly.Language.OUTPUT));
    this.appendValueInput('ITEM')
        .appendTitle( Blockly.LANG_LISTS_IS_IN_TITLE_IS_IN)
        .appendTitle(Blockly.LANG_LISTS_IS_IN_INPUT_THING);
    this.appendValueInput('LIST').setCheck(Array)
        .appendTitle(Blockly.LANG_LISTS_IS_IN_INPUT_LIST).setAlign(Blockly.ALIGN_RIGHT);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_IS_IN_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_IS_IN_INPUT_LIST, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_IS_IN_TITLE_IS_IN }]
};

Blockly.Language.lists_length = {
  // Length of list.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_LENGTH_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("number",Blockly.Language.OUTPUT));
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT))
        .appendTitle(Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH)
        .appendTitle(Blockly.LANG_LISTS_LENGTH_INPUT_LIST);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_LENGTH_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH }]
};

Blockly.Language.lists_is_empty = {
  // Is the list empty?.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_IS_EMPTY_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("boolean",Blockly.Language.OUTPUT));
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("boolean",Blockly.Language.OUTPUT))
          .appendTitle(Blockly.LANG_LISTS_TITLE_IS_EMPTY)
          .appendTitle(Blockly.LANG_LISTS_INPUT_LIST);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_TITLE_IS_EMPTY, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_TITLE_IS_EMPTY }]
};

Blockly.Language.lists_pick_random_item = {
  // Length of list.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_PICK_RANDOM_ITEM_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, null);
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT))
                .appendTitle(Blockly.LANG_LISTS_PICK_RANDOM_TITLE_PICK_RANDOM)
                .appendTitle(Blockly.LANG_LISTS_PICK_RANDOM_ITEM_INPUT_LIST);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_PICK_RANDOM_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_PICK_RANDOM_TITLE_PICK_RANDOM, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_PICK_RANDOM_TITLE_PICK_RANDOM }]
};

Blockly.Language.lists_position_in = {
  // Postion of item in list.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_POSITION_IN_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("number",Blockly.Language.OUTPUT));

    this.appendValueInput('ITEM')
      .appendTitle(Blockly.LANG_LISTS_POSITION_IN_TITLE_POSITION)
      .appendTitle(Blockly.LANG_LISTS_POSITION_IN_INPUT_THING);
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_LISTS_POSITION_IN_INPUT_LIST)
      .setAlign(Blockly.ALIGN_RIGHT);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_POSITION_IN_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_POSITION_IN_TITLE_POSITION, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_POSITION_IN_TITLE_POSITION }]
};

Blockly.Language.lists_select_item = {
  // Select from list an item.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_SELECT_ITEM_TITLE_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, null);
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT))
      .appendTitle(Blockly.LANG_LISTS_SELECT_ITEM_TITLE_SELECT)
      .appendTitle(Blockly.LANG_LISTS_SELECT_ITEM_INPUT_LIST);
    this.appendValueInput('NUM').setCheck(Number)
      .appendTitle(Blockly.LANG_LISTS_SELECT_ITEM_INPUT_INDEX)
      .setAlign(Blockly.ALIGN_RIGHT);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_SELECT_ITEM_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_SELECT_ITEM_TITLE_SELECT, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_SELECT_ITEM_TITLE_SELECT }]
};

Blockly.Language.lists_insert_item = {
  // Insert Item in list.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_INSERT_ITEM_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT)).appendTitle('insert list item').appendTitle('list');
    this.appendValueInput('INDEX').setCheck(Blockly.Language.YailTypeToBlocklyType("number",Blockly.Language.INPUT)).appendTitle('index').setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('ITEM').setCheck(Blockly.Language.YailTypeToBlocklyType("any",Blockly.Language.INPUT)).appendTitle('item').setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_INSERT_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_SELECT_ITEM_TITLE_SELECT }]
};

Blockly.Language.lists_insert_item = {
  // Insert Item in list.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_INSERT_ITEM_HELPURL,
  init : function(, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_INSERT_TITLE_INSERT_LIST }]
};

Blockly.Language.lists_replace_item = {
  // Replace Item in list.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_REPLACE_ITEM_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT))
                .appendTitle(Blockly.LANG_LISTS_REPLACE_ITEM_TITLE_REPLACE)
                .appendTitle(Blockly.LANG_LISTS_REPLACE_ITEM_INPUT_LIST);
    this.appendValueInput('NUM').setCheck(Blockly.Language.YailTypeToBlocklyType("number",Blockly.Language.INPUT))
                .appendTitle(Blockly.LANG_LISTS_REPLACE_ITEM_INPUT_INDEX)
                .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('ITEM')
                .appendTitle(Blockly.LANG_LISTS_REPLACE_ITEM_INPUT_REPLACEMENT)
                .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_REPLACE_ITEM_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_REPLACE_ITEM_TITLE_REPLACE, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_REPLACE_ITEM_TITLE_REPLACE }]
};

Blockly.Language.lists_remove_item = {
  // Remove Item in list.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_REMOVE_ITEM_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT))
                .appendTitle(Blockly.LANG_LISTS_REMOVE_ITEM_TITLE_REMOVE)
                .appendTitle(Blockly.LANG_LISTS_REMOVE_ITEM_INPUT_LIST);
    this.appendValueInput('INDEX').setCheck(Blockly.Language.YailTypeToBlocklyType("number",Blockly.Language.INPUT))
                .appendTitle(Blockly.LANG_LISTS_REMOVE_ITEM_INPUT_INDEX)
                .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_REMOVE_ITEM_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_REMOVE_ITEM_TITLE_REMOVE, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_REMOVE_ITEM_TITLE_REMOVE }]
};

Blockly.Language.lists_append_list = {
  // Append to list.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_APPEND_LIST_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST0').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT))
                .appendTitle(Blockly.LANG_LISTS_APPEND_LIST_TITLE_APPEND)
                .appendTitle(Blockly.LANG_LISTS_APPEND_LIST_INPUT_LIST1);
    this.appendValueInput(Blockly.LANG_LISTS_APPEND_LIST_INPUT_LIST1).setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT))
                .appendTitle(Blockly.LANG_LISTS_APPEND_LIST_INPUT_LIST2).setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_APPEND_LIST_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_APPEND_LIST_TITLE_APPEND, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_APPEND_LIST_TITLE_APPEND }]
};

Blockly.Language.lists_copy = {
  // Make a copy of list.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_COPY_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.OUTPUT));
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT)).appendTitle('copy list').appendTitle('list');
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_COPY_TOOLTIP);
    this.appendCollapsedInput().appendTitle('copy', 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_COPY_TITLE_COPY }]
};

Blockly.Language.lists_is_list = {
  // Is a list?
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_IS_LIST_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("boolean",Blockly.Language.OUTPUT));
    this.appendValueInput('ITEM')
                .appendTitle(Blockly.LANG_LISTS_IS_LIST_TITLE_IS_LIST)
                .appendTitle(Blockly.LANG_LISTS_IS_LIST_INPUT_THING);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_IS_LIST_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_IS_LIST_TITLE_IS_LIST, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_IS_LIST_TITLE_IS_LIST }]
};

Blockly.Language.lists_to_csv_row = {
  // Make a csv row from list.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_TO_CSV_ROW_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT));
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT))
                .appendTitle(Blockly.LANG_LISTS_TO_CSV_ROW_TITLE_TO_CSV)
                .appendTitle(Blockly.LANG_LISTS_TO_CSV_ROW_INPUT_LIST);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_TO_CSV_ROW_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_TO_CSV_ROW_TITLE_TO_CSV, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_TO_CSV_ROW_TITLE_TO_CSV }]
};

Blockly.Language.lists_to_csv_table = {
  // Make a csv table from list.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_TO_CSV_TABLE_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT));
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT))
                .appendTitle(Blockly.LANG_LISTS_TO_CSV_TABLE_TITLE_TO_CSV)
                .appendTitle(Blockly.LANG_LISTS_TO_CSV_TABLE_INPUT_LIST);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_TO_CSV_TABLE_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_TO_CSV_TABLE_TITLE_TO_CSV, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_TO_CSV_TABLE_TITLE_TO_CSV }]
};

Blockly.Language.lists_from_csv_row = {
  // Make list from csv row.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_FROM_CSV_ROW_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.OUTPUT));
    this.appendValueInput('TEXT').setCheck(String)
                .appendTitle(Blockly.LANG_LISTS_FROM_CSV_ROW_TITLE_FROM_CSV)
                .appendTitle(Blockly.LANG_LISTS_FROM_CSV_ROW_INPUT_TEXT);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_FROM_CSV_ROW_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_FROM_CSV_ROW_TITLE_FROM_CSV, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_FROM_CSV_ROW_TITLE_FROM_CSV }]
};

Blockly.Language.lists_from_csv_table = {
  // Make list from csv table.
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_FROM_CSV_TABLE_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.OUTPUT));
    this.appendValueInput('TEXT').setCheck(String)
                .appendTitle(Blockly.LANG_LISTS_FROM_CSV_TABLE_TITLE_FROM_CSV)
                .appendTitle(Blockly.LANG_LISTS_FROM_CSV_TABLE_INPUT_TEXT);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_FROM_CSV_TABLE_TOOLTIP);
    this.appendCollapsedInput().appendTitle(Blockly.LANG_LISTS_FROM_CSV_TABLE_TITLE_FROM_CSV, 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_FROM_CSV_TABLE_TITLE_FROM_CSV }]
};

Blockly.Language.lists_lookup_in_pairs = {
  // Look up in a list of pairs (key, value).
  category : Blockly.LANG_CATEGORY_LISTS,
  helpUrl : Blockly.LANG_LISTS_LOOKUP_IN_PAIRS_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Language.YailTypeToBlocklyType("any",Blockly.Language.OUTPUT));
    this.appendValueInput('KEY').setCheck(Blockly.Language.YailTypeToBlocklyType("any",Blockly.Language.INPUT)).appendTitle('lookup in pairs').appendTitle('key');
    this.appendValueInput('LIST').setCheck(Blockly.Language.YailTypeToBlocklyType("list",Blockly.Language.INPUT)).appendTitle('pairs').setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('NOTFOUND').setCheck(Blockly.Language.YailTypeToBlocklyType("any",Blockly.Language.INPUT)).appendTitle('notFound').setAlign(Blockly.ALIGN_RIGHT);
    Blockly.Language.setTooltip(this, Blockly.LANG_LISTS_LOOKUP_IN_PAIRS_TOOLTIP);
    this.appendCollapsedInput().appendTitle('lookup', 'COLLAPSED_TEXT');
  },
  typeblock: [{ translatedName: Blockly.LANG_LISTS_LOOKUP_IN_PAIRS_TITLE_LOOKUP_IN_PAIRS }]
};
