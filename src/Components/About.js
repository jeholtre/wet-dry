import React from 'react';
import { Header, Divider } from 'semantic-ui-react';
import '../App.css';
function About()
{
    return (
        <div className={'About'}>
            <div className={'App-header'}>
            <Header size={'large'} >About Page</Header>
                <p>this is the about page</p>
            <Divider hidden />
            <Header size={'large'}>Project Description</Header>
                <p>Wet-Dry-Mapping is an app designed to help with the data collection process
                    associated with mapping streams. This product allows you to take GPS data points
                    while walking. During the data collection process you can say whether the stream
                    is Wet - Neither - Dry and if it is Wet then whether it is a Pool (Slow moving or no movement)
                    or Riffle (Fast moving)
                </p>

            <Divider hidden />
            <Header size={'large'}>Frequently Asked Questions</Header>
                <p>FAQ:</p>
                <p>Q1:" Temp "</p>
                <p>A1:" Temp "</p>

            <Divider hidden />
            <Header size={'large'}>Credits</Header>
                <p>Streamers App Development Team:</p>
                <p>Product Owner: Zong Deng</p>
                <p>Project Technical Lead: Emma Ryden</p>
                <p>Product Technicians: Jason Holtry, Luke Johnston, Mike Boisvert</p>

            </div>
        </div>
    );
}
export default About;