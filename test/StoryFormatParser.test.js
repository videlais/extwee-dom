import StoryFormatParser from '../src/StoryFormatParser.js';

const test = `{
    "random": "value"
  `;

const test2 = `{
    "malformed:
  }
  `;

const format = 'window.storyFormat({"author":"Dan Cox","description":"","image":"icon.svg","name":"Snowman","proofing":false,"source":""})';

const harlowe = 'window.storyFormat({"name":"Harlowe","version":"3.0.2","author":"Leon Arnott","description":"","image":"icon.svg","url":"http://twinery.org/","license":"Zlib","proofing":false,"source":""})';

describe('StoryFormatParser', function () {
  describe('#parse()', function () {
    it('Should throw error if JSON missing', function () {
      expect(() => new StoryFormatParser(test)).toThrow();
    });

    it('Should throw error if JSON malformed', function () {
      expect(() => new StoryFormatParser(test2)).toThrow();
    });

    it('Should correctly parse a StoryFormat name', function () {
      const sfp = new StoryFormatParser(format);
      expect(sfp.storyformat.name).toBe('Snowman');
    });

    it('Should correctly parse Harlowe story format', function () {
      const sfp = new StoryFormatParser(harlowe);
      expect(sfp.storyformat.name).toBe('Harlowe');
    });
  });
});
