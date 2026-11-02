# SkillPilot AI — Beginner Hackathon Starter

## Included
- `index.html` — page structure
- `style.css` — responsive dark neon dashboard styling
- `script.js` — add, complete, delete tasks, task counts, and rule-based smart nudge

## Run it
1. Extract the ZIP folder.
2. Open the `SkillPilot-AI` folder.
3. Double-click `index.html` to open it in a browser.
4. Add a task, choose its priority, mark it complete, and test Delete.

No installation or library is required. An internet connection is only needed for the optional Google Fonts import; the page still works without it.

## Important
The current “Smart Nudge” is rule-based JavaScript, not a real AI model/API. Tasks are stored in memory only and reset after refresh. For a real AI integration, add a backend and keep any API key on the server—not in browser JavaScript.

## Beginner learning notes
- `getElementById()` finds an HTML element by its ID.
- `addEventListener()` runs a function when an event happens.
- `preventDefault()` stops the form's default page reload.
- `createElement()` creates new HTML elements.
- `textContent` safely displays task text as plain text.
- `filter()` selects array items that match a condition.
- `renderTasks()` rebuilds the visible task list and refreshes the statistics.
