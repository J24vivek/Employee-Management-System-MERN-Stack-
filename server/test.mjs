const name = "John Doe";
const position = "Software Engineer";
const level = "Senior";

const response = await fetch("http://localhost:5050/record", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, position, level }),
});

console.log("POST status:", response.status);
const result = await response.json();
console.log("Response:", result);

const getResp = await fetch("http://localhost:5050/record/");
const records = await getResp.json();
console.log("All records:", records);
