import React from 'react';


const MainPage = (props) => {

  const { name, reportData } = props.values;
  console.log("from main-page", name)
  const { onInputChange, handleSubmit } = props

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
            onChange={onInputChange('title')}
          ></input>
        </label>
        <br />
        <label>
          <h2>Text</h2>
          <textarea
            type="tex"
            name="inputData"
            placeholder="Enter text or hit record"
            onChange={onInputChange('inputData')}
          />
        </label>
        <br />
        <button>Speak</button>
        <button>Stop</button>
        <br />
        <button name={'main-page-data-submit'} onClick={handleSubmit}>Submit Data</button>
      </form>
      <br />
      <h2>Report Data:</h2>
      <p className="report-data">{reportData}</p>
      <button name={'main-page-data-save'} onClick={handleSubmit}>Save Data</button>
      <br />
      <div className="list-data">
        <ol className="data-list">

        </ol>
      </div>
    </div>
  )
};

export default MainPage;