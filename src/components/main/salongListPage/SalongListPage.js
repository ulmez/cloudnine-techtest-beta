import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { CircleLoader } from 'react-spinners';
import { withRouter } from 'react-router-dom';
import { getSerieOfIconsOnAverageGrade } from '../../../helpers/collection';
import filterIcon from '../../../images/filter-icon.svg';
import './SalongListPage.scss';

class SalongListPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filtersVisible: false,
            priceVisible: false,
            typeVisible: false,
            checkboxType: false,
            checkboxPrice: false,
            selectedPriceOption: {
                selected: 0,
                text: 'Ingen priskategori vald ännu'
            },
            selectedTypeOption: {
                selected: 0,
                text: 'Ingen typ vald ännu'
            },
            priceOptionTexts: [
                {
                    id: 1,
                    start: 100,
                    end: 250,
                    text: 'Pris 100 - 250 kr'
                },
                {
                    id: 2,
                    start: 250,
                    end: 500,
                    text: 'Pris 250 - 500 kr'
                },
                {
                    id: 3,
                    start: 500,
                    end: 750,
                    text: 'Pris 500 - 750 kr'
                }
            ],
            typeOptionTexts: [
                {
                    id: 1,
                    text: 'Hår',
                    textEng: 'hair'
                },
                {
                    id: 2,
                    text: 'Naglar',
                    textEng: 'nail'
                },
                {
                    id: 3,
                    text: 'Hud',
                    textEng: 'skin'
                },
                {
                    id: 4,
                    text: 'Massage',
                    textEng: 'massage'
                },
                {
                    id: 5,
                    text: 'Ansikte',
                    textEng: 'face'
                }
            ],
            salongs: [],
            loading: true,
            gradeIcons: [],
            filters: {
                price: {
                    start: '',
                    end: ''
                },
                type: {
                    text: ''
                }
            },
            typeAngleDown: true,
            priceAngleDown: true
        };

        this.toggleFilters = this.toggleFilters.bind(this);
        this.togglePrice = this.togglePrice.bind(this);
        this.toggleType = this.toggleType.bind(this);
        this.markedType = this.markedType.bind(this);
        this.markedPrice = this.markedPrice.bind(this);
        this.getToOtherPage = this.getToOtherPage.bind(this);
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/salongs`)
        .then((result) => {
            console.log(result.data);
            this.setState({
                salongs: result.data,
                loading: false
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    toggleFilters() {
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

    togglePrice() {
        if(this.state.priceAngleDown) {
            this.setState({
                priceAngleDown: false
            });
        }
        else {
            setTimeout(() => {
                this.setState({
                    priceAngleDown: true
                });
            }, 200);
        }

        if(this.state.priceVisible) {
            this.setState({
                priceVisible: false
            });
        }
        else {
            this.setState({
                priceVisible: true
            });
        }
    }

    toggleType() {
        if(this.state.typeAngleDown) {
            this.setState({
                typeAngleDown: false
            });
        }
        else {
            setTimeout(() => {
                this.setState({
                    typeAngleDown: true
                });
            }, 200);
        }
        
        if(this.state.typeVisible) {
            this.setState({
                typeVisible: false
            });
        }
        else {
            this.setState({
                typeVisible: true
            });
        }
    }

    priceChoice(item) {
        const filtersTemp = JSON.parse(JSON.stringify(this.state.filters));
            
        filtersTemp.price = {
            start: item.start,
            end: item.end
        };

        this.setState({
            selectedPriceOption: {
                selected: item.id,
                text: item.text
            },
            filters: filtersTemp
        });
    }

    salongsFilter(salongs, filters = {
        price: {
            start: '',
            end: ''
        },
        type: {
            text: ''
        }
    }) {
        let salongsTemp = salongs;

        if(filters.price.start !== '') {
            salongsTemp = _.filter(salongs, (o) => { 
                return (o.price >= filters.price.start && o.price <= filters.price.end);
            });
        }

        if(filters.type.text !== '') {
            salongsTemp = _.filter(salongsTemp, (t) => { 
                return (t.types.indexOf(filters.type.text) > -1);
            });
        }

        return salongsTemp;
    }

    typeChoice(item) {
        const filtersTemp = JSON.parse(JSON.stringify(this.state.filters));

        filtersTemp.type = {
            text: item.textEng
        };

        this.setState({
            selectedTypeOption: {
                selected: item.id,
                text: item.text
            },
            filters: filtersTemp
        });
    }

    markedType(booleanValue) {
        if(booleanValue) {
            const filtersTemp = JSON.parse(JSON.stringify(this.state.filters));
            
            filtersTemp.type = {
                text: ''
            };

            this.setState({
                checkboxType: false,
                selectedTypeOption: {
                    selected: 0,
                    text: 'Ingen typ vald ännu'
                },
                filters: filtersTemp
            });
        }
        else {
            this.setState({
                checkboxType: true
            });
        }
    }

    markedPrice(booleanValue) {
        if(booleanValue) {
            console.log(this.state.filters.price);

            const filtersTemp = JSON.parse(JSON.stringify(this.state.filters));

            filtersTemp.price = {
                end: '',
                start: ''
            };

            this.setState({
                checkboxPrice: false,
                selectedPriceOption: {
                    selected: 0,
                    text: 'Ingen priskategori vald ännu'
                },
                filters: filtersTemp
            });
        }
        else {
            this.setState({
                checkboxPrice: true
            });
        }
    }

    getToOtherPage(item) {
        this.props.history.push("/salonginfo", { ...item });
    }

    render() {
        console.log(this.salongsFilter(this.state.salongs, this.state.filters));
        return (
            <div>
                <div className="page">
                    <div className="salong-list-page filter-container line">
                        <div className="salong-list-page icon-design"><span className="fa fa-angle-left"></span></div>
                        <div className="salong-list-page type-header">{this.state.selectedTypeOption.text !== 'Ingen typ vald ännu' ? this.state.selectedTypeOption.text : 'Alla salonger'}</div>
                        <img src={filterIcon} alt="filter" onClick={this.toggleFilters} />
                    </div>
                    <div className="salong-list-page padding-10-left line">
                        <div className={this.state.filtersVisible ? 'salong-list-page overflow-hidden show' : 'salong-list-page overflow-hidden hide'}>
                            <div className="salong-list-page filter-checkbox-container">
                                <div className="salong-list-page padding-10-bottom">Val av filter</div>
                                <div><input type="checkbox" onClick={() => this.markedType(this.state.checkboxType)} />Typ</div>
                                <div className="salong-list-page padding-10-bottom"><input type="checkbox" onClick={() => this.markedPrice(this.state.checkboxPrice)} />Pris</div>
                            </div>
                            {this.state.checkboxType && <div className="salong-list-page padding-10-right">
                                <hr className="salong-list-page hr-design" />
                                <div onClick={this.toggleType} className="salong-list-page option-container">
                                    <div>{this.state.selectedTypeOption.text}</div>
                                    <div className="salong-list-page icon-arrow-vertical-design-collapsed"><span className={this.state.typeAngleDown ? 'fa fa-angle-down' : 'fa fa-angle-up' }></span></div>
                                </div>
                                <div className={this.state.typeVisible ? 'salong-list-page overflow-hidden show' : 'salong-list-page overflow-hidden hide'}>
                                    {this.state.typeOptionTexts.map((typeOption) => (
                                        <div key={typeOption.id}>
                                            <div><input type="radio" name="typeOption" onClick={() => this.typeChoice(typeOption)} />{typeOption.text}</div>
                                        </div>
                                    ))}
                                    <div className="salong-list-page height-10-pixel"></div>
                                </div>
                            </div>}
                            {this.state.checkboxPrice && <div className="salong-list-page padding-10-right">
                                <hr className="salong-list-page hr-design" />
                                <div onClick={this.togglePrice} className="salong-list-page option-container">
                                    <div>{this.state.selectedPriceOption.text}</div>
                                    <div className="salong-list-page icon-arrow-vertical-design-collapsed"><span className={this.state.priceAngleDown ? 'fa fa-angle-down' : 'fa fa-angle-up' }></span></div>
                                </div>
                                <div className={this.state.priceVisible ? 'salong-list-page overflow-hidden show' : 'salong-list-page overflow-hidden hide'}>
                                    {this.state.priceOptionTexts.map((priceOption) => (
                                        <div key={priceOption.id}>
                                            <div><input type="radio" name="priceOption" onClick={() => this.priceChoice(priceOption)} />Pris {priceOption.start} - {priceOption.end} kr</div>
                                        </div>
                                    ))}
                                    <div className="salong-list-page height-10-pixel"></div>
                                </div>
                            </div>}
                            
                        </div>
                    </div>
                    <div className="salong-list-page padding-10-top">
                    {this.salongsFilter(this.state.salongs, this.state.filters).map((salong) => (
                        <div key={salong._id} className="salong-list-page padding-10">
                            <div className="salong-list-page salong-container">
                                <div>
                                    <div className="salong-list-page flex-display">
                                        <div className="salong-list-page bolder-font padding-20-right">12.00</div>
                                        <div>
                                            <div className="salong-list-page salong-name">{salong.name}</div>
                                            <div className="salong-list-page icon-star-design padding-5-top-5-bottom">
                                                {getSerieOfIconsOnAverageGrade(salong.grades).map((icon, index) => (
                                                    <span key={index} className={icon} style={{padding: '2px'}}></span>
                                                ))}
                                                <label className="salong-list-page vote-size">({salong.grades.length})</label>
                                            </div>
                                            <div className="salong-list-page street-address">{salong.address.street} {salong.address.street_number}</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="salong-list-page flex-display">
                                        <div>
                                            <div className="salong-list-page bolder-font">{salong.price} kr</div>
                                            <div className="salong-list-page salong-time">{salong.time}</div>
                                        </div>
                                        <div className="salong-list-page icon-arrow-vertical-design padding-20-left-15-top"><span className="fa fa-angle-right" onClick={() => this.getToOtherPage(salong)}></span></div>
                                    </div>
                                </div>
                            </div>
                            <hr className="salong-list-page hr-design" />
                        </div>
                    ))}
                    {this.salongsFilter(this.state.salongs.length > 0 && this.state.salongs, this.state.filters).length === 0 && <div className="salong-list-page align-center">Denna sökning gav ingen träff</div>}
                    </div>
                </div>
                {this.state.loading && <div className="salong-list-page loader-icon">
                    <CircleLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#B69F58'}
                        loading={this.state.loading}
                    />
                </div>}
            </div>
        );
    }
}

export default withRouter(SalongListPage);
