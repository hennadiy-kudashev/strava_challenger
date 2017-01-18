import React from 'react';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

const Dashboard = () => (
    <List>
        <ListSubHeader caption='2017 Challange' />
        <ListItem
          avatar='https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg'
          caption='Dr. Manhattan'
          legend="Jonathan 'Jon' Osterman"
        />
        <ListItem
          avatar='https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg'
          caption='Ozymandias'
          legend='Adrian Veidt'
        />
        <ListItem
          avatar='https://dl.dropboxusercontent.com/u/2247264/assets/r.jpg'
          caption='Rorschach'
          legend='Walter Joseph Kovacs'
        />
    </List>
);

export default Dashboard;
