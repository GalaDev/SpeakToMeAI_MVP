import React from 'react';


const MainPage = (props) => {

  const { name, reportData } = props.values;
  const { onInputChange, onDataSubmit, onDataSave } = props

  return (
    <div>
      <h1 className="greeting">Hello, {name}!</h1>
      <form>
        <label>
          <h2>Title</h2>
          <input
            type="text"
            name="title"
            placeholder="Enter Title..."
            onChange={onInputChange}
          ></input>
        </label>
        <br />
        <label>
          <h2>Text</h2>
          <textarea
            type="tex"
            name="inputData"
            placeholder="Enter text or hit record"
            onChange={onInputChange}
          />
        </label>
        <br />
        <button>Speak</button>
        <button>Stop</button>
        <br />
        <button name={'submit-data'} onClick={onDataSubmit}>Submit Data</button>
      </form>
      <br />
      <h2>Report Data:</h2>
      <p className="report-data">{reportData}</p>
      <button name={'save-data'} onClick={onDataSave}>Save Data</button>
      <br />
      <div className="list-data">
        <ol className="data-list">

        </ol>
      </div>
    </div>
  )
};

export default MainPage;