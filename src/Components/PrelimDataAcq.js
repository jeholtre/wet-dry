import React from 'react';
import '../App.css';
// need to add corresponding button in Home.js then edit routes as well
// inputs down work
function PrelimDataAcq()
{
    return (
        <div className="App">
            <header className="App-header">
                <p>Preliminary Data Acquisition</p>
                <form>
                    <label htmlFor="name">Name of Person:</label>
                    <input type="text" id="name" name="name" value="Jo Doe"/><br/>
                    <label htmlFor="stream">Stream:</label>
                    <input type="text" id="stream" name="stream" value="stream name"/><br/>
                    <label htmlFor="sSection">Stream Section:</label>
                    <input type="text" id="sSection" name="sSection" value="Direction Brance"/><br/>
                    <label htmlFor="classID">Class/Section ID:</label>
                    <input type="text" id="classID" name="classID" value="######"/><br/>
                    <button className={"App-button"} type={"button"} onClick={() => {
                        window.location.href = "/"}}>back {/* Funny it send to address '/#/' */}
                    </button>
                    <button className={"App-button"} type={"button"} onClick={() => {
                        window.location.href = "#/DataCollection"}}>Submit
                    </button>
                    <button className={"App-button"} type={"button"} onClick={() => {
                        window.location.href = "#/About"}}>
                        ?
                    </button>
                </form>
                <p>

                </p>
            </header>

        </div>
    );
};
export default PrelimDataAcq;