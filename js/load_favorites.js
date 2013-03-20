var USER_QUERY = "http://twitter.com/account/redirect_by_id?id=";
var TAG_QUERY = "http://twitter.com/search?q=";

/* PUBLIC */

/**
 * Load a user's favorite tweets.
 * @param file A JSON filename to load favorites from.
 * @param target A descriptor to populate with the loaded favorite tweets.
 * @returns A list of tweet JSON objects. The format of this object is different
 * from that of the Twitter API's returned objects.
 */
var loadFavorites = function(file, target) {
    $.getJSON(file, function(data) {

        // go through each tweet in the file, extract the info we need, and
        // append it to the target's html.
        $.each(data, function(tweet) {
            tweet = this; 
            var user, data;
            
            // extract user info
            user = {
                "name": tweet.user.name,
                "screen_name": tweet.user.screen_name,
                "location": tweet.user.location,
                "description": tweet.user.description,
                "url": tweet.user.url,
                "account": USER_QUERY + tweet.user.id_str,
                "image": tweet.user.profile_image_url
            };
            
            // extract tweet data info
            data = {
                "text": tweet.text,
                "date": tweet.created_at,
                "links": extractLinks(tweet),
                "photos": extractPhotos(tweet),
                "mentions": extractMentions(tweet),
                "hashtags": extractTags(tweet)
            };
            
            var html = generateHTML({ "user": user, "data": data });
            $(target).append(html);
        });
    });
};

/**
 * Generate HTML from a tweet.
 * @param tweets A single tweet JSON object created by loadFavorites.
 *               Note that loadFavorites follows a different, more concise
 *               format for storing data, so don't consult the Twitter API when
 *               accessing data from it.
 * @returns A string of HTML generated from the given tweet.
 */
var generateHTML = function(tweet) {
    var shtml = "";
    var user = tweet.user;
    var data = tweet.data;

    shtml = shtml + "<div data-role='collapsible' data-collapsed='false' class='tweet'>";
    shtml = shtml + "<h3>Tweet by " + user.name + "</h3>";
    shtml = shtml + "<a href='" + user.account + "'>";
    shtml = shtml + "<img src='" + user.image + "'/>";
    shtml = shtml + "</a><br/>";
    shtml = shtml + "<p>' " + data.text + " '</p>";
    shtml = shtml + "<p>Created on " + data.date + "</p>";
    shtml = shtml + "</div>";

    return shtml;
}

/* "PRIVATE" */

/**
 * Extract all the links from a tweet.
 * @param tweet A tweet JSON object created by loadFavorites.
 * 
 * @returns A list of link urls included in the tweet, or an empty array if
 *          there are no links in the tweet.
 */
function extractLinks(tweet) {
    var urls = tweet.entities.urls;
    if (urls !== undefined) {
        return urls.map(function(url) {
            return url.url;
        });
    }
    
    return new Array();
}

/**
 * Extract all the photos from a tweet.
 * @param tweet A tweet JSON object created by loadFavorites.
 *
 * @returns A list of urls for photos attached in the tweet,
 *          or an empty array if there are no photos.
 */
function extractPhotos(tweet) {
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
}

/**
 * Extract all the mentions from a tweet.
 * @param tweet A tweet JSON object created by loadFavorites.
 *
 * @returns A list of mention JSON objects in the tweet,
 *          or an empty array if there are no mentions.
 */
function extractMentions(tweet) {
    var mentions = tweet.entities.user_mentions;
    if (mentions !== undefined) {
        return mentions.map(function(mention) {
            return {
               "name": mention.name,
               "screen_name": mention.screen_name,
               "account": USER_QUERY + mention.id_str
            };
        });
    }

    return new Array();
}

/**
 * Extracts all the hashtags from a tweet.
 * @param tweet A tweet JSON object created by loadFavorites.
 *
 * @returns A list of tag JSON objects from the tweet.
 */
function extractTags(tweet) {
    var tags = tweet.entities.hashtags;
    if (tags !== undefined) {
        return tags.map(function(tag) {
            return {
               "text": tag.text,
               "link": TAG_QUERY + tag.text
            };
        });
    }
    
    return new Array();
}
