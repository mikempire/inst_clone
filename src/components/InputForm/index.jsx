import React from 'react';

const InputForm = ({error, value, setValue }) => {
    return (
        <input className={`cnDetailedCardText ${error && "error"}`}
               placeholder='Введите коментарий'
               value={value} onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default InputForm;