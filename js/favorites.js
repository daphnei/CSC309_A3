var USER_QUERY = "http://twitter.com/account/redirect_by_id?id=";
var TAG_QUERY = "http://twitter.com/search?src=hash&q=%23";

var favorites = {
    
    /* PUBLIC */
    tweets: new Array(),

    /**
     * Load a user's favorite tweets.
     * @param file A JSON filename to load favorites from.
     * @param target A descriptor of a listview to populate with the loaded 
     *               favorite tweets.
     *
     * @returns A list of tweet JSON objects. The format of this object is 
     *          different from that of the Twitter API's returned objects.
     */
    loadFavorites: function(file, target) {
        $.getJSON(file, function(data) {

            // go through each tweet in the file, extract the info we need, and
            // append it to the target's html.
            $.each(data, function(tweet) {
                tweet = this; 
                var user, data;
                
                // extract user info
                user = {
                    name: tweet.user.name,
                    screen_name: tweet.user.screen_name,
                    location: tweet.user.location,
                    description: tweet.user.description,
                    url: tweet.user.url,
                    account: "http://twitter.com/" + tweet.user.screen_name,
                    image: tweet.user.profile_image_url
                };
                
                // extract tweet data info
                data = {
                    text: tweet.text,
                    date: tweet.created_at,
                    links: favorites.extractLinks(tweet),
                    photos: favorites.extractPhotos(tweet),
                    mentions: favorites.extractMentions(tweet),
                    hashtags: favorites.extractTags(tweet)
                };
                
                // package the tweet, add html for it and refresh
                var tweet = { user: user, data: data };
                favorites.tweets.push(tweet);
                var html = generate.generateHTML(tweet);
                $(target).append(html);
                $(target).listview("refresh");
                
                // Bind the function that will populate the details dialog with delicious content.
                $(target).find(".tweet").click(function(event) {

                    // find the tweet this click landed on using the id
                    var id = $(this).attr("id");
                    var tweet = favorites.tweets[id];

                    if (tweet !== undefined) {
                        $("#details-header").html(generate.generateDetailsHeader(tweet)); 
                        $("#details-content").html(generate.generateDetailsContent(tweet));
                    } else {
                        console.log("Could not find tweet with id: " + id);
                    }
                });
                
            });
        });
    },

    /* "PRIVATE" */

    /**
     * Extract all the links from a tweet.
     * @param tweet A tweet JSON object created by loadFavorites.
     * 
     * @returns A list of link urls included in the tweet, or an empty array if
     *          there are no links in the tweet.
     */
    extractLinks: function(tweet) {
        var urls = tweet.entities.urls;
        if (urls !== undefined) {
            return urls.map(function(url) {
                return {
                    "url": url.url,
                    "indices": url.indices
                };
            });
        }
        
        return new Array();
    },

    /**
     * Extract all the photos from a tweet.
     * @param tweet A tweet JSON object created by loadFavorites.
     *
     * @returns A list of urls for photos attached in the tweet,
     *          or an empty array if there are no photos.
     */
    extractPhotos: function(tweet) {
        var media = tweet.entities.media;
        if (media !== undefined) {
            var photos = media.filter(function(media) {
                return media.type === "photo";
            });
            
            // only return the URLs
            return photos.map(function(photo) {
                return photo.media_url;
            });
        }

        return new Array();
    },

    /**
     * Extract all the mentions from a tweet.
     * @param tweet A tweet JSON object created by loadFavorites.
     *
     * @returns A list of mention JSON objects in the tweet,
     *          or an empty array if there are no mentions.
     */
    extractMentions: function(tweet) {
        var mentions = tweet.entities.user_mentions;
        if (mentions !== undefined) {
            return mentions.map(function(mention) {
                return {
                   "name": mention.name,
                   "screen_name": mention.screen_name,
                   "account": USER_QUERY + mention.id_str,
                   "indices": mention.indices
                };
            });
        }

        return new Array();
    },

    /**
     * Extracts all the hashtags from a tweet.
     * @param tweet A tweet JSON object created by loadFavorites.
     *
     * @returns A list of tag JSON objects from the tweet.
     */
    extractTags: function(tweet) {
        var tags = tweet.entities.hashtags;
        if (tags !== undefined) {
            return tags.map(function(tag) {
                return {
                   "text": tag.text,
                   "link": TAG_QUERY + tag.text,
                   "indices": tag.indices
                };
            });
        }
        
        return new Array();
    }
}
