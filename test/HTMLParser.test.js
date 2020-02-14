import HTMLParser from '../src/HTMLParser.js';

const example = `<!DOCTYPE html><html>
<head><meta charset="utf-8">
<title>twineExample</title><style title="Twine CSS"></style>
</head><body><tw-story></tw-story>
<tw-storydata name="twineExample" startnode="1" creator="Twine" creator-version="2.2.1" ifid="2B68ECD6-348F-4CF5-96F8-549A512A8128" zoom="1" format="Harlowe" format-version="2.1.0" options="" hidden>
    <style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style>
    <script role="script" id="twine-user-script" type="text/twine-javascript"></script>
    <tw-passagedata pid="1" name="Start" tags="" position="102,104" size="100,100">[[Another passage]]

    [[A third passage]]</tw-passagedata>
    <tw-passagedata pid="2" name="Another passage" tags="" position="353,60" size="100,100">[[A fourth passage]]

    [[A third passage]] </tw-passagedata>
    <tw-passagedata pid="3" name="A third passage" tags="" position="350,288" size="100,100">[[Start]]</tw-passagedata>
    <tw-passagedata pid="4" name="A fourth passage" tags="" position="587,197" size="100,100">[[A fifth passage]]</tw-passagedata>
    <tw-passagedata pid="5" name="A fifth passage" tags="" position="800,306" size="100,100">Double-click this passage to edit it.</tw-passagedata>
</tw-storydata>
</body></html>`;

describe('HTMLParser', function () {
  describe('#parse()', function () {
    it('Should throw error if content is not Twine-2 style HTML', function () {
      expect(() => new HTMLParser('')).toThrow();
    });

    it('Should be able to parse Twine 2 HTML for story name', function () {
      const tp = new HTMLParser(example);
      expect(tp.story.name).toBe('twineExample');
    });
  });

  describe('#_escapeMetacharacters()', function () {
    it('Should escape metacharacters', function () {
      const tp = new HTMLParser(example);
      /* eslint-disable no-useless-escape */
      expect(tp._escapeMetacharacters('\\\{\\\}\\\[\\\]\\\\')).toBe('\\\\{\\\\}\\\\[\\\\]\\\\');
      /* eslint-enable no-useless-escape */
    });
  });
});
