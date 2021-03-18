 var userFormEl = document.querySelector("#user-form");
 var nameInputEl = document.querySelector("#username");
 var repoContainerEl = document.querySelector("#repos-container");
 var repoSearchTerm = document.querySelector("#repo-search-term");

 function getUserRepos(user) {
     var apiURL = "https://api.github.com/users/" + user + "/repos";

     fetch(apiURL).then(function(response) {
         if (response.ok) {
             response.json().then(function(data) {
                 displayRepos(data, user);
             });
         } else {
             alert("Error: " + response.status);
         }
      })
      .catch(function(error) {
        alert("Unable to connect to GitHub");
      })
 };

 function formSubmitHandler(event) {
     event.preventDefault();
     //get userInput from form input
     var username = nameInputEl.value.trim();

     if (username) {
         getUserRepos(username);
         //clear the form
         nameInputEl.value = "";

     } else {
         alert("Please enter a Github username");
     }
 }

 function displayRepos(repos, searchTerm) {
     repoContainerEl.textContent = "";
     repoSearchTerm.textContent = searchTerm;

    if(repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

     for (var i = 0; i < repos.length; i++) {
         var repoName = repos[i].owner.login + "/" + repos[i].name;

         //create container for each repo
         var repoEl = document.createElement("div");
         repoEl.classList = "list-item flex-row justify-space-between align-center";

         //create span to hold repo name
         var titleEl = document.createElement("span");
         titleEl.textContent = repoName;

         //append span to container div
         repoEl.appendChild(titleEl);

         var statusEl = document.createElement("span");
         statusEl.classList = "flex-row align-center"
         if (repos[i].open_issues_count > 0) {
             statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
         } else {
             statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
         }
         //append status span to container div
         repoEl.appendChild(statusEl);
         //append container div to DOM
         repoContainerEl.appendChild(repoEl);
     }
 };

 userFormEl.addEventListener("submit", formSubmitHandler)