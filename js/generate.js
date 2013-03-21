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

        //shtml += "<div data-role='collapsible' data-collapsed='false' class='tweet'> <h4>Hello</h4><p>World</p></div>";

        // shtml += "<li data-collapsed='false' class='tweet'>";
        
        // shtml += this.generateName(tweet);
        // shtml += this.generateAvatar(tweet);
        // shtml += BREAK;
        // shtml += this.generateText(tweet);
        // shtml += this.generateDate(tweet);
        // shtml += this.generateImages(tweet);
        // shtml += this.generateLinks(tweet);
        // shtml += this.generateTags(tweet);
        // shtml += this.generateMentions(tweet);
        
        // shtml += "</li>";
        return shtml;
    },

    generateName: function(tweet) {
        var name = tweet.user.name;
        var screen_name = tweet.user.screen_name;
        var account = tweet.user.account;
        
        shtml = "";
        //shtml += "<div class='name'>";
        shtml += "<h4>Tweet by " + name;
        shtml += " (<a href='" + account + "'>@" + screen_name + "</a>)</h4>";
        //shtml += "</div>"
        return shtml;
    },

    generateAvatar: function(tweet) {
        var account = tweet.user.account;
        var avatar = tweet.user.image;

        shtml = "";
        shtml += "<div class='avatar'>";
        shtml += "<a href='" + account + "'>";
        shtml += "<img src='" + avatar + "'/>";
        shtml += "</a>";
        shtml += "</div>";
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
