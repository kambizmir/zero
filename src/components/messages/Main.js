import React, { Component } from 'react';
//import { CircularProgress } from 'material-ui/Progress';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input, { InputLabel } from '@material-ui/core/Input';
import { FormControl } from '@material-ui/core/FormControl';

class Messages extends Component{

  constructor(props){
    super(props);
    this.state = { instanceName:"", busy:false , persons : [] , selectedIndex:-1 
                   ,selectedName:null , selectedId:null 
                   ,messageText:null ,receiveMesaage:""
                   ,receiverQueue:[] , sentQueue:[]
                   ,receiverQueueString:"",sentQueueString :"" };

    this.sendMessage = this.sendMessage.bind(this);   
    this.dropDownChanged = this.dropDownChanged.bind(this);   
    this.messgaeChanged = this.messgaeChanged.bind(this);   

  }

  componentDidMount() {
    this.listConnectionNames();
    this.getInstance()
  }

  componentDidUpdate(prevProps, prevState){
   
  }

  render(){

    var topStyle = {
      position:"relative",
    }

    var contentStyle = {
      padding:"5px",
      paddingLeft:"20px",
      paddingRight:"20px",
    }

    var overlayStyle = {
      position:"absolute",
      backgroundColor: "rgba(0,0,0,0.4)",
      zIndex: 2,
      width:"100%",
      height : "100%",
      display: "none",
      justifyContent: "center",
      alignItems: "center",
    }
    
    overlayStyle.display = this.state.busy? "flex" : "none";

    return (      

      <div style={topStyle}>

          <div style={overlayStyle}>
              {/*<CircularProgress  /> */}
          </div>


          <div style={contentStyle}>        	       
        
            <div >                            
                {this.state.instanceName}
                <br/>

                <div >
                  <FormControl >

                    <InputLabel htmlFor="contactSelect">To</InputLabel>
                    <Select native   input={<Input name="name" id = "contactSelect" readOnly />}  onChange={this.dropDownChanged}>
                       <option value="" />

                        {
                          this.state.persons.map((inst) => {                                   
                            return((                  
                                  <option value= {inst.id} key={inst.id}>{inst.displayName} </option>                 
                            ))
                          })
                        }

                     </Select>
                     <TextField label = "Message" onChange={this.messgaeChanged}/>


                  </FormControl>
                </div>


                <br/><br/>

                <Button raised color="primary" onClick = {this.sendMessage}> {"Send"} </Button>
                
                <br/><br/>

                

                <TextField  label = "Sent" rows = {3} multiline = {true} value = {this.state.sentQueueString}/>

                <br/><br/>

                
                <TextField  label = "Received" rows = {3} multiline = {true} value = {this.state.receiverQueueString}/>
     
                <br/>                          
          </div>

        </div>

           

      </div>
                
    ) 

  }


////////////// 


   getInstance(){

        var socketid = this.props.socket? this.props.socket.id : "";

        var componentReference = this;  

        componentReference.setState({busy:true})
        
        var google_token = componentReference.props.google_token;
        var userId = componentReference.props.userId;
        var instanceId = componentReference.props.item.instanceid;    
        var url = "/messages/instance?access_token=" + google_token + "&userId=" + userId + "&instanceId=" +instanceId + "&socketid=" + socketid;  

        fetch(url,{ credentials: 'include' }).then(function(response){
          return response.json()
        }).then(function(jsonData){

            //console.log(jsonData)
            componentReference.setState({busy:false})
            if(jsonData.status ==="success"){            
              //componentReference.setState({switchState:jsonData.value.switchstate , instanceName:jsonData.value.instancename })
          }
          else{
            //show proper message
          }
        }).catch(function(err) {
            componentReference.setState({busy:false})
            //show proper message
        })

    }

    listConnectionNames() {
        var componentReference = this;

        global.gapi.client.people.people.connections.list({
           'resourceName': 'people/me',
           'pageSize': 100,
           'personFields': 'names,emailAddresses,metadata',
         }).then(function(response) {
           var connections = response.result.connections;
           var items = [];

           if (connections.length > 0) {
             for (var i = 0; i < connections.length; i++) {
               var person = connections[i];
               items.push(person);
               
             }
             componentReference.buildPersons(items);
             componentReference.forceUpdate();

             //console.log(componentReference.state.persons)
           } else {
            
           }
         });
      }


    buildPersons(data){
      var componentReference = this;
      data.forEach(function(dataItem){
        //console.log(dataItem)

        var obj = {};
        if(dataItem.names){
          dataItem.names.forEach(function(name){
            if(name.metadata.source.type ==="PROFILE"){
              obj.id = name.metadata.source.id;
              obj.displayName = name.displayName;

              //console.log(obj)
              componentReference.state.persons.push(obj);
            }
          })
        }

       
      })

    }


  sendMessage(){

    var socketid = this.props.socket? this.props.socket.id : "";

    var componentReference = this;  
    componentReference.setState({busy:true})

    var google_token = componentReference.props.google_token;
    var userId = componentReference.props.userId;
    var instanceId = componentReference.props.item.instanceid;


    var url = "/messages/send";
    var params =  "access_token=" + google_token 
                 +"&userId=" + userId 
                 +"&instanceId=" + instanceId                  
                 +"&socketid=" + socketid
                 +"&receiverId=" + this.state.selectedId
                 +"&senderName=" + this.props.userName
                 +"&message=" + this.state.messageText
                 ; 


    var http = new XMLHttpRequest();
    
  
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  

    http.onreadystatechange = function() {
        componentReference.setState({busy:false})

        if(http.readyState === 4 && http.status === 200) {
            componentReference.state.sentQueue.push(componentReference.state.selectedName + ": " + componentReference.state.messageText)  

            let temp = "";
            componentReference.state.sentQueue.reverse().forEach(function(x,i){              
              temp = temp + x +"\n";               
            })    

            componentReference.setState ({sentQueueString:temp});   
        }
        else{            
        }
    }

    http.send(params);
  }

  messgaeChanged(x){
    //console.log(x.target.value)
    this.setState({messageText:x.target.value})

  }

  dropDownChanged(x){
    console.log(x.target.value)
    console.log(x.target.selectedIndex)
    console.log(x.target.options[x.target.selectedIndex].text)

    this.setState({selectedIndex: x.target.selectedIndex , 
                  selectedName: x.target.options[x.target.selectedIndex].text,
                  selectedId: x.target.value
                 })

  }



///////////


  //Interface for all services
  applyPushData(data){

    var componentReference = this;

    console.log("MESSGAES RECEIVED PUSH:" , data) 

    this.state.receiverQueue.push(data.data.sendername + ": " + data.data.message);


    componentReference.state.receiverQueueString = "";
    this.state.receiverQueue.reverse().forEach(function(x){
      componentReference.state.receiverQueueString += x + "\n";
    })

    let buffer = this.state.receiveMesaage += "\n" + data.data.message;

    this.setState({receiveMesaage:buffer})

    //if(data.data.method == "update"){
      
    //}
  }

  //Interface for all services
  updateInstance(){
    
  }



}

export default Messages;


