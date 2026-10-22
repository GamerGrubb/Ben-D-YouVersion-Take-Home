//const statusElement = document.getElementById("status"); // Get the status element from the HTML document
//const retryButton = document.getElementById("retryButton"); // Get the retry button element from the HTML document
const statusElement = document.getElementById("status");
const referenceElement = document.getElementById("reference");
const verseElement = document.getElementById("verse");
const retryButton = document.getElementById("retryButton");
const today = new Date();
const todayUTC = Date.UTC(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
);
const startOfYearUTC = Date.UTC(today.getFullYear(), 0, 1);
const millisecondsPerDay = 24 * 60 * 60 * 1000;
let currentDay =
  Math.floor((todayUTC - startOfYearUTC) / millisecondsPerDay) + 1;
console.log("current day of year:", currentDay); // Log today's date for debugging purposes
async function getVerseOfTheDay() {
  referenceElement.textContent = "";
  verseElement.textContent = "";
  retryButton.hidden = true;
  statusElement.textContent = "Loading verse...";
  try {
    const response = await fetch(
      // Fetch the verse of the day from the API according to [currentDay]
      `https://api.youversion.com/v1/verse-of-the-days/${currentDay}`,
      {
        headers: {
          "x-yvp-app-key": "1gqBksQ6ec6GdOCCDfMrmyV6x5UlZGDWSkLxmCTWjGgrg5hm",
        },
      },
    );
    if (!response.ok) {
      // Check if the response is not OK (status code not in the range 200-299)
      throw new Error(`API request failed: ${response.status}`);
    }
    const data = await response.json(); // Parse the response as JSON
    console.log(data); // Log the data for debugging purposes

    const passageId = data.passage_id; // Get the passage ID from the data
    const versionId = 206; // Set the version ID (hardcoded for this example)
    const passageResponse = await fetch(
      `https://api.youversion.com/v1/bibles/${versionId}/passages/${passageId}?format=text`,
      {
        headers: {
          "x-yvp-app-key": "1gqBksQ6ec6GdOCCDfMrmyV6x5UlZGDWSkLxmCTWjGgrg5hm",
        },
      },
    );
    if (!passageResponse.ok) {
      throw new Error(`Passage request failed: ${passageResponse.status}`);
    }
    const passageData = await passageResponse.json();
    console.log(passageData); // Log the passage data for debugging purposes
    referenceElement.textContent = passageData.reference;
    verseElement.textContent = passageData.content;
    statusElement.textContent = ""; // Clear the status message after successful load
  } catch (error) {
    statusElement.textContent = "Couldn't load the verse. Please try again.";
    retryButton.hidden = false;
    console.error(error); // Log any errors that occur during the fetch or parsing
  }
}
retryButton.addEventListener("click", getVerseOfTheDay);
getVerseOfTheDay();
