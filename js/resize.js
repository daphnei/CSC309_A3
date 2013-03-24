/**
 * Functions and events related to the browser window being resized.
 * Used to handle changing attributes that can't be done using CSS media
 * queries.
 */

var MOBILE_WIDTH = 480;

var resize = {

    /* PUBLIC */

    /**
     * Hide the arrow icon on listviews if the browser window is small to
     * prevent it from overlapping with the text.
     *
     * @param width The width of the browser window.
     */
    hideArrowIfMobile: function(width) {
        if (width < MOBILE_WIDTH) {
            console.log("HIDING AN ICON")
            $("li").attr("data-icon", "false");
        } else {
            $("li").attr("data-icon", "true");
        }
    }
};

/**
 * Set up an event handler for any data attribute changing that should occur
 * when the browser window is resized.
 */
$(window).resize(function(event) {
    resize.hideArrowIfMobile($(window).width());
});
