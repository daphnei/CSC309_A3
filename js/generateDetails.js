/**
 * generateDetailsView.js
 * Generation for the more detailed view of an individual tweet.
 */
var generateDetails = {

    /**
     * Generates HTML for the header of the details dialog.
     * 
     * @param tweet The tweet that you're getting the details for (?).
     */
    generateDetailsHeader: function(tweet) {
        return "";//generateListView.generateText(tweet);
        //return "<h4>" + tweet.user.name + " tweets: </h4>";
    },
    
    /**
     * Generates HTML for the content of the details dialog.
     * 
     * @param tweet The tweet that you're getting the details for (?).
     */
    generateDetailsContent: function(tweet) {
        var shtml = "";
        shtml += "<div class='detail-user'>";
        shtml += "<div class='avatar'><img src='" + tweet.user.image + "'/></div>";
        
        shtml += "<div class='name'>" + tweet.user.name + "<br />";
        shtml += "<a class='usertag' href='" + tweet.user.account;
        shtml += "'>@" + tweet.user.screen_name + "</a></div>";
        shtml += "<div class='clear-both'></div></div>";

        shtml += "<div class='detail-text'>";
        shtml += "<p>" + tweet.user.description + "</p>";

        //format the location and website pretty with a dot between them like Twitter does
        shtml += "<p>"
        if (tweet.user.location != null)
            shtml += "<b>Location</b>: " + tweet.user.location;

        if (tweet.user.website != null) {
            if (tweet.user.location != null)
                shtml += "<br/>";
            shtml += "<b>Website</b>: <a href='" + tweet.user.website + "' class='tweetlink'>" + tweet.user.website;
        }
        shtml += "</p>";
        shtml += "</div>";
        shtml += "<div class='clear-both'></div>";
        return shtml;
    }
};

