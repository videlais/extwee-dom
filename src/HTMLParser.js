import Story from "./Story.js";
import Passage from "./Passage.js";

/**
 * @class HTMLParser
 * @module HTMLParser
 */
class HTMLParser {
	/**
     * @method HTMLParser
     * @constructor
     */
    constructor (content) {

        this.story = null;

        this.parse(content);
    }

    parse(content) {

        let parser = new DOMParser();
        let dom = parser.parseFromString(content, "text/html");

        // Pull out the tw-storydata element
        let storyData = dom.querySelector('tw-storydata');

        this.story = new Story();

        if(storyData != null) {

            let attrs = storyData.attributes;
            this.story.name = attrs.name.nodeValue;
            this.story.creator = attrs.creator.nodeValue;
            this.story.creatorVersion = attrs["creator-version"].nodeValue;

            this.story.metadata = {};
            this.story.metadata.ifid = attrs.ifid.nodeValue;
            this.story.metadata.format = attrs.format.nodeValue;
            this.story.metadata.formatVersion = attrs["format-version"].nodeValue;
            this.story.metadata.zoom = attrs.zoom.nodeValue;
            this.story.metadata.start = attrs.startnode.nodeValue;

        } else {

            this.reportError("Error: Not a Twine 2-style file!");

        }

        // Pull out the tw-passagedata elements
        let storyPassages = dom.querySelectorAll("tw-passagedata");

        // Create an empty array
        this.story.passages = [];

          // Set default pid
        let pid = 1;

        // Add StoryTitle
        this.story.passages.push(
            new Passage(
                "StoryTitle",
                [],
                {},
                this.story.name,
                pid
            )
        );

       // Increase PID by one before parsing any other passages
       pid++;

        // Move through the passages
        for(let passage in storyPassages) {

            // Get the passage attributes
            let attr = storyPassages[passage].attributes;
            // Get the passage text
            let text = storyPassages[passage].innerText;

            if(attr !== undefined) {

              // Save position

              let position = attr.position.nodeValue;

              // Save size
              let size = attr.size.nodeValue;

              // Escape the name
              let name = attr.name.nodeValue;

              // Create empty tags
              let tags = "";

              // Escape any tags
              // (Attributes can, themselves, be emtpy strings.)
              if(attr.tags.nodeValue.length > 0 && attr.tags.nodeValue !== '""') {

                  tags = attr.tags.nodeValue;

              }

              // Split by spaces
              tags = tags.split(" ");

              // Remove any empty strings
              tags = tags.filter(tag => tag !== "");

              // Add a new Passage into an array
              this.story.passages.push(
                  new Passage(
                          name,
                          tags,
                          {
                              "position": position,
                              "size": size

                          },
                          text,
                          pid
                      )
              );

              pid++;
          
            }

        }

        // Look for the style element
        let styleElement = dom.querySelector('#twine-user-stylesheet');

        if(styleElement != null) {

          // Check if there is any content.
          // If not, we won't add empty passages
          if(styleElement.innerText.length > 0) {

            // Add UserStylesheet
            this.story.passages.push(
                new Passage(
                    "UserStylesheet",
                    ["stylesheet"],
                    {},
                    styleElement.innerText
                )
            );
          }

        }

        

        // Look for the script element
        let scriptElement = dom.querySelector('#twine-user-script');

        if(scriptElement != null) {

          // Check if there is any content.
          // If not, we won't add empty passages
          if(scriptElement.innerText.length > 0) {

            // Add UserScript
            this.story.passages.push(
                new Passage(
                    "UserScript",
                    ["script"],
                    {},
                    scriptElement.innerText
                )
            );

          }

        }
        
        // Now that all passages have been handled,
        //  change the start name
        this.story.metadata.start = this.story.getStartingPassage().toString();

        // Add StoryData
        this.story.passages.push(
            new Passage(
                "StoryData",
                [],
                {},
                JSON.stringify(this.story.metadata, null, 4)
            )
        );

    }

    _escapeMetacharacters(result) {

        // Replace any single backslash with two of them
        result = result.replace(/\\/g, "\\");
        // Double-escape escaped {
        result = result.replace(/\\\{/g, "\\\\{");
        // Double-escape escaped }
        result = result.replace(/\\\}/g, "\\\\}");
        // Double-escape escaped [
        result = result.replace(/\\\[/g, "\\\\[");
        // Double-escape escaped ]
        result = result.replace(/\\\]/g, "\\\\]");

        return result;

    }

    reportError(text) {

        let preTwee = document.querySelector("#twee");
        preTwee.innerText = text;

    }

}

export default HTMLParser;
