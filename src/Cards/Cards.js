import React from 'react';
import './Cards.scss';

const Cards = (props) => {
    return (
      <div className="flex-container">
          <div className="flex-items">
              {props.data.monitors}
              <div># of Monitors</div>
              
          </div>
          <div className="flex-items">
              {props.data.matches}
              <div>Matches greater than 90</div>
          </div>
          <div className="flex-items">
               {props.data.pepClass1}
               <div># of Pep Class1</div>
          </div>
          <div className="flex-items">
               {props.data.countryUS}
               <div># of US Customers</div>
          </div>
      </div>
    );

}

export default Cards;