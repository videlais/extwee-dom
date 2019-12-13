const TweeParser = require('./src/TweeParser.js');
const HTMLParser = require('./src/HTMLParser.js');
const Story = require('./src/Story.js');
const Passage = require('./src/Passage.js');
const StoryFormat = require('./src/StoryFormat.js');
const StoryFormatParser = require('./src/StoryFormatParser.js');

window.extwee = {
  TweeParser: TweeParser,
  StoryFormat: StoryFormat,
  Passage: Passage,
  Story: Story,
  HTMLParser: HTMLParser,
  StoryFormatParser: StoryFormatParser
};
