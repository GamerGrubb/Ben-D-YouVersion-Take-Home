# Ben D YouVersion Take Home

Ben Dodson's submission of the YouVersion frontend take-home project.

## Setup & Run Instructions
- Download and extract the ZIP folder.
- Locate the *verse-of-the-day* folder.
- Open *index.html* in your browser.
- The application will retrieve and display the Verse of the Day.

## Decisions & Assumptions

- **Local date:** The current day is determined using the date and time from the user's device. I assumed the Verse of the Day should change according to the user's calendar date.
- **UTC calculation:** I used Date.UTC() with the user's local date components instead of getUTCDate(), which could return a different calendar day depending on the device's timezone.  This also avoids issues with daylight savings time issues.
- **Async/await:** I chose async/await for the API requests because it makes the sequence of retrieving the passage ID and then the passage content easier to follow.
- **Error handling:** I used try/catch to handle errors from either API requests.
- **Default translation:** I used the World English Bible as the initial translation to focus on getting the API requests working before adding translation selection.

## What I'd Do Next

- Add previous and next buttons to navigate between days with checks for the beginning and end of the year.
- Add a dropdown menu for selecting different Bible translations.
- Use localStorage to remember the user's selected Bible translation.
- Add automated tests to handle error recovery, verify API response handling, and day-of-year calculations.
- Improve the application's styling and responsiveness.
