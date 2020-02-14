import TweeParser from '../src/TweeParser.js';

const notes = `/**
These are some notes at the top of the file
*/
:: StoryTitle
twineExample

:: Start {"position":"102,104","size":"100,100"}
[[Another passage]]

[[A third passage]]

:: Another passage {"position":"353,60","size":"100,100"}
[[A fourth passage]]

[[A third passage]]

:: A third passage {"position":"350,288","size":"100,100"}
[[Start]]

:: A fourth passage {"position":"587,197","size":"100,100"}
[[A fifth passage]]

:: A fifth passage {"position":"800,306","size":"100,100"}
Double-click this passage to edit it.

:: StoryData
{
  "ifid": "2B68ECD6-348F-4CF5-96F8-549A512A8128",
  "format": "Harlowe",
  "formatVersion": "2.1.0",
  "zoom": "1"
}
`;

const example = `:: StoryTitle
twineExample

:: Start {"position":"102,104","size":"100,100"}
[[Another passage]]

[[A third passage]]

:: Another passage {"position":"353,60","size":"100,100"}
[[A fourth passage]]

[[A third passage]]

:: A third passage {"position":"350,288","size":"100,100"}
[[Start]]

:: A fourth passage {"position":"587,197","size":"100,100"}
[[A fifth passage]]

:: A fifth passage {"position":"800,306","size":"100,100"}
Double-click this passage to edit it.

:: StoryData
{
    "ifid": "2B68ECD6-348F-4CF5-96F8-549A512A8128",
    "format": "Harlowe",
    "formatVersion": "2.1.0",
    "zoom": "1"
}
`;

const test = `:: StoryTitle
twineExample

:: Start
Some content.

:: StoryData
{
    "ifid": "2B68ECD6-348F-4CF5-96F8-549A512A8128",
    "format": "Harlowe",
    "formatVersion": "2.1.0",
    "zoom": "1"
}

:: Script1 [script]
// Some code

:: Script2 [script]
//More code here!

:: Style1 [stylesheet]
body {font-size: 1.2em}

:: Style2 [stylesheet]
p {font-style: italic;}
`;

const emptytags = `:: Start []
Content
`;

const singletag = `:: Start [tag]
Content
`;

const multipletags = `:: Start [tag tags]
Content
`;

const pasagemetadataerror = `:: Start {"position}
Some content
`;

const storydataerror = `:: StoryTitle
twineExample

:: Start
Some content.

:: StoryData
{
    "ifid": 2B68ECD6-348F-4CF5-96F8-549A512A8128",
    "format": "Harlowe",
    "formatVersion": "2.1.0",
    "zoom": "1"
}

:: Script1 [script]
// Some code

:: Script2 [script]
//More code here!

:: Style1 [stylesheet]
body {font-size: 1.2em}

:: Style2 [stylesheet]
p {font-style: italic;}
`;

describe('TweeParser', function () {
  it('Should throw error if empty string is used', function () {
    expect(() => new TweeParser()).toThrow();
  });

  it('Should throw error if no passages are present', function () {
    expect(() => new TweeParser('()()')).toThrow();
  });

  it('Should cut notes before passages', function () {
    const tp = new TweeParser(notes);
    expect(tp.story.name).toBe('twineExample');
  });

  it('Should throw error if it detects malformed passage headers', function () {
    expect(() => new TweeParser('::{}[]\nNo name')).toThrow();
  });

  it('Should be able to parse Twee file for Story Name', function () {
    const tp = new TweeParser(example);
    expect(tp.story.name).toBe('twineExample');
  });

  it('Should record and erase the StoryTitle and StoryData passages', function () {
    const tp = new TweeParser(test);
    expect(tp.story.passages.length).toBe(5);
  });

  it('Should parse empty passage tags', function () {
    const tp = new TweeParser(emptytags);
    expect(tp.story.passages[0].tags.length).toBe(0);
  });

  it('Should parse single passage tag', function () {
    const tp = new TweeParser(singletag);
    expect(tp.story.passages[0].tags.length).toBe(1);
  });

  it('Should parse multiple passage tags', function () {
    const tp = new TweeParser(multipletags);
    expect(tp.story.passages[0].tags.length).toBe(2);
  });

  it('Should record passage metadata error', function () {
    const tp = new TweeParser(pasagemetadataerror);
    expect(tp._passageMetadataError).toBe(true);
  });

  it('Should record StoryData error', function () {
    const tp = new TweeParser(storydataerror);
    expect(tp._storydataError).toBe(true);
  });
});
