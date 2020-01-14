import React, { useState } from 'react';
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './Popup.scss';

const Popup = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  
//   Column selection changes based on toggling by user
  function selectionChange(value) {
      let columns = [...props.columns];
      let index   = columns.findIndex((column,index) => {
          if(column.name === value) {
              return index;
          }
      });
      columns[index].show = !columns[index].show;
      props.change(columns);
  }

  return (
    <div  className="filter-option">
       <i className="fa fa-filter" id="Popover1"></i>
      <Popover placement="left" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
        <PopoverHeader>Toggle  Column</PopoverHeader>
        <PopoverBody>
            <ul className="unordered-list">
                {
                    props.columns.length &&props.columns.map(column => {
                      return ( 
                            <li key={column.name}>
                                <input type="checkbox"  name="columns" value={column.name} checked={column.show} onChange={()=>{selectionChange(column.name)}}/>
                                <label htmlFor={column.name}>{column.name}</label>
                            </li>
                        );
                    })
                }
            </ul>
        </PopoverBody>
      </Popover>
    </div>
  );
}

export default Popup;