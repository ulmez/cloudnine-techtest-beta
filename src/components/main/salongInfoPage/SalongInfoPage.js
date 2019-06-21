import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { getSerieOfIconsOnAverageGrade } from '../../../helpers/collection';
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
        // Store the grade icons used to show right star icon for the salon grade
        this.setState({
            gradeIcons: getSerieOfIconsOnAverageGrade(this.props.location.state.grades)
        });
    }

    // Used to show or hide the filter options and set the right icon based on that
    toggleFilters() {
        // Icon part
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

        // Show hide part
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

    // Send to salong list page
    backToList() {
        this.props.history.push("/");
    }

    render() {
        console.log(this.props.location.state);
        return (
            <div className="page">
                <div className="salong-info-page background-design">
                    <div className="salong-info-page salong-image-top-placeholder">
                        <div><span onClick={this.backToList}><img src={angleLeft} alt="Angle-left" /></span></div>
                        <div><img src={heartIcon} alt="Heart-icon" /></div>
                    </div>
                    <div className="salong-info-page salong-image-bottom-placeholder">
                        <div>
                            <div className="salong-info-page salong-name-header">{this.props.location.state.name}</div>
                            <div className="salong-info-page grade-placeholder">
                                {this.state.gradeIcons.map((icon, index) => (
                                    <span key={index} className={icon} style={{width: '17px'}}></span>
                                ))}
                                <span className="salong-info-page vote-size">({this.props.location.state.grades.length})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="salong-info-page info-schema-placeholder">
                    <div className="salong-info-page info-underline-design">Info</div>
                    <div className="salong-info-page schema-underline-design">Schema</div>
                </div>
                <div className="salong-info-page padding-10">
                    <div>
                        <span className="salong-info-page icon-width"><img src={mapMarkerAlt} alt="Map-marker-alt" /></span>
                        <span className="salong-info-page table-cell">{this.props.location.state.address.street} {this.props.location.state.address.street_number}, {this.props.location.state.address.postcode} {this.props.location.state.address.city}</span>
                    </div>
                    <hr className="salong-info-page hr-design" />
                    <div onClick={this.toggleFilters}>
                        <span className="salong-info-page icon-width"><img src={clockIcon} alt="Clock-icon" /></span>
                        <span className="salong-info-page table-cell">{typeof this.props.location.state.opening_time[moment().format('dddd').toLowerCase()] === 'object' ? `Öppet till ${this.props.location.state.opening_time[moment().format('dddd').toLowerCase()].close} idag` : 'Stängt idag'}</span>
                        <span className={this.state.filterAngleDown ? 'salong-info-page icon-design fa fa-angle-down' : 'salong-info-page icon-design fa fa-angle-up' }></span>
                    </div>
                    <div className={this.state.filtersVisible ? 'salong-info-page overflow-hidden show' : 'salong-list-page overflow-hidden hide'}>
                        <div className="salong-info-page padding-5-top">
                            {Object.keys(this.props.location.state.opening_time).map((day) => (
                                <div key={day} className="salong-info-page day-container">
                                    <div className="salong-info-page day-placement">{this.state.weekDay[day]}</div>
                                    {typeof this.props.location.state.opening_time[day] === 'object' ? <div>{this.props.location.state.opening_time[day].open} - {this.props.location.state.opening_time[day].close}</div> : <div>Stängt</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="salong-info-page hr-design" />
                    <div>
                        <span className="salong-info-page icon-width"><img src={phoneIcon} alt="Phone-icon" /></span>
                        <span className="salong-info-page table-cell">{this.props.location.state.phone}</span>
                    </div>
                    <hr className="salong-info-page hr-design" />
                    <div>
                        <span className="salong-info-page icon-width"><img src={globeIcon} alt="Globe-icon" /></span>
                        <span className="salong-info-page table-cell">{this.props.location.state.site_address}</span>
                    </div>
                    <hr className="salong-info-page hr-design" />
                    <div className="salong-info-page padding-5-top">{this.props.location.state.about}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(SalongInfoPage);
