import StoryFormat from '../src/StoryFormat.js';

describe('StoryFormat', function () {
  describe('#constructor()', function () {
    it('Should throw error on non-JS-object', function () {
      expect(() => new StoryFormat('testing')).toThrow();
    });

    it('Accept object values', function () {
      const sf = new StoryFormat({ name: 'testing' });
      expect(sf.name).toBe('testing');
    });

    it('Defaults to null values', function () {
      const sf = new StoryFormat({});
      expect(sf.name).toBe(null);
    });
  });
});
