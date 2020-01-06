import React, {Component} from 'react'

class MemeGenerator extends Component {
    constructor(){
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response =>response.json())
        .then(response =>{
            const {memes} = response.data;
            this.setState({
                allMemeImgs: memes
            })
        })
    }

    handleChange(event){
       const {value,name} = event.target
        console.log(event.target.value)
        this.setState({
            [name]: value            
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const randInt = Math.floor(Math.random() * this.state.allMemeImgs.length);
        const randMemeImg = this.state.allMemeImgs[randInt].url;
        this.setState({randomImage: randMemeImg})
    }
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                    type="text" 
                    placeholder="Top Text" 
                    name="topText" 
                    onChange={this.handleChange} 
                    value={this.state.topText}/>
                    <br/>
                    <input 
                    type="text" 
                    placeholder="Bottom Text" 
                    name="bottomText" 
                    onChange={this.handleChange} 
                    value={this.state.bottomText}/>
                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;