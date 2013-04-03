CSC309 A3
=========

Organization
============

The design document for the assignment can be found here:
https://docs.google.com/document/d/1HFpmnvOQlMa4hCj5ul07yx0Ld2daUcQq2ep0zDEr5TA/edit

This was used as the specification for project features -- however, all of 
the pages listed, are accessible without leaving the main page through JQM 
popups.

Group work was organized using a Trello board:
https://trello.com/board/csc309-a3/5147788d7a1c85f255003fd3

This, combined with using Git for version control, was effective for ensuring
that all members of the team could be productive without interfering or
overlapping with each other.

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

This helps to make the website compatible with and look nice on a
wide range of devices.
