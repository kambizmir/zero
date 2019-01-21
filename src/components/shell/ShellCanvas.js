import React, { Component } from 'react';

class ShellCanvas extends Component{

  constructor(props){
    super(props);
    this.state = { pushData:null, xChildren:{} }

    //this.processPushData = this.processPushData.bind(this); 
    //this.addInstance = this.addInstance.bind(this);  
  }


  addInstance(item){
      var divStyle = {
        background: "transparent", 
        margin: "2px",
        overflow: "auto",
        display: "inline-block",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor:"#dddddd",
        borderRadius:"5px",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      }

    import("../" + item.serviceid + "/Main").then( 
        Bar => {
          var XYZ = Bar.default;
          let yChildren = {...this.state.xChildren };
          yChildren[item.instanceid] =   (
            <div key={item.instanceid} style={divStyle}> 
              
              <XYZ  
                  ref={(input) => {this[item.instanceid] = input }}
                  item = {item} 
                  userInfo = {this.props.userInfo }
                  access_token = {this.props.access_token}
                  // socket = {this.props.socket}
                  // pushData = {this.state.pushData}
                />

            </div> 
          );
          this.setState({xChildren:yChildren})
       }
    )
   
  }

  removeInstance(instanceid){
    let yChildren = {...this.state.xChildren };
    delete yChildren[instanceid];

    this.setState({xChildren:yChildren})
  }

  updateInstance(instanceid){

    if(this[instanceid])
      this[instanceid].updateInstance();
  }

  processPushData(item,data){
    if(this[item.instanceid])
      this[item.instanceid].applyPushData(data);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.props.instanceToShow && !this.state.xChildren.hasOwnProperty(this.props.instanceToShow.instanceid) ){
      this.addInstance(this.props.instanceToShow );
    }
    if(this.props.instanceToHide && this.state.xChildren.hasOwnProperty(this.props.instanceToHide.instanceid)){
      this.removeInstance(this.props.instanceToHide.instanceid)
    }
  }

  render(){

     var gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "10px",
        gridAutoRows: "minmax(100px, auto)",
      }

    var temp = [];
    for (var key in this.state.xChildren){
      temp.push(this.state.xChildren[key])
    }

    return (             
        <div >
          <br/>   
          {temp}                 
        </div>
    ) 

  }
}

export default ShellCanvas;







