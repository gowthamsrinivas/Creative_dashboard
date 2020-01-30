/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState, useEffect} from 'react';
import  './Filter.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filter = (props) => {
    const [countries,setCountries] = useState([]);
    const [riskLevel,setRiskLevel] = useState([]);
    const [watchList,setWatchList] = useState([]);
    const [pepClass,setPepClass] = useState([]);
    const [slideValue,setSlideValue] = useState(90);
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [countryFlag,setCountryFlag] = useState(false);
    const [riskFlag,setRiskFlag] = useState(false);
    const [watchFlag,setWatchFlag] = useState(false);
    const [pepFlag,setPepFlag] = useState(false);

    // Data to show number info for each filter value
    const dataCollection = props.data;

    //Country Collection     
    const countryList = [{
        name:'country',
        value:'ALL',
        selected:true,
        show:true
    },{
        name:'country',
        value:'US',
        selected:false,
        show:true
    },{
        name:'country',
        value:'UK',
        selected:false,
        show:true
    },{
        name:'country',
        value:'Belgium',
        selected:false,
        show:false
    },{
        name:'country',
        value:'France',
        selected:false,
        show:false
    },{
        name:'country',
        value:'India',
        selected:false,
        show:false
    }];
    
    // risk level collection
    const riskLevels = [{
        name:'risk',
        value:'ALL',
        selected:true,
        show:true
    },{
        name:'risk',
        value:'High',
        selected:false,
        show:true
    },{
        name:'risk',
        value:'Medium',
        selected:false,
        show:true
    },{
        name:'risk',
        value:'Low',
        selected:false,
        show:false
    },{
        name:'risk',
        value:'Simple',
        selected:false,
        show:false
    }];

    // watchers collection

    const watchLists = [ {
        name:'watchList',
        value:'ALL',
        selected:true,
        show:true
    },{
        name:'watchList',
        value:'Sanctions',
        selected:false,
        show:true
    },{
        name:'watchList',
        value:'Fitness & Probity',
        selected:false,
        show:false
    },{
        name:'watchList',
        value:'Warnings',
        selected:false,
        show:false
    }];

    // Pep collection

    const pepClasses = [ {
        name:'pepClasses',
        value:'ALL',
        selected:true,
        show:true
    },{
        name:'pepClasses',
        value:1,
        selected:false,
        show:true
    },{
        name:'pepClasses',
        value:2,
        selected:false,
        show:true
    },{
        name:'pepClasses',
        value:3,
        selected:false,
        show:false
    },{
        name:'pepClasses',
        value:4,
        selected:false,
        show:false
    }];

    useEffect( () => {
       let country = [...countryList];
       let risks = [...riskLevels];
       let pepClass = [...pepClasses];
       let watcher  = [...watchLists];
       setCountries(country);
       setRiskLevel(risks);
       setWatchList(watcher);
       setPepClass(pepClass);
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    // To Change selection of country field
    function changeCountry(value,selected) { 
        // Take shallow copy of country data
        let country = [...countries];
        let index=-1;
        country.forEach((country,id) => {
            if(country.value === value) {
                index=id;
            }
        })
        // change attribute value in a particular item in the list
        let item = {
            ...country[index],
            selected: !selected
        }
        country[index] = item;
        // Updated states which in turn rerenders the component
        setCountries([...country]);
    };
    
    // To Change selection of Risk field
    function changeRisk(value,selected) {
        let risk = [...riskLevel];
        let index=-1;
        risk.forEach((risk,id) => {
            if(risk.value === value)
                index=id;
        })
        let item = {
            ...risk[index],
            selected: !selected
        }
        risk[index] = item;
        setRiskLevel([...risk]);
    };
    
    // To Change selection of Watch field
    function changeWatchList(value,selected) {
        let watcher = [...watchList];
        let index=-1;
        watcher.forEach((watcher,id) => {
            if(watcher.value === value)
                index=id;
        })
        let item = {
            ...watcher[index],
            selected: !selected
        }
        watcher[index] = item;
        setWatchList([...watcher]);
    };
    
    // To Change selection of Pep field
    function changePepClasses(value,selected) {
        let pep = [...pepClass];
        let index=-1;
        pep.forEach((pep,id) => {
            if(pep.value === value)
                index=id;
        })
        let item = {
            ...pep[index],
            selected: !selected
        }
        pep[index] = item;
        setPepClass([...pep]);
    };
    
    // To set range tag value in Hooks
    function slideChange() {
        setSlideValue(document.getElementById("slider").value);
    }

    // Conerting date to dd/mm/yyyy format
    function convert(str) {
        let response = '';
        if(str) {
            var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = date.getDate();
            return [day,mnth,date.getFullYear() ].join("/");
        }
        else {
            return response ;
        }
      }
    

    function applyFilter() {
        const filterObj ={match:'',countries:[],risks:[],watch:[],pep:[],startDate:convert(startDate),endDate:convert(endDate)};
        filterObj.match = slideValue;
        let country= countries.filter(country => {
            return country.selected;
        });
        filterObj.countries = [].concat(country.map(country=>{return country.value;}));

        let risks = riskLevel.filter(risk =>{
            return risk.selected;
        })
        filterObj.risks = [].concat(risks.map(risk=>{return risk.value;}));
        let pep = pepClass.filter(pep =>{
            return pep.selected;
        })
        filterObj.pep = [].concat(pep.map(pep=>{return pep.value;}));
        let watch = watchList.filter(watch =>{
            return watch.selected;
        })
        filterObj.watch = [].concat(watch.map(watch=>{return watch.value;}));
        props.click(filterObj);

    }

    function clearFilter() {
        props.clear();
        setStartDate('');
        setEndDate('');
        // set Every filter option to its default value
        setCountries([...countryList]);
        setRiskLevel([...riskLevels]);
        setWatchList([...watchLists]);
        setPepClass([...pepClasses]);
    }

    // expands/collapes country options based on user input
    function expandCountries() {
        setCountryFlag(!countryFlag);
        let flag = !countryFlag;
        let countryArray = [...countries];
        countryArray.forEach((country,index) => {
            if(flag)
              country.show = true;
            else if(!flag && index <= 2)
              country.show =true;
            else
              country.show = false;    
        })
        setCountries([...countryArray]);
    }
    
    // expands/collapes risk options based on user input
    function expandRisks() {
        setRiskFlag(!riskFlag);
        let flag = !riskFlag;
        let riskArray = [...riskLevel];
        riskArray.forEach((risk,index) => {
            if(flag)
              risk.show = true;
            else if(!flag && index <= 2)
              risk.show =true;
            else
              risk.show = false;    
        })
        setRiskLevel([...riskArray]);
    }
    
    // expands/collapes watch options based on user input
    function expandWatch() {
        setWatchFlag(!watchFlag);
        let flag = !watchFlag;
        let watchArray = [...watchList];
        watchArray.forEach((watch,index) => {
            if(flag)
              watch.show = true;
            else if(!flag && index <= 2)
              watch.show =true;
            else
              watch.show = false;    
        })
        setWatchList([...watchArray]);
    }
    
    // expands/collapes pep options based on user input
    function expandPep() {
        setPepFlag(!pepFlag);
        let flag = !pepFlag;
        let pepArray = [...pepClass];
        pepArray.forEach((pep,index) => {
            if(flag)
              pep.show = true;
            else if(!flag && index <= 2)
              pep.show =true;
            else
              pep.show = false;    
        })
        setPepClass([...pepArray]);
    }

    return ([
        <>
        <div className="sidebar">
            <div className="page-header-title">
                <div className="filter-text" >Filters</div>
                <div className="btn-group">
                  <button className="btn"  onClick={applyFilter}>Apply</button>
                  <button className="btn"  onClick={clearFilter}>Clear</button>
                </div>
            </div>    
            <form className="form-horizontal">
                <label className="control-label">START DATE</label>
                <div className="form-group">
                    <DatePicker className="datePicker" dateFormat="dd/MM/yyyy" selected={startDate} onChange={date => {setStartDate(date);}} value={startDate} placeholderText="Start Date"/>
                </div>
                <label className="control-label">END DATE</label>
                <div className="form-group">
                    <DatePicker className="datePicker" dateFormat="dd/MM/yyyy" selected={endDate} onChange={date => {setEndDate(date);}} value={endDate} placeholderText="End Date"/>
                </div>
            <label className="control-label">MATCHING %</label>
            <div className="form-group col-md-12 form-element-height">
                <input id="slider" onChange={slideChange} value={slideValue} type="range" name="points" min="0" max="100" steps="20"/>
                <span className="data-point">({slideValue})</span>
            </div>
            <fieldset className="fieldHeader">
                <legend>COUNTRY OF ORIGIN</legend>
                {countries.length? countries.map((country,index) => {
                    return (
                        <div className="checkboxPadding" key={country.value}>
                            {country.show ? <><input type="checkbox" name={country.name} value={country.value || ''} checked={country.selected} onChange={() => {changeCountry(country.value,country.selected)}}/><label htmlFor={country.name}>{country.value}</label><span className="data-point">({dataCollection[0][country.value]})</span></>:''}
                        </div>
                        
                    );
                }):''}
                <a href="#" className="spacing" onClick={expandCountries}>{countryFlag?<i className="fa fa-minus-square"><span>Collapse Options</span></i>:<i className="fa fa-plus-square"><span>Expand Options</span></i>}</a>
            </fieldset>
            <fieldset>
                <legend>RISK LEVEL</legend>
                {riskLevel.map(risk =>{
                    return (
                        <div className="checkboxPadding" key={risk.value}>
                            {risk.show ? <><input type="checkbox"  name={risk.name} value={risk.value} checked={risk.selected} onChange={() => {changeRisk(risk.value,risk.selected)}}/>
                            <label htmlFor={risk.name}>{risk.value}</label><span className="data-point">({dataCollection[1][risk.value]})</span></>:''}
                        </div>
                    )
                })}
                <a href="#" className="spacing" onClick={expandRisks}>{riskFlag?<i className="fa fa-minus-square"><span>Collapse Options</span></i>:<i className="fa fa-plus-square"><span>Expand Options</span></i>}</a>
                
            </fieldset>
            <fieldset>
                <legend>WATCH LIST</legend>
                {watchList.map(watcher => {
                    return (
                        <div className="checkboxPadding" key={watcher.value}>
                            {watcher.show? <><input type="checkbox"  name={watcher.name} value={watcher.value} checked={watcher.selected} onChange={() => {changeWatchList(watcher.value,watcher.selected)}}/>
                            <label htmlFor={watcher.name}>{watcher.value}</label><span className="data-point">({dataCollection[2][watcher.value]})</span></>:''}
                        </div>
                    )
                })}
                <a href="#" className="spacing" onClick={expandWatch}>{watchFlag?<i className="fa fa-minus-square"><span>Collapse Options</span></i>:<i className="fa fa-plus-square"><span>Expand Options</span></i>}</a>
                
            </fieldset>
            <fieldset>
                <legend>PEP CLASS</legend>
                {pepClass.map(pep => {
                    return (
                        <div className="checkboxPadding" key={pep.value}>
                            {pep.show ? <><input type="checkbox"  name={pep.name} value={pep.value} checked={pep.selected} onChange={() => {changePepClasses(pep.value,pep.selected)}}/>
                            <label htmlFor={pep.name}>{pep.value}</label><span className="data-point">({dataCollection[3][pep.value]})</span></>:''}
                        </div>
                    )
                })}
                <a href="#" className="spacing" onClick={expandPep}>{pepFlag?<i className="fa fa-minus-square"><span>Collapse Options</span></i>:<i className="fa fa-plus-square"><span>Expand Options</span></i>}</a>
            </fieldset>
            
            </form>
        </div>
    </>
    ]);
}

export default Filter;