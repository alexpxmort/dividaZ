import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';
  
const SelectCustom = ({name,label,variant,options,disabled, ...otherProps}) =>  {

  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
        name: fieldName,
        ref: selectRef.current,
        getValue: (ref) => {
          if (otherProps.isMulti) {
            if (!ref.state.value) {
              return [];
            }
            return ref.state.value.map((option) => option.value);
          }
          if (!ref.state.value) {
  
            return '';
          }
  
          return ref.state.value.value;
  
        },
  
      });

  }, [fieldName,registerField,otherProps.isMulti]);

  return (
    <ReactSelect
    defaultValue={defaultValue}
    isOptionDisabled={()=>disabled}
    options={options}
    style={{width:500}}
    ref={selectRef}
    classNamePrefix={'react-select'}

    {...otherProps}

    />
  );

};



export default SelectCustom;