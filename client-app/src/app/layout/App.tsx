import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import { Container, Header, List, ListItem } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])
  return (
    <>
     <NavBar/>
     <Container style={{marginTop: '7em'}}>
      <ActivityDashboard activities={activities}></ActivityDashboard>
     </Container>
     
    </>
  );
}

export default App;