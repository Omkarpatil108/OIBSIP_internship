let Output_Screen = document.getElementById("output_screen");
      function display(num) {
        Output_Screen.value += num;
      }
      function Calculate() {
        try {
          Output_Screen.value = eval(Output_Screen.value);
        } catch (err) {
          alert("Invalid Syntex");
        }
      }
      function Clear() {
        Output_Screen.value = "";
      }
      function del() {
        Output_Screen.value = Output_Screen.value.slice(0, -1);
      }