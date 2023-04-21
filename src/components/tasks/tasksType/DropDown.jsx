import { FormControl, MenuItem, Select } from '@mui/material';
import { useState, Fragment } from 'react';

const Dropdown = ({ caseDetail: { description, dropdowns } }) => {
    const splittedDesc = description.split('__drop__');
    const dropdownArr = splittedDesc.map((sentencePart, index) => {
        // const [studentAnswer, setStudentAnswer] = useState('');
        return (
            <Fragment key={index}>
                {sentencePart}
                {index + 1 !== splittedDesc.length ? (
                    <FormControl size="small">
                        <Select
                        // value={''}
                        // onChange={handleChange}
                        >
                            {dropdowns[index].map((options, index) => (
                                <MenuItem key={index} value={options}>
                                    {options}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : null}
                {/* {index < inputCount && (
              <input
              style={{ border:'3px dotted black' , borderTop:'none' , borderLeft:'none' , borderRight:'none'  , outline:'none' , textAlign:'center' , width:'100px'}}
                onChange={(e) => {
                  handleInputChange(e, index);
                  spl(inputValues)
                }}
                value={inputValues[index] || ''}
              />
            )} */}
            </Fragment>
        );
    });
    return <div>{dropdownArr}</div>;
};

export default Dropdown;
