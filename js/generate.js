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
        //shtml += "<div class='tweet'>";
        
        shtml += this.generateAvatar(tweet);
        shtml += this.generateName(tweet);
        shtml += BREAK;
        shtml += this.generateText(tweet);
        shtml += this.generateDate(tweet);
        shtml += this.generateImages(tweet);
        shtml += this.generateLinks(tweet);
        shtml += this.generateTags(tweet);
        shtml += this.generateMentions(tweet);
        
        shtml += "</li>";
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

        shtml = "";
        shtml += "<img class='avatar' href='" + "www.google.com" + "' src='" + avatar + "'/>";
        return shtml;
    },

    generateText: function(tweet) {
        var text = tweet.data.text;
        return "<p>" + text + "</p>";
    },

    generateDate: function(tweet) {
        var tweetDate = new Date(tweet.data.date);
		var dateText = tweetDate.getDate() + " " + MONTHS[tweetDate.getUTCMonth()] + ", " + tweetDate.getFullYear();
        return "<p>Posted on " + dateText + "</p>";
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
