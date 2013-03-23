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
    },
    
    /**
     * Insert a set of strings into another string, at a set of specified indices.
     *
     * @param string The string which you want to insert into.
     * @param insertions An array of objects of the form:
     *        {text : Text you want to insert, index: Index you want to insert it at}
     *        All indices should be positive.
     *
     * @returns A copy of the original string with the desired insertions.
     */
    insertMultiple: function(string, insertions) {
        // Sort by index of the insertions descending order. 
        insertions = insertions.sort(function(a, b) {return b.index - a.index;});
        // This ensures that we insert from the end of the string first, which prevents
        // us from having to adjust the indices as we insert things.
        
        for (var i=0; i < insertions.length; i++) {
            string = this.insert(string, insertions[i].text, insertions[i].index);
        }
        
        return string
    }
}