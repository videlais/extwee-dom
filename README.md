# Extwee-DOM

Extwee-DOM is a browser-compatible verison of [Extwee](https://github.com/videlais/extwee).

The latest build can be found in the `dist` folder: [extwee-dom.js](https://github.com/videlais/extwee-dom/blob/master/dist/extwee-dom.js).

## Building

New builds can be generated from source using `npm run build` using WebPack + Babel.

----

## API Usage

Extwee can be used via the global `window.extwee`.

### *TweeParser*

*TweeParser* accepts Twee textual content and saves an internal *Story* object populated with any passages found.

`let tp = new window.extwee.TweeParser("tweeContent");`

#### Properties

* *story*: The internal *Story* object created and populated during parsing.

### *StoryFormat*

*StoryFormat* accepts a JS object (and will throw an error if not).

It is uncommon for *StoryFormat* to be used directly.

#### Properties

* *name*: Name of the story format.
* *version*: Version of the story format.
* *description*: Description of the story format.
* *author*: Author of the story format.
* *image*: Logo image URL
* *url*: URL of story format
* *license*: License of the story format
* *proofing*: If story format is a proofing story format or not
* *source*: The JS source of the story format

### *Passage*

*Passage* represents a single passage in a Twine story. It accepts `name` (String), `tags` (Array), `metadata` (JS Object), `text` (String), and `pid` (Integer).

It is uncommon for *Passage* to be used directly.

#### Properties:

* *name*: Name of passage.
* *tags*: Array of any tags.
* *metadata*: Object holding any passage metadata
* *text*: Text of the passage.
* *pid*: Passage Identification Number (PID)

### *Story*

The *Story* object holds all information about a Twine story including its metadata, passages, and name.

`let s = new window.extwee.Story();`

#### Properties

* *name*: Name of the story. (Defaults to "Unknown").
* *metadata*: Story metadata represented by `StoryData` passage in Twee 3
* *passages*: Array of *Passage* objects.
* *creator*: Set to `version.json` name (i.e. Exwee).
* *creatorVersion*: Set to `version.json` version.

#### Functions

* *getStylePassages()*: Returns an array of any passages with the tag "stylesheet".
* *getScriptPassages()*: Returns an array of any passages with the tag "script".
* *deleteAllByTag(tag)*: Deletes any passages with the tag `tag`.
* *getStartingPassage()*: Returns the PID of the starting passage (either `Start` or `StoryData`'s' `start` override, if found).

### *StoryFormatParser*

*StoryFormatParser* accepts the content of a story format's `format.js` file. Upon successful parsing, it keeps an internal *StoryFormat* object.

`let sfp = new window.extwee.StoryFormatParser("format.js content");`

#### Properties

* *storyFormat*: Either `null` (upon failure to parse) or a *StoryFormat* object

### *HTMLParser*

*HTMLParser* accepts HTML content to parse. Upon successful parsing, it stores an internal *Story* object.

`let hp = new window.extwee.HTMLParser("Twine-2 HTML content");`

#### Properties

* *story*: Upon successful parsing, this object will hold the story and all passages found.

