import React from 'react';
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Loading from './Loading'
import Error from './Error'

/* Finds the location of the user and to month 
and sends the season to the SeasonDisplay
it uses classes instead of fns to handle async execution better 
*/
class App extends React.Component {
  // React.Component has heaps of methods that come with it. class App borrows all these methods
  
  /* Constructor is the first thing that runs whenever an instance of this class is created
  The constructor funtion is good for 
  - creating the state 
  - data loading 
  Caveat: 
  - not recommended best practice - use the componentDidMount method instead (clearer code)
  */
 // init state ONLY ONCE
 // the first way to do it:
  // constructor(props){
  //   super(props);
    
  //   this.state = { lat: null, errorMessage: null}
  // }

  // the second way to init the state
  state = { lat: null, errorMessage: '', monthInt:0}
  
  /* lifecycle methods are special fns that are called at specific times or at specific events
  componentDidMount runs when the content is shown on the screen. It is only called once. 
  It's good for:
  - initial data loading
  - one time only tasks 
  */
  componentDidMount(){
    console.log("componentDidMount called")

    // get the users location using the geolocation api
    window.navigator.geolocation.getCurrentPosition(
      (position)=>this.setState({lat: position.coords.latitude}),
      (error)=>this.setState({errorMessage: error.message})
    );

    // get the current month
    this.setState({
      monthInt: new Date().getMonth()
    })
  }
    
  /* componentDidUpdate is called when we: 
  - update the state (from the set state method)
  - get some new props from the parent 
  It's good for:
  - any data loading / tasks that need to run whenever a component is updated
  Note: componentDidUpdate calls render once finished by default 
  */
  componentDidUpdate(){
    console.log("componentDidUpdate called")
  }
  
  // componentWillUnmount is called when the component is removed from the screen
  componentWillUnmount(){
    // cleanup methods 
    console.log("componentWillUnmount called")
  }

  renderBody(){
    // conditionally render based on the state (the lat and the error)
    if(this.state.lat && this.state.errorMessage===''){
      return <SeasonDisplay lat={this.state.lat} monthInt={this.state.monthInt}/>  // note on parent update, the children wil get updated too
    }
    if(!this.state.lat && this.state.errorMessage===''){
      return <Loading /> 
    }
    return <Error message={this.state.errorMessage}/>
  }

  /* render is a compulsory function, called frequently eg when this.state changes
  render is used to return jsx
  dont make requests or handle complex logic here  
  */
  render(){
    return (
      <div className="border red">
        {this.renderBody()}
      </div>
    )
  }
}

// This enables hot reloading
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);