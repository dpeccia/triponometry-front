import React from "react";

export class ICalendar extends React.Component {

  rawContent = "";

  constructor(props) {
    super(props);
    this.loadRawContent();
  }

  //El raw va a venir apuntando a endpoint aparte que no está creado todavía, despues hay que tocar este metodo
  loadRawContent(){
      fetch("")
      .then(r => r.text())
      .then(text => {
        this.rawContent = text;
      });
  }

  render() {

    const downloadTxtFile = () => {
      const element = document.createElement("a");
      const file = new Blob([this.rawContent], {
        type: "text/plain"
      });
      element.href = URL.createObjectURL(file);
      element.download = "myFile.ics";
      document.body.appendChild(element);
      element.click();
    };

    return (
      <div>
        <button onClick={downloadTxtFile}>Download Calendar</button>
      </div>
    );
  }
}