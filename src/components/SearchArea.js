import React from 'react';
import { Input, Button, Form, Icon } from 'semantic-ui-react';

const SearchArea = ({
    onFormSubmit,
    onButtonClick,
    city,
    inputEl,
    weatherInfo,
    onInputChange,
}) => {
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
            <Button animated type="submit" size="large">
                <Button.Content visible>Search</Button.Content>
                <Button.Content hidden>
                    <Icon name="search" />
                </Button.Content>
            </Button>
        </Form>
    );
};

export default SearchArea;
