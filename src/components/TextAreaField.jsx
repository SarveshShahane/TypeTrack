import React, { useState, useCallback } from 'react';
import { forwardRef } from 'react';

const TextAreaField = forwardRef(({ isDisabled, setText, value }, ref) => {
  const [localValue, setLocalValue] = useState(value);
  
  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    setText(newValue);
  }, [setText]);
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  return (
    <textarea 
      ref={ref}
      name="typed"
      id="typing"
      className='border rounded border-gray-400 text-lg bg-gray-100 resize-none p-3 m-1 w-full h-40 focus:outline-none focus:ring-1 focus:ring-blue-500'
      rows={6}
      onChange={handleChange}
      disabled={isDisabled}
      value={localValue}
      placeholder="Start typing when ready..."
      autoComplete="off"
      spellCheck="false"
    />
  );
}); 

export default React.memo(TextAreaField);