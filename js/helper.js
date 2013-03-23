var helper = {
    /**
     * helper.js
     *
     * A set of (hopefully) useful utility functions that don't fit in anywhere else.
     */
    
    /**
     * Insert a string into another string at a specified index.
     *
     * @param string The string which you want to insert into.
     * @param insertion The string that you want to insert.
     * @param index The index at which you want to insert the substring.
     *
     * @returns A copy of the original string with the desired insertion.
     */
    insert: function(string, insertion, index) {
        return string.slice(0, index) + insertion + string.slice(index, string.length);
    }
}