var BREAK = "<br>"
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"];

/**
 * generateListView.js
 * Generate html for a tweet in the main list view.
 */
var generateListView = {
    
    /**
     * Generate HTML from a tweet.
     * @param tweets A single tweet JSON object created by loadFavorites.
     *               Note that loadFavorites follows a different, more concise
     *               format for storing data, so don't consult the Twitter API 
     *               when accessing data from it.
     * @param index The index of the tweet. By default, equal to the number of
     *              tweets currently stored so far.
     *
     * @returns A string of HTML generated from the given tweet.
     */
    generateHTML: function(tweet, index) {
        
        // id for the tweet corresponds to its index in the favorite
        // tweets list
        var index = (index !== undefined ? index : favorites.tweets.length-1);
        var id = index;
        
        // setup the tags enclosing the tweet content
        var shtml = "";
        shtml += "<li class='tweet' id='" + id + "'>";
        shtml += "<a href='#details' data-rel='popup'>";
        shtml += "<table><tr>";
        
        // generate and add in all the tweet content
        shtml += "<td>" + this.generateAvatar(tweet) + "</td>";
        shtml += "<td>";
        shtml += this.generateName(tweet);
        shtml += this.generateText(tweet);
        shtml += this.generateDateAndImageButton(tweet);
        //shtml += this.generateImages(tweet);
        shtml += this.generateLinks(tweet);
        shtml += this.generateTags(tweet);
        shtml += this.generateMentions(tweet);
        shtml += "</td>";
        
        // close the tags enclosing content
        shtml += "</tr></table></a></li>";
        return shtml;
    },

    generateName: function(tweet) {
        var name = tweet.user.name;
        var screen_name = tweet.user.screen_name;
        var account = tweet.user.account;
        
        var shtml = "";
        shtml += "<h3 class='name'>" + name;
        shtml += " <a href='" + account + "' class='usertag'>@" + screen_name + "</a></h3>";
        return shtml;
    },

    generateAvatar: function(tweet) {
        var account = tweet.user.account;
        var avatar = tweet.user.image;

        //shtml = "<a href='" + account + "'>";
        var shtml = "<img class='avatar' width='48px' src='" + avatar + "'/>";
        //shtml += "</a>";
        return shtml;
    },

    /*
    Retrieves the text of the Tweet from the JSON and formats it with correct
    hyperlinks and hashtags.
    */
    generateText: function(tweet) {
        var text = tweet.data.text;
        
        // Save up an array of objects, with two fields:
        //    text: the text of the desired insertion
        //    index: the index at which you want to insert it
        var insertions = [];
        
        // Add in links to the hash tags within the tweet text
        $.each(tweet.data.hashtags, function(index, tag) {
            // Use the tag indices to figure out where to insert the links
            insertions.push({
                text: "<a href ='" + tag.link + "' class='hashtag' target='_blank'>",
                index: tag.indices[0]
            });
            
            insertions.push({
                text: "</a>",
                index: tag.indices[1]
            });
        });
        
        // Add in links to @mentions within the tweet text
        $.each(tweet.data.mentions, function(index, mention) {
            // Same idea as the hashtags
            insertions.push({
                text: "<a href ='" + mention.account + "' class='mention' target='_blank'>",
                index: mention.indices[0]
            });
            
            insertions.push({
                text: "</a>",
                index: mention.indices[1]
            });
        });
        
        // Add in links to urls mentioned within the tweet text
        $.each(tweet.data.links, function(index, link) {
            // Same idea as the hashtags
            insertions.push({
                text: "<a href ='" + link.url + "' class='tweetlink' target='_blank'>",
                index: link.indices[0]
            });
            
            insertions.push({
                text: "</a>",
                index: link.indices[1]
            });
        });
        
        // Add in links to media urls mentioned within the tweet text
        $.each(tweet.data.media, function(index, medium) {
            // Same idea as the hashtags
            insertions.push({
                text: "<a href ='" + medium.url + "' class='tweetlink' target='_blank'>",
                index: medium.indices[0]
            });
            
            insertions.push({
                text: "</a>",
                index: medium.indices[1]
            });
        });
        
        // Now that we've built up the array of insertions, use it to insert the links at the proper location.
        text = helper.insertMultiple(text, insertions);
        
        return "<p>" + text + "</p>";
    },

    generateDateAndImageButton: function(tweet) {
        var tweetDate = new Date(tweet.data.date);
		var dateText = tweetDate.getDate() + " " + MONTHS[tweetDate.getUTCMonth()] + ", " + tweetDate.getFullYear();
        return "<p class=date>Posted on " + dateText +
                generateListView.generateImages(tweet) + "</p>";
    },
    
    generateImages: function(tweet) {
        if (tweet.data.photos.length > 0)  {
            var imageTag = "";
            for (var i = 0; i < tweet.data.photos.length; i++) {
                imageTag += ('<img src=' + tweet.data.photos[i] + '/>');
            }
            $("#images").html(imageTag);
            return "<a href='#popupPhoto' data-rel='popup' data-icon='star' data-iconpos='notext'" +
                    "data-role='button' data-mini='true' data-inline='true'>View Photo</a>";
        } else {
            return "";
        }
    },
    
    generateLinks: function(tweet) {
        return "";
    },
    
    generateTags: function(tweet) {
        return "";
    },
    
    generateMentions: function(tweet) {
        return "";
    },
};
