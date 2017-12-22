import React from 'react'
import {connect} from 'react-redux'
import * as DataGridActions from './datagridAction'

class DataGridComponent extends React.Component{
    componentDidMount(){
        console.log(this.props)
        this.props.getData()
    }

    getKeys(item){
        var newObj = (item ? Object.keys(item) : []);
        return newObj
    }

    render(){
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {
                                this.getKeys(this.props.dataset[0]).map(function(key, index){
                                    return <th key={index}>{key}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.dataset.map(function(obj, index){
                            return (
                                <tr key={'tr' + index}>
                                    {
                                        this.getKeys(obj).map(function(key, idx){
                                            if(typeof obj[key] != 'object'){
                                                return <td key={'b' + idx}>{obj[key]}</td>
                                            } 
                                            return <td key={'a' + idx}>object</td>
                                        })
                                    }
                                </tr>
                            )
                        }.bind(this))
                    }
                </tbody>                    
                    <tfoot></tfoot>
                </table>
            </div>
        )
    }
}

const mapToState = function(state){ 
    return {
        dataset: state.datagrid.response || []
    }
}

export default connect(mapToState, DataGridActions)(DataGridComponent);