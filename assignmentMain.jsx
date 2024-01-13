import React,{Component} from 'react';
import http from './httpServer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class AssignmentMain extends Component{
    state={
        data:[],
        dataItem:{id:'',title:'',desc:'',subject:'',schedule:""},
       scheduleData:'',
       edit:-1,
       mnth:'',
       time:'',
       mode:true
    }
    async fetchData(){
       
       let response =await http.get(`/schedules`)
       let {data}=response;
       console.log(data)
       this.setState({data:data})
        }
        async componentDidMount(){
            this.fetchData()
         }
    async deleteData(id){
        let response= await http.deleteApi(`/schedules/${id}`);
        console.log(response)
        let s1={...this.state}
        this.setState(s1)
       
    }
    close=()=>{
        let s1={...this.state};
        s1.mode=false;
        this.setState(s1)
    }
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        console.log(e)
        let s1={...this.state};
        input.name=='mnth'?s1.scheduleData=input.value:s1.dataItem[input.name]=input.value;
        console.log(s1.scheduleData)
        console.log(s1.dataItem)
        this.setState(s1);
    }
    componentDidUpdate(preProps,prevState){
        if(preProps!==this.props)
        this.componentDidMount()
    }
    handleSubmit=(e)=>{
        e.preventDefault();
         let s1={...this.state}
         console.log(s1)
         
        this.postData("/data",s1.dataItem)
        this.setState(s1)
    }
    async postData(url,obj){
        let response=await http.post(url,obj)
        console.log(response)
        
    }
    
    
    formDsply=(id)=>{
        let {scheduleData,dataItem,data,mode,time,mnth}=this.state;
        mode=true
        let sample=data.find((pt)=>pt.id==id)
        id>0?dataItem=sample:dataItem=dataItem
        let{title='',desc='',subject='',schedule=''}=dataItem;

        console.log(dataItem)
        return(<div>
            {mode?(
            <div className='model'>
                    <form>
            <h5>Add Schedule</h5>
            <div className="form-group row">
                <div className='col-3'><label>Title:</label>
                </div>
                <div className='col-9' ><input type="text" className='input' name="title" value={title} onClick={this.handleChange}/></div>
            </div>
            <div className="form-group row">
                <div className='col-3' ><label>Description:</label>
                </div>
                <div className='col-9'><textarea type="text" className='input' name='desc' value={desc} onClick={this.handleChange}/></div>
            </div>
            <div className="form-group row">
                    <div className='col-3'><label>Subject:</label>
                    </div>
                    <div className='col-9'><input type="text" className='input' name='subject' value={subject} onClick={this.handleChange}/></div>
                </div>
                <div className="form-group row">
                    <div className='col-3'><label>Frequency:</label>
                    </div>
                    <div className='col-9 input'>
                        <select className='input' name='mnth' value={scheduleData}onClick={this.handleChange}>
                            <option onClick={()=>this.makeRepeat('Weekly')}>Weekly</option>
                            <option>Daily</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                </div>
                {scheduleData=='Weekly'?(<div className="form-group row">
                    <div className='col-3'><label>Repeat:</label>
                    </div>
                    <div className='col-9 input'>
                    <span className='days'>S</span>
                        <span className='days'>M</span><span className='days'>T</span><span className='days'>W</span>
                        <span className='days'>T</span><span className='days'>F</span><span className='days'>S</span>
                    </div></div>):''}
                {scheduleData=='Monthly'?(<div className="form-group row">
                    <div className='col-3'><label>Repeat:</label>
                    </div>
                    <div className='col-9 input'>
                        <select className='input' value={mnth} name='mnth'>
                            <option>First Monday</option>
                            <option>Last Monday</option>
                            <option>Monthly</option>
                        </select>
                    </div></div>):''}
                <div className='form-group row'>
                    <div className='col-3'><label>Time:</label></div>
                    <div className='col-9' >
                    <select className='input'name='time' value={time}>
                            <option>10 AM</option>
                            <option>12 AM</option>
                            <option>11 AM</option>
                        </select>
                    </div>
                </div>
                <button
            className="btn" onClick={()=>this.close()}>Cancel
          </button>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Done</button>
                </form></div>):''}</div>
        )
    }
        
    render(){
        const {data,dataItem}=this.state;
        console.log(dataItem)
        return(
            
                <div ><div className='row row1'></div>
                    <div className='row'>
                        <div className='col-1  mainSec'></div>
                        <div className='col-11'>
                            <div className='row sec1'></div>
                            <br/>
                            <div className='row'>
                                  <div className='col-3'><input type="search"/><FontAwesomeIcon icon={faSearch} /></div>
                                  <div className='col-7'></div>
                                  <div className='col-2'>
                                  <Popup trigger={<button className='btn btn-primary' onClick={()=>this.formDsply()}>
                                    <FontAwesomeIcon icon={faPlusSquare} />Add</button>} 
                                  position="bottom center " model >
                                   {this.formDsply()}
                            </Popup></div>
                            </div>
                            <br/>
                            <div className='container'>
                                <div className='row tableHead text-center'>
                                    <div className='col-2'>Title</div>
                                    <div className='col-4'>Description</div>
                                    <div className='col-2'>Subject</div>
                                    <div className='col-2'>Schedule</div>
                                    <div className='col-2'>Action</div>
                                </div>
                           
                            {data.map((dt)=>{
                             return(<div className='row bg-light text-center'>
                             <div className='col-2'>{dt.title}</div>
                             <div className='col-4'>{dt.desc}</div>
                             <div className='col-2'>{dt.subject}</div>
                             <div className='col-2'>{dt.schedule}</div>
                             <div className='col-2'><Popup trigger={
                             <FontAwesomeIcon icon={faEdit} />} 
                                  position="bottom center " model >
                                    {this.formDsply(dt.id)}
                            </Popup>
                             <FontAwesomeIcon icon={faTrashAlt} onClick={()=>this.deleteData(dt.id)}/></div>
                         </div>)
                            })}
                        </div></div>
                    </div>
                </div>
           
        )
    }
}
export default AssignmentMain;