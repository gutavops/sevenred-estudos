async function getData() {
  const url = "https://api.github.com/users/gutavops";
  try {
    const response = await fetch(url);
    console.log("response: ", response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    document.getElementById("githubName").innerHTML = json.name;
    document.getElementById("githubBio").innerHTML = json.bio;
    document.getElementById("githubLocation").innerHTML = json.location;
    document.getElementById("githubAvatar").src = json.avatar_url;
    document.getElementById("githubUrl").href = json.html_url;
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

getData();