export default class GymTracker {
  static LOCAL_STORAGE_DATA_KEY = "workout-tracker-entries";

  constructor(root) {
    this.root = root;
    this.root.insertAdjacentHTML("afterbegin", GymTracker.html());
    this.entries = [];
    // Load existing entries and update the view
    this.loadEntries();
    this.updateView();
    // Add event listener for the "Add Workout" button
    this.root.querySelector(".trAdd").addEventListener("click", () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      this.addEntry({
        date: `${year}-${month}-${day}`, //Default date
        workout: "push", // Default workout
        duration: 30, // Default duration
        rest: 2, //Default rest time
        sets: 3, //Default number of sets
        reps: 12, //Default number of repetitions
      });
    });
  }

  // Static method to generate HTML structure for the gym tracker table
  static html() {
    return `
      <table class="tracker">
      <thead>
          <tr>
              <th>Type of Workout</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Rest Between Sets</th>
              <th>Number of sets</th>
              <th>Number of reps</th>
              <th></th>
          </tr>
      </thead>
      <tbody class="trEntries">
         
      </tbody>
      
      <tbody>
          <tr class="trRow trRowAdd">
              <td colspan="2">
                  <span class="trAdd">Add Workout &plus;</span>
              </td>
          </tr>
      </tbody>
      
  </table>
          `;
  }

  // Static method to generate HTML structure for a row in the gym tracker table
  static rowHtml() {
    return `
      <tr class="trRow">
      <td>
          <select class="trWorkout">
              <option value="push">Push</option>
              <option value="pull">Pull</option>
              <option value="legs">Legs</option>
              <option value="upperbody">UpperBody</option>
              <option value="lowerbody">LowerBody</option>
              <option value="cardio">Cardio</option>
          </select>
      </td>
      <td>
          <input type="date" class="trDate">
      </td>
      <td>
          <input type="Number" class="trDuration">
          <span class="trTxt">minutes</span>
      </td>
      <td>
          <input type="Number" class="trRest">
          <span class="trTxt">minutes</span>
      </td>
      <td>
          <input type="Number" class="trSets">
          <span class="trTxt"> sets</span>
      </td>
      <td>
          <input type="Number" class="trReps">
          <span class="trTxt"> reps</span>
      </td>
      <td>
          <button type="button" class="trBtn trDelete btn-primary">&times;</button>
      </td>
      
  </tr>
          `;
  }
  //Method to load entries from local storage
  loadEntries() {
    this.entries = JSON.parse(
      localStorage.getItem(GymTracker.LOCAL_STORAGE_DATA_KEY) || "[]"
    );
  }
  //Method to save entries from local storage
  saveEntries() {
    localStorage.setItem(
      GymTracker.LOCAL_STORAGE_DATA_KEY,
      JSON.stringify(this.entries)
    );
  }

  // Method to update the view with the current entries
  updateView() {
    const tableBody = this.root.querySelector(".trEntries");

    const addRow = (data) => {
      const template = document.createElement("template");
      let row = null;

      template.innerHTML = GymTracker.rowHtml().trim();
      row = template.content.firstElementChild;
      row.querySelector(".trDate").value = data.date;
      row.querySelector(".trWorkout").value = data.workout;
      row.querySelector(".trDuration").value = data.duration;
      row.querySelector(".trRest").value = data.rest; // Set rest between sets
      row.querySelector(".trSets").value = data.sets;
      row.querySelector(".trReps").value = data.reps;

      // Event listeners for workout, duration, and rest changes
      row
        .querySelector(".trWorkout")
        .addEventListener("change", ({ target }) => {
          data.workout = target.value;
          this.saveEntries(); //Update workout
        });
      row
        .querySelector(".trDuration")
        .addEventListener("change", ({ target }) => {
          data.duration = target.value;
          this.saveEntries(); //Update duration
        });
      row.querySelector(".trRest").addEventListener("change", ({ target }) => {
        data.rest = target.value; // Update rest between sets
        this.saveEntries();
      });
      row.querySelector(".trSets").addEventListener("change", ({ target }) => {
        data.sets = target.value; // Update sets
        this.saveEntries();
      });
      row.querySelector(".trReps").addEventListener("change", ({ target }) => {
        data.reps = target.value; // Update reps
        this.saveEntries();
      });
      // Event listener for delete button
      row.querySelector(".trDelete").addEventListener("click", () => {
        this.deleteEntry(data);
      });

      tableBody.appendChild(row);
    };

    // Remove existing rows
    tableBody.querySelectorAll(".trRow").forEach((row) => {
      row.remove();
    });

    this.entries.forEach((data) => addRow(data));
  }

  // Method to add a new entry
  addEntry(data) {
    const tableBody = this.root.querySelector(".trEntries");
    const existingRow = tableBody.querySelector(".trRow");
    // If no entry exists for the current date, add a new one
    if (!existingRow) {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      data.date = `${year}-${month}-${day}`;

      const template = document.createElement("template");
      template.innerHTML = GymTracker.rowHtml().trim();
      const newRow = template.content.firstElementChild;
      tableBody.appendChild(newRow);
    }
    // Add new entry to entries array, save entries, and update view
    this.entries.push(data);
    this.saveEntries();
    this.updateView();
  }

  // Method to delete an entry
  deleteEntry(dataToDelete) {
    this.entries = this.entries.filter((data) => data !== dataToDelete);
    this.saveEntries();
    this.updateView();
  }
}
