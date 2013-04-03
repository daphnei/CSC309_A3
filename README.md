CSC309 A3
=========

**Group Members**:

- Gabriel Nunes (c2nunesg)
- Daphne Ippolito (g1daphne)
- Alexander Biggs (g1biggse)

Organization/Version Control
============================

We used Git to track all changes to the project, using branches for testing out
experimental features before merging them with the master branch once they were
ensured to be stable. This allowed all team members to be productive on
different parts of the assignment without interfering or overlapping with each
other.

Structure
=========

The site is divided into one main view and three popups.

The main view lists all the favorited tweets that have been imported into the
app. By default, the client loads tweets from the local "favs.json" file in 
the top folder, but more tweets can be imported using the "Load More" button.
Rather than using normal pagination for displaying the tweets, they are loaded
in batches as the user scrolls down. This allows the user to check the tweets 
without interruptions, while still being able to load the page without loading
all of the tweets.

When the user clicks on the Load More button, a popup appears displaying a basic
form where the user can input JSON to be loaded into the app, or cancel to
return to the main view.

When the user clicks on the main body of a tweet, a popup appears displaying
info on the user who posted the tweet, as well as a list of all other favorited
tweets by that user.

If a tweet has a photo associated with it, a camera button appears on the tweet.
When clicked, a popup appears displaying the photo.

Responsive Design
=================

There are four layouts for the website defined using CSS media queries:

1. A view for smaller mobile devices, such as phones, where the tweets are
   displayed as a single-column list view with minimal padding on the side.
   The details dialog is layed out in more of a portrait view, with the user
   description listed below the username.
2. A view for smaller mobile devices in landscape or tablets, where the padding 
   on the sides of the screen is increased. The details dialog lists the user
   name and description side-by-side.
3. A view for low-resolution monitors and tablets, where the tweets are split
   into two side-by-side columns. To prevent the details dialog from getting too
   wide, it is forced to be a smaller width than the width of the device.
4. A view for high resolution monitors, where the tweets are split into three
   side-by-side columns.

This helps to make the website compatible with and look nice on a wide range 
of devices.
