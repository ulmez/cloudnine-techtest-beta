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
            }
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
        // console.log(this.state.filters);

        const filtersTemp = JSON.parse(JSON.stringify(this.state.filters));
            
        filtersTemp.price = {
            start: item.start,
            end: item.end
        };

        // const filtersTemp = {
        //     price: {
        //         start: item.start,
        //         end: item.end
        //     },
        //     type: {
        //         text: this.state.filters.type.text
        //     }
        // };

        // console.log(filtersTemp.type);

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
        
        // console.log(Object.keys(filters));

        

        // Object.keys(filters).map((filterName) => {
        //     console.log(filters[filterName]);
        // });

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

        // salongsTemp.forEach((t) => {
        //     console.log(t.types.indexOf(filters.type.text));
        //     if(filters.type.text !== '') {

        //     }
        // });

        // salongsTemp = _.filter(salongsTemp, (o) => { 
        //     return (o.price >= filters.price.start && o.price <= filters.price.end);
        // });

        return salongsTemp;

        // return _.filter(salongs, (o) => { 
        //     return (o.price >= filters.price.start && o.price <= filters.price.end);
        // });
    }

    typeChoice(item) {
        // console.log(id);
        // console.log(item);
        // console.log(this.state.filters.price.start);
        // console.log(this.state.filters.price.end);
        // console.log(this.state.selectedPriceOption.text);
        // console.log(item.textEng);
        // console.log(this.state.filters);

        const filtersTemp = JSON.parse(JSON.stringify(this.state.filters));
        
        filtersTemp.type = {
            text: item.textEng
        };
        
        // const filtersTemp = {
        //     price: {
        //         start: this.state.filters.price.start,
        //         end: this.state.filters.price.end
        //     },
        //     type: {
        //         text: item.textEng
        //     }
        // };

        // console.log(filtersTemp);

        this.setState({
            selectedTypeOption: {
                selected: item.id,
                text: item.text
            },
            filters: filtersTemp
        });
    }

    markedType(booleanValue) {
        // console.log(e.target.value);
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
        // console.log(e.target.value);
        if(booleanValue) {
            console.log(this.state.filters.price);

            const filtersTemp = JSON.parse(JSON.stringify(this.state.filters));

            filtersTemp.price = {
                end: '',
                start: ''
            };

            // this.state.filters.price = {
            //     end: '',
            //     start: ''
            // };
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
        // console.log('Test');
        // this.props.history.push("/salonginfo");
        this.props.history.push("/salonginfo", { ...item });
        // const state = this.props.location.state
    }

    render() {
        // console.log(this.state.checkboxType);
        // console.log(this.state.checkboxPrice);
        // console.log(this.state.selectedTypeOption);
        // console.log(this.state.selectedPriceOption);
        // console.log(this.state.filters);
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
                                <div style={{paddingBottom: '10px'}}>Val av filter</div>
                                <div><input type="checkbox" onClick={() => this.markedType(this.state.checkboxType)} />Typ</div>
                                <div style={{paddingBottom: '10px'}}><input type="checkbox" onClick={() => this.markedPrice(this.state.checkboxPrice)} />Pris</div>
                            </div>
                            {this.state.checkboxType && <div style={{paddingRight: '10px'}}>
                                <hr style={{backgroundColor: '#D8D8D8', height: '1px', border: '0'}} />
                                <div className="salong-list-page option-container">
                                    <div>{this.state.selectedTypeOption.text}</div>
                                    <div className="salong-list-page icon-arrow-vertical-design-collapsed"><span className="fa fa-angle-down" onClick={this.toggleType}></span></div>
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
                            {this.state.checkboxPrice && <div style={{paddingRight: '10px'}}>
                                <hr style={{backgroundColor: '#D8D8D8', height: '1px', border: '0'}} />
                                <div className="salong-list-page option-container">
                                    <div>{this.state.selectedPriceOption.text}</div>
                                    <div className="salong-list-page icon-arrow-vertical-design-collapsed"><span className="fa fa-angle-down" onClick={this.togglePrice}></span></div>
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
                    <div style={{paddingTop: '10px'}}>
                    {this.salongsFilter(this.state.salongs, this.state.filters).map((salong) => (
                        <div key={salong._id} className="salong-list-page" style={{padding: '10px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <div style={{display: 'flex'}}>
                                <div style={{fontWeight: '400', paddingRight: '20px'}}>12.00</div>
                                <div>
                                    <div style={{fontFamily: 'millerBannerLight', fontSize: '20px', paddingLeft: '2px'}}>{salong.name}</div>
                                    <div style={{paddingTop: '5px', paddingBottom: '5px'}} className="salong-list-page icon-star-design">
                                        {getSerieOfIconsOnAverageGrade(salong.grades).map((icon, index) => (
                                            <span key={index} className={icon} style={{padding: '2px'}}></span>
                                        ))}
                                        <label style={{fontSize: '11px', color: '#656565', paddingLeft: '8px'}}>({salong.grades.length})</label>
                                    </div>
                                    <div style={{color: '#656565', paddingBottom: '10px', paddingLeft: '2px'}}>{salong.address.street} {salong.address.street_number}</div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <div style={{display: 'flex'}}>
                                <div>
                                    <div style={{fontWeight: '400'}}>{salong.price} kr</div>
                                    <div style={{fontSize: '13px', color: '#656565', paddingTop: '10px'}}>{salong.time}</div>
                                </div>
                                <div className="salong-list-page icon-arrow-vertical-design" style={{paddingLeft: '20px', paddingTop: '15px'}}>{/*<Link to="/salonginfo">*/}<span className="fa fa-angle-right" onClick={() => this.getToOtherPage(salong)}></span>{/*</Link>*/}</div>
                            </div>
                            </div>
                            </div>
                            <hr style={{backgroundColor: '#D8D8D8', height: '1px', border: '0'}} />
                        </div>
                    ))}
                    </div>
                </div>
                {this.state.loading && <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)'}}>
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

// export default SalongListPage;

export default withRouter(SalongListPage);