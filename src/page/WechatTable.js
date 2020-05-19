import React, { Component } from 'react'
import './index.css'
import { Axios } from '../axios'

export default class WechatTable extends Component {

  constructor(props){
    super(props)
    this.state = {
      isDetail: false,
      thead: [],
      data: [[]],
    }
  }

  componentWillMount() {
    this.goBack()
  }

  render() {
    return (
      <div className="container">
        {this.state.isDetail && <div className="operation-bar">
          <button className="operation-bar-btn" onClick={this.goBack}>Back</button>
          <div className="caption">{'微信话题表'}</div>
        </div>}
        <div className="wc-table">
          {this.renderTable()}
        </div>
      </div>
    )
  }

  renderTable = () => {
    return(
      <table>
        {this.renderThead()}
        {this.renderTbody()}
      </table>
    )
  }

  renderThead = ()=> {
    return (
      <thead>
        <tr>
          {this.state.thead.map((i) => {
            return (<th key={i}>{i}</th>)
          })}
        </tr>
      </thead>
    )
  }

  renderTbody = () => {
    return (
      <tbody>
        {this.state.data.map((n,i)=>{
          return this.renderTR(n,i)
        })}
      </tbody>
    )
  }

  renderTR = (item, idx) => {
    return (
      <tr key={idx} onClick={!this.state.isDetail ? () => {this.goDetail( item[0], item[1] )} : null}>
        {item.map((n, i)=>{
          return (<td key={`${idx}-${i}`}>{n}</td>)
        })}
      </tr>
    )
  }

  goBack = () => {
    Axios.post('/show/', {}).then((res) => {
      this.setState({data: res.data.tableData, thead: res.data.tableHead, isDetail: false})
    }).catch((err) => {
      alert(err)
      this.setState({isDetail: false})
    })
  }

  goDetail = (topicId, roomId) => {
    Axios.post('/particular-message/', {'topic_id': topicId, 'room_id': roomId}).then((res) => {
      this.setState({data: res.data.tableData, thead: res.data.tableHead, isDetail: true})
    }).catch((err) => {
      alert(err)
      this.setState({isDetail: true})
    })
  }

}

// const data = {
//   tableHead: ['qqid', 'roomid', 'content', 'type', 'ltime', 'mtime', 'ex1', 'ex2'],
//   tableData: [
//     ['739823196', '650707732', '哈哈哈哈哈哈', 'group', '2019-12-09 18:35:48', '1575887748162', '0' , null],
//     ['739823196', '650707732', '哈哈哈哈哈哈', 'group', '2019-12-09 18:35:48', '1575887748162', '0' , null]
//   ]
// }