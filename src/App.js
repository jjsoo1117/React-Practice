import React, { Component } from 'react';
import './App.css';

class Subject extends Component {
  render() {
    return (
      <header>
        <h1><a href="/" onClick={function (e) {
          e.preventDefault();
          this.props.onChangePage();
        }.bind(this)}> {this.props.title}</a> </h1>
        {this.props.sub}
      </header>
    );
  }
}
class TOC extends Component {
  render() {
    var list = [];
    var data = this.props.data;
    var i = 0;
    while (i < data.length) {
      list.push(
        <li key={data[i].id}>
          <a
            href={"/content/"+data[i].id}
            data-id={data[i].id}
            onClick={function (e) {
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}
          >{data[i].title}</a>
        </li>
      );
      i = i + 1;
    }
    return (
      <nav>
        <ul>
          {list}
        </ul>
      </nav>
    )
  }
}
class Content extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    )
  }
}

class App extends Component {
  constructor(props) {           //초기화 담당
    super(props);
    this.state = {
      mode: 'read',
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'World wide web' },
      welcome: { title: 'Welcome', desc: 'Hello,React!' },
      contents: [
        { id: 1, title: "HTML", desc: "html" },
        { id: 2, title: "CSS", desc: "css" },
        { id: 3, title: "Javascript", desc: "javascript" }
      ]
    }
  }
  render() {
    var _title, _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        console.log(data);
        if(data.id === this.state.selected_content_id){
          _title= data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={
            function () {
              this.setState({ mode: 'welcome' });
            }.bind(this)
          }></Subject>
        <TOC data={this.state.contents}
          onChangePage={function (id) {
            this.setState({ 
              mode: 'read',
              selected_content_id:Number(id)
            });
          }.bind(this)
          }></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
