import React, { Component } from 'react';
import { fetchCountryList } from '../api/';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export class AutoComplete extends Component {
    constructor(props){
        super(props)
        this.state={
            data: [],
            suggestions:[],
            text:'',
            capital:'',
            region:'',
            showInfo: false,
            errorInfo:''
        }
        this.onButtonHandle = this.onButtonHandle.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({ text: e.target.value });
    }
    onButtonHandle(){
        if (this.state.text.length === 0) {
            this.setState(() => ({
                errorInfo: 'Please Enter a country to search'
            }))
        } else {
            const info = this.state.data.filter(l => { return l.name === this.state.text });
            this.setState(() => ({
                capital: info[0].capital,
                region: info[0].region,
                showInfo: true
            }));
        }
    }
    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        let mydata = this.state.data.map(l=> {return l.name});
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = mydata.sort().filter(v => regex.test(v))
        }
        this.setState(() => ({
            suggestions,
            text: value,
            errorInfo:'',
            showInfo: false
        }))
    }
    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        
        if(suggestions.length === 0){
            return null;
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index} onChange={this.handleChange} onClick={() => this.selectedText(item)}>{item} </li>))
                }
            </ul>
        );
    }
    
    async componentDidMount(){
        const data = await fetchCountryList();
        
        this.setState({data});
        console.log("data fetched in autocomplete",data);
    }
  render() {
      const { text, capital, region, showInfo, errorInfo } = this.state;
    return (
        <div>
            <div className="search-bar">
                <input className="search" id="query" type="text" onChange={this.onTextChange} value={text} placeholder="Country"></input>
                <button className="search-button" onClick={this.onButtonHandle}> <span className="icon"><FontAwesomeIcon icon={faSearch} /></span></button>
            </div>
            <ul>{this.renderSuggestions()}</ul>

            <div className={showInfo ? "content": "content-hide"}>
                <ul><h2>Country Information:</h2></ul>
                <li>Country:{text}</li>
                <li>Capital:{capital}</li>
                <li>Region:{region}</li>
            </div>
            {(errorInfo.length > 0) && (<p className="error">{errorInfo}</p>)}
        </div>  
    )
  }
}

export default AutoComplete

//TODO:
//destructure the json to get more Info