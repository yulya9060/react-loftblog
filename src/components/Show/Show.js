import React, { Component } from 'react';
import './Show.css';
import { getShowInfo } from '../../api';

class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showId: null,
      data:null
    };
  }


  componentDidMount() {
    const { showId } = this.props;
    if (showId){
      this.getFilmContent(showId);
    }
  }
  
  getFilmContent=(showId)=>{
    getShowInfo(showId)
      .then((response)=>{
        const { image,genres,name,summary } = response;
        this.setState((prevState)=>{return {data:{...prevState.data,image,genres,name,summary}}})
      })
      .catch((error)=>{
          console.log('error',error);
      })
  };

  getSummary=(summary)=>{
    return {__html:summary};
  }

  render() {
    const { data } = this.state;
    const { key,showId } = this.props;
    if (!data){
      return <p className="t-show-info">Шоу не выбрано</p>
    }
    else{
      return (
    <div className="show">
      <img src={data.image.original} alt="" className="show-image" />
      <h2 className="show-label t-show-name">{data.name}</h2>
      
        <p className="show-text t-show-genre">
          <b>Жанр: </b>
          {data.genres.join(', ')}
          </p>
     <p className="show-text t-show-summary" dangerouslySetInnerHTML={this.getSummary(data.summary)} />
    </div>
      )
    }
  }
}

export default Show;
