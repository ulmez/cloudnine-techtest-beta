import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import defaultSalongBackground from '../../../images/default-salong-background.svg';
import mapMarkerAlt from '../../../images/map-marker-alt.svg';
import angleLeft from '../../../images/angle-left.svg';
import clockIcon from '../../../images/clock-icon.svg';
import phoneIcon from '../../../images/phone-icon.svg';
import globeIcon from '../../../images/globe-icon.svg';
import heartIcon from '../../../images/heart-icon.svg';
import './SalongInfoPage.scss';

class SalongInfoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filtersVisible: false
        };

        this.toggleFilters = this.toggleFilters.bind(this);
        this.backToList = this.backToList.bind(this);
    }

    toggleFilters() {
        // console.log('Hello');
        if(this.state.filtersVisible) {
            this.setState({
                filtersVisible: false
            });
        }
        else {
            this.setState({
                filtersVisible: true
            });
        }
    }

    backToList() {
        // console.log('back');
        this.props.history.push("/salonglist");
    }

    render() {
        return (
            <div className="page">
                <div style={{padding: '10px', border: '1px solid black', backgroundImage: 'url(' + defaultSalongBackground + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', boxShadow: 'inset 0px -94px 43px -49px rgba(0,0,0,0.9)'}}>
                    <div style={{height: '125px', border: '0px solid black', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <div style={{border: '0px solid black', color: 'white'}}><span onClick={this.backToList}><img src={angleLeft} alt="Angle-left" /></span></div>
                        <div style={{border: '0px solid black', color: 'white'}}><img src={heartIcon} alt="Heart-icon" /></div>
                    </div>
                    <div style={{height: '125px', border: '0px solid black', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                        <div>
                            <div className="salong-info-page type-header" style={{border: '0px solid black', color: 'white'}}>Salong namn</div>
                            <div style={{border: '0px solid white', color: '#B69F58', fontSize: '14px', paddingTop: '5px'}}>
                                <span className="fa fa-star" style={{width: '17px'}}></span>
                                <span className="fa fa-star" style={{width: '17px'}}></span>
                                <span className="fa fa-star" style={{width: '17px'}}></span>
                                <span className="fa fa-star" style={{width: '17px'}}></span>
                                <span className="fa fa-star-o" style={{width: '25px'}}></span>
                                <span style={{color: 'white', fontSize: '13px'}}>(32)</span>
                            </div>
                        </div>
                    </div>
                    {/*<Link to="/salonglist">Salong list</Link><br />
                    Salong info page*/}
                    {/* <img src={test} alt="test" /> */}
                </div>
                <div style={{display: 'flex', height: '50px', border: '0px solid black', fontWeight: '400'}}>
                    <div style={{borderBottom: '2px solid #B69F58', flex: '1', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><div style={{border: '0px solid black'}}>Info</div></div>
                    <div style={{borderBottom: '2px solid white', flex: '1', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><div style={{border: '0px solid black'}}>Schema</div></div>
                </div>
                <div style={{border: '0px solid black', padding: '10px'}}>
                    <div style={{height: '20px', border: '0px solid black', display: 'table'}}><span style={{display: 'table-cell', verticalAlign: 'bottom', width: '25px'}}><img src={mapMarkerAlt} alt="Map-marker-alt" /></span><span style={{display: 'table-cell', verticalAlign: 'middle'}}>Rådmansgatan 46, 113 57 Stockholm</span></div>
                    <hr style={{backgroundColor: '#D8D8D8', height: '1px', border: '0'}} />
                    <div style={{height: '20px', border: '0px solid black', display: 'table'}}><span style={{display: 'table-cell', verticalAlign: 'bottom', width: '25px'}}><img src={clockIcon} alt="Clock-icon" /></span><span style={{display: 'table-cell', verticalAlign: 'middle'}}>Öppet till 19:00 idag</span><span onClick={this.toggleFilters} className="salong-info-page icon-design fa fa-angle-down" style={{border: '0px solid black', display: 'table-cell', verticalAlign: 'middle', paddingLeft: '10px'}}></span></div>
                    <div className={this.state.filtersVisible ? 'salong-info-page overflow-hidden show' : 'salong-list-page overflow-hidden hide'}>
                        <div>
                            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <div style={{width: '70px', paddingLeft: '25px'}}>Måndag</div>
                                <div>11:00 - 19:00</div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <div style={{width: '70px', paddingLeft: '25px'}}>Tisdag</div>
                                <div>11:00 - 19:00</div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <div style={{width: '70px', paddingLeft: '25px'}}>Onsdag</div>
                                <div>11:00 - 19:00</div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <div style={{width: '70px', paddingLeft: '25px'}}>Torsdag</div>
                                <div>10:00 - 18:00</div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <div style={{width: '70px', paddingLeft: '25px'}}>Fredag</div>
                                <div>12:00 - 18:00</div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <div style={{width: '70px', paddingLeft: '25px'}}>Lördag</div>
                                <div>Stängt</div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <div style={{width: '70px', paddingLeft: '25px'}}>Söndag</div>
                                <div>Stängt</div>
                            </div>
                            {/* <div>Tisdag 11:00 - 19:00</div>
                            <div>Onsdag 11:00 - 19:00</div>
                            <div>Torsdag 10:00 - 18:00</div>
                            <div>Fredag 12:00 - 18:00</div>
                            <div>Lördag Stängt</div>
                            <div>Söndag Stängt</div> */}
                        </div>
                    </div>
                    {/*
                        "monday": {
                            "open": "11:00",
                            "close": "19:00"
                        },
                        "tuesday": {
                            "open": "11:00",
                            "close": "19:00"
                        },
                        "wednesday": {
                            "open": "11:00",
                            "close": "19:00"
                        },
                        "thursday": {
                            "open": "10:00",
                            "close": "18:00"
                        },
                        "friday": {
                            "open": "12:00",
                            "close": "18:00"
                        },
                        "saturday": "closed",
                        "sunday": "closed"
                    */}
                    {/*<div className={this.state.filtersVisible ? 'salong-list-page overflow-hidden show' : 'salong-list-page overflow-hidden hide'}>*/}
                    <hr style={{backgroundColor: '#D8D8D8', height: '1px', border: '0'}} />
                    <div style={{height: '20px', border: '0px solid black', display: 'table'}}><span style={{display: 'table-cell', verticalAlign: 'bottom', width: '25px'}}><img src={phoneIcon} alt="Map-marker-alt" /></span><span style={{display: 'table-cell', verticalAlign: 'middle'}}>08-522 389 20</span></div>
                    <hr style={{backgroundColor: '#D8D8D8', height: '1px', border: '0'}} />
                    <div style={{height: '20px', border: '0px solid black', display: 'table'}}><span style={{display: 'table-cell', verticalAlign: 'bottom', width: '25px'}}><img src={globeIcon} alt="Map-marker-alt" /></span><span style={{display: 'table-cell', verticalAlign: 'middle'}}>www.salongweb.se</span></div>
                    <hr style={{backgroundColor: '#D8D8D8', height: '1px', border: '0'}} />
                    <div style={{paddingTop: '5px'}}>Lorem ipsum dolor sit amet, vulputate nunc. Auctor viverra. Ridiculus feugiat nunc porttitor volut pat, acu quis torquent iaculis ultricies massa, duis nun quis que amet.</div>
                </div>
            </div>
        );
    }
}

// export default SalongInfoPage;

export default withRouter(SalongInfoPage);