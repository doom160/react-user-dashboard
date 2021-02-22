## Employee Dashboard

An application used to filter data from [springboot-user-service](https://github.com/doom160/springboot-user-service). It is developed with React using components from MaterialUI and MaterialTable.

Users can also insert, update, delete, sort, filter with min and max salary range. Error and success message is prompted with snackbar.

## Project Status
Completed
* Task 1: [Upload Users](https://github.com/doom160/springboot-user-service)
* Task 2: Employee Dashboard Feature
* Task 3: CRUD Feature

Future
* Task 4: Better UX When Uploading Large CSV Files
* Task 5: UI Localization

## Project Screen Shots

**Desktop View**\
![Desktop](screenshots/desktop.JPG?raw=true 'Desktop')

**Mobile View**\
![Mobile](screenshots/mobile.JPG?raw=true 'Mobile')

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Your backend should be running too.

1. Installation:

`npm install`  

2. To Start Server:

`npm start`  

3. To Visit App:

`localhost:3000`  

## Reflection

  * **What was the context for this project? (ie: was this a side project? was this for Turing? was this for an experiment?)**
    <br/>
    _This project as done as a technical assessment for GovTech Software Engineer Tech Assessment._

  * **What did you set out to build?**
    <br/>
    _I originally planned to implement ExpressJS backend. The MVP was completed but I realized I still lack of Javascript knowledge, which will further set me back on the development. Since I have stronger knowledge on Java, the backend development was less of a blocker to me._
    \
    _I was also looking at blueprint toolkit but I have seen reviews that it may not suit mobile view._

    
  * **Why was this project challenging and therefore a really good learning experience?**
    <br/>
    _Despite having years of programming background in the past, the transition to DevOps position has set me back on programming trends. Nevertheless, although I do not have rich background in React and Springboot experience, my programming foundation still stands. I managed to quickly pick up these 2 framework and developed the whole solution with my own effort with examples from internet. I have better understood how React and Springboot development works._
  * **What were some unexpected obstacles?**
    <br/>
    _I was stucked with React UI portion, namely on the performance. I had a hard time dealing with the state and hooks as the app kept fetching from backend, which I had to look for ways to populate only once. Another problem was handling textbox onChange events, as it kept rendering although I do not need it. I had to introduce a button and memotize the table to reduce the load._
