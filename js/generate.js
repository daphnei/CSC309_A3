var BREAK = "<br>"

var generate = {
    
    /**
     * Generate HTML from a tweet.
     * @param tweets A single tweet JSON object created by loadFavorites.
     *               Note that loadFavorites follows a different, more concise
     *               format for storing data, so don't consult the Twitter API 
     *               when accessing data from it.
     *
     * @returns A string of HTML generated from the given tweet.
     */
    generateHTML: function(tweet) {
        var shtml = "";

        shtml += "<div data-role='collapsible' data-collapsed='false' class='tweet'>";
        
        shtml += this.generateName(tweet);
        shtml += this.generateAvatar(tweet);
        shtml += BREAK;
        shtml += this.generateText(tweet);
        shtml += this.generateDate(tweet);
        shtml += this.generateImages(tweet);
        shtml += this.generateLinks(tweet);
        shtml += this.generateTags(tweet);
        shtml += this.generateMentions(tweet);
        
        shtml += "</div>";
        return shtml;
    },

    generateName: function(tweet) {
        var name = tweet.user.name;
        var screen_name = tweet.user.screen_name;

        return "<h3>Tweet by " + name + " (@" + screen_name + ")</h3>";
    },

    generateAvatar: function(tweet) {
        var account = tweet.user.account;
        var avatar = tweet.user.image;

        shtml = "";
        shtml += "<a href='" + account + "'>";
        shtml += "<img src='" + avatar + "'/>";
        shtml += "</a>";
        return shtml;
    },

    generateText: function(tweet) {
        var text = tweet.data.text;

        return "<p>" + text + "</p>";
    },

    generateDate: function(tweet) {
        var date = tweet.data.date;

        return "<p>Posted on " + date + ".</p>";
    },
    
    generateImages: function(tweet) {
        return "";
    },
    
    generateLinks: function(tweet) {
        return "";
    },
    
    generateTags: function(tweet) {
        return "";
    },
    
    generateMentions: function(tweet) {
        return "";
    }
}
