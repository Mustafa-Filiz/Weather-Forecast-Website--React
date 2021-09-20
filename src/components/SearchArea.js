import React from 'react';
import { Input, Button, Form } from 'semantic-ui-react';

const SearchArea = ({onFormSubmit, onButtonClick, city, inputEl, weatherInfo, onInputChange}) => {
    return (
        <Form className="input-form" onSubmit={onFormSubmit}>
        <Button
            size="large"
            content="Your City =>"
            onClick={onButtonClick}
        />
        <Input
            size="large"
            value={city}
            ref={inputEl}
            placeholder={weatherInfo?.location?.region}
            onChange={onInputChange}
        />
    </Form>
    );
};

export default SearchArea;
