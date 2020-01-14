
import React,{useState, useEffect} from 'react';
import './App.scss';
import response from './data.json';
import Filter from './Filter';
import Cards from './Cards';
import Table from './Table.js';
import Popup from './Popup.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// configure toast
toast.configure();


// Columns for table
const columnsList = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
    show:true
  },
  {
    name: 'Created',
    selector: 'created',
    sortable: false,
    show:true,
  },
  {
    name: 'Matches',
    selector: 'matches',
    sortable: true,
    show:true
  },
  {
    name: 'Country',
    selector: 'country',
    sortable: true,
    show:false
  },
  {
    name: 'Risk Level',
    selector: 'riskLevel',
    sortable: true,
    show:false
  },
  {
    name: 'Pep Class',
    selector: 'pep',
    sortable: true,
    show:true
  },
  {
    name: 'Watch List',
    selector: 'watchList',
    sortable: true,
    show:false
  },
];



var initialData =[];
const App = () => {
  // Hooks to store columns
const [columns,setColumns] = useState([]);
const [totalColumns,setTotalColumns] = useState([]);
  // Hooks to store data of columns
const [columnsData,setColumnsData] = useState([]);
  // Hooks to send data to Dashboard Cards
const [customData,setCustomData] = useState({});
  // Hooks to show numbers next to filter options  
const [dataCollection,setDataCollection] = useState([]);

const profileName ="Eric Jones";

const notify = () =>{ toast("Filter applied successfully!!");};
const columnNotify = () => {toast("Column configured successfully!!")}

let countryData = {ALL:0,India:0,US:0,UK:0,Belgium:0,France:0};
let riskData = {ALL:0,High:0,Low:0,Medium:0,Simple:0};
let watchData = {ALL:0,Sanctions:0,Warnings:0};
watchData['Fitness & Probity']=0;
let pepData = {ALL:0,1:0,2:0,3:0,4:0};
useEffect(()=>{
  //  response from static data.json
   const data = response;
    // shallow copy for future use
   initialData = [...data];
   let columnList = columnsList.filter(column => {
       return column.show;
   });
   let columnData = data;
   let customData ={pepClass1:0,matches:0,monitors:0,countryUS:0};
   countryData['ALL']=riskData['ALL']=watchData['ALL']=pepData['ALL']=customData.monitors = data.length;
   data.map(item => {
      if(item.pep ===1) {
        customData.pepClass1++;
      }
      if(item.matches>=90) {
        customData.matches++;
      }
      if(item.country === 'US')
         customData.countryUS++;
      countryData[item.country]++;
      riskData[item.riskLevel]++;
      watchData[item.watchList]++;
      pepData[item.pep]++;   
   })
   let dataCollection=[].concat(countryData,riskData,watchData,pepData)
   setDataCollection([...dataCollection]);
   setCustomData(customData);
   setTotalColumns(columnsList)
   setColumns(columnList);
   setColumnsData(columnData);
},[]);

function applyFilter(filter) {
   notify();
   let data = [...columnsData];
   let filteredData = [];
   for (let k in filter) {
        // Filtering based on different fields
        if(k === 'match') {
            filteredData = data.filter(item => {
                if(item.matches === filter[k])
                   return item;
            })
        }
        if(k === 'countries') {
          filteredData = filteredData.filter(item => {
            if(filter[k].indexOf('ALL')!== -1 || filter[k].indexOf(item.country) !== -1)
               return item;
          })
        }
        if( k === 'pep') {
          filteredData = filteredData.filter(item => {
            if(filter[k].indexOf('ALL')!== -1 || filter[k].indexOf(item.pep) !== -1)
               return item;
          })
        }
        if(k === 'watch') {
          filteredData = filteredData.filter(item => {
            if(filter[k].indexOf('ALL')!== -1  || filter[k].indexOf(item.watchList)!== -1)
               return item;
          })
        }
        if(k === 'risks') {
          filteredData = filteredData.filter(item => {
            if(filter[k].indexOf('ALL')!== -1  || filter[k].indexOf(item.riskLevel)!== -1)
               return item;
          })
        }
        if(k === 'startDate') {
          filteredData = filteredData.filter(item => {
              if(filter['startDate'] && filter['endDate']) {
                if(item.created >= filter['startDate'] && item.created <= filter['endDate'])
                  return item;
              }
              else {
                return item;
              }   
          })
        }
   }
   setColumnsData(filteredData);
}

function clearFilter() {
  setColumnsData([...initialData]);
  toast("Filter cleared successfully!!")
}
function selectionChanged(columns) {
    let columnsList = columns.filter(column => {
      return column.show;
    })
    setColumns([...columnsList]);
    columnNotify();
}

return(
    <>
      <div className="header">
          Dashboard
          <div className="profile">
            <i class="fa fa-user-circle-o" style={{fontSize:24+'px'}}></i>
            <span className="profile-name">{profileName}</span> 
          </div>
      </div>
      <Filter key="filter_data" data={dataCollection} click={applyFilter} clear={clearFilter}></Filter>
      <div className="main-content">
        <Cards data={customData}></Cards>
        <Popup columns={totalColumns} change={selectionChanged}></Popup>
        <Table columns={columns} data={columnsData}></Table>
      </div>
  </>
)
      }
export default App;
