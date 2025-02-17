async function handleGetAdvice() {
    const url = "https://api.adviceslip.com/advice";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    document.getElementById("adviceMessage").innerHTML = json.slip.advice; 
  } catch (error) {
    console.error(error.message);
  }
}