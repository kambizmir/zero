import React, { Component } from 'react';

class ShellCanvas extends Component{

  constructor(props){
    super(props);
    this.state = { pushData:null, xChildren:{} }

    this.processPushData = this.processPushData.bind(this); 
    this.addInstance = this.addInstance.bind(this);  
  }


  addInstance(item){

    console.log("ITEMX =" ,item)

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
          this.state.xChildren[item.instanceid]=
              (
                <div key={item.instanceid} style={divStyle}> 
                  <XYZ  
                      ref={(input) => {this[item.instanceid] = input }}
                      item = {item} 
                      google_token = {this.props.google_token}
                      userId = {this.props.userId}
                      userName = {this.props.userName}
                      socket = {this.props.socket}
                      pushData = {this.state.pushData}/>
                </div> 
              );

              //this.forceUpdate();
       }
    )
   
  }

  removeInstance(instanceid){
     delete this.state.xChildren[instanceid];
  }

  updateInstance(instanceid){

    if(this[instanceid])
      this[instanceid].updateInstance();
  }

  processPushData(item,data){
    //this.setState({pushData:data})

    if(this[item.instanceid])
      this[item.instanceid].applyPushData(data);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.props.instanceToShow ){
      this.addInstance(this.props.instanceToShow );
      //console.log("ITEM TO SHOW" , this.props.instanceToShow )
    }
    if(this.props.instanceToHide){
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







