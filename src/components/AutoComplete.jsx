import React, { Component } from 'react';
import { fetchCountryList } from '../api/';

export class AutoComplete extends Component {
    constructor(props){
        super(props)
        this.state={
            data: [],
            suggestions:[],
            text:''
        }
    }
    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.state.data.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions,
            text: value
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
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>))
                }
            </ul>
        );
    }
    async componentDidMount(){
        const mydata = await fetchCountryList();
        const data = mydata.map(l=> {return l.name});
        this.setState({data});
        
            console.log("data fetched in autocomplete",data);
        
    }
  render() {
      const { text, suggestions } = this.state;
    return (
        <div id="notebooks">
     <input id="query" type="text" onChange={this.onTextChange} value={text}/>
        {this.renderSuggestions()}
        <span>Suggestions: {suggestions.length}</span> 
        </div>  
    )
  }
}

export default AutoComplete

