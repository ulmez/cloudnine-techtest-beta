import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { getSerieOfIconsOnAverageGrade } from '../../../helpers/collection';
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
            filtersVisible: false,
            // salong: {},
            weekDay: {
                monday: 'Måndag',
                tuesday: 'Tisdag',
                wednesday: 'Onsdag',
                thursday: 'Torsdag',
                friday: 'Fredag',
                saturday: 'Lördag',
                sunday: 'Söndag'
            },
            gradeIcons: [],
            filterAngleDown: true
        };

        this.toggleFilters = this.toggleFilters.bind(this);
        this.backToList = this.backToList.bind(this);
    }

    componentDidMount() {
        // console.log(getSerieOfIconsOnAverageGrade(this.props.location.state.grades));

        this.setState({
            gradeIcons: getSerieOfIconsOnAverageGrade(this.props.location.state.grades)
        });
    }

    toggleFilters() {
        // console.log('Hello');
        if(this.state.filterAngleDown) {
            this.setState({
                filterAngleDown: false
            });
        }
        else {
            setTimeout(() => {
                this.setState({
                    filterAngleDown: true
                });
            }, 200);
        }

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
        console.log(this.props.location.state);
        return (
            <div className="page">
                <div style={{padding: '10px', border: '1px solid black', backgroundImage: 'url(' + defaultSalongBackground + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', boxShadow: 'inset 0px -94px 43px -49px rgba(0,0,0,0.9)'}}>
                    <div style={{height: '125px', border: '0px solid black', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <div style={{border: '0px solid black', color: 'white'}}><span onClick={this.backToList}><img src={angleLeft} alt="Angle-left" /></span></div>
                        <div style={{border: '0px solid black', color: 'white'}}><img src={heartIcon} alt="Heart-icon" /></div>
                    </div>
                    <div style={{height: '125px', border: '0px solid black', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                        <div>
                            <div className="salong-info-page type-header" style={{border: '0px solid black', color: 'white'}}>{this.props.location.state.name}</div>
                            <div style={{border: '0px solid white', color: '#B69F58', fontSize: '14px', paddingTop: '5px'}}>
                                
                                {this.state.gradeIcons.map((icon, index) => (
                                    <span key={index} className={icon} style={{width: '17px'}}></span>
                                ))}
                                
                                
                                {/* <span className="fa fa-star" style={{width: '17px'}}></span>
                                <span className="fa fa-star" style={{width: '17px'}}></span>
                                <span className="fa fa-star-half-o" style={{width: '17px'}}></span>
                                <span className="fa fa-star-o" style={{width: '25px'}}></span> */}
                                <span style={{color: 'white', fontSize: '13px', paddingLeft: '8px'}}>({this.props.location.state.grades.length})</span>
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
                    <div style={{height: '20px', border: '0px solid black', display: 'table'}}><span style={{display: 'table-cell', verticalAlign: 'bottom', width: '25px'}}><img src={mapMarkerAlt} alt="Map-marker-alt" /></span><span style={{display: 'table-cell', verticalAlign: 'middle'}}>{this.props.location.state.address.street} {this.props.location.state.address.street_number}, {this.props.location.state.address.postcode} {this.props.location.state.address.city}</span></div>
                    <hr style={{backgroundColor: '#D8D8D8', height: '1px', border: '0'}} />
                    <div style={{height: '20px', border: '0px solid black', display: 'table'}}><span style={{display: 'table-cell', verticalAlign: 'bottom', width: '25px'}}><img src={clockIcon} alt="Clock-icon" /></span><span style={{display: 'table-cell', verticalAlign: 'middle'}}>{typeof this.props.location.state.opening_time[moment().format('dddd').toLowerCase()] === 'object' ? `Öppet till ${this.props.location.state.opening_time[moment().format('dddd').toLowerCase()].close} idag` : 'Stängt idag'}</span><span onClick={this.toggleFilters} className={this.state.filterAngleDown ? 'salong-info-page icon-design fa fa-angle-down' : 'salong-info-page icon-design fa fa-angle-up' } style={{border: '0px solid black', display: 'table-cell', verticalAlign: 'middle', paddingLeft: '10px'}}></span></div>
                    <div className={this.state.filtersVisible ? 'salong-info-page overflow-hidden show' : 'salong-list-page overflow-hidden hide'}>
                        <div style={{paddingTop: '5px'}}>
                            {Object.keys(this.props.location.state.opening_time).map((day) => (
                                <div key={day} style={{display: 'flex', justifyContent: 'flex-start'}}>
                                    <div style={{width: '70px', paddingLeft: '25px'}}>{this.state.weekDay[day]}</div>
                                    {typeof this.props.location.state.opening_time[day] === 'object' ? <div>{this.props.location.state.opening_time[day].open} - {this.props.location.state.opening_time[day].close}</div> : <div>Stängt</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*<div className={this.state.filtersVisible ? 'salong-list-page overflow-hidden show' : 'salong-list-page overflow-hidden hide'}>*/}
                    <hr style={{backgroundColor: '#D8D8D8', height: '1px', border: '0'}} />
                    <div style={{height: '20px', border: '0px solid black', display: 'table'}}><span style={{display: 'table-cell', verticalAlign: 'bottom', width: '25px'}}><img src={phoneIcon} alt="Map-marker-alt" /></span><span style={{display: 'table-cell', verticalAlign: 'middle'}}>{this.props.location.state.phone}</span></div>
                    <hr style={{backgroundColor: '#D8D8D8', height: '1px', border: '0'}} />
                    <div style={{height: '20px', border: '0px solid black', display: 'table'}}><span style={{display: 'table-cell', verticalAlign: 'bottom', width: '25px'}}><img src={globeIcon} alt="Map-marker-alt" /></span><span style={{display: 'table-cell', verticalAlign: 'middle'}}>{this.props.location.state.site_address}</span></div>
                    <hr style={{backgroundColor: '#D8D8D8', height: '1px', border: '0'}} />
                    <div style={{paddingTop: '5px'}}>{this.props.location.state.about}</div>
                </div>
            </div>
        );
    }
}

// export default SalongInfoPage;

export default withRouter(SalongInfoPage);
