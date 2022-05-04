import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {createActivity, updateActivity, 
        loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    function handleSubmit()  {
       activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing> 
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.id} name='title' onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}></Form.Input>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}></Form.Input>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'></Button>
                <Button  floated='right' type='button' content='Cancel'></Button>
            </Form>
        </Segment>
    )
})