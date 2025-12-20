

document.addEventListener("DOMContentLoaded", function (event) {
  const grid = GridStack.init();
  console.log("Gridstack initialized");
  const runbutton = document.getElementById("runButton");
  const area = document.getElementById("consoleArea");
  const editorarea = document.getElementById("editArea");
  const value = editorarea.value;

  const ename = editorarea.name;
  const placeholder = editorarea.placeholder;
  const isDisabled = editorarea.disabled;
  const isReadOnly = editorarea.readOnly;

  const dataAttributes = {};

  for (let attr of editorarea.attributes) {
    if (attr.name.startsWith("data-")) {
      dataAttributes[attr.name] = attr.value;
    }
  }

  const wrapper = document.createElement("div");
  wrapper.className = "code-mirror";
  const styles = window.getComputedStyle(editorarea);

  wrapper.style.width = styles.width;
  wrapper.style.height = styles.height;
  wrapper.style.margin = styles.margin;
  wrapper.style.padding = styles.padding;
  wrapper.style.border = styles.border;
  wrapper.style.fontFamily = styles.fontFamily;
  wrapper.style.fontSize = styles.fontSize;
  wrapper.style.color = styles.color;
  wrapper.style.background = styles.background;
  wrapper.style.borderRadius = styles.borderRadius;
  wrapper.style.fontWeight = styles.fontWeight;
  wrapper.className = editorarea.className + "code-mirror-wrapper";
  editorarea.parentNode.insertBefore(wrapper, editorarea);
  editorarea.style.display = "none";

  const editor = CodeMirror(wrapper, {
    value: value,
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true,
    indentUnit: 4,
    tabSize: 4,
    matchBrackets: true,
    autoCloseBrackets: true,
  });

  window.codeEditor = editor;
  const savex = document.getElementById("saveLayout");
  savex.addEventListener("click", function (event) {
    localStorage.setItem("editorLayout", JSON.stringify(grid.save()));
    console.log(JSON.stringify(grid.save()));
  });
  const saved = localStorage.getItem("editorLayout");
  if (saved) {
    const layout = JSON.parse(saved);
    grid.load(layout);
    console.log("Loaded saved layout!");
  }
  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", function (event) {
    localStorage.removeItem("editorLayout");
    location.reload();
  });

  const form = editorarea.closest("form");

  if (form) {
    form.addEventListener("submit", function (event) {
      editorarea.value = editor.getValue();
      form.submit();
    });
  }

  runbutton.addEventListener("click", function (event) {
    const code = editor.getValue();
    area.textContent = "Running...\n";
    try {
      const result = eval(code);
      if (result !== undefined) {
        area.textContent += result;
      }
      if (result === undefined) {
        area.textContent += "Code ran (no return value)";
      }
    } catch (error) {
      area.textContent += "Error" + error.message;
    }
  });
  editor.on("change", function () {
    editorarea.value = editor.getValue();
    editorarea.dispatchEvent(new Event('change'));
  });

  editor.on("keydown", function (cm, event) {
    if (event.key === "Tab") {
      event.preventDefault();

      const cursor = cm.getCursor();

      if (event.shiftKey) {
        cm.execCommand("indentLess");
      } else {
        cm.execCommand("indentMore");
      }
      return true;
    }
    editorarea.dispatchEvent(new Event('keydown'));
  });

  editor.getWrapperElement().addEventListener("focus", function () {
    editorarea.dispatchEvent(new Event('focus'));
  });
  /*  Step 2: Create Main Detection Function
  // Create a function called detectAndSetLanguage that will:
  
  // Check data attributes first
  
  // Check shebang if no attributes
  
  // Check file extension if available
  
  // Set the language mode*/


  const islower = (x) => {


    if (x >= 'a' && x <= 'z') {

      return true;
    }

    return false;
  }

  const isnum = (x) => {


    if (x >= '0' && x <= '9') {

      return true;
    }

    return false;
  }

  const isupper = (x) => {


    if (x >= 'A' && x <= 'Z') {

      return true;
    }

    return false;
  }

  const isspecial = (x) => {


    const arr = ['!', '@', '#', '$', '%', '&', '*', '^', '/'];

    for (let i = 0; i < arr.length; i++) {

      if (arr[i] === x) {

        return true;
      }
    }

    return false;
  }



  const detectAndSetLanguage = () => {

    const language = editorarea.dataset.language;
    const filex = editorarea.dataset.filename;
    const text = editorarea.value;
    const modex = editorarea.dataset.mode;
    const arr = text.split('\n');
    let string = "";

    if (arr.length === 0) {

      return;
    }

    for (let i = 0; i < arr[0].length; i++) {
      if (islower(arr[0][i]) || isupper(arr[0][i]) || isnum(arr[0][i]) || isspecial(arr[0][i])) {
        string += arr[0][i];
      }
    }
  
    if (language) {

      try {
        editor.setOption("mode", language);
      } catch (error) {
        console.log(error);
      }

      return;
    }


    if (!language && modex) {

      try {
        editor.setOption("mode", modex)
      } catch (error) {

      }
      return;
    }

 
    if (!language) {
      if (string[0] === '#' && string[1] === '!') {
        if (string.length === 2) {
          console.log("Invalid");
          return;
        }
        const t = string.substring(2, string.length)

        let g = t.length - 1;
        while (g >= 2) {
          if (t[g] === '/') {

            break;
          }
          g--;
        }

        if (g < 0) {

          return;
        }

        let k = "";
        for (let j = g; j < t.length; j++) {

          if (islower(t[j]) || isupper(t[j]) || isnum(t[j])) {
            k += t[j];
          }
        }
        k = k.toLowerCase();
        let l = "";
        for (let j = 0; j < k.length; j++) {

          if (islower(k[j])) {
            l += k[j];
          }
        }


        if (l === "python") {
          try {
            editor.setOption("mode", "python")
          } catch (error) {
            console.log(error);
          }
          return;
        }

        if (l === "php") {

          try {
            editor.setOption("mode", "php")
          } catch (error) {
            console.log(error);
          }

          return;
        }
        if (l === "node" || l === "nodejs") {
          try {
            editor.setOption("mode", "javascript")
          } catch (error) {
            console.log(error);
          }

          return;
        }

        if (l === "bash" || l === "zsh" || l === "fish" || l === "dash" || l === "sh") {

          try {
            editor.setOption("mode", "shell")
          } catch (error) {
            console.log(error);
          }

          return;
        }

        if (l === "perl") {

          try {
            editor.setOption("mode", "perl")
          } catch (error) {
            console.log(error);
          }

          return;
        }

        if (l === "ruby") {

          try {
            editor.setOption("mode", "ruby")
          } catch (error) {
            console.log(error);
          }

          return;
        }

        if (l === "lua") {

          try {
            editor.setOption("mode", "lua")
          } catch (error) {
            console.log(error);
          }

          return;
        }


      }


      if (string[0] !== '#' && string[1] !== '!') {

        if (filex) {

          let y = "";


          let h = filex.length - 1;

          while (h >= 0) {
            if (filex[h] === '.') {

              break;
            }
            h--;
          }
          let r = "";
          if (h >= 0) {
            r = filex.substring(h + 1, filex.length);
          }
         

          if(!r){

            return;
          }
          if (r === "js") {


            try {
              editor.setOption("mode", "javascript")
            } catch (error) {
              console.log(error);
            }

            return;



          }

          if (r === "py") {

            try {
              editor.setOption("mode", "python")
            } catch (error) {
              console.log(error);
            }

            return;

          }

          if (r === "php") {
            try {
              editor.setOption("mode", "php")
            } catch (error) {
              console.log(error);
            }

            return;
          }

          if (r === "html" || r==="htm") {
            try {
              editor.setOption("mode", "html")
            } catch (error) {
              console.log(error);
            }

            return;
          }

          if (r === "css") {
            try {
              editor.setOption("mode", "css")
            } catch (error) {
              console.log(error);
            }

            return;
          }

          if (r === "json" || r === "jsx") {
            try {
              editor.setOption("mode", "javascript")
            } catch (error) {
              console.log(error);
            }

            return;
          }

          if (r === "xml") {
            try {
              editor.setOption("mode", "xml")
            } catch (error) {
              console.log(error);
            }

            return;
          }
          if (r === "rb") {
            try {
              editor.setOption("mode", "ruby")
            } catch (error) {
              console.log(error);
            }

            return;
          }
          if (r === "pl") {
            try {
              editor.setOption("mode", "perl")
            } catch (error) {
              console.log(error);
            }

            return;
          }
          if (r === "ts" || r === "tsx") {
            try {
              editor.setOption("mode", "typescript")
            } catch (error) {
              console.log(error);
            }

            return;
          }
          if (r === "sh" || r === "bash") {
            try {
              editor.setOption("mode", "shell")
            } catch (error) {
              console.log(error);
            }

            return;
          }



        }

      }
    }

  }


  detectAndSetLanguage();

});

