/**
 * generateDetailsView.js
 * Generation for the more detailed view of an individual tweet.
 */
var generateDetailsView = {

    /**
     * Generates HTML for the header of the details dialog.
     * <div class="ui-block-a">Block A</div>
                    <div class="ui-block-b">Block B</div>
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
        console.log(tweet)
        var shtml = "";
        shtml += "<div class='ui-block-a'>";
        shtml += "<img src='" + tweet.user.image + "'/>";
        shtml += "</div>";

        shtml += "<div class='ui-block-b'>";
        shtml += "<p>" + tweet.user.name + "</p>";
        shtml += "<p class='usertag'>@" + tweet.user.screen_name + "</p>";
        shtml += "</div>";

        shtml += "<div class='ui-block-c'>";
        shtml += "<p>" + tweet.user.description + "</p>";

        //format the location and website pretty with a dot between them like Twitter does
        if (tweet.user.location != null)
            shtml += "<p>" + tweet.user.location;
        else shtml += "<p>";
        if (tweet.user.website != null) {
            if (tweet.user.location != null)
                shtml += " · ";
            shtml += "<a href='" + tweet.user.website + "' class='tweetlink'>" + tweet.user.website + "</p>";
        } else{
            shtml += "</p>";
        }
        
        shtml += "</div>";
        return shtml;
    }
};

