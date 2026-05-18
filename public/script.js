async function summarize() {
  const article = document.getElementById("article").value;
  const result = document.getElementById("result");
  const loading = document.getElementById("loading");

  loading.classList.remove("hidden");
  result.innerHTML = "";

  try {
    const response = await fetch("/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article })
    });

    const data = await response.json();
    loading.classList.add("hidden");
    result.innerHTML = data.summary;

  } catch (err) {
    loading.classList.add("hidden");
    result.innerHTML = "Error generating summary.";
  }
}