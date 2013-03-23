var BREAK = "<br>"
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"];
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
        
        shtml += "<li class='tweet'>";
        shtml += "<table><tr>";
        
        shtml += "<td>" + this.generateAvatar(tweet) + "</td>";
        shtml += "<td>";
        shtml += this.generateName(tweet);
        shtml += this.generateText(tweet);
        shtml += this.generateDate(tweet);
        shtml += this.generateImages(tweet);
        shtml += this.generateLinks(tweet);
        shtml += this.generateTags(tweet);
        shtml += this.generateMentions(tweet);
        shtml += "</td>";
        
        shtml += "</tr></table></li>";
        return shtml;
    },

    generateName: function(tweet) {
        var name = tweet.user.name;
        var screen_name = tweet.user.screen_name;
        var account = tweet.user.account;
        
        shtml = "";
        shtml += "<h3 class='name'>" + name;
        shtml += " <a href='" + account + "' class='usertag'>@" + screen_name + "</a></h3>";
        return shtml;
    },

    generateAvatar: function(tweet) {
        var account = tweet.user.account;
        var avatar = tweet.user.image;

        shtml = "<a href='" + account + "'>";
        shtml += "<img class='avatar' src='" + avatar + "'/>";
        shtml += "</a>";
        return shtml;
    },

    generateText: function(tweet) {
        var text = tweet.data.text;
        
        // Save up an array of objects, with two fields:
        //    text: the text of the desired insertion
        //    index: the index at which you want to insert it
        var insertions = [];
        
        // Add in links to the hash tags within the tweet text
        var tags = tweet.data.hashtags;
        for (var i = 0; i < tags.length; i++) {
            // Use the tag indices to figure out where to insert the links
            insertions.push({
                text: "<a href ='" + tags[i].link + "' class='hashtag'>",
                index: tags[i].indices[0]
            });
            
            insertions.push({
                text: "</a>",
                index: tags[i].indices[1]
            });
        }
        
        // Now that we've built up these arrays, use them to insert the tags at the proper location.
        text = helper.insertMultiple(text, insertions);
        
        return "<p>" + text + "</p>";
    },

    generateDate: function(tweet) {
        var tweetDate = new Date(tweet.data.date);
		var dateText = tweetDate.getDate() + " " + MONTHS[tweetDate.getUTCMonth()] + ", " + tweetDate.getFullYear();
        return "<p class=date>Posted on " + dateText + "</p>";
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
