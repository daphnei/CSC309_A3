var USER_QUERY = "http://twitter.com/account/redirect_by_id?id=";
var TAG_QUERY = "http://twitter.com/search?src=hash&q=%23";

var favorites = {
    
    /* PUBLIC */
    tweets: new Array(),
	
	tweetIndex: 0, //Our current index in tweets. all tweets previous to this
					//index have already been rendered on to the page.
	
	TWEETS_PER_SCROLL: 6, //A constant indicating the number of tweets to RENDER
						   //each time the user gets to the bottom of the page

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
                    location: tweet.user.location.length > 0? tweet.user.location : null,
                    description: tweet.user.description,
                    website: tweet.user.url,
                    account: "http://twitter.com/" + tweet.user.screen_name,
                    background: tweet.user.profile_background_image_url, 
                    image: tweet.user.profile_image_url
                };
                
                // extract tweet data info
                data = {
                    text: tweet.text,
                    date: tweet.created_at,
                    // need to refer to module by name since we're in a
                    // different namespace in this callback
                    links: favorites.extractLinks(tweet),
                    photos: favorites.extractPhotos(tweet),
                    media: favorites.extractMedia(tweet),
                    mentions: favorites.extractMentions(tweet),
                    hashtags: favorites.extractTags(tweet)
                };
                
                // package the tweet, add html for it and refresh
                var tweet = { user: user, data: data };
                favorites.tweets.push(tweet);
			});
                            
			//render the first batch of tweets
			favorites.renderFavorites(target);
        });
    },


	renderFavorites: function(target) {
		var i = this.tweetIndex;
		
		//iterate through the next batch of tweets to be rendered, but stop
		//if we get to the end of the tweet list.
		while ((i < this.tweetIndex + this.TWEETS_PER_SCROLL)
				&& (i < this.tweets.length)) {
					
			var tweet = this.tweets[i];
		
			var html = list.generateHTML(tweet, true, i);
			
			var domTweet = $(html);
			
			// Bind the function that will populate the details dialog with delicious content.
			domTweet.click(function(event) {
                
                // disable background scrolling
                document.body.style.overflow = "hidden";
                $("#details").bind({ popupafterclose: function(event, ui) {
                        document.body.style.overflow = "auto";
                    }
                });

                // display the tweet
				tweet = favorites.getTweetObject(this);
                
				if (tweet !== undefined) {
					$("#details-header").html(details.generateDetailsHeader(tweet)); 
					$("#user-tweets").html(details.generateDetailsContent(tweet));
                    $("#user-tweets").listview("refresh");
				}
			});
			
			// Bind the function that will populate the image popup with purty pictures.
			domTweet.find(".photo-button").click(function(event) {
			
			    tweet = favorites.getTweetObject($(this).parents(".tweet")[0]);
			    
			    if (tweet !== undefined) {
    			    var imageTag = "";
    			    for (var i = 0; i < tweet.data.photos.length; i++) {
    			        imageTag += ('<img src=' + tweet.data.photos[i] + '/>');
    			    }
    			    $("#images").html(imageTag);
    			    
    			    // Wait for the image to load before popping up the popup.
    			    $("#images img").load(function() {
    			        $("#popupPhoto").popup("open");
    					// Clear the fallback
    					clearTimeout(fallback);
    			    });
    			    
    			    // Fallback in case the browser doesn't fire a load event
    			    var fallback = setTimeout(function() {
    			    	$("#popupPhoto").popup("open");
    			    }, 2000);
			    }
			});
			
			$(target).append(domTweet);
			$(target).listview("refresh");
			$("a[data-role='button']").button();
			
			i++;
		}
		this.tweetIndex += this.TWEETS_PER_SCROLL;
	},

    /**
     * Get whether or not there are tweets left to be rendered.
     *
     * @returns true if there are tweets left to be rendered, false
     *          otherwise.
     */
	unrenderedTweets: function() {
		return this.tweetIndex < this.tweets.length; 	
	},

    /**
     * Get all the tweets by a given user.
     * @param username The user to get all the tweets from.
     *
     * @returns All the tweets made by the user.
     */
    getAllTweets: function(username) {
        return this.tweets.filter(function(tweet) {
            return tweet.user.name == username;
        });
    },

    /* "PRIVATE" */
    
    /**
     * Gets the tweet object associated with a DOM object.
     *
     * @param domTweet The DOM object where the tweet is displayed.
     *
     * @returns The tweet object associated with the DOM object.
     */
    getTweetObject: function(domTweet) {
        // find the tweet this click landed on using the id
        var id = $(domTweet).attr("id");
        var tweet = this.tweets[id];
        if (tweet === undefined) {
        	console.log("Could not find tweet with id: " + id);
        }
        return tweet;
    },

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
     * Extract all media from a tweet object.
     * Note: This does partly duplicate the functionality of extractPhotos,
     * but it's necessary because twitter treats "photos" and "URLs"
     * separately, despite the fact that pictures are represented as URLs.
     *
     * @param tweet The tweet object you want to extract the media for.
     * 
     * @returns A list of media objects.
     */
     extractMedia: function(tweet) {
         var media = tweet.entities.media;
         if (media !== undefined) {
             return media.map(function(medium) {
                 return {
                     "url": medium.url,
                     "indices": medium.indices
                 };
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
};
