import Story from '../src/Story.js';

const testTweePassages =
[
  {
    name: 'Start',
    tags: [],
    metadata: '',
    text: 'Some content.',
    pid: 1
  },
  {
    name: 'Script1',
    tags: [
      'script'
    ],
    metadata: '',
    text: '// Some code',
    pid: 3
  },
  {
    name: 'Script2',
    tags: [
      'script'
    ],
    metadata: '',
    text: '//More code here!',
    pid: 4
  },
  {
    name: 'Style1',
    tags: [
      'stylesheet'
    ],
    metadata: '',
    text: 'body {font-size: 1.2em}',
    pid: 5
  },
  {
    name: 'Style2',
    tags: [
      'stylesheet'
    ],
    metadata: '',
    text: 'p {font-style: italic;}',
    pid: 6
  }
];

const metadataTweePassages =
[
  {
    name: 'Another',
    tags: [],
    metadata: '',
    text: 'This should be the start passage!',
    pid: 1
  },
  {
    name: 'Start',
    tags: [],
    metadata: '',
    text: 'Some content.',
    pid: 2
  },
  {
    name: 'Script1',
    tags: [
      'script'
    ],
    metadata: '',
    text: '// Some code',
    pid: 4
  },
  {
    name: 'Script2',
    tags: [
      'script'
    ],
    metadata: '',
    text: '//More code here!',
    pid: 5
  },
  {
    name: 'Style1',
    tags: [
      'stylesheet'
    ],
    metadata: '',
    text: 'body {font-size: 1.2em}',
    pid: 6
  },
  {
    name: 'Style2',
    tags: [
      'stylesheet'
    ],
    metadata: '',
    text: 'p {font-style: italic;}',
    pid: 7
  }
];

describe('Story', function () {
  describe('#constructor()', function () {
    it('Should have default values', function () {
      const s = new Story();
      expect(s.name).toBe('Unknown');
    });
  });

  describe('#getStylePassages()', function () {
    it('Should return empty array when no stylesheet-tagged passages are present', function () {
      const s = new Story();
      expect(s.getStylePassages().length).toBe(0);
    });

    it('Should return correct number of stylesheet-tagged passages', function () {
      const tp = new Story();
      tp.passages = testTweePassages;
      expect(tp.getStylePassages().length).toBe(2);
    });
  });

  describe('#getScriptPassages()', function () {
    it('Should return empty array when no script-tagged passages are present', function () {
      const s = new Story();
      expect(s.getScriptPassages().length).toBe(0);
    });

    it('Should return correct number of script-tagged passages', function () {
      const tp = new Story();
      tp.passages = testTweePassages;
      expect(tp.getScriptPassages().length).toBe(2);
    });
  });

  describe('#deleteAllByTag()', function () {
    it('Should do nothing if internal passages array is empty', function () {
      const s = new Story();
      s.passages = [];
      s.deleteAllByTag();
      expect(s.passages.length).toBe(0);
    });

    it('Should remove passages based on tag', function () {
      const tp = new Story();
      tp.passages = testTweePassages;
      tp.deleteAllByTag('script');
      expect(tp.getScriptPassages().length).toBe(0);
    });
  });

  describe('#getStartingPassage()', function () {
    it('Should throw error if no passages exist', function () {
      const s = new Story();
      expect(() => { s.getStartingPassage(); }).toThrow();
    });

    it('Should return correct PID of Start passage (skipping numbering of StoryTitle and StoryData passages)', function () {
      const tp = new Story();
      tp.passages = testTweePassages;
      expect(tp.getStartingPassage()).toBe(1);
    });

    it('Should return correct PID of Start metadata passage (skipping numbering of StoryTitle and StoryData passages)', function () {
      const tp = new Story();
      tp.passages = metadataTweePassages;
      expect(tp.getStartingPassage()).toBe(2);
    });
  });
});
