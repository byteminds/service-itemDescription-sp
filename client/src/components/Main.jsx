import React, { Component } from 'react';
import MainDescription from './MainDescription.jsx';
import MainPicture from './MainPicture.jsx';
import * as Styled from './styled.jsx';
import amazonFont from '../../dist/fonts/AmazonEmber_Rg.ttf';
const axios = require('axios');

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      item: [],
    };
    this.getData = this.getData.bind(this);
  }
  
  componentDidMount() {
    this.getData();
  }
  
  getData() {
    const id = window.location.href.split('/').splice(-2, 1);

    axios.get(`/descriptions/${id}`)
      .then(res => this.setState({
        isLoaded: true,
        item: res.data[0],
      }))
      .catch( err => console.log('ERROR:', err) )
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading ..</div>
    }
    return (
      <div style={{ fontFamily: amazonFont }}>
        <Styled.GlobalStyle />
        <Styled.Container>
          <MainPicture data={this.state.item} />
          <MainDescription data={this.state.item} />
        </Styled.Container>
      </div>
    );
  }
}

export default Main;