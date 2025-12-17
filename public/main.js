
document.addEventListener("DOMContentLoaded",function(event){
const grid=GridStack.init();
console.log("Gridstack initialized");
const runbutton=document.getElementById("runButton");
const area=document.getElementById("consoleArea");
const editorarea=document.getElementById("editArea");
const savex=document.getElementById("saveLayout");
savex.addEventListener("click",function(event){
localStorage.setItem("editorLayout",JSON.stringify(grid.save()));
console.log(JSON.stringify(grid.save()));
});
const saved = localStorage.getItem("editorLayout");
if (saved) {
    const layout = JSON.parse(saved);
    grid.load(layout);
    console.log("Loaded saved layout!");
}
const resetButton=document.getElementById("resetButton");
resetButton.addEventListener("click",function(event){
localStorage.removeItem("editorLayout");
location.reload();
});

runbutton.addEventListener("click",function(event){
const code =editorarea.value;
area.textContent = "Running...\n";
try {
const result=eval(code);
if(result!==undefined){
    area.textContent+=result;
}
if(result===undefined){
   area.textContent += "Code ran (no return value)";
}
} 
catch (error) {
 area.textContent+="Error"+error.message;
}
});

});

// DAY 5: ADD ACTUAL CODE EDITOR
// Goal: Replace textarea with a real code editor.
// Tasks to complete:
// Research CodeMirror or Monaco Editor (choose one)
// Include the editor library via CDN
// Replace your textarea with the code editor
// Set up JavaScript syntax highlighting
// Add line numbers
// Test typing code and see syntax highlighting
// Make sure editor fits in its panel
// Don't worry about: Multiple languages, advanced features
// Focus on: Basic code editing with syntax highlighting






