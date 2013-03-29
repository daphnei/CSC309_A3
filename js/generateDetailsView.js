/**
 * generateDetailsView.js
 * Generation for the more detailed view of an individual tweet.
 */
var generateDetailsView = {

    /**
     * Generates HTML for the header of the details dialog.
     * 
     * @param tweet The tweet that you're getting the details for (?).
     */
    generateDetailsHeader: function(tweet) {
        return generateListView.generateText(tweet);
        //return "<h4>" + tweet.user.name + " tweets: </h4>";
    },
    
    /**
     * Generates HTML for the content of the details dialog.
     * 
     * @param tweet The tweet that you're getting the details for (?).
     */
    generateDetailsContent: function(tweet) {
        console.log(tweet)
        return "<p>" + tweet.data.photos + "</p>";
    }
};
